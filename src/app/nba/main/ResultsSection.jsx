'use client';
import { useMemo } from 'react';
import { useSampling } from './states';

const formatWinner = (winner) => (winner === 'home' ? '🏠 Хозяева' : winner === 'away' ? '✈️ Гости' : 'Не определен');

const getWinnerColor = (winner) =>
    winner === 'home' ? 'text-blue-600' : winner === 'away' ? 'text-orange-600' : 'text-gray-600';

export default function ResultsSection({ filteredItems, onClearFilter }) {
    const { allCoefficientStats, teamCoefficientStats, coefficient, team } = useSampling();
    const coefficientStats = useMemo(() => {
        if (!team) {
            return allCoefficientStats
                .filter((stat) => stat.totalCount >= 4 && stat.coefficient >= 1.5)
                .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
                .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient);
        }

        let stats = Object.values(teamCoefficientStats);
        stats = stats.filter((stat) => stat.team === team);

        return stats
            .filter((stat) => stat.totalCount >= 4 && stat.coefficient >= 1.5)
            .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
            .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient);
    }, [teamCoefficientStats, allCoefficientStats, team]);
    if (filteredItems.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-500 text-lg mb-2">
                    {coefficient ? `Нет событий с коэффициентом ${coefficient}` : 'Нет данных для отображения'}
                </div>
                {coefficient && (
                    <button
                        onClick={onClearFilter}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Показать все события
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="mb-6 p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {coefficient
                        ? `События с коэффициентом ${coefficient} (${filteredItems.length})`
                        : `Все события (${filteredItems.length})`}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                    <EventCard
                        key={item.eventId}
                        item={item}
                        coefficient={coefficient}
                        coefficientStats={coefficientStats}
                        formatWinner={formatWinner}
                        getWinnerColor={getWinnerColor}
                    />
                ))}
            </div>
        </div>
    );
}

function EventCard({ item, coefficient, coefficientStats, formatWinner, getWinnerColor }) {
    const selectedNum = coefficient;
    const hascoefficient =
        coefficient &&
        item.realCoefficients?.some(
            (coeff) => coeff !== null && parseFloat(coeff).toFixed(2) === parseFloat(coefficient).toFixed(2)
        );
    const coeffStatsMap = useMemo(
        () => new Map(coefficientStats?.map((stat) => [stat.coefficient.toFixed(2), stat])),
        [coefficientStats]
    );
    const getCoeffStat = (coeff) => {
        if (coeff == null) return null;
        const num = Number(coeff);
        return isNaN(num) ? null : coeffStatsMap.get(num.toFixed(2));
    };

    const getCardColor = () => {
        if (!hascoefficient) return 'bg-white';

        const idx = item.realCoefficients?.findIndex((c) => {
            if (c == null) return false;
            const numC = Number(c);
            const numSelected = Number(selectedNum);
            return !isNaN(numC) && numC.toFixed(2) === numSelected.toFixed(2);
        });

        const isWinner = idx !== -1 && ((item.winner === 'home' && idx === 0) || (item.winner === 'away' && idx === 1));

        return isWinner ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    };

    return (
        <div className={`p-4 border rounded-xl shadow-sm hover:shadow-md transition-shadow ${getCardColor()}`}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="text-sm text-gray-600 font-mono">{item.eventId}</div>
                    <div className={`text-lg font-medium mt-1 ${getWinnerColor(item.winner)}`}>
                        {formatWinner(item.winner)}
                    </div>
                </div>
                {hascoefficient && <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">✓</span>}
            </div>

            <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Коэффициенты:</div>
                {/* Реальные коэффициенты */}
                <div className="mb-3">
                    <div className="text-xs font-medium text-gray-500 mb-1">Real:</div>
                    <div className="flex gap-2">
                        {item.realCoefficients?.map((coeff, idx) => {
                            const isHome = idx === 0;
                            const isWinner =
                                (item.winner === 'home' && idx === 0) || (item.winner === 'away' && idx === 1);
                            const isSelected =
                                coefficient &&
                                coeff !== null &&
                                selectedNum !== null &&
                                (Number(coeff) || 0).toFixed(2) === (Number(selectedNum) || 0).toFixed(2);
                            const stat = getCoeffStat(coeff);

                            return (
                                <div
                                    key={idx}
                                    className={`flex-1 p-2 rounded-lg text-center ${
                                        isSelected
                                            ? 'bg-yellow-100 border-2 border-yellow-300'
                                            : isHome
                                              ? 'bg-blue-50 border'
                                              : 'bg-orange-50 border'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-xs text-gray-500">{isHome ? 'Дома' : 'Гости'}</div>
                                        {isWinner && <span className="text-xs text-green-600 font-medium">✓</span>}
                                    </div>
                                    <div
                                        className={`text-lg font-bold ${
                                            isSelected ? 'text-yellow-700' : 'text-gray-800'
                                        }`}
                                    >
                                        {(Number(coeff) || 0).toFixed(2)}
                                        {isSelected && ' ✓'}
                                    </div>
                                    {stat && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            {stat.winCount}/{stat.totalCount}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Flashscore коэффициенты */}
                {item.flashScoreCoefficients?.length > 0 && (
                    <div>
                        <div className="text-xs font-medium text-gray-400 mb-1">Flashscore:</div>
                        <div className="flex gap-1">
                            {item.flashScoreCoefficients?.map((coeff, idx) => {
                                const isHome = idx === 0;
                                const isWinner =
                                    (item.winner === 'home' && idx === 0) || (item.winner === 'away' && idx === 1);
                                const isSelected =
                                    coefficient &&
                                    coeff !== null &&
                                    selectedNum !== null &&
                                    (Number(coeff) || 0).toFixed(2) === (Number(selectedNum) || 0).toFixed(2);

                                return (
                                    <div
                                        key={idx}
                                        className={`flex-1 p-1 rounded text-center text-sm ${
                                            isSelected
                                                ? 'bg-yellow-100 border border-yellow-300'
                                                : 'bg-gray-100 border border-gray-200'
                                        }`}
                                        title={`Flashscore ${isHome ? 'Дома' : 'Гости'}: ${(Number(coeff) || 0).toFixed(
                                            2
                                        )}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-gray-500">{isHome ? 'Д' : 'Г'}</div>
                                            {isWinner && <span className="text-xs text-green-600">✓</span>}
                                        </div>
                                        <div
                                            className={`font-medium ${
                                                isSelected ? 'text-yellow-700' : 'text-gray-700'
                                            }`}
                                        >
                                            {(Number(coeff) || 0).toFixed(2)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {item.scheme && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Счет по четвертям:</div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="text-xs font-medium text-blue-600">Дома</div>
                            <div className="flex gap-1 mt-1">
                                {item.scheme.home
                                    ?.filter(Boolean)
                                    .slice(0, -1)
                                    .map((score, idx) => (
                                        <div key={idx} className="flex-1 text-center p-1 bg-white rounded text-sm">
                                            {score}
                                        </div>
                                    ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-center">
                                Итого: {item.scheme.home?.filter(Boolean).at(-1) || 0}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-orange-600">Гости</div>
                            <div className="flex gap-1 mt-1">
                                {item.scheme.away
                                    ?.filter(Boolean)
                                    .slice(0, -1)
                                    .map((score, idx) => (
                                        <div key={idx} className="flex-1 text-center p-1 bg-white rounded text-sm">
                                            {score}
                                        </div>
                                    ))}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-center">
                                Итого: {item.scheme.away?.filter(Boolean).at(-1) || 0}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {item.comment && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">{item.comment}</div>
                </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t">
                <div className="text-xs text-gray-500">
                    {item.createdAt && new Date(item.createdAt).toLocaleDateString('ru-RU')}
                </div>
                <div className="text-xs">
                    {item.winner === 'home' ? (
                        <span className="text-green-600">Победа хозяев</span>
                    ) : item.winner === 'away' ? (
                        <span className="text-red-600">Победа гостей</span>
                    ) : (
                        <span className="text-gray-500">Не определено</span>
                    )}
                </div>
            </div>
        </div>
    );
}
