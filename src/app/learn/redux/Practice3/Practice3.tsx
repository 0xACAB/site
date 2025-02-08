import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();

export default function Practice2() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}