import config from '../config/index.json';

export default function MainHero({ mobile }) {
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
                        <a
                            href={mainHero.primaryAction.href}
                            className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
                        >
                            {mainHero.primaryAction.text}
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
