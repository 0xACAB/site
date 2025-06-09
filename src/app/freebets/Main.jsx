'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

const originalData = [
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
    { type: 'bet', value: 100, result: 135, coeffs: [1.87, 1.87] },
    { type: 'bet', value: 100, result: -100, coeffs: [4.4, 2.03, 3.0] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [3.4, 3.47, 2.25] },
    { type: 'freeBet', value: 100, profit: 0, coeffs: [3.4, 3.47, 2.25] },
    { type: 'bet', value: 2000, result: 4300, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 100, result: -100, coeffs: [4.2, 1.19] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.25, 1.6] },
    { type: 'freeBet', value: 2000, profit: 0, coeffs: [2.08, 1.7] },
    { type: 'freeBet', value: 100, profit: 130, coeffs: [2.3, 1.62] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.26, 3.55, 3.35] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.87, 1.87] },
    { type: 'bet', value: 1000, result: 1840, coeffs: [2.85, 1.37] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.95, 1.75] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.71, 2.0] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.63, 2.13] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'fork', value: 300 },
    { type: 'bet', value: 1000, result: 800, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [4.6, 1.18] },
    { type: 'freeBet', value: 300, profit: 0, coeffs: [2.95, 1.4] },
    { type: 'bet', value: 100, result: -100, coeffs: [3.9, 18, 1.32] },
    { type: 'bet', value: 150, result: 102, coeffs: [1.87, 1.87] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.99, 1.73] },
    { type: 'freeBet', value: 500, profit: 550, coeffs: [2.1, 1.72] },
    { type: 'bet', value: 1000, result: 900, coeffs: [1.9, 1.9] },
    { type: 'bet', value: 1000, result: 980, coeffs: [1.98, 1.79] },
    { type: 'freeBet', value: 500, profit: 680, coeffs: [2.36, 1.59] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.71, 2.12] },
    { type: 'bet', value: 1000, result: 710, coeffs: [1.71, 2.12] },
    { type: 'freeBet', value: 1000, profit: 860, coeffs: [1.86, 4.3, 4.0] },
    { type: 'bet', value: 500, result: 445, coeffs: [1.89, 1.89] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [1.91, 1.9] },
    { type: 'freeBet', value: 500, profit: 605, coeffs: [2.21, 1.58] },
    { type: 'bet', value: 500, result: 455, coeffs: [1.91, 1.9] },
    { type: 'freeBet', value: 500, profit: 0, coeffs: [2.5, 1.56] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [1.9, 1.9] },
    { type: 'freeBet', value: 500, profit: 375, coeffs: [1.75, 2.04] },
    { type: 'bet', value: 500, result: -500, coeffs: [1.89, 1.91] },
    { type: 'bet', value: 1000, result: -1000, coeffs: [2.18, 4.36, 2.88] },
    { type: 'bet', value: 3000, result: -3000, coeffs: [1.94, 1.94] },
    { type: 'bet', value: 3000, result: 2820, coeffs: [1.94, 1.94] },
    //Ниже ставка где кеф был только один(3.0) на "мбаппе забьет" у олимпа
    { type: 'bet', value: 200, result: 400, coeffs: [1.9, 1.9], realCoeff: 3.0 },
    { type: 'freeBet', value: 500, profit: 465, coeffs: [1.93, 1.88] },
    { type: 'bet', value: 1500, result: -1500, coeffs: [2.06, 3.45, 3.65] },
    //Ниже фрибет Димы 3000, частью профита поделился, поэтому такой рассчет (2000 / 0.94)
    { type: 'freeBet', value: 2000 / 0.94, profit: 2000, coeffs: [1.94, 3.48, 4.51], outPay: 880 },
    { type: 'bet', value: 1000, result: 740, coeffs: [1.74, 2.1] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [1.71, 2.13] },
    { type: 'freeBet', value: 1000, profit: 0, coeffs: [3.95, 3.8, 1.99] },
    { type: 'bet', value: 3000, result: -3000, coeffs: [1.92, 1.88] },
    { type: 'bet', value: 3000, result: 2880, coeffs: [1.96, 1.93] },
    //Ниже ставка где кеф был только один(3.4) на "нико уильямс забьет" у олимпа
    { type: 'bet', value: 200, result: -200, coeffs: [1.9, 1.9], realCoeff: 3.4 },
    { type: 'bet', value: 500, result: 470, coeffs: [1.94, 1.87] },
    { type: 'bet', value: 1500, result: 1455, coeffs: [1.97, 1.84] },
    { type: 'bet', value: 2000, result: -2000, coeffs: [1.99, 1.81] },
    { type: 'freeBet', value: 500, profit: 480, coeffs: [1.96, 1.84] }
].map((valueData) => {
    if (valueData.type === 'freeBet') {
        valueData.coeffs = valueData.coeffs.map((coef) => coef - 1);
    }
    return valueData;
});

//.filter(({ type, value }) => type === 'freeBet' && value>=500);
let summaryValue = 0;
let summaryEV = 0;
let bets = 0;
let freeBets = 0;
let bonuses = 0;
let forks = 0;
const dataForEV = [{ x: 0, y: 0 }];
const dataForValue = [
    { x: 0, y: 0 },
    ...originalData.map(({ type, value, result, profit, coeffs }, i) => {
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
const desc = [
    { name: 'Фрибеты', value: freeBets },
    { name: 'Бонусы деньгами', value: bonuses },
    { name: 'Ставки своих денег', value: bets },
    { name: 'Вилки', value: forks }
];
export default function Main({}) {
    const [originalDataState, setOriginalData] = useState();

    useEffect(() => {
        setOriginalData(originalData);
    }, []);
    return (
        originalDataState && (
            <div className="flex flex-col w-full justify-between items-center">
                <header className="flex flex-col w-full items-center">
                    {/*<a href="https://nearform.com/open-source/victory/">Victory</a>*/}
                    Бонусхантинг
                </header>

                <main className="flex flex-col w-1/2 items-center">
                    <article className="flex flex-col items-center">
                        <div>
                            <VictoryChart theme={VictoryTheme.clean}>
                                <VictoryAxis dependentAxis />
                                <VictoryAxis />
                                {dataForValue.slice(0, -1).map((data, index) => {
                                    return (
                                        <VictoryLine
                                            key={index}
                                            data={[data, dataForValue[index + 1]]}
                                            style={{
                                                data: {
                                                    stroke: () => {
                                                        if (originalData[index].type === 'bet') {
                                                            return 'tomato';
                                                        } else if (originalData[index].type === 'freeBet') {
                                                            return '#2D7FF9';
                                                        } else if (originalData[index].type === 'bonus') {
                                                            return 'orange';
                                                        } else if (originalData[index].type === 'fork') {
                                                            return 'black';
                                                        } else {
                                                            return '#4CA515';
                                                        }
                                                    }
                                                }
                                            }}
                                            labels={({ datum }) => {
                                                return datum.x === dataForValue.length - 1
                                                    ? summaryValue.toFixed(2)
                                                    : null;
                                            }}
                                        />
                                    );
                                })}
                                <VictoryScatter
                                    data={dataForValue}
                                    size={2}
                                    style={{
                                        data: {
                                            fill: ({ datum }) => {
                                                const fullData = [{ type: undefined }, ...originalData];
                                                if (fullData[datum.x].type === 'bet') {
                                                    return 'tomato';
                                                } else if (fullData[datum.x].type === 'freeBet') {
                                                    return '#2D7FF9';
                                                } else if (fullData[datum.x].type === 'bonus') {
                                                    return 'orange';
                                                } else if (fullData[datum.x].type === 'fork') {
                                                    return 'black';
                                                } else {
                                                    return '#4CA515';
                                                }
                                            }
                                        }
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
                                        data: {
                                            fill: '#A36209'
                                        }
                                    }}
                                />
                            </VictoryChart>
                            <VictoryPie
                                innerRadius={50}
                                padAngle={0}
                                data={desc.map(({ name, value }) => ({ x: `${name}: ${value}`, y: value }))}
                                colorScale={['#2D7FF9', 'orange', 'tomato', 'black']}
                                labels
                                labelIndicator
                                theme={VictoryTheme.clean}
                            />
                        </div>
                        <span className="tracking-tight text-border">
                            Итого ставок, фрибетов, бонусов и вилок:
                            <span className="font-bold"> {originalData.length}</span>
                        </span>
                    </article>
                </main>
            </div>
        )
    );
}
