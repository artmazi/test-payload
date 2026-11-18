"use client";

import Image from 'next/image';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import ReactCompareImage from 'react-compare-image';

import React from 'react';

const ProductBeforeAfterSlider = ({ data }: { data: any }) => {
	return (
		<section id="prod-before-after-slider" className="flex flex-col">
			{data.title && (
				<div className="flex w-full max-w-[1200px] py-6 md:py-16 md:px-16 xl:px-16 px-4 mx-auto gap-16 flex-col">
					<div className="text-center flex flex-col">
						<h1 className="text-h1 font-black text-orange relative inline-block" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data.title}</h1>
					</div>
					{data.content &&
						data.content.map((d: any, _i: number) => {
							return (
								<div key={_i} className="mt-4 mb-16">
									<div className="text-center gap-8 flex flex-col">
										<h1 className="text-h1 font-black relative inline-block">{d.title}</h1>
										<p className="text-b1">{d.text}</p>
									</div>
									{d.picBefore && d.picAfter && (
										<div className="max-h-[400px] my-8">
											<ReactCompareImage
												aspectRatio="wider"
												leftImage={d.picBefore}
												rightImage={d.picAfter}
											/>
										</div>
									)}
								</div>
							);
						})}
				</div>
			)}
		</section>
	);
};

export default ProductBeforeAfterSlider;
