'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useSampling } from './states';

import TopCoefficients from './TopCoefficients';
import ResultsSection from './ResultsSection';
import FilterPanel from './FilterPanel';

export default function FilterClient({ preAllCoefficientStats, preTeamCoefficientStats }) {
    const router = useRouter();
    const {
        initialItems,
        allCoefficientStats,
        teamCoefficientStats,
        initializeStore,
        coefficient,
        team,
        setCoefficient
    } = useSampling();

    useEffect(() => {
        console.log('render');
        initializeStore(preAllCoefficientStats, preTeamCoefficientStats);
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

    const handleCoeffSelect = (value) => {
        const params = new URLSearchParams();
        if (value) {
            params.set('coefficient', value);
            setCoefficient(value);
        } else {
            params.delete('coefficient');
        }
        router.push(`/nba/main?${params.toString()}`);
    };
    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Фильтр коэффициентов NBA</h1>

            <FilterPanel router={router} filteredItems={filteredItems} handleCoeffSelect={handleCoeffSelect} />
            <TopCoefficients handleCoeffSelect={handleCoeffSelect} />
            <ResultsSection filteredItems={filteredItems} />
        </div>
    );
}
