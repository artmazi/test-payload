"use client";

import Image from 'next/image';
import React from 'react';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { InlineEdit } from '@/components/InlineEdit';

const HomeHero = ({ data }: { data: any }) => {
	const router = useRouter();

	return (
		<section
			id="hero"
			className="flex w-full container mx-auto py-16 md:px-16 xl:px-32 px-4 lg:flex-row flex-col-reverse">
			<div className="flex flex-1 flex-col gap-8 justify-center">
				<div>
					<InlineEdit
						pageId={data.pageId}
						fieldPath={`content.${data.blockIndex}.title`}
						initialText={data.title || ''}
						tag="h1"
						className="text-h1 font-black"
					/>
					<InlineEdit
						pageId={data.pageId}
						fieldPath={`content.${data.blockIndex}.description`}
						initialText={data.description || ''}
						tag="h3"
						className="text-h3 font-medium italic text-sky"
					/>
				</div>
				<div>
					<InlineEdit
						pageId={data.pageId}
						fieldPath={`content.${data.blockIndex}.content`}
						initialText={data.content || ''}
						tag="p"
						className="text-b1 text-gray"
					/>
				</div>
				<div className="flex gap-4">
					<Button className="w-fit" onClick={() => window.open(data.buttonLink, '_blank')}>
						{data.button}
					</Button>
					{data.button2 && (
						<Button
							color="secondary"
							className="w-fit !text-sky"
							onClick={() => router.push(data.buttonLink2)}>
							{data.button2}
						</Button>
					)}
				</div>
			</div>
			<div className="flex flex-1 justify-center items-center">
				{ (data.heroImg?.url || data.heroImg) ? <Image alt="hero-img" src={data.heroImg?.url || data.heroImg} className="max-h-[500px]"  width={800} height={600} /> : null }
			</div>
		</section>
	);
};

export default HomeHero;
