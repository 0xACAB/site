import todo from './store/todo';
import { observer } from 'mobx-react-lite';

export default observer(function Todo() {
	console.log('render');
	return (
		<div className="counter flex flex-col w-full items-center">
			<button
				style={{ all: 'revert' }}
				onClick={() => todo.fetchTodo()}
			>
				fetch todo
			</button>
			<div className="boxes">
				{
					todo.todos.map((t,index) =>
						(<div className="todo" key={index}>
							<input
								style={{ all: 'revert' }}
								type="checkbox"
								checked={t.completed}
								onChange={() => todo.completeTodo(t.id)}
							/>
							{t.title}
							<button
								style={{ all: 'revert' }}
								onClick={() => todo.removeTodo(t.id)}
							>x
							</button>
						</div>),
					)}
			</div>
		</div>
	);
});