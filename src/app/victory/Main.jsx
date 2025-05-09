'use client';
import {
	VictoryChart,
	VictoryAxis,
	VictoryLine,
	VictoryTheme,
	VictoryPie,
	VictoryScatter
} from 'victory';
import { useState, useEffect } from 'react';

function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}

const series = [
	{
		name: 'Canada',
		data: [-999, ...Array(20).fill(null).map(() => randomInteger(0, 9))],
	},
];
export default function Main({ mobile }) {
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
					{domLoaded/*for Math.random*/ &&
						<div>
							<VictoryChart
								theme={VictoryTheme.clean}
								minDomain={{ y: 0 }}
							>
								<VictoryAxis
									dependentAxis
									tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
								/>
								<VictoryAxis
									tickValues={series[0].data.slice(1,series[0].data.length).map((_, index) => index + 1)}
								/>
								<VictoryLine
									data={series[0].data.map(
										(d, i) => {
											return {
												x: (([0].includes(i)) ? null : i),
												y: d,
											};
										},
									)}
								/>

								<VictoryScatter
									data={series[0].data}
									size={4}
									style={{
										data: { fill: "#2196F3" }
									}}
								/>
							</VictoryChart>

							<VictoryPie
								data={[
									{ x: 'Cats', y: 35 },
									{ x: 'Dogs', y: 40 },
									{ x: 'Birds', y: 55 },
								]}
								theme={VictoryTheme.clean}
							/>
						</div>
					}
				</article>
			</main>
		</div>
	);
}