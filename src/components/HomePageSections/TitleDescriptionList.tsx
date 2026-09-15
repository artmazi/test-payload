import clsx from 'clsx';
import React from 'react';

export default function TitleDescriptionList({ data }: any) {
	return (
		<section id="title-description-list" className="flex flex-col">
			<div className="flex w-full max-w-[1200px] py-6 md:pb-16 md:px-16 xl:px-16 px-4 mx-auto gap-16 flex-col">
				<div className={clsx('content text-left')}>
					<h2 className="text-h2 font-black relative inline-block mb-8">{data.title}</h2>
					<ul className="p-0">
						{Object.keys(data.list).map((key: any) => (
							<li key={key} className="my-10">
								<h3 className="text-h2 font-black relative inline-block mb-4">
									{data?.list?.[key].title}
								</h3>
								<p className="text-darkTeal text-b1">{data?.list?.[key]?.description}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
