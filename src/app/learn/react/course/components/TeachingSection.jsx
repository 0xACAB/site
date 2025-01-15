import { ways } from '../data';
import WayToTeach from './WaysToTeach';

export default function TeachingSection() {
	return (
		<section>
			<ul>
				{
					ways
						.map((way) =>
							<WayToTeach key={way.title} {...way} />,
						)
				}
			</ul>
		</section>);
}