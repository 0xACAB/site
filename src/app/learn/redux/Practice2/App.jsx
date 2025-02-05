import { useDispatch, useSelector } from 'react-redux';
import { decrementCreator, incrementCreator, asyncIncrementCreator, asyncDecrementCreator } from './store/countReducer';
import { fetchUsers } from '@/app/learn/redux/Practice2/store/userReducer';

export default function App() {
	const count = useSelector((state) => state.countReducer.count);
	const users = useSelector((state) => state.userReducer.users);
	const dispatch = useDispatch();
	return (
		<div>
			<div>This is Redux practice 2</div>
			<div style={{ fontSize: '5rem' }}>{count}</div>
			<div>
				<button
					style={{ all: 'revert' }}
					onClick={() => dispatch(asyncIncrementCreator())}
				>
					ИНКРЕМЕНТ++
				</button>
				<button
					style={{ all: 'revert' }}
					onClick={() => dispatch(asyncDecrementCreator())}
				>
					ДЕКРЕМЕНТ--
				</button>
				<button
					style={{ all: 'revert' }}
					onClick={() => dispatch(fetchUsers())}
				>
					ПОЛУЧИТЬ ЮЗЕРОВ
				</button>
			</div>
			<div>
				{
					users.map((user =>
						<div key={user.name}>
							{user.name}
						</div>))
				}
			</div>
		</div>
	);
}