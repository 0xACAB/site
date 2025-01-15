import config from '../config/index.json';
import ScrollLink from '@/components/ScrollLink';

export default function Header({ mobile, refs }) {
	const { navigation, company: { companyName, logo } } = config;
	return (
		<>
			<div className="relative pt-6 px-4 sm:px-6 lg:px-8 w-full">
				<div className="relative flex items-center justify-between sm:h-10 lg:justify-between"
				     aria-label="Global">
					<div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
						<div className="flex items-center justify-between w-full md:w-auto">
							<a onClick={(event) => {
								event.preventDefault();
							}}>
								<span className="sr-only">{companyName}</span>
								<img alt="logo" className="h-16 w-auto sm:h-16" src={logo} />
							</a>
						</div>
					</div>
					<div className="sm:text-base md:block space-x-3 sm:space-x-8">
						{navigation.map((item) => {
							const ref = refs[item.href];
							return (<ScrollLink
								mobile={mobile}
								refElement={ref}
								key={item.href}
								name={item.name}
							/>);
						})}
					</div>
				</div>
			</div>
		</>
	);
};