import { Trans } from 'react-i18next';

import clsx from 'clsx';
import React, { useState } from 'react';

import Button from 'components/Button';

import textLine from 'assets/text-line.svg';

const IntegrationSlider = ({ data }: any) => {
	const [activeItem, setActiveItem] = useState(0);
	const sliderItems = data.items?.map((s: any, i: number) => ({
		id: i,
		title: s.title,
		picture: s.picture,
	}));

	return (
		<section id="prod-integration-slider" className="flex flex-col">
			{data.title && (
				<div className="flex w-full max-w-[1200px] py-6 md:py-16 md:px-16 xl:px-16 px-4 mx-auto gap-16 flex-col">
					<div className={clsx('text-center gap-8 flex flex-col', data.classNames)}>
						<h1 className="text-h2 font-black relative inline-block">
							{data.title.part1}
							<span className="relative">
								{data.title.part2}
								<img
									src={textLine}
									alt="decoration"
									className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
								/>
							</span>
							{data.title.part3}
						</h1>
						<p className="text-b1 text-gray [&>span]:font-semibold">
							<Trans i18nKey={data.content}>
								<span />
								<b />
								<a className="text-sky" href={data.href} />
							</Trans>
						</p>
					</div>
				</div>
			)}
			{sliderItems && (
				<div className="bg-gradient-to-r from-[#D9D9D9] relative mb-12">
					<img
						alt="floating-img"
						src={sliderItems[activeItem].picture}
						className={clsx(
							'relative lg:right-0 max-h-[500px] lg:absolute pt-8 lg:pt-0 ml-auto lg:mx-auto',
							data.imageType === 'screenshot'
								? 'lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[40%]'
								: 'lg:bottom-[-50px]'
						)}
					/>
					<div className="flex w-full max-w-[1200px] py-8 lg:py-16 xl:px-16 px-8 mx-auto gap-16 flex-col">
						<div className="flex flex-1 gap-4 mr-0 lg:mr-16">
							<div className="flex flex-5 gap-8 flex-col z-[5]">
								<h1 className="text-h1 text-sky font-black lg:min-h-[300px] break-all">
									{sliderItems[activeItem].title}
								</h1>
								<div className="flex gap-4">
									{sliderItems.map((s: any, i: number) => {
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
							<div className="flex-3 hidden lg:flex" />
						</div>
					</div>
				</div>
			)}
			{data.contact && (
				<div className="flex w-full max-w-[1200px] py-8 lg:py-16 xl:px-16 px-8 mx-auto gap-16 flex-col">
					<div className="flex flex-col gap-8">
						<div className="text-center">
							<p className="font-bold">
								<Trans i18nKey={data.contact.text}>
									<br />
								</Trans>
							</p>
						</div>
						<div className="flex flex-1 gap-4 lg:gap-8 mx-auto flex-col lg:flex-row">
							<Button
								className="!text-sky"
								color="secondary"
								onClick={() => window.open(`tel:+41565520570`)}>
								{data.contact.number}
							</Button>
							<Button
								className="!text-sky"
								color="secondary"
								onClick={() => window.open(`mailto:sales@inovitas.ch`)}>
								{data.contact.email}
							</Button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default IntegrationSlider;
