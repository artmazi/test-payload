"use client";

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

const HomeUseCases = ({ data }: { data: any }) => {
	const swiperOptions = {
		modules: [Autoplay],
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
		// Fractional counts let the next card peek in, so visitors see there is more to swipe.
		// Below md the container has no side padding, so the offsets keep cards on the 16px page edge.
		slidesPerView: 1.3,
		spaceBetween: 16,
		slidesOffsetBefore: 16,
		slidesOffsetAfter: 16,
		breakpoints: {
			640: {
				slidesPerView: 2.3,
			},
			768: {
				slidesPerView: 2.3,
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
			},
			1024: {
				slidesOffsetBefore: 0,
				slidesOffsetAfter: 0,
				slidesPerView: data.slidesPerView || 3,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section id="use-cases">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0">
				<div className="text-center">
					<h1 className="text-h1 font-black" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h1>
				</div>
				<div className="flex flex-wrap">
					<Swiper {...swiperOptions} className="mySwiper">
						{(data.items || []).map((i: any, _i: number) => (
							<SwiperSlide key={_i}>
								<div
									className="flex min-h-[250px] cursor-pointer"
									key={_i}
									onClick={() => window.open(i.link, '_blank')}>
									<div
										className="flex flex-col relative rounded-md p-8 bg-no-repeat w-full bg-teal bg-cover [&:not(:hover)]:!bg-none"
										style={{
											...(i.background?.url ? { backgroundImage: `url('${i.background.url}')` } : {}),
										}}>
										<h2 className="md:text-h2 text-h3 text-sky font-black" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.title`)}>{i.title}</h2>
										<p className="font-medium text-white" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.text`)}>{i.text}</p>
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

export default HomeUseCases;
