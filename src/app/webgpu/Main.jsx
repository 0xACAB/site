'use client';
import { useState } from 'react';
import config from './config';
import Section from './Section';

export default function Main({ mobile }) {
	const { sections } = config;
	const [section, setSection] = useState(sections[0].name);
	const [opened, setOpened] = useState(false);

	return (
		<div className={`flex flex-col w-full`}>
			<div className={`flex flex-col w-full`}>
				<header className={`flex flex-col w-full`}>
					<div className={'flex flex-row w-full justify-between'}>
						<div className={`flex flex-col w-1/3`}></div>
						<div className={`flex flex-col w-1/3 items-center text-nowrap`}>
							<span>{mobile ? 'Мобильная' : 'Десктопная'} версия.</span>
							<span>Эксперименты c WebGPU</span>
						</div>
						<div className={` w-1/3 grid justify-items-stretch`}
						     onClick={() => setOpened((opened) => !opened)}>
							<img alt="logo" className="w-16 h-auto cursor-pointer justify-self-end"
							     src={opened ? '/assets/images/close.svg' : '/assets/images/burger_menu.svg'} />
						</div>
					</div>
					{opened && <div className={`w-full border-b-4 text-center absolute bg-white top-16`}>
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
					</div>}
				</header>
				<div
					className={`flex flex-row w-full divide-x-2 border-t-2 border-x-2 border-b-2`}>
					<div className={`w-full flex items-center flex-col overflow-hidden`}>
						<Section mobile={mobile} section={section} />
					</div>
				</div>
			</div>
		</div>
	);
}