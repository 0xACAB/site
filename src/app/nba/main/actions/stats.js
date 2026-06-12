'use server';
import { connectToDatabase } from '@/lib/mongodb';

export async function fetchAllStats() {
    const { db } = await connectToDatabase();
    const items = await db
        .collection('nba')
        .aggregate([
            {
                $match: {
                    //eventId: 'MH3FeAUP',
                    /*flashScoreCoefficients: {
                        $exists: true,
                        $ne: null
                    },*/
                    realCoefficients: {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            {
                $match: {
                    realCoefficients: {
                        $elemMatch: {
                            $type: 'string',
                            $regex: /^.{4,5}$/ // проверка длины через regex
                        }
                    }
                }
            }
        ])
        .sort({ createdAt: -1 })
        .toArray();

    const initialItems = items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        createdAt: item.createdAt ? item.createdAt.toISOString() : null
    }));

    // 1. ОБЩАЯ статистика (для селекта)
    const generalCoefficientStats = initialItems.reduce((stats, item) => {
        item.realCoefficients.forEach((coeff, index) => {
            const normC = Number(coeff);

            const key = normC.toFixed(2);
            if (!stats[key]) {
                stats[key] = { coefficient: normC, totalCount: 0, winCount: 0 };
            }
            stats[key].totalCount++;

            if ((item.winner === 'home' && index === 0) || (item.winner === 'away' && index === 1)) {
                stats[key].winCount++;
            }
        });
        return stats;
    }, {});

    // 2. Статистика ПО КОМАНДАМ (для topCoefficients)
    const preTeamCoefficientStats = initialItems.reduce((stats, item) => {
        item.realCoefficients.forEach((coeff, idx) => {
            const normC = Number(coeff);

            const teamType = idx === 0 ? 'home' : 'away';
            const teamKey = `${normC.toFixed(2)}_${teamType}`;

            if (!stats[teamKey]) {
                stats[teamKey] = {
                    coefficient: normC,
                    team: teamType,
                    totalCount: 0,
                    winCount: 0
                };
            }
            stats[teamKey].totalCount++;

            if ((item.winner === 'home' && idx === 0) || (item.winner === 'away' && idx === 1)) {
                stats[teamKey].winCount++;
            }
        });
        return stats;
    }, {});
    return [Object.values(generalCoefficientStats), preTeamCoefficientStats, initialItems.length];
}

export async function fetchStats(props) {
    const { coefficient, team } = (await props.searchParams) || {};
    let realCoefficientsMatch;
    if (team) {
        realCoefficientsMatch = `realCoefficients.${team === 'home' ? 0 : 1}`;
    } else {
        realCoefficientsMatch = 'realCoefficients';
    }
    const { db } = await connectToDatabase();
    //В realCoefficients всегда строки длины 4 или 5 "x.xx" или "xx.xx"
    const findElementsArray = coefficient ? [coefficient] : [];
    const items = await db
        .collection('nba')
        .aggregate([
            {
                $match: {
                    //eventId: 'MH3FeAUP',
                    flashScoreCoefficients: {
                        $exists: true,
                        $ne: null
                    },
                    [realCoefficientsMatch]: {
                        $exists: true,
                        $ne: null,
                        $in: findElementsArray
                    }
                }
            },
            {
                $match: {
                    realCoefficients: {
                        $elemMatch: {
                            $type: 'string',
                            $regex: /^.{4,5}$/ // проверка длины через regex
                        }
                    }
                }
            }
        ])
        .sort({ createdAt: -1 })
        .toArray();

    return items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        createdAt: item.createdAt ? item.createdAt.toISOString() : null
    }));
}
