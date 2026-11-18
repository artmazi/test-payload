"use client";

import clsx from 'clsx';
import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

import checkOrange from '@/assets/check-orange.svg';
import { md2html } from '@/helpers/markdown';
import { bgImage } from '@/helpers/bgImage';

const HomeInfo = ({ data }: { data: any }) => {
	const bgUrl = data.bgImage?.url || (typeof data.bgImage === 'string' ? data.bgImage : null);

	return (
		<section
			id="info"
			style={{ 
				backgroundColor: '#002F47',
				...(bgUrl ? { backgroundImage: bgImage(bgUrl) } : {})
			}}
			className="bg-fixed bg-right bg-no-repeat bg-cover">
			{/* One-column mode is the product-page variant: same 1200px column as the blocks around it */}
			<div className={clsx('container flex flex-col w-full gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4 text-white', data.oneColumn ? 'max-w-[1200px]' : 'max-w-[1600px]')}>
				<p className="text-h3 font-semibold" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</p>
				<div className={clsx('grid grid-cols-1 gap-x-8 gap-y-4', !data.oneColumn && 'md:grid-cols-2')}>
					{(data.items || []).map((i: any, _i: number) => (
						<div
							className="flex items-start"
							key={_i}>
							{ (checkOrange?.url || checkOrange) ? <Image src={checkOrange?.url || checkOrange} alt="Check" className="h-[24px] pr-2 w-auto flex-shrink-0"  width={24} height={24} /> : null }
							<div
								className="[&>a]:cursor-pointer [&>a]:underline [&>a]:text-red-500" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.text`)}
								dangerouslySetInnerHTML={{ __html: md2html(i.text || i) }}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeInfo;
