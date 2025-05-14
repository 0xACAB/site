import MainHero from '@/components/MainHero';
import Intro from '@/components/Intro';
import Product from '@/components/Product';
import Features from '@/components/Features';
import Experiments from '@/components/Experiments';
import About from '@/components/About';
import ScrollLink from '@/components/ScrollLink';

export default function Main({ mobile, opened, setOpened, refs, navigation }) {
    return (
        <div className={`flex flex-col gap-y-0 overflow-hidden w-full`}>
            <div className={'flex flex-row w-full justify-between'}>
                <div className={`flex flex-col w-1/3`}></div>
                {opened && (
                    <h1 className={`flex flex-col w-1/3 items-center text-nowrap text-4xl font-bold`}>
                        <span className="text-border">Меню</span>
                    </h1>
                )}
                <div className={` w-1/3 grid justify-items-stretch`} onClick={() => setOpened((opened) => !opened)}>
                    <img
                        alt="logo"
                        className="w-16 h-auto cursor-pointer justify-self-end"
                        src={opened ? '/assets/images/close.svg' : '/assets/images/burger_menu.svg'}
                    />
                </div>
            </div>
            {opened && (
                <div className={`w-full border-b-4 text-center absolute bg-white top-16`}>
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
                </div>
            )}

            <div className="grid place-items-stretch ">
                <div style={{ gridArea: '1 / 1' }}>
                    <MainHero mobile={mobile} />
                    <Intro ref={refs.intro} />
                    <Product ref={refs.production} />
                    <Features ref={refs.features} />
                    <Experiments ref={refs.experiments} />
                    <About ref={refs.about} />
                </div>
                {opened && (
                    <div style={{ gridArea: '1 / 1' }}>
                        <div
                            onClick={() => {
                                if (opened) {
                                    setOpened((opened) => !opened);
                                }
                            }}
                            className={`w-full h-full`}
                            style={{
                                backgroundColor: opened ? 'rgba(0,0,0,0.33)' : 'rgba(0,0,0,0)'
                            }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
}
