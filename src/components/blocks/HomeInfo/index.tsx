"use client";

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import checkOrange from '@/assets/check-orange.svg';
import { md2html } from '@/helpers/markdown';

const HomeInfo = ({ data }: { data: any }) => {
	const bgUrl = data.bgImage?.url || (typeof data.bgImage === 'string' ? data.bgImage : null);

	return (
		<section
			id="info"
			style={{ 
				backgroundColor: '#002F47',
				...(bgUrl ? { backgroundImage: `url('${bgUrl}')` } : {})
			}}
			className="bg-fixed bg-right bg-no-repeat bg-cover">
			<div className="container flex flex-col w-full max-w-[1200px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4 text-white">
				<p className="text-h3 font-semibold">{data.title}</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
					{(data.items || []).map((i: any, _i: number) => (
						<div
							className="flex items-start"
							key={_i}>
							{ (checkOrange?.url || checkOrange) ? <Image src={checkOrange?.url || checkOrange} alt="Check" className="h-[24px] pr-2 w-auto flex-shrink-0"  width={24} height={24} /> : null }
							<div
								className="[&>a]:cursor-pointer [&>a]:underline [&>a]:text-red-500"
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
