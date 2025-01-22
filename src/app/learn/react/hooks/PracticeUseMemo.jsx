import { useState, useMemo, useEffect } from 'react';

export default function PracticeUseMemo() {
	const [number, setNumber] = useState(0);
	const [dark, setDark] = useState(false);
	const doubleNumber = useMemo(() => {
		return slowFunction(number);
	}, [number]);
	const themeStyles = useMemo(() => {
		return {
			backgroundColor: dark ? 'black' : 'white',
			color: dark ? 'white' : 'black',
			width: '10rem',
		};
	}, [dark]);

	useEffect(() => {
		console.log('Theme Changed');
	}, [themeStyles]);
	return (
		<>
			{'UseMemo'}
			<input
				type="number"
				value={number}
				style={{ all: 'revert' }}
				onChange={e => setNumber(parseInt(e.target.value))}
			/>
			<button
				style={{ all: 'revert' }}
				onClick={() => setDark(prevDark => !prevDark)}
			>
				Change Theme
			</button>
			<div style={themeStyles}>
				{doubleNumber}
			</div>
		</>
	);
}

function slowFunction(num) {
	console.log('Calling Slow Function');
	for (let i = 0; i <= 2000000000; i++) { }
	return num * 2;
}