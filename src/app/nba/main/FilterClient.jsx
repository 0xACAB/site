'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSampling } from './states';
import TopCoefficients from './TopCoefficients';
import ResultsSection from './ResultsSection';
import FilterPanel from './FilterPanel';
import { fetchAllStats } from './actions/stats';

export default function FilterClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);

    const { items, loading, coefficient, team, initializeStore, setCoefficient, setTeam, loadItems } = useSampling();

    useEffect(() => {
        //Это нужно для фикса ошибки гидратации
        /*
            Что произошло:

            До исправления:
                Сервер: рендерил полный компонент с coefficient: null, team: null, items: []
                Клиент: рендерил полный компонент с coefficient: 1.90, team: null, items: 5
                Результат: ошибка гидратации (не совпадают coefficient и items)

            После исправления:
                Сервер: рендерит заглушку (Loading...)
                Клиент: рендерит полный компонент
                Результат: ✅ Ошибки нет

            Почему так происходит:
                Проблема в том, что на сервере searchParams не имеет значений из URL, поэтому:
                coefficient остается null (не инициализируется из URL)
                items пустой (нет данных)
                А на клиенте все эти значения появляются
        */
        setIsClient(true);
    }, []);

    // Инициализация статики (один раз)
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                initializeStore(...(await fetchAllStats()));
                console.log('fetched pre data');
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        }

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [initializeStore]);

    // Синхронизация стора с URL (только на клиенте)
    useEffect(() => {
        if (!isClient) return;

        const urlCoeff = searchParams.get('coefficient');
        const urlTeam = searchParams.get('team');
        if (urlCoeff && urlCoeff !== coefficient) setCoefficient(Number(urlCoeff).toFixed(2));
        if (urlTeam && urlTeam !== team) setTeam(urlTeam);
        if (!urlCoeff && coefficient) setCoefficient(null);
        if (!urlTeam && team) setTeam(null);
    }, [searchParams, coefficient, team, setCoefficient, setTeam, isClient]);

    // Загрузка матчей при изменении фильтров
    useEffect(() => {
        if (coefficient !== undefined) {
            // если стор уже инициализирован (хотя бы null)
            loadItems();
        }
    }, [coefficient, team, loadItems]);

    const handleCoeffSelect = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('coefficient', value);
        } else {
            params.delete('coefficient');
        }
        router.push(`/nba/main?${params.toString()}`);
    };

    const handleTeamSelect = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('team', value);
        } else {
            params.delete('team');
        }
        router.push(`/nba/main?${params.toString()}`);
    };

    // На сервере показываем заглушку, на клиенте - полный компонент
    if (!isClient) {
        return (
            <div className="scrollbar-aware-container">
                <div className="p-4 max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-center">Фильтр коэффициентов NBA</h1>
                    <div>Загрузка...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="scrollbar-aware-container">
            <div className="p-4 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">Фильтр коэффициентов NBA</h1>

                <FilterPanel
                    router={router}
                    filteredItems={items}
                    handleCoeffSelect={handleCoeffSelect}
                    handleTeamSelect={handleTeamSelect}
                />

                <TopCoefficients handleCoeffSelect={handleCoeffSelect} />

                <ResultsSection filteredItems={items} loading={loading} />
            </div>
        </div>
    );
}
