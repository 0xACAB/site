'use server';
import { connectToDatabase } from '@/lib/mongodb';
import lastEvents from './events_wnba.json' with { type: 'json' };
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

export async function addItemAction(events, homeCoeff = null, awayCoeff = null, comment) {
    const eventId = events.winline.eventId;
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
        const [{ db }] = await Promise.all([connectToDatabase()]);
        const flashScoreWinLineData = {
            home: events.winline.data.data.findPrematchOddsForBookmaker.home.value,
            away: events.winline.data.data.findPrematchOddsForBookmaker.away.value
        };
        const flashScoreFonBetData = {
            home: events.fonbet.data.data.findPrematchOddsForBookmaker.home.value,
            away: events.fonbet.data.data.findPrematchOddsForBookmaker.away.value
        };
        const collection = db.collection('wnba');

        // Подготавливаем данные для обновления
        const updateData = {
            winner: homeWin ? 'home' : 'away',
            scheme: processedScheme,
            eventId,
            flashScoreCoefficients: {
                winline:
                    flashScoreWinLineData.home !== null
                        ? [flashScoreWinLineData.home, flashScoreWinLineData.away]
                        : null,
                fonbet:
                    flashScoreFonBetData.home !== null ? [flashScoreFonBetData.home, flashScoreFonBetData.away] : null
            },
            homeAwayDefined: true
        };
        if (comment) {
            updateData.comment = comment;
        }
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
