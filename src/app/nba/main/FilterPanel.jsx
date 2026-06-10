'use client';

import { useMemo } from 'react';
import { useSampling } from './states';
import { MIN_COEFF_IN_TOP_COEFFS } from './globals';

export default function FilterPanel({ filteredItems, handleCoeffSelect, onTeamChange }) {
    const { allCoefficientStats, coefficient, team } = useSampling();

    // Общее количество записей по всем коэффициентам (для статистики)
    const totalRecords = useMemo(() => {
        return allCoefficientStats.reduce((acc, { coefficient, totalCount }) => {
            if (coefficient >= MIN_COEFF_IN_TOP_COEFFS) {
                return acc + totalCount;
            }
            return acc;
        }, 0);
    }, [allCoefficientStats]);

    // Уникальные коэффициенты для выпадающего списка
    const uniqueCoeffs = useMemo(() => {
        const allCoeffs = allCoefficientStats.map((item) => item.coefficient);
        const numericCoeffs = allCoeffs.reduce((acc, c) => {
            if (!isNaN(c) && c >= MIN_COEFF_IN_TOP_COEFFS) {
                acc.push(parseFloat(Number(c).toFixed(2)));
            }
            return acc;
        }, []);
        return [...new Set(numericCoeffs)].sort((a, b) => a - b);
    }, [allCoefficientStats]);

    // Map для быстрого доступа к статистике по коэффициенту
    const coeffMap = useMemo(
        () => new Map(allCoefficientStats.map((stat) => [stat.coefficient.toFixed(2), stat])),
        [allCoefficientStats]
    );

    // Есть ли активный фильтр (для подсветки)
    const hasActiveFilter = !!(coefficient || team);

    return (
        <div className="p-0">
            <div className="grid grid-cols-2 gap-4">
                <StatBox label="Всего записей" value={totalRecords} />
                <StatBox
                    label="Показано"
                    value={filteredItems.length}
                    highlight={hasActiveFilter && filteredItems.length < totalRecords}
                />
            </div>

            <div className="mt-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                    {/* Фильтр по коэффициенту */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Фильтр по коэффициенту:</label>
                        <select
                            value={coefficient || ''}
                            onChange={(e) => handleCoeffSelect(e.target.value || null)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Все кэфы выборки</option>
                            {uniqueCoeffs.map((coeff) => {
                                const stat = coeffMap.get(coeff.toFixed(2));
                                return (
                                    <option key={coeff} value={coeff}>
                                        {coeff.toFixed(2)}
                                        {stat && ` (${stat.winCount}/${stat.totalCount})`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Фильтр по команде */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Для команды:</label>
                        <select
                            value={team || ''}
                            onChange={(e) => onTeamChange(e.target.value || null)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">Любая команда</option>
                            <option value="home">Домашняя</option>
                            <option value="away">Гостевая</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, highlight = false }) {
    return (
        <div className="text-center">
            <div className="text-sm text-gray-600">{label}</div>
            <div className={`text-2xl font-bold ${highlight ? 'text-blue-600' : ''}`}>{value}</div>
        </div>
    );
}
