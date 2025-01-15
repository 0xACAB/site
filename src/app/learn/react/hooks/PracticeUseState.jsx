import { useState } from 'react';

export default function PracticeUseState() {
	const [count, setCount] = useState(4);
	const [theme, setTheme] = useState('blue');

	function decrementCount() {
		setCount((prevCount) => prevCount - 1);
	}

	function incrementCount() {
		setCount((prevCount) => prevCount + 1);
		setTheme('red');
	}

	return (
		<>
			{'useState'}
			<div className="flex flex-row items-center">
				<button
					className={'bg-gray-400 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded'}
					onClick={decrementCount}
				>-
				</button>
				<span className="text-3xl font-bold dark:text-white">
					{count}
				</span>
				<span className="text-3xl font-bold dark:text-white">
					{theme}
				</span>
				<button
					className={'bg-gray-400 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded'}
					onClick={incrementCount}
				>+
				</button>
			</div>
		</>
	);
}