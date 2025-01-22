import { useRef, useEffect, useState } from 'react';

export default function PracticeUseRef() {
	const [name, setName] = useState('');
	const prevName = useRef('');

	useEffect(() => {
		prevName.current = name;
	}, [name]);
	return (
		<>
			{'useRef'}
			<input
				style={{ all: 'revert' }}
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<div>My name is {name} and it used to be {prevName.current}</div>
		</>
	);
}