import {useThemeUpdate, useTheme} from './ThemeContext';

export default function PracticeUseContext() {
	const darkTheme = useTheme();
	const toggleTheme = useThemeUpdate();
	const themeStyles = {
		backgroundColor: darkTheme ? '#333' : '#CCC',
		color: darkTheme ? '#CCC' : '#333',
		padding: '2rem',
		margin: '2rem',
	};
	return (
		<>
			<button
				style={{ all: 'revert' }}
				onClick={toggleTheme}>Toggle Theme
			</button>
			<div style={themeStyles}>Function Theme</div>
		</>
	);
}