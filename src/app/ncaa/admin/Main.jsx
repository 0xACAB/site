'use client';

import { useState } from 'react';
import { checkNewEventsAction } from './actions/events';
import EventForm from './EventForm'; // или EventFormToggle, EventFormSimple

export default function SimplePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleCheck = async () => {
        setLoading(true);
        try {
            const result = await checkNewEventsAction();
            setMessage(result.message);
            setEvents(result.result || []);
        } catch (error) {
            setMessage('Ошибка при проверке');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEventAdded = (eventId) => {
        setEvents((prev) => prev.filter((event) => event.eventId !== eventId));
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
                    {events.map((event) => (
                        <div key={event.eventId} className="p-4 border rounded-lg">
                            <div className="mb-4">
                                <h3 className="font-bold">ID: {event.eventId}</h3>
                                <p className="text-sm text-gray-600">
                                    Текущие кэфы: {event.data?.data?.findPrematchOddsForBookmaker?.home?.value || 'N/A'}{' '}
                                    | {event.data?.data?.findPrematchOddsForBookmaker?.away?.value || 'N/A'}
                                </p>
                            </div>

                            <EventForm event={event} onSuccess={handleEventAdded} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
