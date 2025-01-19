import MainHero from '@/components/MainHero';
import Intro from '@/components/Intro';
import Product from '@/components/Product';
import Features from '@/components/Features';
import Experiments from '@/components/Experiments';
import About from '@/components/About';
import BurgerMenu from '@/components/BurgerMenu';

export default function Main({ mobile, opened, setOpened, refs}) {
	return (
		<div className={`flex flex-col gap-y-0 overflow-hidden w-full`}>
			{!mobile && <BurgerMenu opened={opened} mobile={mobile} onClick={() => setOpened((opened) => !opened)} />}
			<div className="grid place-items-stretch ">
				<div style={{ gridArea: '1 / 1' }}>
					<MainHero mobile={mobile} />
					<Intro ref={refs.intro} />
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
	);
}