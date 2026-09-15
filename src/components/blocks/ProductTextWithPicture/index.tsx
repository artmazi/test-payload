"use client";

import clsx from 'clsx';
import { md2html } from '@/helpers/markdown';
import Image from 'next/image';
import React from 'react';

export enum Types {
	TEXT_LEFT_BG,
	TEXT_LEFT,
	TEXT_RIGHT_BG,
	TEXT_RIGHT,
	TEXT,
}

const ProductTextWithPicture = ({ data }: { data: any }) => {
	const returnContent = (data: any) => {
		switch (data.type) {
			case Types.TEXT_LEFT:
			case Types.TEXT_LEFT_BG:
				return (
					<>
						<div
							className={clsx('content flex flex-1 justify-center items-center lg:order-1 order-2', {
								'bg-water': data.type === Types.TEXT_LEFT_BG,
							})}>
							<div className="p-8">{data.content}</div>
						</div>
						<div
							className="picture flex flex-1 bg-contain bg-no-repeat bg-center lg:min-h-fit min-h-[300px] lg:order-2 order-1"
							style={{ backgroundImage: `url("${data.picture}")` }}
						/>
					</>
				);
			case Types.TEXT_RIGHT:
			case Types.TEXT_RIGHT_BG:
				return (
					<>
						<div
							className="picture flex flex-1 bg-contain bg-no-repeat bg-center lg:min-h-fit min-h-[300px]"
							style={{ backgroundImage: `url("${data.picture}")` }}
						/>
						<div
							className={clsx('content flex flex-1 justify-center items-center', {
								'bg-water': data.type === Types.TEXT_RIGHT_BG,
							})}>
							<div className="p-8">{data.content}</div>
						</div>
					</>
				);
			case Types.TEXT:
				return (
					<>
						<div>{data.content}</div>
					</>
				);
		}
	};

	return (
		<section
			id="prod-text-with-picture"
			className="flex w-full container max-w-[1200px] mx-auto py-8 md:px-16 xl:px-32 px-4 flex-col">
			{data.content.map((c: any, i: number) => {
				return (
					<div
						key={i}
						className={clsx(
							'flex flex-1 my-4 lg:flex-row flex-col justify-center',
							c.className ? c.className : ''
						)}>
						{returnContent(c)}
					</div>
				);
			})}
			{data.text && <p className="text-center mt-4" dangerouslySetInnerHTML={{ __html: md2html(data.text) }} />}
		</section>
	);
};

export default ProductTextWithPicture;
