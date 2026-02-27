'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

export default function Graph({ data }) {
    const [originalDataState, setOriginalData] = useState();
    let summary = 0;
    const dataForGraph = data.coeffs.map(({ original, real, result }, index) => {
        if (result === 'lose') {
            summary -= original;
        } else if (result === 'win') {
            summary += original;
        } else if (result === 'return') {
            summary += 0;
        }
        return {
            x: index + 1,
            y: summary
        };
    });
    useEffect(() => {
        setOriginalData(data.coeffs);
    }, []);
    return (
        originalDataState && (
            <div className="flex flex-col w-full justify-between items-center">
                <VictoryChart theme={VictoryTheme.clean}>
                    <VictoryAxis dependentAxis />
                    <VictoryAxis />
                    <VictoryLine data={dataForGraph} />
                    <VictoryScatter size={2} data={dataForGraph} />
                </VictoryChart>
            </div>
        )
    );
}
