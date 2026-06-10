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
    // убираем setCoefficient из деструктуризации, он не нужен
    const { initialized, allCoefficientStats, teamCoefficientStats, coefficient, team } = useSampling();

    const topCoefficients = useMemo(() => {
        if (!initialized) return [];
        if (!team) {
            return allCoefficientStats
                .filter(
                    (stat) => stat.totalCount >= MIN_ELEMS_IN_TOP_COEFFS && stat.coefficient >= MIN_COEFF_IN_TOP_COEFFS
                )
                .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
                .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient)
                .slice(0, TOP_COEFFS_LIMIT);
        }
        const stats = Object.values(teamCoefficientStats);
        return stats
            .filter(
                (stat) =>
                    stat.team === team &&
                    stat.totalCount >= MIN_ELEMS_IN_TOP_COEFFS &&
                    stat.coefficient >= MIN_COEFF_IN_TOP_COEFFS
            )
            .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
            .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient)
            .slice(0, TOP_COEFFS_LIMIT);
    }, [initialized, allCoefficientStats, teamCoefficientStats, team]);

    return (
        <div className="p-4">
            {/* ... */}
            <div className="flex flex-wrap gap-2">
                {topCoefficients.map((stat) => (
                    <CoeffButton
                        key={`${stat.coefficient}_${stat.team}`}
                        stat={stat}
                        isSelected={
                            coefficient && stat.coefficient.toFixed(2) === coefficient && (!team || stat.team === team)
                        }
                        onClick={() => handleCoeffSelect(stat.coefficient.toString())}
                    />
                ))}
            </div>
        </div>
    );
}
