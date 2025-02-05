import { createStore, combineReducers, applyMiddleware } from 'redux';
import { countReducer } from './countReducer';
import { userReducer } from './userReducer';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '@/app/learn/redux/Practice2/saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	countReducer,
	userReducer,
});
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootWatcher);
