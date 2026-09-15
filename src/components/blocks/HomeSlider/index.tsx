"use client";

import { Trans } from 'react-i18next';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import React from 'react';

import quote from '@/assets/quote.png';

const HomeSlider_Sub = ({ data }: { data: any }) => {
	const logosSwiperOptions = {
		modules: [Autoplay],
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		breakpoints: {
			100: {
				slidesPerView: 2,
				spaceBetween: 1,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 6,
				spaceBetween: 25,
			},
		},
	};

	const testimonialsSwiperOptions = {
		modules: [Autoplay],
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
		breakpoints: {
			100: {
				slidesPerView: 1,
				spaceBetween: 1,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: data.slidePerView ?? 3,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section id="slider" className="flex flex-col pt-16 pb-0 md:pb-16 gap-4 md:gap-16">
			<div className="container flex flex-col w-full max-w-[1200px] gap-8 mx-auto md:px-16 xl:px-30 px-4 text-center">
				<h1 className="text-h1 font-black">{data.title}</h1>
				<h3 className="text-h3 font-normal text-gray">
					<Trans i18nKey={data.description}>
						<b />
						<br />
					</Trans>
				</h3>
			</div>
			<div className="flex">
				<Swiper {...logosSwiperOptions} className="mySwiper">
					{(data.sliderItems || []).map((i: string, _i: number) => (
						<SwiperSlide key={_i} className="!flex text-center items-center justify-center py-8">
							{ (i?.url || i) ? <Image
								src={i?.url || i}
								alt="logo"
								className="max-h-[120px] border border-[#00000005] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]"
							 width={800} height={600} /> : null }
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="flex container mx-auto gap-8">
				<Swiper {...testimonialsSwiperOptions} className="mySwiper">
					{(data.testimonials || []).map((t: any, i: number) => (
						<SwiperSlide key={i} className="py-8 px-4">
							<Testimonial data={t} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

const HomeSlider = ({ data }: { data: any }) => {
	return (
		<div className="flex flex-1 rounded-xl flex-col border border-[#00000005] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] p-4 md:p-12 gap-4">
			<div className="relative mb-[30px]">
				{ (quote?.url || quote) ? <Image src={quote?.url || quote} alt="q" className="absolute top-[-15px] left-0"  width={800} height={600} /> : null }
				{ (quote?.url || quote) ? <Image src={quote?.url || quote} alt="q" className="absolute bottom-[-15px] right-0 rotate-180"  width={800} height={600} /> : null }
				<p className="text-gray text-b3">{data.text}</p>
			</div>
			<div className="flex gap-4 items-center">
				<div className="flex max-w-[64px] w-full">
					{ (data.img?.url || data.img) ? <Image src={data.img?.url || data.img} alt="person" className="rounded-full shadow-md"  width={800} height={600} /> : null }
				</div>
				<div className="flex flex-col">
					<h6 className="text-b2 uppercase font-semibold">{data.name}</h6>
					<p className="text-b3 italic">{data.description}</p>
				</div>
			</div>
		</div>
	);
};

export default HomeSlider;
