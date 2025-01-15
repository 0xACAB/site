'use client'
import TeachingSection from './components/TeachingSection';
import DifferencesSection from './components/DifferencesSection';
import IntroSection from './components/IntroSection';
import TabsSection from './components/TabsSection';
import FeedbackSection from './components/FeedbackSection';
import { useState } from 'react';
import EffectSection from './components/EffectSection';
import Header from './components/Header/Header';

export default function App() {
	const [visible, setVisible] = useState(true);
	const [tab, setTab] = useState('effect');
	setTimeout(() => {
		setVisible(false);
	}, 3000);
	return (
		<div>
			{visible && <Header mobile={false}/>}
			<main>
				<TabsSection active={tab} onChange={(current) => setTab(current)} />
				<IntroSection />

				{tab === 'main' && <>
					<TeachingSection />
					<DifferencesSection />
				</>}

				{tab === 'feedback' && <FeedbackSection />}

				{tab === 'effect' && <EffectSection />}
			</main>
		</div>
	);
}