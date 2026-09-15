import clsx from 'clsx';
import React from 'react';

import checkOrange from 'assets/check-orange.svg';
import { md2html } from '@/helpers/markdown';

const Info = ({ data }: any) => {
	return (
		<section
			id="info"
			style={{ backgroundImage: `url('${data.infoHero}')`, backgroundColor: '#002F47' }}
			className={clsx('bg-fixed bg-right bg-no-repeat bg-cover', data.className)}>
			<div className="container flex flex-col w-full max-w-[1200px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4 text-white">
				<p className="text-h3 font-semibold">{data.title}</p>
				<div
					className={clsx('flex lg:flex-wrap flex-nowrap flex-col lg:flex-row', {
						'!flex-nowrap !flex-col': data.oneRow,
					})}>
					{data.items.map((i: string, _i: number) => (
						<div
							className={clsx('flex lg:flex-0-5 py-2 lg:odd:pr-4 lg:even:pl-4 flex-1 px-0', {
								'!pl-0': data.oneRow,
							})}
							key={_i}>
							{!data.hideCheck && <img src={checkOrange} alt="Check" className="h-[24px] pr-2" />}
							<div
								className="[&>a]:cursor-pointer [&>a]:underline [&>a]:text-red-500"
								dangerouslySetInnerHTML={{ __html: md2html(i) }}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Info;
