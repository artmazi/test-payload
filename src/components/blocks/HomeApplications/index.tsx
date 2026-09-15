"use client";

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';

import textLine from '@/assets/text-line.svg';

const HomeApplications = ({ data }: { data: any }) => {
	const router = useRouter();

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
				initialSlide: 1,
				centeredSlides: true,
				modules: [Autoplay],
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 25,
			},
		},
	};

	const swiper2Options = {
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
				initialSlide: 1,
				centeredSlides: true,
				modules: [Autoplay],
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section id="application">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0 lg:px-4">
				{data.title && data.text && (
					<>
						<div className="text-center">
							<h1 className="text-h1 font-black relative inline-block">
								{data.title}
								{ (textLine?.url || textLine) ? <Image
									src={textLine?.url || textLine}
									alt="decoration"
									className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
								 width={800} height={600} /> : null }
							</h1>
						</div>
						<div className="flex mt-4 px-4 lg:px-0 text-center">
							<p className="text-b1 text-gray">{data.text}</p>
						</div>
					</>
				)}
				{data.items && (
					<div className="flex">
						<Swiper {...swiperOptions} className="mySwiper">
							{(data.items || []).map((i: any, _i: number) => (
								<SwiperSlide key={_i} className="xs:p-4">
									<div
										onClick={() => router.push(i.link)}
										className="cursor-pointer gap-8 h-full flex flex-col relative rounded-md p-4 lg:p-8 w-full text-center justify-between border border-[#0000001A] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] [&>div>h3]:hover:!text-black overflow-hidden">
										{i.leftText && (
											<span className="absolute left-0 top-0 bg-sky text-white font-bold uppercase p-2">
												{i.leftText}
											</span>
										)}
										{i.rightText && (
											<span className="absolute right-0 top-0 bg-orange text-white font-bold uppercase p-2">
												{i.rightText}
											</span>
										)}
										<div className="flex justify-center items-center flex-1">
											{ (i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null)) ? <Image src={(i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null))}
												alt="icon"
												className="max-h-[155px] max-w-[245px] mx-auto"
											 width={800} height={600} /> : null }
										</div>
										<div className="flex gap-2 flex-col">
											<h3 className="text-h3 font-black text-sky">{i.title}</h3>
											<p className="text-b2 text-gray">{i.text}</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}
				{data.items2 && (
					<div className="flex">
						<Swiper {...swiper2Options} className="mySwiper-2">
							{(data.items2 || []).map((i: any, _i: number) => (
								<SwiperSlide key={_i} className="xs:p-4">
									<div
										onClick={() => router.push(i.link)}
										className="cursor-pointer gap-8 h-full flex flex-col relative rounded-md p-4 lg:p-8 w-full text-center justify-between border border-[#0000001A] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] [&>div>h3]:hover:!text-black overflow-hidden">
										{i.leftText && (
											<span className="absolute left-0 top-0 bg-sky text-white font-bold uppercase p-2">
												{i.leftText}
											</span>
										)}
										{i.rightText && (
											<span className="absolute right-0 top-0 bg-orange text-white font-bold uppercase p-2">
												{i.rightText}
											</span>
										)}
										<div className="flex justify-center items-center flex-1">
											{ (i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null)) ? <Image src={(i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null))}
												alt="icon"
												className="max-h-[155px] max-w-[245px] mx-auto"
											 width={800} height={600} /> : null }
										</div>
										<div className="flex gap-2 flex-col">
											<h3 className="text-h3 font-black text-sky">{i.title}</h3>
											<p className="text-b2 text-gray">{i.text}</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}
				{data.contentTitle && data.contentText && (
					<div
						className="flex text-white p-8 lg:p-12 rounded-md gap-8 mt-8 mx-4 lg:mx-0"
						style={{
							background: `url(${data.contentBg}) no-repeat right, linear-gradient(to right, #0E3A51 0%, #0D92D2 100%)`,
						}}>
						<div className="flex flex-1 flex-col gap-10 lg:max-w-[65%]">
							<h2 className="text-h2 font-black">{data.contentTitle}</h2>
							<p className="text-b1">{data.contentText}</p>
							<div className="flex gap-4 mt-8">
								{data.contentButton && (
									<Button
										className="w-fit"
										color={data.button1Color ?? 'primary'}
										onClick={() => window.open(data.contentButtonLink, '_blank')}>
										{data.contentButton}
									</Button>
								)}
								{data.button2 && (
									<Button
										className="w-fit"
										color="secondary"
										onClick={() => window.open(data.button2Link, '_blank')}>
										{data.button2}
									</Button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default HomeApplications;
