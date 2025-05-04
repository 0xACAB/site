import Sphere from './Scenes/RayCasting/Sphere/Sphere';
import Triangle from './Scenes/RayCasting/Triangle/Triangle';
import Extended from './Scenes/RayCasting/Extended/Extended';
import Main from './Scenes/RayCasting/Main/Main';
import Native from './Scenes/RayCasting/Native/Native';

const sectionsMap = {
	sphere: Sphere,
	triangle: Triangle,
	extended: Extended,
	main: Main,
	native: Native,
	test3: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return Result ? <Result /> : null;
}