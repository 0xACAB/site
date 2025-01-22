import config from '../config/index.json';
import Link from 'next/link';

export default function Experiments({ ref }) {
	const { experiments } = config;
	const { title, subtitle, description, items: featuresList } = experiments;
	return (
		<div className={`pt-6`} id="features" ref={ref}>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<h2
						className={`text-base text-primary font-semibold tracking-wide uppercase`}
					>
						{title}
					</h2>
					<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						{subtitle}
					</p>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
						{description}
					</p>
				</div>

				<div className="grid grid-rows-3 ">
					<div className="grid grid-cols-2 justify-items-center">
						{featuresList.map((feature) => (
							<div
								key={feature.name}
								className="w-1/2 justify-self-center self-center">
								<img
									className={`w-32`}
									src={feature.icon}
									alt={feature.name}
								/>
							</div>
						))}
					</div>
					<div className="grid grid-cols-2 justify-items-center">
						{featuresList.map((feature) => (
							<div key={feature.name} className="align-center">
								<div className="w-full">
									<div>{feature.description} </div>
								</div>
							</div>
						))}
					</div>
					<div className="grid grid-cols-2 justify-items-center">
						{featuresList.map((feature) => (
							<div
								key={feature.name}
								className="w-5/6 justify-self-center">
								<Link
									className={`cursor-pointer text-center`}
									href={feature.href}
								>
									<div>
									Смотреть демо
									</div>
									<img
										className="w-full"
										src={feature.img}
										alt={'test1'} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}