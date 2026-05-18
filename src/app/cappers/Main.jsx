'use server';
import './styles.css';
//import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
//import { useState, useEffect } from 'react';

import ArtemovBig from './results/ArtemovBig';
import CherkasovBig from './results/CherkasovBig';
import DaniilBig from './results/DaniilBig';
import ClaudioBig from './results/ClaudioBig';
import OblepihaBig from './results/OblepihaBig';
import LogachevBig from './results/LogachevBig';
import Kicha from './results/Kicha';
import HockeyFather from './results/HockeyFather';
import Graph from './Graph';

let summary = {
    bets: 0,
    result: { original: 0, real: 0 },
    realWinRUR: 0,
    afterPays: 0
};
const originalData = [
    {
        name: 'Дмитрий Артёмов Биги',
        coeffs: ArtemovBig
    },
    {
        name: 'Сергей Черкасов Биги',
        coeffs: CherkasovBig
    },
    {
        name: 'Даниил Биги',
        coeffs: DaniilBig
    },
    {
        name: 'Клаудио Биг',
        coeffs: ClaudioBig
    },
    {
        name: 'Роман Облепихин Биг',
        coeffs: OblepihaBig
    },
    {
        name: 'Хоккейный Батя Биг',
        coeffs: HockeyFather
    },
    {
        name: 'Kicha Углы Смолл',
        coeffs: Kicha
    },
    {
        name: 'Михаил Логачёв Биги',
        coeffs: LogachevBig
    }
].map((data) => {
    data.maxdrawdown = data.coeffs.reduce(
        (acc, { original, real, result }) => {
            if (result === 'lose') {
                acc.currentValue.original -= 1;
                acc.currentValue.real -= 1;
                acc.finalValue.original = Math.min(acc.finalValue.original, acc.currentValue.original);
                acc.finalValue.real = Math.min(acc.finalValue.real, acc.currentValue.real);
            } else {
                if (result === 'win') {
                    //acc.currentValue += original - 1;
                    acc.currentValue.original = Math.min(0, acc.currentValue.original + (original - 1));
                    acc.currentValue.real = Math.min(0, acc.currentValue.real + (real - 1));
                    acc.finalValue.original = Math.min(acc.finalValue.original, acc.currentValue.original);
                    acc.finalValue.real = Math.min(acc.finalValue.real, acc.currentValue.real);
                } else {
                    //result='return'
                    acc.currentValue.original += 0;
                    acc.currentValue.real += 0;
                    acc.finalValue.original += 0;
                    acc.finalValue.real += 0;
                }
            }
            return acc;
        },
        {
            currentValue: { original: 0, real: 0 },
            finalValue: { original: 0, real: 0 }
        }
    ).finalValue;
    const result = data.coeffs.reduce(
        (acc, { original, real, result, betSumRUR, afterPayRUR }) => {
            acc.summaryBetsRUR += betSumRUR;

            if (result === 'lose') {
                acc.original -= 1;
                acc.real -= 1;
                acc.realWinRUR -= betSumRUR;
            } else {
                if (result === 'win') {
                    acc.original += original - 1;
                    acc.real += real - 1;
                    acc.realWinRUR += betSumRUR * (real - 1);
                    if (afterPayRUR) {
                        acc.realWinRUR -= afterPayRUR;
                        acc.afterPays += afterPayRUR;
                    }
                } else {
                    //result='return'
                    acc.original += 0;
                    acc.real += 0;
                    acc.realWinRUR += 0;
                }
            }

            return acc;
        },
        { original: 0, real: 0, realWinRUR: 0, afterPays: 0, summaryBetsRUR: 0 }
    );
    result.originalROI = (result.original / data.coeffs.length) * 100;
    result.realROI = (result.real / data.coeffs.length) * 100;
    result.ROI = (result.realWinRUR / result.summaryBetsRUR) * 100;

    if (data.name === 'Клаудио Биг') {
        //console.log(result.realWinRUR);
        //console.log(result.summaryBetsRUR);
    }
    data.result = result;
    if (data.name !== 'Михаил Логачёв Биги') {
        summary.bets += data.coeffs.length;
        summary.result.original += result.original;
        summary.result.real += result.real;
        summary.realWinRUR += result.realWinRUR;
        summary.afterPays += result.afterPays;
    }
    return data;
});

export default async function Main({}) {
    /*const [originalDataState, setOriginalData] = useState();
    useEffect(() => {
        setOriginalData(() => {
            return originalData;
        });
    }, []); /!*${originalData.length + 1 + ``}*!/*/
    //${originalData.length + 1} не работает, так как tailwind глючное говно так не умеет
    const className = `grid grid-cols-9 w-full gap-4`;
    return (
        /*originalDataState && */ <div className="flex flex-col w-full justify-between items-center">
            <header className="flex flex-col w-full items-center">Стата по капперам</header>

            <main className="flex flex-col w-full items-center">
                <article className="flex flex-col items-center">
                    <div className={className}>
                        {[
                            <div key={'chanel'} className="flex flex-col items-center justify-self-center self-center">
                                <div>Канал:</div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    <div>{data.name}</div>
                                </div>
                            ))
                        ]}

                        {[
                            <div key={'value'} className="flex flex-col items-center justify-self-center self-center">
                                <div>Средний оригинальный кеф:</div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    {(
                                        data.coeffs.reduce((acc, cur) => {
                                            return acc + cur.original;
                                        }, 0) / data.coeffs.length
                                    ).toFixed(2)}
                                </div>
                            ))
                        ]}
                        {[
                            <div key={'value'} className="flex flex-row justify-self-stretch self-center">
                                <div className="w-1/2 flex flex-col place-items-center">Максимальная просадка:</div>
                                <div className="w-1/2 flex flex-col place-items-center justify-self-center self-center">
                                    <div className="text-xs">Оригинальная:</div>
                                    <div className="text-xs">Реальная:</div>
                                </div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    <div>{data.maxdrawdown.original.toFixed(2)}</div>
                                    <div>{data.maxdrawdown.real.toFixed(2)}</div>
                                </div>
                            ))
                        ]}

                        {[
                            <div key={'value'} className="flex flex-row justify-self-stretch self-center">
                                <div className="w-1/2 flex flex-col place-items-center">Результат:</div>
                                <div className="w-1/2 flex flex-col place-items-center justify-self-center self-center">
                                    <div className="text-xs">Оригинальный:</div>
                                    <div className="text-xs">Реальный:</div>
                                </div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    <div>{data.result.original.toFixed(2)}</div>
                                    <div>{data.result.real.toFixed(2)}</div>
                                </div>
                            ))
                        ]}
                        {[
                            <div key={'value'} className="flex flex-col items-center justify-self-center self-center">
                                <div>Всего ставок:</div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    {data.coeffs.length}
                                </div>
                            ))
                        ]}
                        {[
                            <div key={'value'} className="flex flex-col items-center justify-self-center self-center">
                                <div>Результат в рублях:</div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    {data.result.realWinRUR.toFixed(2)}
                                </div>
                            ))
                        ]}

                        {[
                            <div key={'value'} className="flex flex-row justify-self-stretch self-center">
                                <div className="w-1/2 flex flex-col place-items-center">% ROI:</div>
                                <div className="w-1/2 flex flex-col place-items-center">
                                    <div className="text-xs">Оригинальный:</div>
                                    <div className="text-xs">Реальный:</div>
                                </div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    <div>{data.result.originalROI.toFixed(2)}</div>
                                    <div>{data.result.realROI.toFixed(2)}</div>
                                </div>
                            ))
                        ]}
                        {[
                            <div key={'value'} className="flex flex-col items-center justify-self-center self-center">
                                <div>% ROI в рублях:</div>
                            </div>,
                            ...originalData.map((data) => (
                                <div
                                    key={data.name}
                                    className="flex flex-col items-center justify-self-center self-center"
                                >
                                    {data.result.ROI.toFixed(2)}
                                </div>
                            ))
                        ]}
                        {[
                            <div key={'value'} className="flex flex-col items-center justify-self-center self-center">
                                <div>График:</div>
                            </div>,
                            ...originalData.map((data) => (
                                <div key={data.name}>
                                    <Graph data={data} />
                                </div>
                            ))
                        ]}
                    </div>

                    <div>
                        <span className="tracking-tight text-border">
                            Итого ставок:
                            <span className="font-bold"> {summary.bets}</span>
                        </span>
                    </div>
                    <div>
                        <span className="tracking-tight text-border">
                            Итого оригинальный результат в флэтах:
                            <span className="font-bold"> {summary.result.original.toFixed(2)}</span>
                        </span>
                    </div>
                    <div>
                        <span className="tracking-tight text-border">
                            Итого реальный результат в флэтах:
                            <span className="font-bold"> {summary.result.real.toFixed(2)}</span>
                        </span>
                    </div>
                    <div>
                        <span className="tracking-tight text-border">
                            Итого реальный результат в рублях(с уже вычтенными постоплатами):
                            <span className="font-bold"> {summary.realWinRUR.toFixed(2)}</span>
                        </span>
                    </div>
                    <div>
                        <span className="tracking-tight text-border">
                            Итого постоплат на:
                            <span className="font-bold"> {summary.afterPays.toFixed(2)}</span>
                        </span>
                    </div>
                </article>
            </main>
        </div>
    );
}
