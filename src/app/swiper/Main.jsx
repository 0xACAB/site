'use client'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import "./styles.css";

import { Pagination, Navigation } from 'swiper/modules';
export default function Main({ mobile }) {
	return (
		<div className="flex flex-col w-full justify-between items-center">
			<header className="flex flex-col w-full items-center">
				<a href="https://swiperjs.com/">Swiper</a>
			</header>

			<main className="w-1/2">
				<article>
					<div style={{height: '50dvh'}}>
						<Swiper
							slidesPerView={1}
							spaceBetween={30}
							loop={true}
							pagination={{
								clickable: true,
							}}
							navigation={true}
							modules={[Pagination, Navigation]}
							className="mySwiper"
						>
							<SwiperSlide>Slide 1</SwiperSlide>
							<SwiperSlide>Slide 2</SwiperSlide>
							<SwiperSlide>Slide 3</SwiperSlide>
							<SwiperSlide>Slide 4</SwiperSlide>
							<SwiperSlide>Slide 5</SwiperSlide>
							<SwiperSlide>Slide 6</SwiperSlide>
							<SwiperSlide>Slide 7</SwiperSlide>
							<SwiperSlide>Slide 8</SwiperSlide>
							<SwiperSlide>Slide 9</SwiperSlide>
						</Swiper>
					</div>
				</article>
			</main>
		</div>
	);
}