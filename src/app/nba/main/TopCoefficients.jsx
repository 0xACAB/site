'use client';

import { MIN_ELEMS_IN_TOP_COEFFS, MIN_COEFF_IN_TOP_COEFFS } from './globals';

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

export default function TopCoefficients({ topCoefficients, selectedCoeff, selectedTeam, handleCoeffSelect }) {
    return (
        <div className="p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
                {`Самые часто выигрывающие коэффициенты начиная с ${MIN_COEFF_IN_TOP_COEFFS.toFixed(
                    2
                )} в выборках минимум из ${MIN_ELEMS_IN_TOP_COEFFS} элементов:`}
                {selectedTeam && ` (${selectedTeam === 'home' ? 'только домашние' : 'только гостевые'})`}
                <span className="text-gray-600 ml-1">(показано {topCoefficients.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {topCoefficients.map((stat) => {
                    return (
                        <CoeffButton
                            key={`${stat.coefficient}_${stat.team}`}
                            stat={stat}
                            isSelected={
                                selectedCoeff &&
                                stat.coefficient.toFixed(2) === parseFloat(selectedCoeff).toFixed(2) &&
                                (!selectedTeam || stat.team === selectedTeam)
                            }
                            onClick={() => {
                                //filterSampling();
                                handleCoeffSelect(stat.coefficient.toString());
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
