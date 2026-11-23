"use client";

import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useRef, useState, ViewTransition } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import { linkHref } from '@/helpers/linkHref';

const ProductProductHeader = ({ data }: { data: any }) => {
	const pathname = usePathname();
	const { locale } = useParams<{ locale: string }>();
	const menu: any[] = data.menu || [];
	const [scrolled, setScrolled] = useState(false);
	const barRef = useRef<HTMLElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	// The bar can wrap to two lines, so publish its real height for anchor offsets and the sticky TOC (see globals.css)
	useEffect(() => {
		const bar = barRef.current;
		if (!bar) return;
		const root = document.documentElement;
		const publish = () => root.style.setProperty('--sticky-top', `${102 + bar.offsetHeight}px`);
		const ro = new ResizeObserver(publish);
		ro.observe(bar);
		publish();
		return () => {
			ro.disconnect();
			root.style.removeProperty('--sticky-top');
		};
	}, []);

	// On narrow screens the row scrolls sideways: bring the current page's entry into view
	useEffect(() => {
		const track = trackRef.current;
		const link = track?.querySelector<HTMLElement>('[aria-current="page"]');
		if (track && link && track.scrollWidth > track.clientWidth) {
			track.scrollLeft = link.offsetLeft - (track.clientWidth - link.offsetWidth) / 2;
		}
	}, [pathname]);

	// Takes over the header's scroll shadow so it sits under the whole stuck bar (see globals.css)
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		// Named view transitions keep the bar still across pages and slide the active pill to the new entry (see globals.css)
		<ViewTransition name="page-nav" share="page-nav" default="none">
		{/* top matches the sticky site header height */}
		<section ref={barRef} id="prod-header" className={clsx('sticky top-[102px] z-[99] w-full border-b border-[#0000000F] bg-white/90 backdrop-blur-md transition-shadow duration-200', scrolled && 'shadow-[0_6px_20px_-8px_rgba(14,58,81,0.18)]')}>
			<div ref={trackRef} className="relative mx-auto w-full max-w-[1200px] px-4 py-3 md:px-16 overflow-x-auto lg:overflow-visible">
				{/* One scrollable row on small screens; wraps on desktop when the entries don't fit */}
				<nav aria-label="Seitenmenü" className="inline-flex gap-1 rounded-full bg-[#0E3A510A] p-1 lg:flex-wrap lg:rounded-3xl">
					{menu.map((m, i) => {
						// Items store their URL under `link`; linkHref reads `url`
						const href = linkHref({ ...m, url: m.link }, locale);
						const active = href === pathname;
						return (
							<Link
								key={i}
								href={href}
								aria-current={active ? 'page' : undefined}
								className={clsx(
									'relative whitespace-nowrap rounded-full px-4 py-2 text-b3 md:text-b2 transition-all',
									active
										? 'font-semibold text-teal'
										: 'font-medium text-teal/60 hover:bg-white/60 hover:text-teal'
								)}>
								{/* The pill is its own element so it can move between entries; the labels are named too so they stay above it mid-flight */}
								{active && (
									<ViewTransition name="page-nav-pill" share="page-nav" default="none">
										<span aria-hidden className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(14,58,81,0.15)]" />
									</ViewTransition>
								)}
								<ViewTransition name={`page-nav-label-${i}`} share="page-nav-label" default="none">
									<span className="relative" {...payloadEditable(`content.${data.blockIndex}.menu.${i}.name`)}>{m.name || m.page?.title}</span>
								</ViewTransition>
							</Link>
						);
					})}
				</nav>
			</div>
		</section>
		</ViewTransition>
	);
};

export default ProductProductHeader;
