'use server';
import './styles.css';
//import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
//import { useState, useEffect } from 'react';

import ArtemovBig from './results/ArtemovBig';
import CherkasovBig from './results/CherkasovBig';
import TsvetkoffBig from './results/TsvetkoffBig';
import DaniilBig from './results/DaniilBig';
import LogachevBig from './results/LogachevBig';

let summary = {
    bets: 0,
    result: { original: 0, real: 0 },
    realWinRUR: 0,
    afterPays: 0
};
const originalData = [
    {
        name: 'Дмитрий Артёмов Биги', //Лудоманская ошибка. От 100к наверное такое играется.
        coeffs: ArtemovBig
    },
    {
        name: 'Сергей Черкасов Биги',
        coeffs: CherkasovBig
    },
    {
        name: 'Цветков Биги',
        coeffs: TsvetkoffBig
    },
    {
        name: 'Даниил Биги',
        coeffs: DaniilBig
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
        { original: 0, real: 0, realWinRUR: 0, afterPays: 0 }
    );
    data.result = result;
    if (data.name !== 'Дмитрий Литовец') {
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
    const className = `grid grid-cols-6 w-full gap-4`;
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
                            <div
                                key={'maxdrawdown'}
                                className="w-4/5 flex flex-row items-center justify-self-center self-center"
                            >
                                <div className="items-center">Макс. просадка:</div>
                                <div className="flex flex-col items-center justify-self-center self-center">
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
                            <div
                                key={'value'}
                                className="w-4/5 flex flex-row items-center justify-self-center self-center"
                            >
                                <div>Результат:</div>
                                <div className="flex flex-col items-center justify-self-center self-center">
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
                                    {data.result.realWinRUR}
                                </div>
                            ))
                        ]}
                    </div>

                    <div>
                        {/*<VictoryChart theme={VictoryTheme.clean}>
                                <VictoryAxis dependentAxis />
                                <VictoryAxis />
                                {[
                                    ...cappersData.map(({ capperKey, color }) => {
                                        return (
                                            <VictoryLine
                                                data={dataForValue[capperKey]}
                                                style={{
                                                    data: {
                                                        stroke: () => {
                                                            return color;
                                                        }
                                                    }
                                                }}
                                                labels={({ datum }) => {
                                                    return datum.x === dataForValue[capperKey].length - 1
                                                        ? dataForValue[capperKey][
                                                              dataForValue[capperKey].length - 1
                                                          ].y.toFixed(2)
                                                        : null;
                                                }}
                                            />
                                        );
                                    }),
                                    ...cappersData.map(({ capperKey, color }) => {
                                        return (
                                            <VictoryScatter
                                                data={dataForValue[capperKey]}
                                                size={2}
                                                style={{
                                                    data: {
                                                        fill: ({ datum }) => {
                                                            return color;
                                                        }
                                                    }
                                                }}
                                            />
                                        );
                                    })
                                ]}
                            </VictoryChart>*/}
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
