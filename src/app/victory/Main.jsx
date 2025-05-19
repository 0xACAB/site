'use client';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

const data = [
    { type: 'bet', value: 60, result: 27.88, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 125, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 215, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 157, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 275, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: 210, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 150, result: -150, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 500, result: 474.7, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 1380, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 750, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 820, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 870, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 1850, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },

    { type: 'freeBet', value: 50, profit: 290, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 138, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 50, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 100, profit: 142, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 100, profit: 135, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 150, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 200, profit: 364, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },

    { type: 'fork', value: 360 },

    { type: 'bet', value: 3000, result: -3000, coeffs: [1.9, 1.9] },
    { type: 'bonus', value: 300 },

    //here after creation this doc
    { type: 'bet', value: 100, result: 135, coeffs: [1.87, 1.87] }, //Кэфы забыл записать
    { type: 'bet', value: 100, result: -100, coeffs: [4.4, 2.03, 3.0] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.9, 1.9] },

    { type: 'freeBet', value: 100, profit: 0, coeffs: [3.4, 3.47, 2.25] },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [3.4, 3.47, 2.25] },

    //Кэфы забыл записать. Ставил с кефом 3.15, второй не помню
    { type: 'bet', value: 2000, result: 4300, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [4.2, 1.19] },

    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.6, 2.25] },
    { type: 'freeBet', value: 2000, profit: 0, coeffs: [1.7, 2.08] }
].map((valueData) => {
    if (valueData.type === 'freeBet') {
        valueData.coeffs = valueData.coeffs.map((coef) => coef - 1);
    }
    return valueData;
});
let summaryValue = 0;
let summaryEV = 0;
const dataForEV = [{ x: 0, y: 0 }];
let bets = 0;
let freeBets = 0;
let bonuses = 0;
let forks = 0;
const dataForValue = [
    { x: 0, y: 0 },
    ...data.map(({ type, value, result, profit, coeffs }, i) => {
        if (type === 'bet') bets++;
        if (type === 'freeBet') freeBets++;
        if (type === 'bonus') bonuses++;
        if (type === 'fork') forks++;
        let margin;
        let equity;
        if (['bonus', 'fork'].includes(type)) {
            equity = 1;
        } else {
            let betEquity;
            if (coeffs.length === 2) {
                betEquity = (coeffs[0] * coeffs[1]) / (coeffs[0] + coeffs[1]);
            } else if (coeffs.length === 3) {
                betEquity =
                    (coeffs[0] * coeffs[1] * coeffs[2]) /
                    (coeffs[1] * coeffs[2] + coeffs[0] * coeffs[2] + coeffs[0] * coeffs[1]);
            } else throw 'wtf?!';

            if (type === 'bet') {
                margin = 1 - betEquity;
                equity = -margin;
            } else if (type === 'freeBet') {
                equity = betEquity;
            } else throw 'wtf?!';
        }
        const ev = value * equity;
        summaryEV += ev;
        dataForEV.push({
            x: i + 1,
            y: summaryEV
        });

        if (type === 'freeBet') {
            summaryValue += profit;
        } else if (['bonus', 'fork'].includes(type)) {
            summaryValue += value;
        } else {
            summaryValue += result;
        }
        return {
            x: i + 1,
            y: summaryValue
        };
    })
];

export default function Main() {
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
        setDomLoaded(true);
    }, []);
    return (
        <div className="flex flex-col w-full justify-between items-center">
            <header className="flex flex-col w-full items-center">
                <a href="https://nearform.com/open-source/victory/">Victory</a>
            </header>

            <main className="flex flex-col w-1/2 items-center">
                <article className="flex flex-col items-center">
                    {domLoaded /*for Math.random*/ && (
                        <div>
                            <VictoryChart theme={VictoryTheme.clean}>
                                <VictoryAxis dependentAxis />
                                <VictoryAxis />
                                <VictoryLine
                                    data={dataForValue}
                                    style={{
                                        data: {
                                            stroke: '#4CA515'
                                        }
                                    }}
                                    labels={({ datum }) => {
                                        return datum.x === dataForValue.length - 1 ? summaryValue.toFixed(2) : null;
                                    }}
                                />
                                <VictoryScatter
                                    data={dataForValue}
                                    size={2}
                                    style={{
                                        data: { fill: '#4CA515' }
                                    }}
                                />

                                <VictoryLine
                                    data={dataForEV}
                                    style={{
                                        data: {
                                            stroke: '#A36209'
                                        }
                                    }}
                                    labels={({ datum }) => {
                                        return datum.x === dataForEV.length - 1 ? summaryEV.toFixed(2) : null;
                                    }}
                                />
                                <VictoryScatter
                                    data={dataForEV}
                                    size={2}
                                    style={{
                                        data: { fill: '#A36209' }
                                    }}
                                />
                            </VictoryChart>

                            <VictoryPie
                                innerRadius={50}
                                padAngle={0}
                                data={[
                                    { x: 'Cats', y: freeBets },
                                    { x: 'Birds', y: bonuses },
                                    { x: 'Dogs', y: bets },
                                    { x: 'Rabbits', y: forks }
                                ]}
                                labels
                                labelIndicator
                                theme={VictoryTheme.clean}
                            />
                        </div>
                    )}
                </article>
            </main>
        </div>
    );
}
