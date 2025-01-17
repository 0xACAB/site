import config from '../config/index.json';
import Link from 'next/link';

export default function Features({ ref }) {
	const { experiments } = config;
	const { title, subtitle, description, items: featuresList } = experiments;
	return (
		<div className={`py-12`} id="features" ref={ref}>
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

				<div className="mt-10">
					<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
						{featuresList.map((feature) => (
							<div key={feature.name} className="relative">
								<dt>
									<div
										className={`absolute flex items-center justify-center h-12 w-12 rounded-md text-tertiary border-primary border-4`}
									>
										<img
											className={`inline-block h-6 w-6 rounded-full`}
											src={feature.icon}
											alt={feature.name}
										/>
									</div>
									<Link
										className={`hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white`}
										href={feature.href}
									>
										<p className="ml-16 text-lg leading-6 font-medium">
											{feature.name}
										</p>
									</Link>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">
									{feature.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
}