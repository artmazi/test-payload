"use client";

import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

import LinkButtons from '@/components/LinkButtons';

const HomeHero = ({ data }: { data: any }) => {
	return (
		<section
			id="hero"
			className="flex w-full max-w-[1600px] mx-auto py-16 md:px-16 xl:px-32 px-4 lg:flex-row flex-col-reverse">
			<div className="flex flex-1 flex-col gap-8 justify-center">
				<div>
					<h1 className="text-h1 font-black whitespace-pre-wrap" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h1>
					<h3 className="text-h3 font-medium italic text-sky whitespace-pre-wrap" {...payloadEditable(`content.${data.blockIndex}.description`)}>{data.description}</h3>
				</div>
				<div>
					<p className="text-b1 text-gray whitespace-pre-wrap" {...payloadEditable(`content.${data.blockIndex}.content`)}>{data.content}</p>
				</div>
				<LinkButtons buttons={data.buttons} path={`content.${data.blockIndex}.buttons`} secondaryClassName="!text-sky" />
			</div>
			<div className="flex flex-1 justify-center items-center">
				{ (data.heroImg?.url || data.heroImg) ? <Image alt="hero-img" src={data.heroImg?.url || data.heroImg} className="max-h-[500px]"  width={800} height={600} /> : null }
			</div>
		</section>
	);
};

export default HomeHero;
