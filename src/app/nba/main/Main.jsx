import FilterClient from './FilterClient';
import { fetchAllStats } from './actions/stats';

export default async function Page({ searchParams }) {
    // ← получаем searchParams из URL
    const [preAllCoefficientStats, preTeamCoefficientStats] = await fetchAllStats();

    // (опционально) можно сразу передать начальные коэффициент и команду,
    // но они уже будут прочитаны из URL в клиентском компоненте через useSearchParams

    return (
        <FilterClient
            preAllCoefficientStats={preAllCoefficientStats}
            preTeamCoefficientStats={preTeamCoefficientStats}
        />
    );
}
