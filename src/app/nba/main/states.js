'use client';
import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { fetchStats } from './actions/stats';

const samplingReducer = (state, action) => {
    switch (action) {
        case 'even':
            return { sampling: state.sampling.filter((el) => el % 2 === 0) };
        case 'odd':
            return { sampling: state.sampling.filter((el) => el % 2 === 1) };
        default:
            return state;
    }
};

const filteringReducer = (state, action) => {
    switch (action.type) {
        case 'coefficient':
            const coefficient = action.payload;
            return {
                ...state,
                testFilteredItems: state.initialItems.filter((item) => {
                    const hasCoeff = item.realCoefficients?.some((c) => {
                        const num = Number(c);
                        return !isNaN(num) && num.toFixed(2) === coefficient;
                    });
                    if (!hasCoeff) return false;
                })
            };
        case 'team':
            const team = action.payload;
            return {
                testFilteredItems: state.initialItems.filter((item) => {
                    if (team === 'home') {
                        const homeCoeff = Number(item.realCoefficients?.[0]);
                        return !isNaN(homeCoeff);
                    }
                    if (team === 'away') {
                        const awayCoeff = Number(item.realCoefficients?.[1]);
                        return !isNaN(awayCoeff);
                    }
                })
            };
        default:
            return state;
    }
};
// store/index.js
const useSampling = create()(
    devtools((set) => ({
        coefficient: undefined,
        team: undefined,

        initialItems: [],
        allCoefficientStats: [],
        teamCoefficientStats: {},

        isLoading: true,
        initialized: false,

        testFilteredItems: [],

        // Один метод для инициализации всеми данными сразу
        initializeStore: async () => {
            const [initialItems, allCoefficientStats, teamCoefficientStats] = await fetchStats();
            set({
                initialItems,
                allCoefficientStats,
                teamCoefficientStats,
                isLoading: false,
                initialized: true
            });
        },

        setCoefficient: (coefficient) => set({ coefficient }),
        setTeam: (team) => set({ team }),

        filterSampling: () => set((state) => samplingReducer(state, 'odd')),
        filterCoefficient: (coefficient) =>
            set((state) => filteringReducer(state, { type: 'coefficient', payload: coefficient })),
        filterTeam: (team) => set((state) => filteringReducer(state, { type: 'team', payload: team }))
    }))
);
export { useSampling };
