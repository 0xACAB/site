import { useState, useEffect } from 'react';

export default function PracticeUseEffect() {
	const [resourceType, setResourceType] = useState('posts');
	useEffect(() => {
		console.log('resource changed');
		return () => {
			console.log('return from resource change');
		};
	}, [resourceType]);

	return (
		<>
			{'UseEffect'}
			<div>
				<button
					className={'bg-gray-400 hover:bg-gray-600 text-white font-bold py-4 px-2 rounded'}
					onClick={() => setResourceType('posts')}
				>Posts
				</button>
				<button
					className={'bg-gray-400 hover:bg-gray-600 text-white font-bold py-4 px-2 rounded'}
					onClick={() => setResourceType('users')}
				>Users
				</button>
				<button
					className={'bg-gray-400 hover:bg-gray-600 text-white font-bold py-4 px-2 rounded'}
					onClick={() => setResourceType('comments')}
				>Comments
				</button>
			</div>
		</>
	);
}