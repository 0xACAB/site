import PracticeUseState from './PracticeUseState';
import PracticeUseEffect from './PracticeUseEffect';
import PracticeUseMemo from './PracticeUseMemo';
import PracticeUseRef from './PracticeUseRef';
import PracticeUseContext from './PracticeUseContext/PracticeUseContext';

const sectionsMap = {
	useState: PracticeUseState,
	useEffect: PracticeUseEffect,
	useMemo: PracticeUseMemo,
	useRef: PracticeUseRef,
	useContext: PracticeUseContext,
	test: null,
};

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return Result ? <Result /> : null;
}