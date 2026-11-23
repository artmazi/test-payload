"use client";

import { richTextToBlocksHtml } from '@/helpers/richText';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

const HomeFacts = ({ data }: { data: any }) => {
	const fm = data?.factsMosaic || {};
	return (
		<section id="facts">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-4">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h1>
				</div>
				<div className="flex flex-col gap-8 lg:gap-12 rounded-xl p-6 md:p-8 lg:p-12 shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]">
					<h1 className="text-h2 lg:text-h1 leading-tight font-black" {...payloadEditable(`content.${data.blockIndex}.subTitle`)}>{data.subTitle}</h1>
					{/* Two equal columns that stretch to the same height: 2x2 stat cards | list of facts */}
					<div className="grid gap-4 lg:grid-cols-2">
						<div className="grid gap-4 sm:grid-cols-2 auto-rows-fr">
							{(data.factsLeft || []).map((f: any, i: number) => (
								<div key={i} className="flex flex-col justify-between gap-6 rounded-xl border border-[#0000001A] p-6">
									<p className="text-b2 text-gray font-semibold" {...payloadEditable(`content.${data.blockIndex}.factsLeft.${i}.title`)}>{f.title}</p>
									<h1 className="text-h1 font-black" {...payloadEditable(`content.${data.blockIndex}.factsLeft.${i}.value`)}>{f.value}</h1>
								</div>
							))}
						</div>
						<div className="grid gap-4 auto-rows-fr">
							{(data.factsRight || []).map((f: any, i: number) => (
								<div key={i} className="flex flex-col justify-center gap-1 rounded-xl border border-[#0000001A] px-6 py-5 lg:flex-row lg:items-center lg:justify-start lg:gap-6">
									<h3 className="text-h3 font-black text-orange lg:w-44 lg:shrink-0" {...payloadEditable(`content.${data.blockIndex}.factsRight.${i}.value`)}>{f.value}</h3>
									<p className="text-b1 text-gray font-semibold" {...payloadEditable(`content.${data.blockIndex}.factsRight.${i}.title`)}>{f.title}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 lg:flex-row">
					<div
						// The heading keeps the old gap-8 to the text; paragraphs were one <p> split by a blank line, i.e. one line apart
						className="flex flex-col justify-center rounded-md bg-sky px-8 py-12 text-white lg:w-[340px] lg:shrink-0 [&_h2]:text-h2 [&_h2]:font-black [&_h2]:mb-8 [&_p]:text-b1 [&_p+p]:mt-[1lh]"
						{...payloadEditable(`content.${data.blockIndex}.factsMosaic.fm1`)}
						dangerouslySetInnerHTML={{ __html: richTextToBlocksHtml(fm.fm1) }}
					/>
					{/* Bento: 3 columns on desktop (bottom row reuses them, so edges line up); 2 below, wide tiles span both.
					    Each tile is one rich text styled by element: paragraph = label, H1/H2/H3 = figure, bold = large figure. */}
					<div className="grid flex-1 grid-cols-2 lg:grid-cols-3 gap-4 text-center break-normal max-sm:hyphens-auto [&_p]:text-b1 [&_p]:font-bold [&_h1]:text-h1 [&_h1]:font-black [&_h2]:text-h2 [&_h2]:font-black [&_h3]:text-h3 [&_h3]:font-bold [&_p_strong]:text-h1 [&_p_strong]:font-black max-sm:[&_h3]:text-[18px] max-sm:[&_h2]:text-[24px] [&>div]:flex [&>div]:flex-col [&>div]:items-center [&>div]:justify-center [&>div]:gap-2 [&>div]:rounded-md [&>div]:px-4 [&>div]:py-6">
						{[
							['fm2', 'col-span-2 lg:col-span-1 lg:row-span-2 bg-water'],
							['fm3', 'bg-teal text-white'],
							['fm5', 'bg-sky text-white'],
							['fm4', 'bg-sky text-white'],
							['fm6', 'bg-green'],
							['fm7', 'col-span-2 bg-teal text-white'],
							['fm8', 'col-span-2 lg:col-span-1 bg-sky text-white'],
						].map(([key, className]) => (
							<div
								key={key}
								className={className}
								{...payloadEditable(`content.${data.blockIndex}.factsMosaic.${key}`)}
								dangerouslySetInnerHTML={{ __html: richTextToBlocksHtml(fm[key]) }}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeFacts;
