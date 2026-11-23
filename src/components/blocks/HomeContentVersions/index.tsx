"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

import RightArrow2 from '@/assets/right-arrow-2.svg';
import { linkHref } from '@/helpers/linkHref';

// Port of infra3dcom's HomePageSections/ContentVersions
const HomeContentVersions = ({ data }: { data: any }) => {
	const { locale } = useParams<{ locale: string }>();
	return (
		<section id="content-versions">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto py-16 md:px-16 xl:px-32 px-0">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block" {...payloadEditable(`content.${data.blockIndex}.title`)}>
						{data.title}
					</h1>
				</div>
				<div className="flex gap-4 lg:flex-row flex-col">
					{(data.items || []).map((i: any, _i: number) => (
						<Link
							key={_i}
							// Items store their URL under `link`; linkHref reads `url`
							href={linkHref({ ...i, url: i.link }, locale)}
							className="group w-full xs:p-4 lg:min-h-[400px] cursor-pointer transition-all ease-in duration-150 hover:shadow-[0px_0px_30px_0px_rgba(13,146,210,0.25)]">
							<div className="flex flex-col relative rounded-md p-4 lg:p-10 h-full w-full bg-teal gap-8 justify-between">
								<div className="flex flex-col gap-4 justify-start items-start">
									{i.icon?.url ? <Image src={i.icon.url} alt="" className="max-h-[74px] w-auto" width={74} height={74} /> : null}
									<h1 className="text-h1 text-sky font-black relative inline-block" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.title`)}>{i.title || i.page?.title}</h1>
									<p className="text-sub text-white" {...payloadEditable(`content.${data.blockIndex}.items.${_i}.content`)}>{i.content}</p>
								</div>
								<Image
									src={RightArrow2}
									alt=""
									className="flex w-[100px] text-left h-[48px] group-hover:ml-4 transition-all ease-in duration-150"
								/>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeContentVersions;
