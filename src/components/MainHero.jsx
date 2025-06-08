import config from '../config/index.json';
import { useTranslation } from 'react-i18next';

export default function MainHero({ ref }) {
    const { mainHero } = config;
    const { t } = useTranslation();
    return (
        <main
            className="mt-0 mx-auto max-w-5xl pt-10"
            ref={ref}
            id="production"
            style={{
                scrollMarginTop: '64px'
            }}
        >
            <div className="text-center">
                <h1 className={`text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl`}>
                    {mainHero.subtitle.split(' ').map((word, index) => (
                        <span key={index} className={index % 2 ? 'text-primary' : 'text-border'}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>
                <p className="mt-3 text-base text-gray-500 text-xl">{t(mainHero.description)}</p>
                <div className="mt-4 flex justify-center">
                    <div
                        onClick={() => {
                            window.open(mainHero.primaryAction.href, '_blank');
                        }}
                        className={`w-1/3 flex justify-center px-8 py-3 font-medium text-2xl text-background bg-primary hover:bg-border hover:text-primary`}
                    >
                        {mainHero.primaryAction.text}
                    </div>
                </div>
            </div>
        </main>
    );
}
