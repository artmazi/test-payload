"use client";

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const HomeFrame = ({ data }: { data: any }) => {
	return (
		<section id="iframe" className={clsx(data.className)}>
			<div className="container flex flex-col w-full max-w-[1200px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4">
				{data.title && <p className="text-h1 text-center text-black font-bold">{data.title}</p>}
				{data.iframe && (
					<iframe
						style={{ aspectRatio: '16/9', height: 'auto' }}
						width="100%"
						height="650"
						src={data.iframe}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen></iframe>
				)}
			</div>
		</section>
	);
};

export default HomeFrame;
