'use client';
import './styles.css';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useBear = create()(
    devtools(
        (set) => ({
            bears: 0,
            increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            removeAllBears: () => set({ bears: 0 }),
            updateBears: (newBears) => set({ bears: newBears })
        }),
        { name: 'BearStore' } // 👈 добавьте имя для DevTools)
    )
);
function BearCounter() {
    const bears = useBear((state) => state.bears);
    return <h1>{bears} bears around here...</h1>;
}

function Controls() {
    const increasePopulation = useBear((state) => state.increasePopulation);
    return (
        <button className="" onClick={increasePopulation}>
            one up
        </button>
    );
}

export default function Main() {
    return (
        <div className="flex flex-col w-full justify-between items-center">
            <header className="flex flex-col w-full divide-x-2">
                <div className="flex flex-col w-full items-center">
                    <span>div in header</span>
                </div>
            </header>

            <main className="w-1/2">
                <article>
                    <BearCounter />
                    <Controls />
                </article>
                <article>Article2</article>
            </main>
        </div>
    );
}
