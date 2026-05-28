'use client';
import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';
import { fetchStats } from './actions/stats';
/*const samplingReducer = (state, action) => {
    switch (action) {
        case 'even':
            return { sampling: state.sampling.filter((el) => el % 2 === 0) };
        case 'odd':
            return { sampling: state.sampling.filter((el) => el % 2 === 1) };
        default:
            return state;
    }
};*/
// store/index.js
const useSampling = create()(
    devtools((set) => ({
        sampling: [1],
        stateAllCoefficientStats: [],
        stateTeamCoefficientStats: {},
        stateInitialItems: [], // 👈 null вместо []
        isLoading: true,
        initialized: false,

        // Один метод для инициализации всеми данными сразу
        initializeStore: async () => {
            const [stateInitialItems, stateTeamCoefficientStats, stateAllCoefficientStats] = await fetchStats();
            set({
                stateAllCoefficientStats,
                stateTeamCoefficientStats,
                stateInitialItems,
                isLoading: false,
                initialized: true
            });
        },

        // Отдельные сеттеры (если нужны)
        setAllCoefficientStats: (stats) => set({ stateAllCoefficientStats: stats }),
        setTeamCoefficientStats: (stats) => set({ stateTeamCoefficientStats: stats }),
        setInitialItems: (items) => set({ stateInitialItems: items })
    }))
);
export { useSampling };
