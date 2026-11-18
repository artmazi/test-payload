"use client";

import { md2htmlBreaks } from '@/helpers/markdown';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

const HomeFacts = ({ data }: { data: any }) => {
	return (
		<section id="facts">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h1>
				</div>
				<div className="flex flex-col gap-8 lg:gap-12 rounded-xl p-6 md:p-8 lg:p-12 shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]">
					<h1 className="text-h2 lg:text-h1 leading-tight font-black" {...payloadEditable(`content.${data.blockIndex}.subTitle`)}>{data.subTitle}</h1>
					{/* Two equal columns that stretch to the same height: 2x2 stat cards | list of facts */}
					<div className="grid gap-4 lg:grid-cols-2">
						<div className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
							{(data.factsLeft || []).map((f: any, i: number) => (
								<div key={i} className="flex flex-col justify-between gap-6 rounded-xl border border-[#0000001A] p-6">
									<p className="text-b2 text-gray font-semibold" {...payloadEditable(`content.${data.blockIndex}.factsLeft.${i}.title`)}>{f.title}</p>
									<h1 className="text-h1 font-black">{f.value}</h1>
								</div>
							))}
						</div>
						<div className="grid gap-4 auto-rows-fr">
							{(data.factsRight || []).map((f: any, i: number) => (
								<div key={i} className="flex flex-col justify-center gap-1 rounded-xl border border-[#0000001A] px-6 py-5 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
									<h3 className="text-h3 font-black text-orange lg:w-44 lg:shrink-0">{f.value}</h3>
									<p className="text-b1 text-gray font-semibold" {...payloadEditable(`content.${data.blockIndex}.factsRight.${i}.title`)}>{f.title}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 lg:flex-row">
					<div className="flex flex-col justify-center gap-8 rounded-md bg-sky px-8 py-12 text-white lg:w-[340px] lg:shrink-0">
						<h2 className="text-h2 font-black" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm1.title`)}>{data?.factsMosaic?.fm1.title}</h2>
						<p className="text-b1" dangerouslySetInnerHTML={{ __html: md2htmlBreaks(data?.factsMosaic?.fm1.text) }} />
					</div>
					{/* Bento: 3 columns on desktop (bottom row reuses them, so edges line up); 2 below, wide tiles span both */}
					<div className="grid flex-1 grid-cols-2 lg:grid-cols-3 gap-4 text-center break-normal max-sm:hyphens-auto max-sm:[&_h3]:text-[18px] max-sm:[&_h2]:text-[24px] [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div]:gap-2 [&>div]:rounded-md [&>div]:px-4 [&>div]:py-6">
						<div className="col-span-2 lg:col-span-1 lg:row-span-2 bg-water">
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm2.text1`)}>{data?.factsMosaic?.fm2.text1}</p>
							<h1 className="font-black text-h1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm2.text2`)}>{data?.factsMosaic?.fm2.text2}</h1>
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm2.text3`)}>{data?.factsMosaic?.fm2.text3}</p>
						</div>
						<div className="bg-teal text-white">
							<h3 className="text-h3 font-bold" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm3.text1`)}>{data?.factsMosaic?.fm3.text1}</h3>
							<h2 className="text-h2 font-black" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm3.text2`)}>{data?.factsMosaic?.fm3.text2}</h2>
						</div>
						<div className="bg-sky text-white">
							<h3 className="text-h3 font-bold" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm5.text1`)}>{data?.factsMosaic?.fm5.text1}</h3>
							<h2 className="text-h2 font-black" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm5.text2`)}>{data?.factsMosaic?.fm5.text2}</h2>
						</div>
						<div className="bg-sky text-white">
							<h3 className="text-h3 font-bold" dangerouslySetInnerHTML={{ __html: md2htmlBreaks(data?.factsMosaic?.fm4.text1) }} />
						</div>
						<div className="bg-green">
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm6.text1`)}>{data?.factsMosaic?.fm6.text1}</p>
							<p className="font-bold text-b1 [&_strong]:text-h1 [&_strong]:font-black" dangerouslySetInnerHTML={{ __html: md2htmlBreaks(data?.factsMosaic?.fm6.text2) }} />
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm6.text3`)}>{data?.factsMosaic?.fm6.text3}</p>
						</div>
						<div className="col-span-2 bg-teal text-white">
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm7.text1`)}>{data?.factsMosaic?.fm7.text1}</p>
							<h1 className="font-black text-h1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm7.text2`)}>{data?.factsMosaic?.fm7.text2}</h1>
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm7.text3`)}>{data?.factsMosaic?.fm7.text3}</p>
						</div>
						<div className="col-span-2 lg:col-span-1 bg-sky text-white">
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm8.text1`)}>{data?.factsMosaic?.fm8.text1}</p>
							<h1 className="font-black text-h2" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm8.text2`)}>{data?.factsMosaic?.fm8.text2}</h1>
							<p className="font-bold text-b1" {...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm8.text3`)}>{data?.factsMosaic?.fm8.text3}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeFacts;
