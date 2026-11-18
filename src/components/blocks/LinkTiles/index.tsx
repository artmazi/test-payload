'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

const tile = 'flex flex-1 items-center justify-center p-4 border-2 border-blue-200 rounded-xl text-h3 font-bold text-center';

// Port of infra3dcom's HomePageSections/LinkList
const LinkTiles = ({ data }: { data: any }) => (
	<section id="link-tiles">
		<div className="container flex flex-col w-full max-w-[1200px] gap-8 mx-auto py-8 md:px-16 xl:px-32 px-4">
			{data.title && (
				<h2 className="text-h2 text-center text-black font-bold" {...payloadEditable(`content.${data.blockIndex}.title`)}>
					{data.title}
				</h2>
			)}
			<div className="flex flex-col md:flex-row gap-4">
				{(data.items || []).map((i: any, _i: number) =>
					i.link ? (
						<Link key={_i} href={i.link} className={clsx(tile, 'transition-colors hover:border-sky')}>
							{i.label}
						</Link>
					) : (
						<div key={_i} className={tile}>
							{i.label}
						</div>
					),
				)}
			</div>
		</div>
	</section>
);

export default LinkTiles;
