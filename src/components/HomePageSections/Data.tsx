import { Trans } from 'react-i18next';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import textLine from 'assets/text-line.svg';

const Data = ({ data }: any) => {
	const navigate = useNavigate();

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
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0 lg:px-4">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block">
						{data.title}
						<img
							src={textLine}
							alt="decoration"
							className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
						/>
					</h1>
				</div>
				<div className="flex flex-col lg:flex-row px-4 lg:px-0">
					<div className="flex flex-1 justify-center items-center">
						<img src={data.img} alt="pic" />
					</div>
					<div className="flex flex-1 flex-col justify-center items-center">
						<p className="text-b1 text-gray">
							<Trans i18nKey={data.text}>
								<br />
							</Trans>
						</p>
					</div>
				</div>
				<div>
					<Swiper {...swiperOptions} className="mySwiper">
						{data.items.map((i: any, _i: number) => (
							<SwiperSlide key={_i} className="xs:p-4">
								<div
									onClick={() => navigate(i.link)}
									className="cursor-pointer min-h-[375px] lg:min-h-[470px] lg:gap-8 flex flex-col relative rounded-md p-4 lg:p-8 w-full text-center justify-between border border-[#0000001A] ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)] [&>h3]:hover:!text-black">
									<img src={i.icon} alt="icon" className="max-h-[155px]" />
									<h3 className="md:text-h3 text-b1 font-black text-sky">{i.title}</h3>
									<p className="md:text-b2 text-b3 text-gray">{i.text}</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Data;
