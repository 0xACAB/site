import config from '../config/index.json';
import Divider from './Divider';

export default function Product({ ref }) {
	const { product, company } = config;
	const [firstItem, secondItem] = product.items;

	return (
		<section className={`bg-background py-8`} id="production" ref={ref}>
			<div className={`container max-w-4xl mx-auto m-8`}>
				<h1
					className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
				>
					{
						product.title.split(' ').map((word, index) => (
							<span
								key={index}
								className={index % 2 ? 'text-primary' : 'text-border'}
							>
				              {word}{' '}
				            </span>
						))
					}
				</h1>
				<Divider />


				<div className={`flex flex-wrap`}>

					<div className={`w-5/6 sm:w-1/2 p-6 mt-0`}>
						<h3
							className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
						>
							{firstItem?.title}
						</h3>
						<p className={`text-gray-600`}>{firstItem?.description}</p>
					</div>
					<div className={`flex flex-row justify-center items-center w-full sm:w-1/2 p-6`}>
						<img
							className="h-6/6"
							src={company?.logo}
							alt={firstItem?.title}
						/>
					</div>
				</div>
				<div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
					<div className={`flex flex-row justify-center items-center w-full sm:w-1/2 p-6`}>
						<img
							className="h-6/6"
							src={company?.logo}
							alt={secondItem?.title}
						/>
					</div>
					<div className={`w-full sm:w-1/2 p-6 mt-20`}>
						<div className={`align-middle`}>
							<h3
								className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
							>
								{secondItem?.title}
							</h3>
							<p className={`text-gray-600 mb-8`}>{secondItem?.description}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}