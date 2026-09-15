import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';

const UseCases = ({ data }: any) => {
	const swiperOptions = {
		modules: [Autoplay],
		slidesPerView: 1,
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
		breakpoints: {
			400: {
				slidesPerView: 2,
				spaceBetween: 5,
				centeredSlides: true,
				initialSlide: 1,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 20,
				centeredSlides: true,
				initialSlide: 1,
			},
			1024: {
				slidesPerView: data.slidesPerView || 3,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section id="use-cases">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0 lg:px-4">
				<div className="text-center">
					<h1 className="text-h1 font-black">{data.title}</h1>
				</div>
				<div className="flex flex-wrap">
					<Swiper {...swiperOptions} className="mySwiper">
						{data.items.map((i: any, _i: number) => (
							<SwiperSlide key={_i} className="xs:px-1">
								<div
									className="flex min-h-[250px] cursor-pointer"
									key={_i}
									onClick={() => window.open(i.link, '_blank')}>
									<div
										className="flex flex-col relative rounded-md p-8 bg-no-repeat w-full bg-teal bg-cover [&:not(:hover)]:!bg-none"
										style={{
											backgroundImage: `url('${i.background}')`,
										}}>
										<h2 className="md:text-h2 text-h3 text-sky font-black">{i.title}</h2>
										<p className="font-medium text-white">{i.text}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default UseCases;
