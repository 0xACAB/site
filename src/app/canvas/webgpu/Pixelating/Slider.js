import { Slider } from 'antd';

export default function Component(
	{
		resolutions,
		resolutionIndex,
		onChange,
	}) {
	const formatter = (value) => `${resolutions[value].width}x${resolutions[value].height}`;
	return (
		<div className="flex flex-col w-1/2 items-center mt-3">
			<div className="flex flex-col w-1/2 items-center">
				Resolution
				<Slider
					style={{ width: '512px' }}
					tooltip={{ formatter }}
					min={0}
					max={resolutions.length - 1}
					onChange={onChange}
					value={typeof resolutionIndex === 'number' ? resolutionIndex : 0}
				/>
			</div>
		</div>
	);
}