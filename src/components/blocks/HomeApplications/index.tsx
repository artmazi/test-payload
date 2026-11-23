"use client";

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import Button from '@/components/Button';

import textLine from '@/assets/text-line.svg';
import { bgImage } from '@/helpers/bgImage';
import { linkHref } from '@/helpers/linkHref';

const HomeApplications = ({ data }: { data: any }) => {
	const { locale } = useParams<{ locale: string }>();

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
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0">
				{data.title && data.text && (
					<>
						<div className="text-center">
							<h1 className="text-h1 font-black relative inline-block" {...payloadEditable(`content.${data.blockIndex}.title`)}>
								{data.title}
								{ (textLine?.url || textLine) ? <Image
									src={textLine?.url || textLine}
									alt="decoration"
									className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
								 width={800} height={600} /> : null }
							</h1>
						</div>
						<div className="flex px-4 lg:px-0 text-center">
							<p className="text-b1 text-gray" {...payloadEditable(`content.${data.blockIndex}.text`)}>{data.text}</p>
						</div>
					</>
				)}
				{data.items && (
					<div className="flex">
						<Swiper {...swiperOptions} className="mySwiper">
							{(data.items || []).map((i: any, _i: number) => (
								<SwiperSlide key={_i} className="xs:p-4">
									{/* Items store their URL under `link`; linkHref reads `url` */}
									<Link
										href={linkHref({ ...i, url: i.link }, locale)}
										className="cursor-pointer gap-8 h-full flex flex-col relative rounded-md p-4 lg:p-8 w-full text-center justify-between border border-[#0000001A] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] [&>div>h3]:hover:!text-black overflow-hidden">
										{i.leftText && (
											<span className="absolute left-0 top-0 bg-sky text-white font-bold uppercase p-2">
												<span {...payloadEditable(`content.${data.blockIndex}.items.${_i}.leftText`)}>{i.leftText}</span>
											</span>
										)}
										{i.rightText && (
											<span className="absolute right-0 top-0 bg-orange text-white font-bold uppercase p-2">
												<span {...payloadEditable(`content.${data.blockIndex}.items.${_i}.rightText`)}>{i.rightText}</span>
											</span>
										)}
										<div className="flex justify-center items-center flex-1">
											{ (i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null)) ? <Image src={(i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null))}
												alt="icon"
												className="max-h-[155px] max-w-[245px] w-auto h-auto mx-auto"
											 width={800} height={600} /> : null }
										</div>
										<div className="flex gap-2 flex-col">
											<h3 className="text-h3 font-black text-sky" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.title`)}>{i.title || i.page?.title}</h3>
											<p className="text-b2 text-gray" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.text`)}>{i.text}</p>
										</div>
									</Link>
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
									{/* Items store their URL under `link`; linkHref reads `url` */}
									<Link
										href={linkHref({ ...i, url: i.link }, locale)}
										className="cursor-pointer gap-8 h-full flex flex-col relative rounded-md p-4 lg:p-8 w-full text-center justify-between border border-[#0000001A] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] [&>div>h3]:hover:!text-black overflow-hidden">
										{i.leftText && (
											<span className="absolute left-0 top-0 bg-sky text-white font-bold uppercase p-2">
												<span {...payloadEditable(`content.${data.blockIndex}.items2.${_i}.leftText`)}>{i.leftText}</span>
											</span>
										)}
										{i.rightText && (
											<span className="absolute right-0 top-0 bg-orange text-white font-bold uppercase p-2">
												<span {...payloadEditable(`content.${data.blockIndex}.items2.${_i}.rightText`)}>{i.rightText}</span>
											</span>
										)}
										<div className="flex justify-center items-center flex-1">
											{ (i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null)) ? <Image src={(i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null))}
												alt="icon"
												className="max-h-[155px] max-w-[245px] w-auto h-auto mx-auto"
											 width={800} height={600} /> : null }
										</div>
										<div className="flex gap-2 flex-col">
											<h3 className="text-h3 font-black text-sky" {...payloadEditable(`content.${data.blockIndex}.items2.${_i}.title`)}>{i.title || i.page?.title}</h3>
											<p className="text-b2 text-gray" {...payloadEditable(`content.${data.blockIndex}.items2.${_i}.text`)}>{i.text}</p>
										</div>
									</Link>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}
				{data.contentTitle && data.contentText && (
					<div
						className="flex text-white p-8 lg:p-12 rounded-md gap-8 mt-8 mx-4 lg:mx-0"
						style={{
							background: `${data.contentBg?.url ? `${bgImage(data.contentBg.url, 828)} no-repeat right, ` : ''}linear-gradient(to right, #0E3A51 0%, #0D92D2 100%)`,
						}}>
						<div className="flex flex-1 flex-col gap-10 lg:max-w-[65%]">
							<h2 className="text-h2 font-black" {...payloadEditable(`content.${data.blockIndex}.contentTitle`)}>{data.contentTitle}</h2>
							<p className="text-b1" {...payloadEditable(`content.${data.blockIndex}.contentText`)}>{data.contentText}</p>
							<div className="flex gap-4 mt-8">
								{data.contentButton && (
									<Button
										className="w-fit"
										color={data.button1Color ?? 'primary'}
										onClick={() => window.open(data.contentButtonLink, '_blank')}>
										<span {...payloadEditable(`content.${data.blockIndex}.contentButton`)}>{data.contentButton}</span>
									</Button>
								)}
								{data.button2 && (
									<Button
										className="w-fit"
										color="secondary"
										onClick={() => window.open(data.button2Link, '_blank')}>
										<span {...payloadEditable(`content.${data.blockIndex}.button2`)}>{data.button2}</span>
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
