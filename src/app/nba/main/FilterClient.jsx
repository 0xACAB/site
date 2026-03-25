'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const MIN_ELEMS_IN_TOP_COEFFS = 3;
const TOP_COEFFS_LIMIT = 10;
const MIN_COEFF_IN_TOP_COEFFS = 1.5;

export default function FilterClient({
    initialItems,
    teamCoefficientStats, // статистика по командам с сервера
    allCoefficientStats, // общая статистика для селекта
    serverParams
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedCoeff = searchParams.get('coefficient') || serverParams?.coefficient || '';
    const selectedTeam = searchParams.get('team') || serverParams?.team || '';
    const topCoefficients = useMemo(() => {
        if (!teamCoefficientStats || !allCoefficientStats) return [];

        if (!selectedTeam) {
            return allCoefficientStats
                .filter(
                    (stat) => stat.totalCount >= MIN_ELEMS_IN_TOP_COEFFS && stat.coefficient >= MIN_COEFF_IN_TOP_COEFFS
                )
                .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
                .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient)
                .slice(0, TOP_COEFFS_LIMIT);
        }

        let stats = Object.values(teamCoefficientStats);
        stats = stats.filter((stat) => stat.team === selectedTeam);

        const filteredStats = stats
            .filter((stat) => stat.totalCount >= MIN_ELEMS_IN_TOP_COEFFS && stat.coefficient >= MIN_COEFF_IN_TOP_COEFFS)
            .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
            .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient);

        // Показываем до 10 или меньше, если столько нет
        return filteredStats.slice(0, Math.min(TOP_COEFFS_LIMIT, filteredStats.length));
    }, [teamCoefficientStats, allCoefficientStats, selectedTeam]);
    // То же самое для coefficientStats:
    const coefficientStats = useMemo(() => {
        if (!teamCoefficientStats || !allCoefficientStats) return [];

        if (!selectedTeam) {
            return allCoefficientStats
                .filter((stat) => stat.totalCount >= 4 && stat.coefficient >= 1.5)
                .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
                .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient);
        }

        let stats = Object.values(teamCoefficientStats);
        stats = stats.filter((stat) => stat.team === selectedTeam);

        return stats
            .filter((stat) => stat.totalCount >= 4 && stat.coefficient >= 1.5)
            .map((stat) => ({ ...stat, winRate: stat.winCount / stat.totalCount }))
            .sort((a, b) => b.winRate - a.winRate || b.coefficient - a.coefficient);
    }, [teamCoefficientStats, allCoefficientStats, selectedTeam]);
    const filteredItems = useMemo(() => {
        if (!selectedCoeff && !selectedTeam) return initialItems;

        const selectedNum = selectedCoeff ? parseFloat(selectedCoeff) : null;

        return initialItems.filter((item) => {
            if (selectedCoeff) {
                const hasCoeff = item.realCoefficients?.some((c) => {
                    const num = Number(c);
                    return !isNaN(num) && num.toFixed(2) === selectedNum.toFixed(2);
                });
                if (!hasCoeff) return false;
            }

            if (selectedTeam && selectedNum) {
                if (selectedTeam === 'home') {
                    const homeCoeff = Number(item.realCoefficients?.[0]);
                    return !isNaN(homeCoeff) && homeCoeff.toFixed(2) === selectedNum.toFixed(2);
                }
                if (selectedTeam === 'away') {
                    const awayCoeff = Number(item.realCoefficients?.[1]);
                    return !isNaN(awayCoeff) && awayCoeff.toFixed(2) === selectedNum.toFixed(2);
                }
            }

            return true;
        });
    }, [initialItems, selectedCoeff, selectedTeam]);

    const handleCoeffSelect = (value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set('coefficient', value);
        } else {
            params.delete('coefficient');
        }
        router.push(`/nba/main?${params.toString()}`);
    };

    const formatWinner = (winner) =>
        winner === 'home' ? '🏠 Хозяева' : winner === 'away' ? '✈️ Гости' : 'Не определен';

    const getWinnerColor = (winner) =>
        winner === 'home' ? 'text-blue-600' : winner === 'away' ? 'text-orange-600' : 'text-gray-600';

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Фильтр коэффициентов NBA</h1>

            <FilterPanel
                searchParams={searchParams}
                router={router}
                items={initialItems}
                filteredItems={filteredItems}
                topCoefficients={topCoefficients}
                selectedCoeff={selectedCoeff}
                selectedTeam={selectedTeam}
                allCoefficientStats={allCoefficientStats}
                onCoeffSelect={handleCoeffSelect}
            />

            <ResultsSection
                items={initialItems}
                filteredItems={filteredItems}
                selectedCoeff={selectedCoeff}
                coefficientStats={coefficientStats}
                formatWinner={formatWinner}
                getWinnerColor={getWinnerColor}
                onClearFilter={() => handleCoeffSelect('')}
            />
        </div>
    );
}

function FilterPanel({
    searchParams,
    router,
    items,
    filteredItems,
    topCoefficients,
    allCoefficientStats,
    selectedCoeff,
    selectedTeam,
    onCoeffSelect
}) {
    const uniqueCoeffs = useMemo(() => {
        const allCoeffs = items.flatMap((item) => item.realCoefficients || []);

        // Приводим к числам и фильтруем
        const numericCoeffs = allCoeffs
            .map((c) => Number(c))
            .filter((c) => {
                return !isNaN(c) && c > MIN_COEFF_IN_TOP_COEFFS;
            })
            .map((c) => parseFloat(c.toFixed(2))); // Нормализуем до 2 знаков

        // Убираем дубли
        return [...new Set(numericCoeffs)].sort((a, b) => a - b);
    }, [items]);

    const coeffMap = useMemo(
        () => new Map(allCoefficientStats?.map((stat) => [stat.coefficient.toFixed(2), stat])),
        [allCoefficientStats]
    );

    const handleTeamChange = (e) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            params.set('team', e.target.value);
        } else {
            params.delete('team');
        }
        router.push(`/nba/main?${params.toString()}`);
    };

    return (
        <div className="mb-8 p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Фильтр по коэффициенту:</label>
                    <div className="flex gap-2">
                        <select
                            value={selectedCoeff}
                            onChange={(e) => onCoeffSelect(e.target.value)}
                            className="flex-1 p-2 border rounded-lg"
                        >
                            <option value="">Все кэфы выборки</option>
                            {uniqueCoeffs.map((coeff) => {
                                const stat = coeffMap.get((Number(coeff) || 0).toFixed(2));
                                return (
                                    <option key={coeff} value={coeff}>
                                        {(Number(coeff) || 0).toFixed(2)}
                                        {stat && ` (${stat.winCount}/${stat.totalCount})`}
                                    </option>
                                );
                            })}
                        </select>
                        {selectedCoeff && (
                            <button
                                onClick={() => onCoeffSelect('')}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                                Сбросить
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Для команды:</label>
                    <select value={selectedTeam} onChange={handleTeamChange} className="w-full p-2 border rounded-lg">
                        <option value="">Любая команда</option>
                        <option value="home">Домашняя</option>
                        <option value="away">Гостевая</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <StatBox label="Всего записей" value={items.length} />
                    <StatBox
                        label="Показано"
                        value={filteredItems.length}
                        highlight={filteredItems.length < items.length}
                    />
                </div>
            </div>

            {topCoefficients.length > 0 && (
                <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                        {`Самые часто выигрывающие коэффициенты начиная с ${MIN_COEFF_IN_TOP_COEFFS.toFixed(
                            2
                        )} в выборках минимум из ${MIN_ELEMS_IN_TOP_COEFFS} элементов:`}
                        {selectedTeam && ` (${selectedTeam === 'home' ? 'только домашние' : 'только гостевые'})`}
                        <span className="text-gray-600 ml-1">(показано {topCoefficients.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {topCoefficients.map((stat) => (
                            <CoeffButton
                                key={`${stat.coefficient}_${stat.team}`}
                                stat={stat}
                                isSelected={
                                    selectedCoeff &&
                                    stat.coefficient.toFixed(2) === parseFloat(selectedCoeff).toFixed(2) &&
                                    (!selectedTeam || stat.team === selectedTeam)
                                }
                                onClick={() => onCoeffSelect(stat.coefficient.toString())}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

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

function StatBox({ label, value, highlight = false }) {
    return (
        <div className="text-center">
            <div className="text-sm text-gray-600">{label}</div>
            <div className={`text-2xl font-bold ${highlight ? 'text-blue-600' : ''}`}>{value}</div>
        </div>
    );
}

function ResultsSection({
    filteredItems,
    selectedCoeff,
    coefficientStats,
    formatWinner,
    getWinnerColor,
    onClearFilter
}) {
    if (filteredItems.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-500 text-lg mb-2">
                    {selectedCoeff ? `Нет событий с коэффициентом ${selectedCoeff}` : 'Нет данных для отображения'}
                </div>
                {selectedCoeff && (
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
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {selectedCoeff
                        ? `События с коэффициентом ${selectedCoeff} (${filteredItems.length})`
                        : `Все события (${filteredItems.length})`}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                    <EventCard
                        key={item.eventId}
                        item={item}
                        selectedCoeff={selectedCoeff}
                        coefficientStats={coefficientStats}
                        formatWinner={formatWinner}
                        getWinnerColor={getWinnerColor}
                    />
                ))}
            </div>
        </div>
    );
}

function EventCard({ item, selectedCoeff, coefficientStats, formatWinner, getWinnerColor }) {
    const selectedNum = selectedCoeff;
    const hasSelectedCoeff =
        selectedCoeff &&
        item.realCoefficients?.some(
            (coeff) => coeff !== null && parseFloat(coeff).toFixed(2) === parseFloat(selectedCoeff).toFixed(2)
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
        if (!hasSelectedCoeff) return 'bg-white';

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
                {hasSelectedCoeff && <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">✓</span>}
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
                                selectedCoeff &&
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
                                    selectedCoeff &&
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
