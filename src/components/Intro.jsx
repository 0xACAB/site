import config from '../config/index.json';
import Divider from './Divider';

export default function Intro({ ref }) {
    const { intro } = config;
    const [firstItem, secondItem] = intro.items;

    return (
        <section
            className={`py-4`}
            id="production"
            style={{
                scrollMarginTop: '64px'
            }}
            ref={ref}
        >
            <div className={`container max-w-4xl mx-auto m-8`}>
                <h1 className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}>
                    {intro.title.split(' ').map((word, index) => (
                        <span key={index} className={index % 2 ? 'text-primary' : 'text-border'}>
                            {word}{' '}
                        </span>
                    ))}
                </h1>
                <Divider />

                <div className={`flex flex-wrap flex-col sm:flex-row justify-center`}>
                    <div className={`flex flex-row justify-center w-full sm:w-2/5 p-6 h-64`}>
                        <img className="h-full" src={firstItem?.img} alt={firstItem?.title} />
                    </div>
                    <div className={`sm:w-2/5 p-6 mt-0`}>
                        <h3 className={`text-3xl text-gray-800 font-bold leading-none mb-3`}>{firstItem?.title}</h3>
                        <p className={`text-gray-600`}>{firstItem?.description}</p>
                    </div>
                </div>

                <div className={`flex flex-wrap flex-col-reverse sm:flex-row justify-center`}>
                    <div className={`sm:w-2/5 p-6 mt-0`}>
                        <h3 className={`text-3xl text-gray-800 font-bold leading-none mb-3`}>{secondItem?.title}</h3>
                        <p className={`text-gray-600 mb-8`}>{secondItem?.description}</p>
                    </div>
                    <div className={`flex flex-row justify-center w-full sm:w-2/5 p-6 h-64`}>
                        <img
                            className="h-full"
                            src={secondItem?.img}
                            style={{ transform: 'scale(1,-1)' }}
                            alt={secondItem?.title}
                        />
                    </div>
                </div>

                {/*<div className={`flex flex-wrap`}>

					<div className={`w-5/6 sm:w-1/2 p-6 mt-0`}>
						<h3
							className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
						>
							{thirdItem?.title}
						</h3>
						<p className={`text-gray-600`}>{thirdItem?.description}</p>
					</div>
					<div className={`flex flex-row justify-center items-center w-full sm:w-1/2 p-6`}>
						<img
							className="h-6/6"
							src={company?.logo1}
							alt={thirdItem?.title}
						/>
					</div>
				</div>*/}
            </div>
        </section>
    );
}
