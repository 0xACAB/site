'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

const originalData = [
    { type: 'bet', value: 500, result: -500, coeff: 2.5, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 500, result: -500, coeff: 2.4, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 1000, result: 820, coeff: 1.82, capper: 'OrlovV.UN.L', book: 'WinLine' }
].map((valueData) => {
    if (valueData.type === 'freeBet') {
        valueData.coeff = valueData.coeff - 1;
    }
    return valueData;
});

//.filter(({ type, value }) => type === 'freeBet' && value>=500);
let bets = 0;
let freeBets = 0;
let bonuses = 0;
let forks = 0;
const cappersData = [
    { capperKey: 'all', color: 'black' },
    { capperKey: 'Bet-Men.SOC.L', color: 'tomato' },
    { capperKey: 'OrlovV.UN.L', color: '#2D7FF9' },
    { capperKey: 'Qualitypick.SOC.L', color: '#4CA515' }
];
const dataForPie = cappersData.filter(({ capperKey }) => capperKey !== 'all');
let turnOver = 0;
const dataForValue = cappersData.reduce((data, { capperKey }) => {
    const sampleArray = capperKey === 'all' ? originalData : originalData.filter(({ capper }) => capper === capperKey);
    data[capperKey] = [
        { x: 0, y: 0 },
        ...sampleArray.reduce((acc, { type, value, result, profit, coeff }, i) => {
            if (capperKey === 'all') {
                turnOver += value;
            }
            if (type === 'bet') bets++;
            if (type === 'freeBet') freeBets++;
            if (type === 'bonus') bonuses++;
            if (type === 'fork') forks++;
            let realValue = 0;
            if (type === 'freeBet') {
                realValue += profit;
            } else if (['bonus', 'fork'].includes(type)) {
                realValue += value;
            } else {
                realValue += result;
            }
            const summary = acc[i - 1] ? acc[i - 1].y + realValue : realValue;
            acc.push({
                x: i + 1,
                y: summary
            });
            return acc;
        }, [])
    ];
    return data;
}, {});

export default function Main({}) {
    const [originalDataState, setOriginalData] = useState();
    useEffect(() => {
        setOriginalData(() => {
            return originalData;
        });
        const socket = new WebSocket('wss://p1tt2.fsdatacentre.com:443/WebSocketConnection-Secure');
        socket.onopen = (t) => {
            console.log(t);
            socket.send('\x01\x01\x1E\x05\b\x1E#PushClient WebSocket Client v5.1.3\x1E$\x01\x1E-\x02\x1E\x7F');
        };
        socket.onmessage = (t) => {
            console.log(t.data);
        };
        socket.onerror = (t) => {
            console.log(t);
        };
    }, []);
    return (
        originalDataState && (
            <div className="flex flex-col w-full justify-between items-center">
                <header className="flex flex-col w-full items-center">Bet-hub</header>

                <main className="flex flex-col w-1/2 items-center">
                    <article className="flex flex-col items-center">
                        <div>
                            <VictoryChart theme={VictoryTheme.clean}>
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
                            </VictoryChart>
                            <VictoryPie
                                innerRadius={50}
                                padAngle={0}
                                data={dataForPie.map(({ capperKey, value }) => ({
                                    x: `${capperKey}: ${dataForValue[capperKey].length}`,
                                    y: dataForValue[capperKey].length
                                }))}
                                colorScale={dataForPie.map(({ color }) => color)}
                                labels
                                labelIndicator
                                theme={VictoryTheme.clean}
                            />
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Итого ставок, фрибетов, бонусов и вилок:
                                <span className="font-bold"> {originalData.length}</span>
                            </span>
                        </div>
                        <div>
                            Оборот:
                            <span className="font-bold"> {turnOver}</span>
                        </div>
                    </article>
                </main>
            </div>
        )
    );
}
