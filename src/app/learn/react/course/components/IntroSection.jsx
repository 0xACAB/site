import React from 'react';
/*export default function IntroSection() {
	return (
		<section>
			<h1 className='text-5xl font-extrabold dark:text-white'>this is h1</h1>
			<h3 className='text-3xl font-bold dark:text-white' style={{color: '#666'}}>this is h3</h3>
		</section>
	)
}*/
export default function IntroSection() {
	return React.createElement(
		'section',
		null,
		[
			React.createElement(
				'h1',
				{ style: { all: 'revert'}, key: 1 },
				'Это h1',
			),
			React.createElement(
				'h3',
				{  style: {  all: 'revert', color: '#666' },  key: 2 },
				'Это h3',
			),
		],
	);
}