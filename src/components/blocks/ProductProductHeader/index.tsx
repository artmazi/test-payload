"use client";

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const ProductProductHeader = ({ data }: { data: any }) => {
	const router = useRouter();
	const pathname = usePathname();

	const isActiveLink = (path: string) => path === pathname;

	const menu = data.menu.map((m: any, i: number) => {
		return {
			id: i,
			name: m.name,
			link: m.link,
		};
	});

	// const sections = data.sections.map((s: any, i: number) => {
	// 	return {
	// 		id: i,
	// 		name: s.name,
	// 		fn: () => {
	// 			console.log(s.name);
	// 		},
	// 	};
	// });

	return (
		<section
			id="prod-header"
			className="w-full flex-col lg:flex bg-white border-[#0000001A] border-t sticky top-[102px] z-[99] shadow">
			<div className="flex flex-1 flex-wrap gap-2 md:gap-8 items-center w-full max-w-[1200px] container mx-auto py-8 md:px-16 xl:px-16 px-4 md:flex-row flex-col lg:flex bg-white">
				{menu.map((m: any, i: number) => (
					<p
						key={i}
						onClick={() => router.push(m.link)}
						className={clsx('text-b2 text-gray cursor-pointer hover:text-teal hover:font-bold', {
							'text-teal font-bold': isActiveLink(m.link),
						})}>
						{m.name}
					</p>
				))}
			</div>
			{/*<div className="flex flex-1 justify-between items-center gap-4">*/}
			{/*	<div className="flex flex-1 gap-4">*/}
			{/*		{sections.map((s: any, i: number) => (*/}
			{/*			<p*/}
			{/*				key={i}*/}
			{/*				onClick={s.fn}*/}
			{/*				className={clsx('text-b2 text-gray cursor-pointer hover:text-sky hover:font-bold')}>*/}
			{/*				{s.name}*/}
			{/*			</p>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*	<div className="flex-flex-1">*/}
			{/*		<Button color="secondary" className="!text-sky">*/}
			{/*			{data.button}*/}
			{/*		</Button>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</section>
	);
};

export default ProductProductHeader;
