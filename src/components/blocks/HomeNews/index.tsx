"use client";

import { payloadEditable } from '@payload-inline-visual-editor/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { en, de, fr, News as RssNews } from '../../../data/news';

type ParsedNews = {
	title: string;
	link: string;
	date: string;
	img: { url: string; CSSClasses: string } | null;
};

const HomeNews = ({ data }: { data: any }) => {
	const { i18n } = useTranslation();
	const [newsData, setNewsData] = useState<ParsedNews[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		try {
			const lang = i18n.language || 'en';
			let rawNews = en;
			if (lang.startsWith('de')) {
				rawNews = de;
			} else if (lang.startsWith('fr')) {
				rawNews = fr;
			}

			const parsedNews: ParsedNews[] = rawNews.map((item: RssNews) => {
				const date = item.pubDate ? dayjs(item.pubDate).format('DD.MM.YYYY') : '';
				
				return {
					title: item.title,
					link: item.link,
					date,
					img: item.image ? { url: item.image, CSSClasses: '' } : null
				};
			});

			setNewsData(parsedNews);
		} catch (error) {
			console.error('Error loading news:', error);
		} finally {
			setIsLoading(false);
		}
	}, [i18n.language]);

	if (isLoading) {
		return (
			<section id="news" className="relative">
				<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto pt-2 pb-16 md:px-16 xl:px-32 px-4">
					<div className="text-center">
						<h1 className="text-h1 font-black relative inline-block text-transparent bg-slate-200 rounded-md animate-pulse">{data?.title || 'News'}</h1>
					</div>
					<div className="grid grid-cols-2 xs:grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
						{[1, 2, 3, 4].map((i) => (
							<article key={i} className="flex flex-col rounded-xl overflow-hidden shadow-md bg-white h-full animate-pulse">
								<div className="w-full h-52 bg-slate-100"></div>
								<div className="flex flex-col flex-1 p-4 sm:p-6 lg:p-8 border border-t-0 border-slate-100 rounded-b-xl">
									<div className="w-24 h-4 bg-slate-200 rounded mb-3"></div>
									<div className="w-full h-6 bg-slate-200 rounded mb-2"></div>
									<div className="w-3/4 h-6 bg-slate-200 rounded mb-6"></div>
									<div className="mt-auto pt-4 border-t border-slate-100">
										<div className="w-24 h-4 bg-slate-200 rounded"></div>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="news" className="relative">
			<div className="container flex flex-col w-full max-w-[1600px] gap-8 mx-auto pt-2 pb-16 md:px-16 xl:px-32 px-4">
				<div className="text-center">
					<h1 className="text-h1 font-black relative inline-block" {...payloadEditable(`content.${data.blockIndex}.title`)}>{data?.title}</h1>
				</div>
				<div className="grid grid-cols-2 xs:grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
					{newsData.map((news: ParsedNews, i: number) => (
						<article
							key={i}
							className="flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white group h-full">
							<a
								href={news.link}
								target="_blank"
								className="no-underline flex flex-col h-full w-full"
								rel="noreferrer">
								
								{/* Image Section */}
								{news.img ? (
									<div className="w-full shrink-0 overflow-hidden bg-slate-100 border-b border-slate-100">
										{/* Through the image optimizer: the feed's originals are ~0.5-0.8 MB PNGs shown at card size */}
										<Image
											src={news.img.url}
											alt=""
											width={800}
											height={450}
											sizes="(min-width: 1024px) 25vw, (min-width: 480px) 50vw, 100vw"
											className={`w-full h-auto group-hover:scale-105 transition-transform duration-500 ${news.img.CSSClasses}`}
										/>
									</div>
								) : (
									<div className="w-full h-2 shrink-0 bg-teal"></div>
								)}
								
								{/* Text Section */}
								<div className="flex flex-col flex-1 p-4 sm:p-6 lg:p-8 bg-white border border-t-0 border-slate-100 rounded-b-xl">
									<span className="text-sky font-bold text-sm mb-3 uppercase tracking-wider">{news.date}</span>
									<h3 
										className="text-base sm:text-xl font-bold leading-snug hyphens-auto text-slate-800 group-hover:text-teal transition-colors"
										dangerouslySetInnerHTML={{ __html: news.title }}
									/>
								</div>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomeNews;
