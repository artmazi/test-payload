import clsx from 'clsx';
import React, { useState } from 'react';

import textLine from 'assets/text-line.svg';

const Features = ({ data }: any) => {
	const center = data.center ?? false;
	const [activeItem, setActiveItem] = useState(0);
	const sliderItems = data.items.map((s: any, i: number) => ({
		id: i,
		new: s.isNew,
		title: s.title,
		image: s.image,
		content: s.content,
	}));

	return (
		<section id="prod-features" className="flex">
			<div className="flex w-full py-16 md:px-16 xl:px-32 px-4 mx-auto gap-16 flex-col">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block">
						{data.title.part1}{' '}
						<span className="relative">
							{data.title.part2}
							<img
								src={textLine}
								alt="decoration"
								className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
							/>
						</span>
					</h1>
				</div>
				<div className="flex flex-1 lg:gap-16 xl:mr-[-8rem] flex-col lg:flex-row !min-h-fit 2xl:!min-h-[500px]">
					<div className={clsx('flex gap-8 flex-col order-2 lg:order-1', center ? 'flex-2' : 'flex-3')}>
						<div className="flex flex-1 gap-4 flex-col">
							{sliderItems.map((s: any, i: number) => {
								return (
									<div
										key={i}
										onClick={() => setActiveItem(s.id)}
										className={clsx(
											'relative p-6 pl-12 border border-slate-300 rounded-md cursor-pointer transition-all hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] hover:text-sky',
											{
												'text-sky !p-8 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)]':
													activeItem === s.id,
											}
										)}>
										{s.new && <span className="absolute top-0 left-0 p-2 text-orange">NEW</span>}
										<h3 className="text-h3">{s.title}</h3>
										{activeItem === s.id && (
											<p className="text-gray text-b1 mt-3">{sliderItems[activeItem].content}</p>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<div
						className={clsx(
							'flex items-center bg-no-repeat bg-center mb-4 order-1 lg:order-2 min-h-[300px] lg:min-h-fit',
							center ? 'lg:bg-center-center bg-contain flex-5' : 'lg:bg-left-top bg-cover flex-4',
							data.itemsBgSize ?? ''
						)}
						style={{ backgroundImage: `url("${sliderItems[activeItem]?.image}")` }}
					/>
				</div>
			</div>
		</section>
	);
};

export default Features;
