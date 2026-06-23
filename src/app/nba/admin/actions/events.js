'use server';
import { connectToDatabase } from '@/lib/mongodb';
import lastEvents from './events_nba.json' with { type: 'json' };

const bookmakersIds = {
    winline: 454,
    fonbet: 547
};
export async function checkNewEventsAction() {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('nba');

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
        const newEventsLinks = newEvents.map((eventId) => {
            return Object.keys(bookmakersIds).map(
                (bookmakerId) =>
                    `https://global.ds.lsapp.eu/odds/pq_graphql?_hash=ope2&eventId=${eventId}&bookmakerId=${bookmakersIds[bookmakerId]}&betType=HOME_AWAY&betScope=FULL_TIME_OVER_TIME`
            );
        });

        const final = {};

        // Используем Promise.all для параллельных запросов с ограничением
        const BATCH_SIZE = 5; // Ограничиваем количество одновременных запросов

        for (let i = 0; i < newEventsLinks.length; i += BATCH_SIZE) {
            const batch = newEventsLinks.slice(i, i + BATCH_SIZE);
            const batchEvents = newEvents.slice(i, i + BATCH_SIZE);

            const batchPromises = batch.map(async (links, batchIndex) => {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут

                    const responses = await Promise.all(
                        links.map(async (url, index) => {
                            const resp = await fetch(url, {
                                signal: controller.signal,
                                headers: {
                                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                                }
                            });
                            return { response: resp, bookmaker: Object.keys(bookmakersIds)[index] };
                        })
                    );
                    clearTimeout(timeout);
                    return (
                        await Promise.all(
                            responses.map(async ({ response, bookmaker }) => {
                                if (!response.ok) {
                                    console.warn(
                                        `HTTP error ${response.status} для события ${batchEvents[batchIndex]}`
                                    );
                                    return {
                                        eventId: batchEvents[batchIndex],
                                        data: null,
                                        bookmaker,
                                        error: `HTTP ${response.status}`
                                    };
                                }

                                const data = await response.json();
                                const result = {
                                    eventId: batchEvents[batchIndex],
                                    data,
                                    bookmaker,
                                    error: null
                                };
                                if (final[batchEvents[batchIndex]]) {
                                    final[batchEvents[batchIndex]][bookmaker] = result;
                                } else {
                                    final[batchEvents[batchIndex]] = { [bookmaker]: result };
                                }
                                return result;
                            })
                        )
                    ).reduce((acc, result) => {
                        acc[result.bookmaker] = result;
                        return acc;
                    }, {});
                } catch (error) {
                    console.warn(`Ошибка при получении события ${batchEvents[batchIndex]}:`, error.message);
                    return {
                        eventId: batchEvents[batchIndex],
                        data: null,
                        error: error.message
                    };
                }
            });

            await Promise.all(batchPromises);
            console.log(final);
            // Небольшая пауза между батчами чтобы не перегружать API
            if (i + BATCH_SIZE < newEventsLinks.length) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }

        // Фильтруем успешные результаты
        const failedResults = [];
        const objectResults = Object.keys(final).reduce((acc, eventId) => {
            if (
                Object.keys(bookmakersIds).every((bookId) => {
                    return final[eventId][bookId].data !== null;
                })
            ) {
                acc[eventId] = final[eventId];
            } else {
                failedResults.push(final[eventId]);
            }
            return acc;
        }, {});
        const successfulResultsCount = Object.keys(objectResults).length;
        return {
            success: true,
            result: final,
            failed: failedResults,
            stats: {
                totalInJson: eventsKeys.length,
                alreadyInDb: existingEvents.length,
                newFound: newEvents.length,
                successfullyFetched: successfulResultsCount,
                failedToFetch: failedResults.length
            },
            message:
                successfulResultsCount > 0
                    ? `Найдено ${successfulResultsCount} новых событий`
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
