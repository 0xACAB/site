'use client';
import './styles.css';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryScatter } from 'victory';
import { useState, useEffect } from 'react';

export default function Graph({ dataForOriginalGraph }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    if (!isMounted) {
        return <div style={{ width: 200, height: 200 }}>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full justify-between items-center">
            <VictoryChart theme={VictoryTheme.clean}>
                <VictoryAxis dependentAxis />
                <VictoryAxis />
                <VictoryLine data={dataForOriginalGraph} />
                <VictoryScatter size={2} data={dataForOriginalGraph} />
            </VictoryChart>
        </div>
    );
}
