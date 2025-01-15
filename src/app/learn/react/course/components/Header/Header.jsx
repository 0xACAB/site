import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
//import './Header.css';

const HeaderContainer = styled.header`
    height: 100px;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background: #fafafa
`;

export default function Header() {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => {
			clearInterval(interval);
			console.log('cleaning...');
		}
	}, []);

	return (
		<HeaderContainer>
			<img className={`w-10`} src={'/assets/images/logo.svg'} alt="logo" />
			<span suppressHydrationWarning>Время сейчас: {now.toLocaleTimeString()}</span>
			<span>Задачи по React.</span>
		</HeaderContainer>
	);
}