'use client';
import { useState } from 'react';
import config from '@/config/reactPractice.json';
import Section from './Section';

export default function Main() {
	const { sections } = config;
	const [section, setSection] = useState('useEffect');
	return (
		<div className={`flex flex-col w-full items-center`}>
			<div className={`flex flex-col w-1/2 items-center min-w-[400px]`}>
				<header className={`flex flex-col w-full items-center`}>
					<span>React Hooks</span>
				</header>
				<div
					className={`flex flex-row items-left w-full divide-x-2 border-t-2 border-x-2 border-b-2`}>
					<div className={`w-1/3 flex items-left flex-col overflow-hidden`}>
						<span className={'flex flex-col items-center'}>
							{'Meню'}
						</span>
						{
							sections.map(({ name, title }, index) => (
								<div
									className={`mt-2`}
									key={index}>
									<span
										className={`mt-2 text-gray-500 hover:text-gray-900 hover:border-b-2 border-black-700 hover:border-red-700 cursor-pointer`}
										onClick={() => setSection(name)}
									>
										{title}
									</span>
								</div>
							))
						}
					</div>
					<div className={`w-2/3 flex items-center flex-col overflow-hidden`}>
						<Section section={section}/>
					</div>
				</div>
			</div>
		</div>
	);
}