import counter from './store/counter';
import { observer } from 'mobx-react-lite';

export default observer(function Counter() {
	return (
		<div className="counter flex flex-col w-full items-center">
			{counter.total}
			<div className="btns">
				<button
					style={{ all: 'revert' }}
					className="btn"
					onClick={() => counter.increment()}
				>
					+
				</button>
				<button
					style={{ all: 'revert' }}
					className="btn"
					onClick={() => counter.decrement()}
				>
					-
				</button>
			</div>
		</div>
	);
});