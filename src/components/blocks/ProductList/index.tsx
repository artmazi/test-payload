"use client";

import Image from 'next/image';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import clsx from 'clsx';
import textLine from '@/assets/text-line.svg';

const ProductList = ({ data }: { data: any }) => {
	// Only items with images go into the carousel
	const itemsWithImages = useMemo(() => data.items.filter((item: any) => item.image), [data.items]);

	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const swiperRef = useRef<SwiperType | null>(null);

	// The currently active item (from the carousel)
	const activeItem = itemsWithImages[activeSlideIndex];

	const openLightbox = () => setLightboxOpen(true);
	const closeLightbox = () => setLightboxOpen(false);

	const lightboxPrev = useCallback(() => {
		if (swiperRef.current) swiperRef.current.slidePrev();
	}, []);

	const lightboxNext = useCallback(() => {
		if (swiperRef.current) swiperRef.current.slideNext();
	}, []);

	// Close lightbox on Escape, navigate with arrow keys
	useEffect(() => {
		if (!lightboxOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowLeft') lightboxPrev();
			if (e.key === 'ArrowRight') lightboxNext();
		};
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [lightboxOpen, lightboxPrev, lightboxNext]);

	const handleItemClick = (item: any) => {
		// Find the index in the filtered carousel array
		const slideIndex = itemsWithImages.indexOf(item);
		if (slideIndex === -1) return;
		setActiveSlideIndex(slideIndex);
		if (swiperRef.current) {
			swiperRef.current.slideToLoop(slideIndex, 600);
		}
	};

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveSlideIndex(swiper.realIndex);
	};

	return (
		 <div>
			<section id="prod-features" className="flex">
				<div className="flex w-full py-16 md:px-16 xl:px-32 px-4 mx-auto gap-16 flex-col">
					{/* Title */}
					<div className="text-center">
						<h1 className="text-h1 font-black relative inline-block">
							{data.title.part1}{' '}
							<span className="relative">
								{data.title.part2}
								{ (textLine?.url || textLine) ? <Image
									src={textLine?.url || textLine}
									alt="decoration"
									className="absolute mt-[-10px] z-[-1] left-[50%] translate-x-[-50%]"
								 width={800} height={600} /> : null }
							</span>
						</h1>
					</div>

					{/* Original multi-column list */}
					<div className="max-w-[1100px] mx-auto w-full">
						<div className="lg:columns-3 md:columns-2 sm:text-center md:text-left">
							{(data.items || []).map((item: any, index: number) => {
								const hasImage = !!item.image;
								const isActive = activeItem === item;

								return (
									<div key={index}>
										<span
											onClick={hasImage ? () => handleItemClick(item) : undefined}
											className={clsx(
												'transition-all duration-500 gap-4 px-2 py-1 inline-flex rounded-md',
												hasImage && 'text-sky hover:shadow-md cursor-pointer',
												isActive && 'bg-sky/10 shadow-md'
											)}>
											<svg
												className={clsx(
													'w-[24px] shrink-0 transition-colors duration-300',
													isActive ? 'text-sky' : ''
												)}
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_724_683)">
													<path
														d="M23.3164 3.28105C22.9634 2.92738 22.3905 2.92677 22.0375 3.27955L11.1862 14.1021L7.27112 9.84997C6.93282 9.48276 6.36086 9.45894 5.99303 9.79719C5.62548 10.1355 5.60195 10.7077 5.94025 11.0753L10.493 16.0197C10.6598 16.2009 10.8931 16.3062 11.1392 16.3113C11.1458 16.3116 11.1521 16.3116 11.1585 16.3116C11.3976 16.3116 11.6276 16.2166 11.797 16.0477L23.3147 4.56032C23.6686 4.20758 23.6692 3.63472 23.3164 3.28105Z"
														fill={isActive ? 'currentColor' : '#1492D1'}
													/>
													<path
														d="M23.0955 11.0955C22.5959 11.0955 22.191 11.5004 22.191 12C22.191 17.6195 17.6195 22.191 12 22.191C6.38081 22.191 1.80905 17.6195 1.80905 12C1.80905 6.38081 6.38081 1.80905 12 1.80905C12.4996 1.80905 12.9045 1.40414 12.9045 0.904547C12.9045 0.404906 12.4996 0 12 0C5.38312 0 0 5.38312 0 12C0 18.6166 5.38312 24 12 24C18.6166 24 24 18.6166 24 12C24 11.5004 23.5951 11.0955 23.0955 11.0955Z"
														fill={isActive ? 'currentColor' : '#1492D1'}
													/>
												</g>
												<defs>
													<clipPath id="clip0_724_683">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>

											<span>{item.name}</span>
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Compact Coverflow Carousel — only items with images */}
					<div className="coverflow-wrapper relative mx-auto w-full">
						<Swiper
							modules={[EffectCoverflow]}
							effect="coverflow"
							grabCursor={true}
							centeredSlides={true}
							loop={true}
							speed={600}
							slidesPerView={1}
							breakpoints={{
								768: {
									slidesPerView: 2.4,
								},
							}}
							coverflowEffect={{
								rotate: 0,
								stretch: 0,
								depth: 150,
								modifier: 2,
								slideShadows: false,
							}}
							onSwiper={(swiper: SwiperType) => {
								swiperRef.current = swiper;
							}}
							onSlideChange={handleSlideChange}
							className="acoverflow-swiper">
							{itemsWithImages.map((item: any, index: number) => (
								<SwiperSlide key={index} className="coverflow-slidea">
									<div
										className="relative w-full h-full rounded-xl overflow-hidden"
										onClick={() => {
											if (activeSlideIndex === index) openLightbox();
										}}>
										{ (item.image) ? <Image
											src={item.image}
											alt={item.name?.url || item.image}
											alt={item.name}
											className="w-full h-full object-cover"
											loading="lazy"
										 width={800} height={600} /> : null }
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-4">
											<p className="text-white text-b2 font-bold drop-shadow-lg leading-tight">
												{item.name}
											</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						{/* Custom nav arrows */}
						<button
							onClick={() => swiperRef.current?.slidePrev()}
							className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white hover:text-sky transition-all duration-300 shadow-md cursor-pointer"
							aria-label="Previous slide">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>
						<button
							onClick={() => swiperRef.current?.slideNext()}
							className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-700 hover:bg-white hover:text-sky transition-all duration-300 shadow-md cursor-pointer"
							aria-label="Next slide">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round">
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>
				</div>


				{/* Lightbox */}
				{lightboxOpen && activeItem && (
					<div
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
						onClick={closeLightbox}>
						{/* Close button */}
						<button
							onClick={closeLightbox}
							className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
							aria-label="Close lightbox">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>

						{/* Prev arrow */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								lightboxPrev();
							}}
							className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
							aria-label="Previous image">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>

						{/* Next arrow */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								lightboxNext();
							}}
							className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-300 cursor-pointer"
							aria-label="Next image">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>

						{/* Image + label */}
						<div
							className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
							onClick={(e) => e.stopPropagation()}>
							{ (activeItem.image) ? <Image
								src={activeItem.image}
								alt={activeItem.name?.url || activeItem.image}
								alt={activeItem.name}
								className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
							 width={800} height={600} /> : null }
							<p className="text-white text-h3 font-bold mt-4 drop-shadow-lg">{activeItem.name}</p>
						</div>
					</div>
				)}
			</section>

			{data.video && (
				<div className="w-[1100px] max-w-full mx-auto px-4 mt-8">
					{data.video.includes('youtube.com') ? (
						<iframe 
							className="w-full aspect-video rounded-lg" 
							src={data.video.replace('watch?v=', 'embed/')} 
							title="YouTube video player" 
							frameBorder="0" 
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
							referrerPolicy="strict-origin-when-cross-origin" 
							allowFullScreen
						></iframe>
					) : (
						<video className="w-full aspect-video rounded-lg" controls src={data.video}></video>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductList;
