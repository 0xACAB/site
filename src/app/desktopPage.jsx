'use client';
import { useRef, useState } from 'react';
import config from '@/config/index.json';
import ScrollLink from '@/components/ScrollLink';
import Main from '@/components/Main';

export default function DesktopPage({ mobile }) {
	const { navigation } = config;
	const refs = {};
	navigation.forEach((item) => {
		refs[item.href] = useRef(null);
	});
	const [opened, setOpened] = useState(false);
	return (
		<div className={`flex flex-row`}>
			{opened &&
				<div>
					{navigation.map((item) => {
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
				</div>}
			<Main opened={opened} setOpened={setOpened} refs={refs} />
		</div>
	);
};