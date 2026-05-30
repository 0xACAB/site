'use client';

import { useEffect, useMemo } from 'react';

import { useSampling } from './states';
import { MIN_COEFF_IN_TOP_COEFFS } from './globals';
import TopCoefficients from './TopCoefficients';
import ResultsSection from './ResultsSection';

function SamplingControl({ uniqueCoeffs, handleTeamChange, coeffMap }) {
    const { coefficient, team, setCoefficient } = useSampling();
    return (
        <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Фильтр по коэффициенту:</label>
                    <div className="flex gap-2">
                        <select
                            value={coefficient}
                            onChange={(e) => setCoefficient(e.target.value)}
                            className="flex-1 p-2 border rounded-lg"
                        >
                            <option value="">Все кэфы выборки</option>
                            {uniqueCoeffs.map((coeff) => {
                                const stat = coeffMap.get((Number(coeff) || 0).toFixed(2));
                                return (
                                    <option key={coeff} value={coeff}>
                                        {(Number(coeff) || 0).toFixed(2)}
                                        {stat && ` (${stat.winCount}/${stat.totalCount})`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Для команды:</label>
                    <select value={team} onChange={handleTeamChange} className="w-full p-2 border rounded-lg">
                        <option value="">Любая команда</option>
                        <option value="home">Домашняя</option>
                        <option value="away">Гостевая</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default function FilterClient() {
    const { initialItems, initializeStore, coefficient, team, setCoefficient } = useSampling();

    useEffect(() => {
        console.log('render');
        initializeStore();
    }, []);

    const filteredItems = useMemo(() => {
        const selectedNum = coefficient ? parseFloat(coefficient) : null;

        return initialItems.filter((item) => {
            if (coefficient) {
                const hasCoeff = item.realCoefficients?.some((c) => {
                    const num = Number(c);
                    return !isNaN(num) && num.toFixed(2) === selectedNum.toFixed(2);
                });
                if (!hasCoeff) return false;
            }

            if (team && selectedNum) {
                if (team === 'home') {
                    const homeCoeff = Number(item.realCoefficients?.[0]);
                    return !isNaN(homeCoeff) && homeCoeff.toFixed(2) === selectedNum.toFixed(2);
                }
                if (team === 'away') {
                    const awayCoeff = Number(item.realCoefficients?.[1]);
                    return !isNaN(awayCoeff) && awayCoeff.toFixed(2) === selectedNum.toFixed(2);
                }
            }

            return true;
        });
    }, [initialItems, coefficient, team]);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Фильтр коэффициентов NBA</h1>

            <FilterPanel filteredItems={filteredItems} />
            <TopCoefficients />
            <ResultsSection filteredItems={filteredItems} />
        </div>
    );
}

function FilterPanel({ filteredItems }) {
    const { initialItems, allCoefficientStats, setTeam } = useSampling();

    const uniqueCoeffs = useMemo(() => {
        const allCoeffs = initialItems.flatMap((item) => item.realCoefficients || []);

        // Приводим к числам и фильтруем
        const numericCoeffs = allCoeffs
            .map((c) => Number(c))
            .filter((c) => {
                return !isNaN(c) && c > MIN_COEFF_IN_TOP_COEFFS;
            })
            .map((c) => parseFloat(c.toFixed(2))); // Нормализуем до 2 знаков

        // Убираем дубли
        return [...new Set(numericCoeffs)].sort((a, b) => a - b);
    }, [initialItems]);

    const coeffMap = useMemo(
        () =>
            new Map(
                allCoefficientStats?.map((stat) => {
                    return [stat.coefficient.toFixed(2), stat];
                })
            ),
        [allCoefficientStats]
    );

    const handleTeamChange = (e) => {
        setTeam(e.target.value);
    };

    return (
        <div className="p-0">
            <div className="grid grid-cols-2 gap-4">
                <StatBox label="Всего записей" value={initialItems.length} />
                <StatBox
                    label="Показано"
                    value={filteredItems.length}
                    highlight={filteredItems.length < initialItems.length}
                />
            </div>
            <SamplingControl uniqueCoeffs={uniqueCoeffs} handleTeamChange={handleTeamChange} coeffMap={coeffMap} />
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
