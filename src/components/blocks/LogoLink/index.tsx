"use client";

import React from 'react';

const LogoLink = ({ data }: { data: any }) => {
	const image = data.image;
	if (!image?.url) return null;

	const img = (
		<img src={image.url} alt={image.alt || ''} style={{ maxWidth: data.maxWidth || 200 }} className="h-auto w-full" />
	);
	const external = /^https?:\/\//.test(data.url || '');

	return (
		<section id="logo-link" className="flex flex-col">
			{/* Same grid as the Document layout of productWysiwyg so it lines up with the text column */}
			<div className="w-full max-w-[1200px] mx-auto px-4 md:px-16 pb-16 md:pb-24 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
				<div className="lg:col-start-2">
					{data.url ? (
						<a
							href={data.url}
							{...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
							className="inline-block transition-opacity hover:opacity-80">
							{img}
						</a>
					) : (
						img
					)}
				</div>
			</div>
		</section>
	);
};

export default LogoLink;
