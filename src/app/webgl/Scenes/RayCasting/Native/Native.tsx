'use client';
import React, { useEffect, useRef } from 'react';
import vert from '../Main/shaders/vert.glsl';
import frag from '../Main/shaders/frag.glsl';
import uniforms from '../Main/uniforms';
import Pixelating from './../../../Pixelating/Pixelating';
import Slider from './../../../Pixelating/Slider';

export default function Native() {
	const pixelatingCanvasRef = useRef<HTMLCanvasElement>(null);

	const resolutions = [
		{ width: 8, height: 8 },
		{ width: 16, height: 16 },
		{ width: 32, height: 32 },
		{ width: 64, height: 64 },
		{ width: 128, height: 128 },
		{ width: 256, height: 256 },
		{ width: 512, height: 512 },
	];
	let currentResolutionIndex = 1;

	let pixelating: Pixelating;
	useEffect(() => {
		if (pixelatingCanvasRef.current) {
			//Create controller for plane CanvasTexture
			pixelating = new Pixelating(
				pixelatingCanvasRef.current,
				{ vert, frag, uniforms },
				resolutions,
				currentResolutionIndex,
			);

			const pointerDown = (event: MouseEvent) => {
				console.log(event.offsetX, event.offsetY);
			};
			pixelatingCanvasRef.current.addEventListener('pointerdown', pointerDown);

			let animationId: number;
			const render = (time: number) => {
				// convert to seconds
				time *= 0.001;
				if (pixelating) {
					pixelating.render(time);
					animationId = requestAnimationFrame(render);
				}
			};
			render(0);
			return () => {
				if (pixelating) {
					pixelating.unmount();
				}
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			};
		}
	});
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (pixelating) {
			pixelating.onChange(event);
		}
	};
	return (

		<>
			<canvas id="canvas"
			        className={`w-512 h-512 pixelated`}
			        width={512}
			        height={512}
			        ref={pixelatingCanvasRef}
			></canvas>
			<Slider onChange={onChange}
			        resolutions={resolutions}
			        defaultResolution={currentResolutionIndex}
			/>
		</>
	);
}
