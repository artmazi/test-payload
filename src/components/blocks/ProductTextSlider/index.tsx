"use client";

import clsx from 'clsx';
import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React, { useState } from 'react';

import textLine from '@/assets/text-line.svg';

const ProductTextSlider = ({ data }: { data: any }) => {
	const [activeItem, setActiveItem] = useState(0);
	const sliderItems = data?.items
		? data?.items?.map((c: any, i: number) => ({ id: i, title: c.title, content: c.content }))
		: [];

	return (
		<section id="prod-text-slider" className={clsx(data.background ?? '', 'flex')}>
			<div className="flex w-full max-w-[1200px] py-6 md:py-16 md:px-16 xl:px-16 px-4 mx-auto gap-16 flex-col">
				<div>
					{data.hero && ((data.hero?.url || (typeof data.hero === 'string' && (data.hero.startsWith('/') || data.hero.startsWith('http')) ? data.hero : null)) ? <Image src={(data.hero?.url || (typeof data.hero === 'string' && (data.hero.startsWith('/') || data.hero.startsWith('http')) ? data.hero : null))}  alt="hero"  width={800} height={600} /> : null )}
					{data.heroText && <p className="text-b2 text-gray text-center mt-2" {...payloadEditable(`content.${data.blockIndex}.heroText`)}>{data.heroText}</p>}
				</div>

				{data.title && (
					<div className="text-center">
						<h1 className="text-h1 font-black relative inline-block">
							{data?.title?.part1}{' '}
							<span className="relative">
								{data?.title?.part2}
								{ (textLine?.url || textLine) ? <Image
									src={textLine?.url || textLine}
									alt="decoration"
									className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
								 width={800} height={600} /> : null }
							</span>
						</h1>
					</div>
				)}

				{sliderItems && sliderItems.length > 1 && (
					<div className="flex flex-1 gap-4">
						<div className="flex flex-1 gap-8 flex-col">
							<h1 className="text-h1 text-sky font-black min-h-fit lg:min-h-[220px]">
								{sliderItems[activeItem]?.title}
							</h1>
							<p className="text-sub text-gray lg:hidden">{sliderItems[activeItem]?.content}</p>
							<div className="flex gap-4">
								{sliderItems &&
									sliderItems.map((s: any, i: number) => {
										return (
											<div
												key={i}
												onClick={() => setActiveItem(s.id)}
												className={clsx(
													'border-t-[12px] lg:border-t-[5px] border-gray opacity-50 text-gray w-[50px] text-center pt-2 cursor-pointer hover:border-teal hover:text-teal transition-all flex-1 lg:flex-none',
													{ 'border-teal !opacity-100 text-teal': activeItem === s.id }
												)}>
												{i < 9 ? '0' : ''}
												{i + 1}
											</div>
										);
									})}
							</div>
						</div>
						<div className="flex-1 items-start mt-4 lg:flex hidden">
							<p className="text-sub text-gray">{sliderItems[activeItem]?.content}</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProductTextSlider;
