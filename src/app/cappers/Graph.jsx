'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

export default function Graph({ data }) {
    const [originalDataState, setOriginalData] = useState();
    let summaryOriginal = 0;
    const dataForOriginalGraph = [
        { x: 0, y: 0 },
        ...data.coeffs.map(({ original, real, result }, index) => {
            if (result === 'lose') {
                summaryOriginal -= 1;
            } else if (result === 'win') {
                summaryOriginal += original - 1;
            } else if (result === 'return') {
                summaryOriginal += 0;
            }
            return {
                x: index + 1,
                y: summaryOriginal
            };
        })
    ];
    useEffect(() => {
        setOriginalData(data.coeffs);
    }, []);
    return (
        originalDataState && (
            <div className="flex flex-col w-full justify-between items-center">
                <VictoryChart theme={VictoryTheme.clean}>
                    <VictoryAxis dependentAxis />
                    <VictoryAxis />
                    <VictoryLine data={dataForOriginalGraph} />
                    <VictoryScatter size={2} data={dataForOriginalGraph} />
                </VictoryChart>
            </div>
        )
    );
}
