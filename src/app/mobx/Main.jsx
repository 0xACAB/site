'use client';
import Counter from './Counter';
import Todo from './Todo';

export default function Main({ mobile }) {
	return (
		<div className="flex flex-col w-full justify-between items-center">
			<header className="flex flex-col w-full items-center">
				<a href="https://mobx.js.org/">MobX</a>
			</header>

			<main className="flex flex-col w-1/2 items-center">
				<article className="flex flex-col w-1/2 items-center">
					<Counter />
					<Todo />
				</article>
			</main>
		</div>
	);
}