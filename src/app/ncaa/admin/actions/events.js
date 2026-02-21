'use server';
import { connectToDatabase } from '@/lib/mongodb';
import lastEvents from './events_ncaa.json' with { type: 'json' };

export async function checkNewEventsAction() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('ncaa');

        // Проверяем, что есть события в JSON
        const eventsKeys = Object.keys(lastEvents);

        if (eventsKeys.length === 0) {
            return {
                success: true,
                result: [],
                message: 'В локальной базе нет событий'
            };
        }

        // Реверсим ключи (если нужно последние первыми)
        const reversedKeys = [...eventsKeys].reverse();

        // Проверяем какие уже есть в базе
        const existingEvents = await collection
            .find({ eventId: { $in: reversedKeys } })
            .project({ eventId: 1 })
            .toArray();

        const existingIdsSet = new Set(existingEvents.map((e) => e.eventId));

        // Фильтруем - оставляем только новые
        const newEvents = reversedKeys.filter((eventId) => !existingIdsSet.has(eventId));

        if (newEvents.length === 0) {
            return {
                success: true,
                result: [],
                message: `Все ${reversedKeys.length} событий уже есть в базе`
            };
        }

        // Создаем ссылки для новых событий
        const newEventsLinks = newEvents.map((key) => {
            return `https://global.ds.lsapp.eu/odds/pq_graphql?_hash=ope2&eventId=${key}&bookmakerId=454&betType=HOME_AWAY&betScope=FULL_TIME_OVER_TIME`;
        });
        //https://global.ds.lsapp.eu/odds/pq_graphql?_hash=ope2&eventId=x4IMO0nL&bookmakerId=454&betType=HOME_AWAY&betScope=FULL_TIME_OVER_TIME
        const final = [];
        // Используем Promise.all для параллельных запросов с ограничением
        const BATCH_SIZE = 5; // Ограничиваем количество одновременных запросов

        for (let i = 0; i < newEventsLinks.length; i += BATCH_SIZE) {
            const batch = newEventsLinks.slice(i, i + BATCH_SIZE);
            const batchEvents = newEvents.slice(i, i + BATCH_SIZE);

            const batchPromises = batch.map(async (link, batchIndex) => {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут

                    const response = await fetch(link, {
                        signal: controller.signal,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }
                    });

                    clearTimeout(timeout);

                    if (!response.ok) {
                        console.warn(`HTTP error ${response.status} для события ${batchEvents[batchIndex]}`);
                        return {
                            eventId: batchEvents[batchIndex],
                            data: null,
                            error: `HTTP ${response.status}`
                        };
                    } else {
                        console.log(link);
                        console.log(response.status);
                    }

                    const data = await response.json();
                    return {
                        eventId: batchEvents[batchIndex],
                        data,
                        error: null
                    };
                } catch (error) {
                    console.warn(`Ошибка при получении события ${batchEvents[batchIndex]}:`, error.message);
                    return {
                        eventId: batchEvents[batchIndex],
                        data: null,
                        error: error.message
                    };
                }
            });

            const batchResults = await Promise.all(batchPromises);
            final.push(...batchResults);

            // Небольшая пауза между батчами чтобы не перегружать API
            if (i + BATCH_SIZE < newEventsLinks.length) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }

        // Фильтруем успешные результаты
        const successfulResults = final.filter((item) => item.data !== null);
        const failedResults = final.filter((item) => item.data === null);

        return {
            success: true,
            result: successfulResults,
            failed: failedResults,
            stats: {
                totalInJson: eventsKeys.length,
                alreadyInDb: existingEvents.length,
                newFound: newEvents.length,
                successfullyFetched: successfulResults.length,
                failedToFetch: failedResults.length
            },
            message:
                successfulResults.length > 0
                    ? `Найдено ${successfulResults.length} новых событий`
                    : `Найдено ${newEvents.length} новых событий, но не удалось получить данные`
        };
    } catch (error) {
        console.error('❌ Ошибка в checkNewEventsAction:', error);
        return {
            success: false,
            result: [],
            message: `Ошибка при проверке: ${error.message}`
        };
    }
}
