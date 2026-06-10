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
    devtools((set, get) => ({
        // Состояния
        coefficient: null,
        team: null,
        items: [], // ← отфильтрованные матчи
        loading: false,
        allCoefficientStats: [],
        teamCoefficientStats: {},
        initialized: false,

        // Инициализация статической статистики (вызывается один раз)
        initializeStore: (preAllCoefficientStats, preTeamCoefficientStats) => {
            set({
                allCoefficientStats: preAllCoefficientStats,
                teamCoefficientStats: preTeamCoefficientStats,
                initialized: true
            });
        },

        setCoefficient: (coefficient) => {
            set({ coefficient });
        },

        setTeam: (team) => set({ team }),

        // Асинхронная загрузка матчей с сервера
        loadItems: async () => {
            const { coefficient, team } = get();
            set({ loading: true });
            try {
                // Подготовка параметров для серверного экшена
                const params = { searchParams: { coefficient, team } };
                const fetchedItems = await fetchStats(params);
                set({ items: fetchedItems, loading: false });
            } catch (error) {
                console.error('Failed to load items:', error);
                set({ items: [], loading: false });
            }
        },

        filterSampling: () => set((state) => samplingReducer(state, 'odd')),
        filterCoefficient: async (coefficient) =>
            set((state) => filteringReducer(state, { type: 'coefficient', payload: coefficient })),
        filterTeam: async (team) => set((state) => filteringReducer(state, { type: 'team', payload: team }))
    }))
);
export { useSampling };
