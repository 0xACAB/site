import { differences } from '../data';
import Button from './Button/Button';
import { useState } from 'react';

export default function DifferencesSection() {

	const [contentType, setContentType] = useState(null);

	function handleClick(type) {
		setContentType(type);
	}
	return (
		<section>
			<h3 className="text-lg font-bold dark:text-white">Заголовок</h3>
			<Button
				isActive={contentType === 'way'}
				onClick={() => handleClick('way')
				}>
				Подход
			</Button>
			<Button isActive={contentType === 'easy'} onClick={() => handleClick('easy')}>Доступность</Button>
			<Button isActive={contentType === 'program'}
			        onClick={() => handleClick('program')}>Концентрация</Button>

			{!contentType && <p>Нажми на кнопку</p>}
			{contentType && <p>{differences[contentType]}</p>}

		</section>
	);
}