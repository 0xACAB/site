'use client';
//ХОЧЕШЬ МАСШТАБНО ПОПРАВИТЬ ЧТО-ТО В БАЗЕ - СНАЧАЛА БЭКАПНИ!
import { useState } from 'react';
import { checkNewEventsAction } from './actions/events';
import EventFormToggle from './EventForm';
export default function SimplePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        setLoading(true);
        try {
            const newEventsDifferentBookmakers = await checkNewEventsAction();
            setEvents(newEventsDifferentBookmakers.result || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEventAdded = (eventId) => {
        setEvents((prev) => {
            return prev.filter((booksObject) => {
                return Object.keys(booksObject).some((bookmaker) => {
                    return booksObject[bookmaker].eventId !== eventId;
                });
            });
        });
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <button
                onClick={handleCheck}
                disabled={loading}
                className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                {loading ? 'Проверяем...' : 'Проверить новые события'}
            </button>

            {events.length > 0 && (
                <div className="space-y-4">
                    {events.map((eventsForBooks) => {
                        return (
                            <div key={eventsForBooks.winline.eventId} className="p-4 border rounded-lg">
                                <div className="mb-4">
                                    <h3 className="font-bold">ID: {eventsForBooks.winline.eventId}</h3>
                                    <div className="text-sm text-gray-600">
                                        Текущие кэфы:{' '}
                                        {Object.keys(eventsForBooks).map((bookmaker) => {
                                            return (
                                                <div key={bookmaker}>
                                                    <div>{bookmaker}</div>
                                                    <div>
                                                        {(eventsForBooks[bookmaker].data?.data
                                                            ?.findPrematchOddsForBookmaker?.home?.value || 'N/A') +
                                                            ' | ' +
                                                            (eventsForBooks[bookmaker].data?.data
                                                                ?.findPrematchOddsForBookmaker?.away?.value || 'N/A')}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <EventFormToggle events={eventsForBooks} onSuccess={handleEventAdded} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
