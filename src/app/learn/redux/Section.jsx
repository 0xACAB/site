import Practice1 from './Practice1/Practice1';
import Practice2 from './Practice2/Practice2';

const sectionsMap = {
	practice1: Practice1,
	practice2: Practice2,
	test: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return (Result ? <Result /> : null);
}