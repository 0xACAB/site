'use client';

import { useState } from 'react';
import { addItemAction } from './actions/add-item';

export default function EventFormToggle({ event, onSuccess }) {
    const [mode, setMode] = useState('withCoeff'); // 'withCoeff' или 'withoutCoeff'
    const [homeCoeff, setHomeCoeff] = useState('');
    const [awayCoeff, setAwayCoeff] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const result = await addItemAction(
                event.eventId,
                mode === 'withCoeff' ? homeCoeff : null,
                mode === 'withCoeff' ? awayCoeff : null
            );

            if (result.success) {
                alert(`✅ ${result.message || 'Событие успешно обработано'}`);
                if (onSuccess) onSuccess(event.eventId);
            } else {
                alert(`❌ Ошибка: ${result.error}`);
            }
        } catch (error) {
            alert('Ошибка сети');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Переключатель режима */}
            <div className="flex border rounded-lg overflow-hidden">
                <button
                    type="button"
                    onClick={() => setMode('withCoeff')}
                    className={`flex-1 py-2 text-center ${
                        mode === 'withCoeff' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    С коэффициентами
                </button>
                <button
                    type="button"
                    onClick={() => setMode('withoutCoeff')}
                    className={`flex-1 py-2 text-center ${
                        mode === 'withoutCoeff' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    Без коэффициентов
                </button>
            </div>

            {/* Поля коэффициентов (только в режиме "с коэффициентами") */}
            {mode === 'withCoeff' && (
                <div className="grid grid-cols-2 gap-3 p-3 border rounded-lg">
                    <div>
                        <label className="block text-sm mb-1 font-medium">Коэффициент (дома)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="1.00"
                            placeholder="1.50"
                            className="w-full p-2 border rounded"
                            value={homeCoeff}
                            onChange={(e) => setHomeCoeff(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 font-medium">Коэффициент (гости)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="1.00"
                            placeholder="2.50"
                            className="w-full p-2 border rounded"
                            value={awayCoeff}
                            onChange={(e) => setAwayCoeff(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>
                </div>
            )}

            {/* Информация в режиме "без коэффициентов" */}
            {mode === 'withoutCoeff' && (
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-start">
                        <div className="text-yellow-600 mr-2">⚠️</div>
                        <div className="text-sm">
                            Событие будет добавлено без коэффициентов. Вы сможете добавить их позже.
                        </div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded font-medium ${
                    mode === 'withCoeff' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white disabled:bg-gray-400`}
            >
                {loading
                    ? 'Добавляем...'
                    : mode === 'withCoeff'
                      ? 'Добавить с коэффициентами'
                      : 'Добавить без коэффициентов'}
            </button>
        </form>
    );
}
