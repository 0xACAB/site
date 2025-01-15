import Test1 from './Test1';
import Test2 from './Test2';

const sectionsMap = {
	test1: Test1,
	test2: Test2,
	test3: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return Result ? <Result /> : null;
}