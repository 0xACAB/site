import { createContext } from 'react';
import FunctionContextComponent from './FunctionContextComponent';
//import ClassContextComponent from './ClassContextComponent';
import { ThemeProvider } from './ThemeContext';
export default function PracticeUseContext() {
	return (
		<>
			{'useContext'}
			<ThemeProvider>
				<FunctionContextComponent />
				{/*<ClassContextComponent />*/}
			</ThemeProvider>
		</>
	);
}