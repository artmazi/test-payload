"use client";

import { Trans } from 'react-i18next';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

import textLine from '@/assets/text-line.svg';
import Button from '@/components/Button';

const HomeSoftware = ({ data }: { data: any }) => {
	const router = useRouter();

	const swiperOptions = {
		breakpoints: {
			400: {
				slidesPerView: 2,
				spaceBetween: 5,
				centeredSlides: true,
				initialSlide: 1,
			},
			768: {
				modules: [Autoplay],
				slidesPerView: 1,
				initialSlide: 1,
				centeredSlides: true,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section id="software">
			<div className="container flex flex-col w-full max-w-[1600px] gap-4 lg:gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0 lg:px-4">
				<div className="text-center mb-4">
					<h1 className="text-h1 font-black relative inline-block">
						{data.title}
						{ (textLine?.url || textLine) ? <Image
							src={textLine?.url || textLine}
							alt="decoration"
							className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
						 width={800} height={600} /> : null }
					</h1>
				</div>
				<div className="flex bg-gradient-to-r from-[#0E3A51] to-[#0D92D2] text-white p-12 rounded-md gap-8 flex-col-reverse lg:flex-row mx-4 lg:mx-0">
					<div className="flex flex-1 flex-col gap-4">
						<h2 className="text-h2 font-black">{data.contentTitle}</h2>
						<p className="font-semibold text-b1">
							<Trans i18nKey={data.content}>
								<br />
								<span className="text-orange" />
							</Trans>
						</p>
						{data.contentButton && (
							<Button
								className="w-fit"
								color={data.button1Color ?? 'primary'}
								onClick={() => router.push(data.contentButtonLink)}>
								{data.contentButton}
							</Button>
						)}
					</div>
					<div className="flex justify-center items-center">
						{ (data.contentImg?.url || data.contentImg) ? <Image src={data.contentImg?.url || data.contentImg} className="max-w-[400px] w-full" alt="software"  width={800} height={600} /> : null }
					</div>
				</div>
				{data.items && (
					<div className="">
						<Swiper {...swiperOptions} className="mySwiper">
							{(data.items || []).map((i: any, _i: number) => (
								<SwiperSlide key={_i} className="xs:p-4">
									<div
										onClick={() => router.push(i.link)}
										className="min-h-[250px] cursor-pointer ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]">
										<div className="flex flex-col relative rounded-md p-2 lg:p-8 w-full bg-teal text-center justify-between">
											{ (i.icon?.url || i.icon) ? <Image src={i.icon?.url || i.icon} alt="icon" className="max-h-[80px] my-16 lg:my-32"  width={800} height={600} /> : null }
											<p className="md:text-sub text-b1 font-black text-white">{i.title}</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}
			</div>
		</section>
	);
};

export default HomeSoftware;
