import FilterClient from './FilterClient';
import { fetchStats, fetchAllStats } from './actions/stats';

export default async function Page() {
    const props = { searchParams: { coefficient: 1.59, team: undefined } };
    const [preAllCoefficientStats, preTeamCoefficientStats] = await fetchAllStats(props);
    return (
        <FilterClient
            preAllCoefficientStats={preAllCoefficientStats}
            preTeamCoefficientStats={preTeamCoefficientStats}
        />
    );
}
