'use client';
import { useState } from 'react';
import config from './config';
import Section from './Section';

export default function Main({ mobile }) {
	const { sections } = config;
	const [section, setSection] = useState(sections[0].name);
	return (
		<div className={`flex flex-col w-full items-center`}>
			<div className={`flex flex-col w-1/2 items-center min-w-[600px]`}>
				<header className={`flex flex-col w-full items-center`}>
					<span>{mobile ? 'Мобильная' : 'Десктопная'} версия.</span>
					<span>Эксперименты c WebGPU</span>
				</header>
				<div
					className={`flex flex-row items-left w-full divide-x-2 border-t-2 border-x-2 border-b-2`}>
					<div className={`w-1/4 flex items-left flex-col overflow-hidden`}>
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
					<div className={`w-3/4 flex items-center flex-col overflow-hidden min-w-[512px]`}>
						<Section mobile={mobile} section={section} />
					</div>
				</div>
			</div>
		</div>
	);
}