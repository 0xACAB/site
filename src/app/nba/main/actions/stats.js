'use server';
import { connectToDatabase } from '@/lib/mongodb';
//TODO сделать чтобы normalizeCoeff было не нужно
function normalizeCoeff(coeff) {
    if (coeff == null) return null;
    const num = typeof coeff === 'string' ? parseFloat(coeff) : coeff;
    return isNaN(num) ? null : parseFloat(num.toFixed(2));
}
export async function fetchStats() {
    const { db } = await connectToDatabase();
    const items = await db
        .collection('nba')
        .find({
            realCoefficients: {
                $exists: true,
                $ne: null
            }
        })
        .sort({ createdAt: -1 })
        .toArray();

    const initialItems = items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        createdAt: item.createdAt ? item.createdAt.toISOString() : null,
        realCoefficients: item.realCoefficients || [],
        flashScoreCoefficients: item.flashScoreCoefficients || []
    }));

    // 1. ОБЩАЯ статистика (для селекта)
    const generalCoefficientStats = initialItems.reduce((stats, item) => {
        item.realCoefficients?.forEach((coeff, idx) => {
            const normC = normalizeCoeff(coeff);
            if (!normC) return;

            const key = normC.toFixed(2);
            if (!stats[key]) {
                stats[key] = { coefficient: normC, totalCount: 0, winCount: 0 };
            }
            stats[key].totalCount++;

            if ((item.winner === 'home' && idx === 0) || (item.winner === 'away' && idx === 1)) {
                stats[key].winCount++;
            }
        });
        return stats;
    }, {});

    // 2. Статистика ПО КОМАНДАМ (для topCoefficients)
    const teamCoefficientStats = initialItems.reduce((stats, item) => {
        item.realCoefficients?.forEach((coeff, idx) => {
            const normC = normalizeCoeff(coeff);
            if (!normC) return;

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
    return [initialItems, Object.values(generalCoefficientStats), teamCoefficientStats];
}
