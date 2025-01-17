'use client';
import { useCallback } from 'react';

export default function ScrollLink({ refElement, children, onClick }) {
	const executeScroll = useCallback(() => {
		onClick();
		refElement.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
	}, [refElement]);
	return (<a
		onClick={executeScroll}
		className={`text-gray-500 text-xl hover:text-gray-900 border-b-2 border-transparent hover:border-b-2 hover:border-red-700 text-nowrap`}
	>
		{children}
	</a>);
}