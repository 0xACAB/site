import Practice from './Practice';
import {store} from './store';
const sectionsMap = {
	practice: Practice,
	test: null,
};
import { Provider } from 'react-redux';

export default function Section({ section }) {
	const Result = sectionsMap[section];
	return (
		<Provider store={store}>
			{Result ? <Result /> : null}
		</Provider>
	)
}