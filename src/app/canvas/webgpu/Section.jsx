import Sphere from './Scenes/RayCasting/Sphere/Sphere';
import Triangle from './Scenes/RayCasting/Triangle/Triangle';

const sectionsMap = {
	sphere: Sphere,
	triangle: Triangle,
	test3: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return Result ? <Result /> : null;
}