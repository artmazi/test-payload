"use client";

import { payloadEditable } from '@payload-inline-visual-editor/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { linkHref } from '@/helpers/linkHref';
import React from 'react';

const Product = ({ side, path }: { side: any; path: string }) => {
	const { locale } = useParams<{ locale: string }>();
	// Products store their URL under `link`; linkHref reads `url` and returns '#' when there is no link
	const href = linkHref({ ...side, url: side?.link }, locale);
	const body = (
		<span className="flex items-center gap-4 text-h3 font-bold">
			{/* Plain img: icons have mixed aspect ratios (the GEOINFO logo is wide) */}
			{side?.icon?.url ? <img src={side.icon.url} alt="" className="h-[44px] w-auto max-w-[75px] object-contain" /> : null}
			<span {...payloadEditable(`${path}.label`)}>{side?.label || side?.page?.title}</span>
		</span>
	);
	const cls = 'flex flex-1 items-center justify-center p-4 border-2 border-blue-200 rounded-xl transition-colors hover:border-sky';
	return href !== '#' ? <Link href={href} className={cls}>{body}</Link> : <div className={cls}>{body}</div>;
};

// Port of infra3dcom's HomePageSections/ProductVS
const HomeProductVS = ({ data }: { data: any }) => {
	return (
		<section id="product-vs">
			<div className="container flex flex-col w-full max-w-[1200px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4">
				<h2 className="text-h1 text-center text-black font-bold" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h2>
				<div className="flex flex-col gap-4">
					{(data.items || []).map((i: any, _i: number) => (
						<div className="flex flex-col md:flex-row items-stretch" key={_i}>
							<Product side={i.left} path={`content.${data.blockIndex}.items.${_i}.left`} />
							<div className="flex items-center justify-center p-2 md:p-4 md:min-w-[200px] text-b1" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.vs`)}>{i.vs}</div>
							<Product side={i.right} path={`content.${data.blockIndex}.items.${_i}.right`} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeProductVS;
