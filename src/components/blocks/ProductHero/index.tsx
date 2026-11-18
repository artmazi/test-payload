"use client";

import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

// Port of infra3dcom's ProductPageSections/Hero
const ProductHero = ({ data }: { data: any }) => {
	const image = data.image?.url;
	const hasOverlay = data.title || data.subTitle;
	return (
		<section
			id="prod-hero"
			style={image ? { backgroundImage: `url("${image}")` } : undefined}
			className="flex w-full h-[230px] lg:h-[550px] bg-teal bg-cover bg-center bg-no-repeat relative overflow-hidden">
			{data.video && (
				<video loop muted autoPlay playsInline src={data.video} className="absolute inset-0 w-full h-full object-cover" />
			)}
			{hasOverlay && (
				<div className="absolute inset-0 flex flex-col gap-4 justify-center items-center bg-[rgba(0,0,0,0.4)] text-white px-4 text-center">
					{data.title && (
						<h1 className="max-w-[950px] w-full text-h2 md:text-h1 font-bold leading-tight" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h1>
					)}
					{data.subTitle && (
						<p className="max-w-[850px] w-full whitespace-pre-line" {...payloadEditable(`content.${data.blockIndex}.subTitle`)}>{data.subTitle}</p>
					)}
				</div>
			)}
		</section>
	);
};

export default ProductHero;
