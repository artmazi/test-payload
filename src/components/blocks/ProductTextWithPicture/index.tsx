'use client';

import clsx from 'clsx';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import Image from 'next/image';
import React from 'react';
import { hasRichText, richTextToHtml } from '@/helpers/richText';

// lg flex-grow ratios [picture, text] per "split" option; basis-0 makes the grow values the real width ratio
const splits: Record<string, [string, string]> = {
	even: ['lg:flex-1', 'lg:flex-1'],
	text60: ['lg:flex-[2]', 'lg:flex-[3]'],
	picture60: ['lg:flex-[3]', 'lg:flex-[2]'],
};

const textStyles: Record<string, string> = {
	sectionTitle: 'text-h2 font-bold text-black text-center',
	heading: 'text-h2 md:text-h1 font-black leading-tight max-md:hyphens-auto [&_strong]:text-sky [&_strong]:font-black',
	subheading: 'text-h3 font-bold text-black',
	body: 'text-b1 text-gray [&_strong]:font-bold',
};

// Port of infra3dcom's ProductPageSections/TextWithPicture
const ProductTextWithPicture = ({ data }: { data: any }) => {
	return (
		<div className={clsx(data.background === 'gray' && 'bg-[#f8f8f8] py-8')}>
			<section id="prod-text-with-picture" className="flex flex-col gap-8 w-full container max-w-[1200px] mx-auto py-8 md:px-16 xl:px-32 px-4">
				{(data.rows || []).map((row: any, i: number) => {
					const external = /^https?:\/\//.test(row.button?.link || '');
					const text = (
						<div className="flex flex-col gap-4">
							{row.title && (
								<h3 className="text-h3 font-bold text-black" {...payloadEditable(`content.${data.blockIndex}.rows.${i}.title`)}>
									{row.title}
								</h3>
							)}
							<div
								className={textStyles[row.textStyle] || textStyles.body}
								{...payloadEditable(`content.${data.blockIndex}.rows.${i}.content`)}
								dangerouslySetInnerHTML={{ __html: richTextToHtml(row.content) }}
							/>
							{row.button?.label && row.button?.link && (
								<a
									href={row.button.link}
									{...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
									className="w-fit mt-2 border border-sky px-3 py-2 text-b2 text-black transition-colors hover:bg-sky hover:text-white"
								>
									<span {...payloadEditable(`content.${data.blockIndex}.rows.${i}.button.label`)}>{row.button.label}</span>
								</a>
							)}
						</div>
					);
					if (row.layout === 'text' || !row.layout) return <div key={i}>{text}</div>;

					const tinted = row.layout.endsWith('Bg');
					const pictureFirst = row.layout.startsWith('textRight');
					const [pictureWidth, textWidth] = splits[row.split] || splits.even;
					return (
						<div key={i} className="flex flex-col lg:flex-row gap-8">
							{/* Picture always comes first on mobile, as in the original */}
							<div className={clsx('flex items-center justify-center min-w-0', pictureWidth, !pictureFirst && 'lg:order-2')}>
								{row.picture?.url ? (
									<Image
										src={row.picture.url}
										alt={row.picture.alt || ''}
										width={row.picture.width || 800}
										height={row.picture.height || 600}
										sizes="(min-width: 1024px) 480px, 100vw"
										className="w-full h-auto max-h-[400px] object-contain"
									/>
								) : null}
							</div>
							{/* Untinted text sits on the page edge on mobile; the box padding only matters with a background */}
							<div className={clsx('flex items-center rounded-md min-w-0', textWidth, tinted ? 'bg-water p-6 md:p-8' : 'lg:py-8')}>{text}</div>
						</div>
					);
				})}
				{hasRichText(data.text) && <p className="text-center" {...payloadEditable(`content.${data.blockIndex}.text`)} dangerouslySetInnerHTML={{ __html: richTextToHtml(data.text) }} />}
			</section>
		</div>
	);
};

export default ProductTextWithPicture;
