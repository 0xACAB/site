import FilterClient from './FilterClient';
import { fetchStats } from './actions/stats';

export default async function Page() {
    const props = { searchParams: { coefficient: 5.15 } };
    const [initialItems, allCoefficientStats, teamCoefficientStats] = await fetchStats(props);
    return (
        <FilterClient
            preInitialItems={initialItems}
            preAllCoefficientStats={allCoefficientStats}
            preTeamCoefficientStats={teamCoefficientStats}
        />
    );
}
