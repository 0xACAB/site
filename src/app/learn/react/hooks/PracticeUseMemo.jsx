import { useState } from 'react';

export default function PracticeUseEffect() {
	const [number, setNumber] = useState(0);

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