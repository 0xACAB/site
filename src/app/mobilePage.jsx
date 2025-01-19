'use client';
import { useRef, useState } from 'react';
import config from '@/config/index.json';
import ScrollLink from '@/components/ScrollLink';
import BurgerMenu from '@/components/BurgerMenu';
import Main from '@/components/Main';

export default function MobilePage({ mobile }) {
	const { navigation } = config;
	const refs = {};
	navigation.forEach((item) => {
		refs[item.href] = useRef(null);
	});
	const [opened, setOpened] = useState(false);
	return (
		<>
			<div className={`absolute w-full`}>
				<div className={`flex flex-col w-full bg-white`}>
					<BurgerMenu opened={opened} mobile={mobile} onClick={() => setOpened((opened) => !opened)} />
					<div>
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
				</div>
			</div>

			<Main opened={opened} setOpened={setOpened} refs={refs} />
		</>
	);
};