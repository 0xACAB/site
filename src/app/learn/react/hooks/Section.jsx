import PracticeUseState from './PracticeUseState';
import PracticeUseEffect from './PracticeUseEffect';
import PracticeUseMemo from './PracticeUseMemo';

const sectionsMap = {
	useState: PracticeUseState,
	useEffect: PracticeUseEffect,
	useMemo: PracticeUseMemo,
	test3: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return Result ? <Result /> : null;
}