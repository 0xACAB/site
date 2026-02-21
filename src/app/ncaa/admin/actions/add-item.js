'use server';
import { connectToDatabase } from '@/lib/mongodb';
import lastEvents from './events_ncaa.json' with { type: 'json' };

async function fetchFlashScoreData(eventId) {
    try {
        const link = `https://global.ds.lsapp.eu/odds/pq_graphql?_hash=ope2&eventId=${eventId}&bookmakerId=454&betType=HOME_AWAY&betScope=FULL_TIME_OVER_TIME`;

        const response = await fetch(link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            home: data.data.findPrematchOddsForBookmaker.home.value,
            away: data.data.findPrematchOddsForBookmaker.away.value
        };
    } catch (error) {
        console.warn(`⚠️ Не удалось получить данные FlashScore для ${eventId}:`, error.message);
        return { home: null, away: null };
    }
}

function validateAndProcessScheme(scheme) {
    if (!scheme || typeof scheme !== 'object') {
        throw new Error('Scheme must be an object');
    }

    if (!Array.isArray(scheme.home) || !Array.isArray(scheme.away)) {
        throw new Error('Scheme must contain home and away arrays');
    }

    // Фильтруем null значения
    const homeScores = scheme.home.filter((score) => score !== null);
    const awayScores = scheme.away.filter((score) => score !== null);

    if (homeScores.length === 0 || awayScores.length === 0) {
        throw new Error('Scheme arrays cannot be empty');
    }

    const homeFinalScore = homeScores[homeScores.length - 1];
    const awayFinalScore = awayScores[awayScores.length - 1];

    if (typeof homeFinalScore !== 'number' || typeof awayFinalScore !== 'number') {
        throw new Error('Final scores must be numbers');
    }

    return {
        homeWin: homeFinalScore > awayFinalScore,
        processedScheme: {
            home: homeScores,
            away: awayScores
        }
    };
}

export async function addItemAction(eventId, homeCoeff = null, awayCoeff = null) {
    try {
        // Валидация входных данных
        if (!eventId || typeof eventId !== 'string') {
            throw new Error('Invalid eventId');
        }

        // Получаем схему из JSON
        const eventData = lastEvents[eventId];
        if (!eventData?.scheme) {
            throw new Error(`Event ${eventId} not found in local database`);
        }
        const scheme = eventData.scheme;

        // Получаем и обрабатываем схему
        const { homeWin, processedScheme } = validateAndProcessScheme(scheme);

        // Параллельно получаем данные из FlashScore и подключаемся к базе
        const [flashScoreData, { db }] = await Promise.all([fetchFlashScoreData(eventId), connectToDatabase()]);

        const collection = db.collection('ncaa');

        // Подготавливаем данные для обновления
        const updateData = {
            winner: homeWin ? 'home' : 'away',
            scheme: processedScheme,
            eventId,
            flashScoreCoefficients: flashScoreData.home !== null ? [flashScoreData.home, flashScoreData.away] : null,
            homeAwayDefined: true
        };

        // Добавляем коэффициенты только если они переданы
        if (homeCoeff !== null && awayCoeff !== null) {
            const homeCoef = parseFloat(homeCoeff);
            const awayCoef = parseFloat(awayCoeff);
            if (!isNaN(awayCoef) && !isNaN(homeCoef)) {
                updateData.realCoefficients = [homeCoeff, awayCoeff];
            }
        }

        // Добавляем или обновляем событие
        const result = await collection.updateOne(
            { eventId: eventId },
            {
                $set: updateData,
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        return {
            success: true,
            eventId,
            hasCoefficients: homeCoeff !== null || awayCoeff !== null,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        };
    } catch (error) {
        console.error('❌ Ошибка при добавлении:', error);
        return {
            success: false,
            error: error.message,
            eventId,
            timestamp: new Date().toISOString()
        };
    }
}
