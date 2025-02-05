import { store } from './store';
import { Provider } from 'react-redux';
import App from './App';

export default function Practice1() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}