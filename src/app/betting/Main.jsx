import React from 'react';
import data from './monthsData/02.2026.json';

const UltraThinTable = () => {
    const tableData = Object.entries(data).map(([date, values]) => {
        const total = values.reduce((sum, num) => sum + num, 0);

        // Форматирование без скобок
        const calculation = values
            .map((num, index) => {
                if (index === 0) {
                    // Первое число показываем как есть
                    return num.toString();
                } else {
                    // Остальные числа с плюсом/минусом
                    return num >= 0 ? `+${num}` : num.toString();
                }
            })
            .join('');

        return { date, calculation, total };
    });

    const totalSum = tableData.reduce((sum, item) => sum + item.total, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">История ставок</h2>

                    {/* Таблица */}
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                        <div className="grid" style={{ gridTemplateColumns: 'auto 1fr' }}>
                            {/* Шапка */}
                            <div className="px-3 py-2 text-xs font-medium text-gray-700 whitespace-nowrap bg-gray-100 border-b border-gray-300">
                                Дата
                            </div>
                            <div className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 border-b border-gray-300">
                                Выигрыш
                            </div>

                            {/* Тело таблицы */}
                            {tableData.map((item, index) => (
                                <React.Fragment key={item.date}>
                                    <div
                                        className={`px-3 py-2.5 ${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } ${index !== tableData.length - 1 ? 'border-b border-gray-200' : ''}`}
                                    >
                                        <span className="text-sm text-gray-800 whitespace-nowrap">{item.date}</span>
                                    </div>

                                    <div
                                        className={`px-3 py-2.5 ${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        } ${index !== tableData.length - 1 ? 'border-b border-gray-200' : ''}`}
                                    >
                                        <div className="text-xs text-gray-600 mb-0.5 font-mono break-all whitespace-normal">
                                            {item.calculation}
                                        </div>
                                        <div
                                            className={`text-sm font-medium ${
                                                item.total >= 0 ? 'text-green-800' : 'text-red-800'
                                            }`}
                                        >
                                            = {item.total.toLocaleString('ru-RU')}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Итого */}
                    <div className="mt-5 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Итого за период:</span>
                            <span
                                className={`text-base font-bold ${totalSum >= 0 ? 'text-green-800' : 'text-red-800'}`}
                            >
                                {totalSum >= 0 ? '+' : ''}
                                {totalSum.toLocaleString('ru-RU')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UltraThinTable;
