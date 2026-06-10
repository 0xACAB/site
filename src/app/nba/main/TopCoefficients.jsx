'use client';

import { MIN_ELEMS_IN_TOP_COEFFS, MIN_COEFF_IN_TOP_COEFFS, TOP_COEFFS_LIMIT } from './globals';
import { useMemo } from 'react';
import { useSampling } from './states';

function CoeffButton({ stat, isSelected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-full text-sm transition-all relative ${
                isSelected ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            title={`${stat.coefficient.toFixed(2)} (${
                stat.team === 'home' ? 'Дома' : 'Гости'
            }): ${stat.winCount}/${stat.totalCount} побед (${(stat.winRate * 100).toFixed(1)}%)`}
        >
            <div className="flex items-center gap-1">
                <span>{stat.coefficient.toFixed(2)}</span>
                <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                    ({stat.winCount}/{stat.totalCount})
                </span>
            </div>
        </button>
    );
}

export default function TopCoefficients({ handleCoeffSelect }) {
    const { initialized, allCoefficientStats, teamCoefficientStats, coefficient, team, setCoefficient } = useSampling();
    const topCoefficients = useMemo(() => {
        if (!initialized) return [];
        //дважды будет из-за изменения зависимостей
        console.log('memo', Date.now());
        if (!team) {
            return allCoefficientStats
                .filter(
                    (stat) => stat.totalCount >= MIN_ELEMS_IN_TOP_COEFFS && stat.coefficient >= MIN_COEFF_IN_TOP_COEFFS
                )
                .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
                .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient)
                .slice(0, TOP_COEFFS_LIMIT);
        }

        let stats = Object.values(teamCoefficientStats);
        const filteredStats = stats
            .filter((stat) => stat.team === team)
            .filter((stat) => stat.totalCount >= MIN_ELEMS_IN_TOP_COEFFS && stat.coefficient >= MIN_COEFF_IN_TOP_COEFFS)
            .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
            .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient);

        // Показываем до 10 или меньше, если столько нет
        return filteredStats.slice(0, Math.min(TOP_COEFFS_LIMIT, filteredStats.length));
    }, [initialized, teamCoefficientStats, allCoefficientStats, team]);

    return (
        <div className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
                {`Самые часто выигрывающие коэффициенты начиная с ${MIN_COEFF_IN_TOP_COEFFS} в выборках минимум из ${MIN_ELEMS_IN_TOP_COEFFS} элементов:`}
                {team && ` (${team === 'home' ? 'только домашние' : 'только гостевые'})`}
                <span className="text-gray-600 ml-1">(показано {topCoefficients.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {topCoefficients.map((stat) => {
                    //coefficient already formatted
                    const formattedStatCoeff = stat.coefficient.toFixed(2);
                    return (
                        <CoeffButton
                            key={`${stat.coefficient}_${stat.team}`}
                            stat={stat}
                            isSelected={
                                coefficient && formattedStatCoeff === coefficient && (!team || stat.team === team)
                            }
                            onClick={() => {
                                handleCoeffSelect(stat.coefficient.toString());
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
