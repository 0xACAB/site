'use client';
import { useCallback } from 'react';

export default function ScrollLink({ refElement, name }) {
	const executeScroll = useCallback(() => {
		refElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, []);
	return (<a
		onClick={executeScroll}
		className={`text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-red-700 text-nowrap`}
	>
		{name}
	</a>);
}