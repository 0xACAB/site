import Sphere from '@/components/Scenes/RayCasting/Sphere/Sphere';
import Triangle from '@/components/Scenes/RayCasting/Triangle/Triangle';

const sectionsMap = {
	sphere: Sphere,
	triangle: Triangle,
	test3: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return Result ? <Result /> : null;
}