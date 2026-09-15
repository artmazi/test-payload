"use client";

import Image from 'next/image';
import React from 'react';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const ProductInfo = ({ data }: { data: any }) => {
	const router = useRouter();

	return (
		<section id="prod-info" className="flex flex-col bg-blackTeal">
			<div className="flex w-full max-w-[1600px] py-16 md:px-16 xl:px-32 px-4 text-white mx-auto gap-8 lg:flex-row flex-col">
				<div className="flex flex-1 justify-center flex-col gap-8 lg:order-1 order-2">
					<h1 className="text-h1 font-black">{data.title}</h1>
					{data.sub_title && <p className="text-b1 text-sky">{data.sub_title}</p>}
					<p className="text-b2">{data.text}</p>
					<div className="flex gap-4 mt-8">
						{data.button1 && (
							<Button color="orange" onClick={() => window.open(data.button1Link, '_blank')}>
								{data.button1}
							</Button>
						)}
						{data.button2 && (
							<Button color="secondary" onClick={() => router.push(data.button2Link)}>
								{data.button2}
							</Button>
						)}
					</div>
				</div>
				<div className="flex flex-1 lg:order-2 order-1 justify-center">
					{ (data.image?.url || data.image) ? <Image src={data.image?.url || data.image} alt="image" className="max-h-[450px]"  width={800} height={600} /> : null }
				</div>
			</div>
		</section>
	);
};

export default ProductInfo;
