import { useDispatch, useSelector } from 'react-redux';

export default function Practice() {
	const dispatch = useDispatch();
	const cash = useSelector((state) => state.cash.cash);
	const addCash = (cash) => {
		dispatch({ type: 'ADD_CASH', payload: cash});
	};
	const getCash = (cash) => {
		dispatch({ type: 'GET_CASH', payload: cash });
	};
	return (
		<div>
			<div>This is Redux practice</div>
			<div style={{ fontSize: '5rem' }}>{cash}</div>
			<div>
				<button
					style={{ all: 'revert' }}
					onClick={() => addCash(Number(prompt()))}
				>
					Пополнить счет
				</button>
				<button
					style={{ all: 'revert' }}
					onClick={() => getCash(Number(prompt()))}
				>
					Снять со счета
				</button>
			</div>
		</div>
	);
}