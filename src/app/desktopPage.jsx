'use client';
import { useRef, useState } from 'react';
import MainHero from '@/components/MainHero';
import About from '@/components/About';
import config from '@/config/index.json';
import Product from '@/components/Product';
import Features from '@/components/Features';
import Experiments from '@/components/Experiments';
import BurgerMenu from '@/components/BurgerMenu';
import ScrollLink from '@/components/ScrollLink';

export default function DesktopPage({ mobile }) {
	const { navigation } = config;
	const refs = {};
	navigation.forEach((item) => {
		refs[item.href] = useRef(null);
	});
	const [opened, setOpened] = useState(false);
	return (
		<>
			<div className={`absolute w-full bg-white`}>
				<BurgerMenu opened={opened} onClick={() => setOpened((opened) => !opened)} />

				{opened && navigation.map((item) => {
					const ref = refs[item.href];
					return (
						<ScrollLink
							key={item.href}
							mobile={mobile}
							refElement={ref}
							onClick={() => setOpened(false)}
						>
							<div>{item.name}</div>
						</ScrollLink>
					);
				})}
			</div>

			<div className={`flex flex-col gap-y-0 overflow-hidden w-full`}>
				<div className="grid place-items-stretch ">
					<div style={{ gridArea: '1 / 1' }}>
						<MainHero mobile={mobile} />
						<Product ref={refs.production} />
						<Features ref={refs.features} />
						<Experiments ref={refs.experiments} />
						<About ref={refs.about} />
					</div>
					{opened && <div style={{ gridArea: '1 / 1' }}>
						<div
							onClick={() => {
								if (opened) {
									setOpened((opened) => !opened);
								}
							}}
							className={`w-full h-full`}
							style={{ backgroundColor: opened ? 'rgba(0,0,0,0.33)' : 'rgba(0,0,0,0)' }}
						>
						</div>
					</div>}
				</div>
			</div>
		</>
	);
};