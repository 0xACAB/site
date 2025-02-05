import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction } from './store/customerReducer';
import { removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncAction/customers';

export default function App() {
	const dispatch = useDispatch();
	const cash = useSelector((state) => state.cash.cash);
	const customers = useSelector((state) => state.customers.customers);
	const addCash = (cash) => {
		dispatch({ type: 'ADD_CASH', payload: cash });
	};

	const getCash = (cash) => {
		dispatch({ type: 'GET_CASH', payload: cash });
	};

	const addCustomer = (name) => {
		const customer = {
			name: name,
			id: Date.now(),
		};
		dispatch(addCustomerAction(customer));
	};

	const removeCustomer = (customer) => {
		dispatch(removeCustomerAction(customer.id));
	};

	return (
		<div>
			<div>This is Redux practice 1</div>
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
				<button
					style={{ all: 'revert' }}
					onClick={() => addCustomer(prompt())}
				>
					Добавить клиента
				</button>
				<button
					style={{ all: 'revert' }}
					onClick={() => dispatch(fetchCustomers())}
				>
					Получить клиентов из базы
				</button>

				{
					(customers.length > 0) ? <div>
						{
							customers.map((customer) => {
								return <div
									key={customer.id}
									onClick={() => {
										removeCustomer(customer);
									}}
									style={{ fontSize: '2rem', border: '1px solid black', padding: '16px' }}
								>
									{customer.name}
								</div>
									;
							})
						}
					</div> : <div style={{ fontSize: '2rem', marginTop: 20 }}>Клиенты отсутствуют</div>}

			</div>
		</div>
	);
}