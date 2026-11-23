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
import LinkButtons from '@/components/LinkButtons';
import { linkHref } from '@/helpers/linkHref';
import { richTextToHtml } from '@/helpers/richText';

const HomeSoftware = ({ data }: { data: any }) => {
	const { locale } = useParams<{ locale: string }>();

	const swiperOptions = {
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
				slidesPerView: 3,
				spaceBetween: 25,
			},
		},
	};

	return (
		<section id="software">
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
				<div className="flex bg-gradient-to-r from-[#0E3A51] to-[#0D92D2] text-white p-12 rounded-md gap-8 flex-col-reverse lg:flex-row mx-4 lg:mx-0">
					<div className="flex flex-1 flex-col gap-4">
						<h2 className="text-h2 font-black" {...payloadEditable(`content.${data.blockIndex}.contentTitle`)}>{data.contentTitle}</h2>
						<p
							className="font-semibold text-b1 [&_strong]:font-semibold [&_strong]:text-orange"
							{...payloadEditable(`content.${data.blockIndex}.content`)}
							dangerouslySetInnerHTML={{ __html: richTextToHtml(data.content) }}
						/>
						<LinkButtons buttons={data.buttons} path={`content.${data.blockIndex}.buttons`} />
					</div>
					<div className="flex justify-center items-center">
						{ (data.contentImg?.url || (typeof data.contentImg === 'string' && (data.contentImg.startsWith('/') || data.contentImg.startsWith('http')) ? data.contentImg : null)) ? <Image src={(data.contentImg?.url || (typeof data.contentImg === 'string' && (data.contentImg.startsWith('/') || data.contentImg.startsWith('http')) ? data.contentImg : null))} className="max-w-[400px] w-full" alt="software"  width={800} height={600} /> : null }
					</div>
				</div>
				{data.items && (
					<div className="">
						<Swiper {...swiperOptions} className="mySwiper">
							{(data.items || []).map((i: any, _i: number) => (
								<SwiperSlide key={_i}>
									{/* Items store their URL under `link`; linkHref reads `url` */}
									<Link
										href={linkHref({ ...i, url: i.link }, locale)}
										className="block min-h-[250px] cursor-pointer ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]">
										<div className="flex flex-col relative rounded-md p-2 lg:p-8 w-full bg-teal text-center justify-between">
											{ (i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null)) ? <Image src={(i.icon?.url || (typeof i.icon === 'string' && (i.icon.startsWith('/') || i.icon.startsWith('http')) ? i.icon : null))} alt="icon" className="max-h-[80px] my-16 lg:my-32"  width={800} height={600} /> : null }
											<p className="md:text-sub text-b1 font-black text-white" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.title`)}>{i.title || i.page?.title}</p>
										</div>
									</Link>
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
