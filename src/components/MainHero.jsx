import config from '../config/index.json';
import { Button } from 'antd';

export default function MainHero() {
    const { mainHero } = config;
    return (
        <main className="mt-10 mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 lg:px-8">
            <div className="sm:text-center">
                <h1 className={`text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl`}>
                    {mainHero.subtitle.split(' ').map((word, index) => (
                        <span key={index} className={index % 2 ? 'text-primary' : 'text-border'}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>

                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                    {mainHero.description}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                    <div className="rounded-md shadow">
                        <Button
                            href={mainHero.primaryAction.href}
                            target="_blank"
                            color="danger"
                            variant="solid"
                            size="large"
                            style={{ padding: '2rem', fontSize: '2rem' }}
                        >
                            {mainHero.primaryAction.text}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
