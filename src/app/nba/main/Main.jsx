import './styles.css'; // ← импортируем локальный CSS

// app/nba/main/page.js
import { Suspense } from 'react';
import FilterClient from './FilterClient';
import { fetchAllStats } from './actions/stats';

export default async function Page() {
    const [preAllCoefficientStats, preTeamCoefficientStats] = await fetchAllStats();

    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <FilterClient
                preAllCoefficientStats={preAllCoefficientStats}
                preTeamCoefficientStats={preTeamCoefficientStats}
            />
        </Suspense>
    );
}
