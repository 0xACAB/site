'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export default function Main({ mobile }) {
    const mainCanvasRef = useRef(null);
    useEffect(() => {
        const mainCanvas = mainCanvasRef.current;
        const labels = Array(20)
            .fill(null)
            .map((_, index) => index);
        new Chart(mainCanvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Random Dataset',
                        data: labels.map(() => randomInteger(0, 9)),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }
                ]
            }
        });
    }, []);
    return (
        <div className="flex flex-col w-full justify-between items-center">
            <header className="flex flex-col w-full items-center">
                <a href="https://www.chartjs.org">Chart.js</a>
            </header>
            <main className="flex flex-col w-1/2 items-center">
                <article className="flex flex-col items-center">
                    <canvas id="canvas" style={{ width: '50vh', height: '50vh' }} ref={mainCanvasRef}></canvas>
                </article>
            </main>
        </div>
    );
}
