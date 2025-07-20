'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryPie, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

let freeBets = 0;
let loosingFreeBetsValue = 0;
let bonuses = 0;
let bonusesValue = 0;
const originalData = [
    { type: 'bet', value: 1000, result: 1130, coeff: 2.13, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 1000, result: 1900, coeff: 2.9, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 2000, result: 2220, coeff: 2.11, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 1000, result: -1000, coeff: 2.0, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.63, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 1000, result: -1000, coeff: 2.05, capper: 'Bet-Men.SOC.L' },
    //следующая пополам по результату с кволитипиком
    { type: 'bet', value: 500, result: 650, coeff: 2.3, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 1000, result: -1000, coeff: 2.18, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 500, result: -500, coeff: 2.97, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 1000, result: 1700, coeff: 2.7, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1400, result: -1400, coeff: 2.33, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1000, result: -1000, coeff: 2.75, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1000, result: -1000, coeff: 2.75, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1000, result: 1690, coeff: 2.69, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1000, result: 1030, coeff: 2.03, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1000, result: -1000, coeff: 1.85, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 500, result: 750, coeff: 2.5, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 1000, result: 2000, coeff: 3.0, capper: 'OrlovV.UN.L' },
    { type: 'freeBet', value: 1000, profit: 0, coeff: 2.75, capper: 'OrlovV.UN.L' },
    { type: 'bet', value: 500, result: 650, coeff: 2.0, capper: 'Qualitypick.SOC.L' },
    { type: 'bet', value: 1200, result: 0, coeff: 2.97, capper: 'OrlovV.UN.L', book: 'OlympBet' }, //Возврат по форе
    { type: 'bet', value: 1000, result: -1000, coeff: 2.75, capper: 'OrlovV.UN.L', book: 'BetCity' },
    { type: 'bet', value: 500, result: -500, coeff: 4.26, capper: 'OrlovV.UN.L', book: 'OlympBet' },
    { type: 'bet', value: 500, result: -1000, coeff: 2.22, capper: 'OrlovV.UN.L', book: 'BetCity' },
    { type: 'bet', value: 1000, result: 820, coeff: 1.82, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 50, result: 54, coeff: 2.09, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 500, result: -500, coeff: 2.12, capper: 'OrlovV.UN.L', book: 'BetCity' },
    { type: 'bet', value: 500, result: -500, coeff: 2.15, capper: 'OrlovV.UN.L', book: 'BaltBet' },
    { type: 'bet', value: 500, result: 500, coeff: 2.0, capper: 'Bet-Men.SOC.L', book: 'Leon' },
    //В следующей по ошибке в лайве взял кеф ниже
    { type: 'bet', value: 500, result: 375, coeff: 1.75, capper: 'OrlovV.UN.L', book: 'BetCity' },
    { type: 'bet', value: 500, result: 450, coeff: 1.9, capper: 'Bet-Men.SOC.L', book: 'Leon' }, //добрал нормально в лайве(оригинальный кеф был 1.876)
    { type: 'bet', value: 1000, result: -1000, coeff: 2.09, capper: 'OrlovV.UN.L', book: 'OlympBet' },
    { type: 'bet', value: 500, result: -500, coeff: 2.35, capper: 'OrlovV.UN.L', book: 'OlympBet' },
    //В следующей с кефом ошибся когда брал, но выиграла
    { type: 'bet', value: 1000, result: 1240, coeff: 2.24, capper: 'Bet-Men.SOC.L' },
    { type: 'bet', value: 500, result: -500, coeff: 2.5, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 500, result: -500, coeff: 2.4, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 1000, result: 820, coeff: 1.82, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 1000, result: 960, coeff: 1.96, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 1000, result: 960, coeff: 1.96, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 1990, result: 1592, coeff: 1.8, capper: 'OrlovV.UN.L', book: 'BetCity' },
    //В следующей еще и кеф взял ниже по ошибке опять.
    //Ещё и в результаты он неверно у него пошел. Поправил - поменяли, но потом поменяли обратно.
    { type: 'bet', value: 1000, result: -1000, coeff: 2.19, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 2000, result: 2600, coeff: 2.3, capper: 'Bet-Men.SOC.L', book: 'WinLine' },
    { type: 'bet', value: 2000, result: -2000, coeff: 1.73, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.11, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bonus', value: 200, book: 'Leon' },
    { type: 'bet', value: 2000, result: 2080, coeff: 2.04, capper: 'OrlovV.UN.L', book: 'MelBet' },
    //В следующей по ошибке взял кеф 0.02 ниже рассказав себе ну у меня же бонус 10% от ставки упадет
    { type: 'bet', value: 2000, result: -2000, coeff: 2.26, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: 0, coeff: 1.9, capper: 'OrlovV.UN.L', book: 'BetCity' },
    //Взял в лайве фору выше кеф ниже
    { type: 'bet', value: 2000, result: 2000, coeff: 2.0, capper: 'Bet-Men.SOC.L', book: 'WinLine' },
    { type: 'bet', value: 1500, result: 1755, coeff: 2.17, capper: 'OrlovV.UN.L', book: 'Tennisi' },
    { type: 'bet', value: 500, result: 585, coeff: 2.17, capper: 'OrlovV.UN.L', book: 'Tennisi' },
    { type: 'bet', value: 500, result: -500, coeff: 4.0, capper: 'OrlovV.UN.L', book: 'BetCity' },
    { type: 'bet', value: 500, result: 1940, coeff: 1.97, capper: 'OrlovV.UN.L', book: 'FonBet' },
    { type: 'bet', value: 1000, result: 1850, coeff: 2.85, capper: 'OrlovV.UN.L', book: 'LigaStavok' },
    { type: 'bet', value: 50, result: -50, coeff: 10.0, capper: 'Bet-Men.SOC.L', book: 'WinLine' },
    { type: 'bet', value: 200, result: -200, coeff: 2.0, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 1800, result: -1800, coeff: 2.0, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 500, result: -500, coeff: 3.08, capper: 'Qualitypick.SOC.L' },
    { type: 'bet', value: 500, result: -500, coeff: 3.4, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 2000, result: 2240, coeff: 2.12, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 685, result: 767.2, coeff: 2.12, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 315, result: 374.85, coeff: 2.19, capper: 'Bet-Men.SOC.L', book: 'Lion' },
    //Следующую уже по лудке ставил от того что кеф на ставку 3000 в сумме выше так взлетел. Вместо Ф+1 взял Ф+3.5 за низкий кеф
    { type: 'bet', value: 1500, result: 315, coeff: 1.21, capper: 'Bet-Men.SOC.L', book: 'OlympBet' },
    //Следующие 2 тоже по лудке тоже на Ф+3.5 на чуть выше кеф
    { type: 'bet', value: 1685, result: 505.5, coeff: 1.3, capper: 'Bet-Men.SOC.L', book: 'Lion' },
    { type: 'bet', value: 3940, result: 1182, coeff: 1.3, capper: 'Bet-Men.SOC.L', book: 'FonBet' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.33, capper: 'Bet-Men.SOC.L', book: 'WinLine' },
    { type: 'bet', value: 1000, result: -1000, coeff: 2.38, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.12, capper: 'OrlovV.UN.L', book: 'FonBet' },
    { type: 'bet', value: 680, result: -680, coeff: 3.4, capper: 'OrlovV.UN.L', book: 'Marathonbet' },
    { type: 'bet', value: 2000, result: 3180, coeff: 2.59, capper: 'Bet-Men.SOC.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: 1540, coeff: 1.77, capper: 'OrlovV.UN.L', book: 'WinLine' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.05, capper: 'OrlovV.UN.L', book: 'Zenit' },
    //Тут ошибся, поставил второй раз за кеф ниже у другого бука зачем-то. 4к в сумме на одно событие прогрузил выходит
    { type: 'bet', value: 2000, result: -2000, coeff: 2.0, capper: 'OrlovV.UN.L', book: 'Tennisi' },
    { type: 'bet', value: 1500, result: -1500, coeff: 2.78, capper: 'Bet-Men.SOC.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: 0, coeff: 2.3, capper: 'Bet-Men.SOC.L', book: 'FonBet' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.66, capper: 'Bet-Men.SOC.L', book: 'Lion' },
    { type: 'bet', value: 1680, result: 1848, coeff: 2.1, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 320, result: 352, coeff: 2.1, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 1800, result: -1800, coeff: 1.83, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 200, result: -200, coeff: 1.83, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: 2140, coeff: 2.07, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 500, result: 375, coeff: 1.75, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 500, result: 915, coeff: 2.83, capper: 'OrlovV.UN.L', book: 'Lion' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.37, capper: 'Bet-Men.SOC.L', book: 'BaltBet' },
    { type: 'bet', value: 1500, result: -1500, coeff: 2.6, capper: 'Bet-Men.SOC.L', book: 'BetCity' },
    { type: 'bet', value: 2000, result: -2000, coeff: 2.32, capper: 'Bet-Men.SOC.L', book: 'WinLine' }
].map((valueData) => {
    const { type, value, profit } = valueData;
    if (type === 'freeBet') {
        valueData.coeff = valueData.coeff - 1;
        freeBets++;
        if (profit === 0) {
            loosingFreeBetsValue += value;
        }
    }
    if (valueData.type === 'bonus') {
        bonuses++;
        bonusesValue += value;
    }
    return valueData;
});

//.filter(({ type, value }) => type === 'freeBet' && value>=500);
let bets = 0;
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
                                    x: `${capperKey}: ${dataForValue[capperKey].length - 1}`,
                                    y: dataForValue[capperKey].length - 1
                                }))}
                                colorScale={dataForPie.map(({ color }) => color)}
                                labels
                                labelIndicator
                                theme={VictoryTheme.clean}
                            />
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Итого ставок:
                                <span className="font-bold"> {originalData.length}</span>
                            </span>
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Итого залитых фрибетов на:
                                <span className="font-bold"> {loosingFreeBetsValue}</span>
                            </span>
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Итого отыгранных бонусов на:
                                <span className="font-bold"> {bonusesValue}</span>
                            </span>
                        </div>
                        <div>
                            <span className="tracking-tight text-border">
                                Оборот:
                                <span className="font-bold"> {turnOver}</span>
                            </span>
                        </div>
                    </article>
                </main>
            </div>
        )
    );
}
