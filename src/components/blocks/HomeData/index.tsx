"use client";

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import textLine from '@/assets/text-line.svg';
import { linkHref } from '@/helpers/linkHref';

const HomeData = ({ data }: { data: any }) => {
	const { locale } = useParams<{ locale: string }>();

	const swiperOptions = {
		breakpoints: {
			400: {
				slidesPerView: 2,
				spaceBetween: 2,
				centeredSlides: true,
				initialSlide: 1,
			},
			768: {
				slidesPerView: 1,
				spaceBetween: 10,
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

	return (
		<section id="data">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0">
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
				<div className="flex flex-col lg:flex-row px-4 lg:px-0">
					<div className="flex flex-1 justify-center items-center">
						{ (data.img?.url || (typeof data.img === 'string' && (data.img.startsWith('/') || data.img.startsWith('http')) ? data.img : null)) ? <Image src={(data.img?.url || (typeof data.img === 'string' && (data.img.startsWith('/') || data.img.startsWith('http')) ? data.img : null))} alt="pic"  width={800} height={600} /> : null }
					</div>
					<div className="flex flex-1 flex-col justify-center items-center">
						<p className="text-b1 text-gray whitespace-pre-line" {...payloadEditable(`content.${data.blockIndex}.text`)}>{data.text}</p>
					</div>
				</div>
				<div>
					<Swiper {...swiperOptions} className="mySwiper">
						{(data.items || []).map((i: any, _i: number) => (
							<SwiperSlide key={_i} className="xs:p-4">
								{/* Items store their URL under `link`; linkHref reads `url` */}
								<Link
									href={linkHref({ ...i, url: i.link }, locale)}
									className="cursor-pointer min-h-[375px] lg:min-h-[470px] lg:gap-8 flex flex-col relative rounded-md p-4 lg:p-8 w-full text-center justify-between border border-[#0000001A] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] [&>h3]:hover:!text-black">
									{ (i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null)) ? <Image src={(i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null))} alt="icon" className="max-h-[155px]"  width={800} height={600} /> : null }
									<h3 className="md:text-h3 text-b1 font-black text-sky" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.title`)}>{i.title || i.page?.title}</h3>
									<p className="md:text-b2 text-b3 text-gray" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.text`)}>{i.text}</p>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default HomeData;
