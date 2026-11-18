"use client";

import clsx from 'clsx';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { md2html } from '@/helpers/markdown';
import { splitDocument, type DocPart } from '@/helpers/splitDocument';

// Text follows the indent of the nearest sub-heading above it
const subIndent = (parts: DocPart[], i: number) => {
	const prev = parts.slice(0, i).findLast((p) => p.type === 'sub');
	if (!prev || prev.type !== 'sub') return '';
	return prev.depth === 1 ? 'pl-4 md:pl-6' : 'pl-8 md:pl-12';
};

// Real paragraphs instead of blank lines under pre-line, so the gap is set by CSS (1em) rather than a full empty line
const Paragraphs = ({ md, className }: { md: string; className?: string }) => (
	<div className={clsx('flex flex-col gap-4', className)}>
		{md
			.split(/\n[\s\u00a0]*\n/)
			.map((para) => para.trim())
			.filter(Boolean)
			.map((para, i) => (
				<p key={i} className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: md2html(para) }} />
			))}
	</div>
);

// Id of the section whose heading has scrolled past the anchor landing line (sticky bars + 36px, see globals.css)
// select(id) is for TOC clicks: highlight the target at once and ignore the smooth scroll that passes the sections in between
const useActiveSection = (ids: string[]) => {
	const [active, setActive] = useState<string>();
	const key = ids.join(',');
	// 'jumping' while a click's scroll runs; 'pinned' after it lands, until the user scrolls again
	const mode = useRef<'free' | 'jumping' | 'pinned'>('free');
	const idle = useRef<ReturnType<typeof setTimeout>>(undefined);
	// Scroll counts as finished after this long without scroll events (scrollend isn't in every browser yet)
	const settle = () => {
		clearTimeout(idle.current);
		idle.current = setTimeout(() => (mode.current = 'pinned'), 150);
	};
	const select = (id: string) => {
		setActive(id);
		mode.current = 'jumping';
		settle();
	};

	useEffect(() => {
		if (!ids.length) return;
		let frame = 0;
		const update = () => {
			frame = 0;
			// +12px tolerance so a heading reached via a TOC click counts as passed
			const line = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-top') || '0') + 36 + 12;
			const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
			let current: string | undefined;
			for (const id of ids) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= line) current = id;
			}
			// Short final sections can never reach the line, so the bottom of the page selects the last one
			setActive(atBottom ? ids[ids.length - 1] : current);
		};
		const onScroll = () => {
			if (mode.current === 'jumping') return settle();
			mode.current = 'free';
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(idle.current);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	return [active, select] as const;
};

// Also used by the Rich Text block's Document layout (content serialized to markdown first)
export const DocumentLayout = ({ data }: { data: any }) => {
	const { title, intro, sections } = splitDocument(data.content);
	const hasToc = sections.length >= 3;
	// First intro paragraph is metadata ("Version von …", "Letzte Aktualisierung …"); any further ones are real text
	const [introMeta = '', ...rest] = intro.split(/\n[\s\u00a0]*\n/);
	const introRest = rest.join('\n\n');
	const [active, selectSection] = useActiveSection(hasToc ? sections.map((s) => s.id) : []);
	const navRef = useRef<HTMLElement>(null);

	// Keep the highlighted entry visible when the TOC itself is taller than the viewport
	useEffect(() => {
		const nav = navRef.current;
		const link = active && nav?.querySelector<HTMLElement>(`a[href="#${active}"]`);
		if (!nav || !link) return;
		if (link.offsetTop < nav.scrollTop || link.offsetTop + link.offsetHeight > nav.scrollTop + nav.clientHeight) {
			nav.scrollTo({ top: link.offsetTop - nav.clientHeight / 2, behavior: 'smooth' });
		}
	}, [active]);
	const body = 'break-words text-b2 leading-[1.65] text-teal/80 [&_strong]:text-teal [&_a]:text-sky [&_a]:underline';

	return (
		<section id="wysiwyg" className="flex flex-col">
			<div className="w-full max-w-[1200px] mx-auto px-4 md:px-16 pt-8 pb-8 md:pt-10 md:pb-12 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
				{/* Aside always renders so the text column lines up across legal pages; a TOC only pays off from 3 sections */}
				<aside className="hidden lg:block">
					{/* Sits below the sticky header and in-page menu (--sticky-top, see globals.css) */}
					{hasToc && (
						<nav ref={navRef} aria-label="Inhalt" className="sticky top-[calc(var(--sticky-top)+44px)] max-h-[calc(100vh-var(--sticky-top)-64px)] overflow-y-auto pr-2">
							{/* shortcut: label is German only, make it a field when other locales get content */}
							<p className="mb-3 text-b3 font-semibold uppercase tracking-wider text-gray">Inhalt</p>
							<ol className="flex flex-col border-l border-[#0000001A]">
								{sections.map((s) => (
									<li key={s.id}>
										<a
											href={`#${s.id}`}
											onClick={() => selectSection(s.id)}
											aria-current={active === s.id ? 'location' : undefined}
											className={clsx(
												'-ml-px flex gap-2 border-l-2 py-1.5 pl-4 text-b3 leading-snug transition-colors hover:border-sky hover:text-sky',
												active === s.id ? 'border-sky font-semibold text-sky' : 'border-transparent text-teal/70'
											)}>
											{s.num && <span className={clsx('w-5 shrink-0 tabular-nums', active === s.id ? 'text-sky' : 'text-gray')}>{s.num}.</span>}
											{s.title}
										</a>
									</li>
								))}
							</ol>
						</nav>
					)}
				</aside>

				<article className="max-w-[72ch]" {...payloadEditable(`content.${data.blockIndex}.content`)}>
					{title && <h1 className="text-[28px] md:text-h2 font-bold leading-tight text-teal text-balance">{title}</h1>}
					{intro && (
						<>
							<Paragraphs md={introMeta} className="mt-3 text-b2 text-gray" />
							{introRest && <Paragraphs md={introRest} className={clsx('mt-6', body)} />}
						</>
					)}
					{sections.map((s) => (
						<div key={s.id} className="mt-8 md:mt-10 border-t border-[#0000000F] pt-8 md:pt-10">
							<h2 id={s.id} className="scroll-mt-[calc(var(--sticky-top)+36px)] flex gap-3 text-[20px] md:text-[22px] font-semibold leading-snug text-teal">
								{s.num && <span className="text-sky tabular-nums">{s.num}.</span>}
								{s.title}
							</h2>
							{s.parts.map((p, i) =>
								p.type === 'sub' ? (
									// Indent by depth so 13.2.1 visibly sits under 13.2, which sits under 13
									<h3
										key={i}
										className={clsx(
											'flex gap-3 font-semibold leading-snug text-teal',
											p.depth === 1 ? 'mt-8 text-b1 pl-4 md:pl-6' : 'mt-6 text-b2 pl-8 md:pl-12'
										)}>
										{p.num && <span className="shrink-0 tabular-nums text-sky">{p.num}</span>}
										{p.title}
									</h3>
								) : (
									// Tighter after a heading than between paragraphs, so text reads as belonging to it
									<Paragraphs key={i} md={p.md} className={clsx(i === 0 || s.parts[i - 1].type === 'sub' ? 'mt-3' : 'mt-4', body, subIndent(s.parts, i))} />
								)
							)}
						</div>
					))}
				</article>
			</div>
		</section>
	);
};

const ProductWysiwyg = ({ data }: { data: any }) => {
	if (data.layout === 'document') return <DocumentLayout data={data} />;

	return (
		<section id="wysiwyg" className="flex flex-col">
			<div className="flex w-full max-w-[1200px] py-6 md:py-16 md:px-16 xl:px-16 px-4 mx-auto gap-16 flex-col">
				<div className={clsx('text-center gap-8 flex flex-col', data.classNames)}>
					<div className="text-b1 text-gray whitespace-pre-line break-words [&>span]:font-semibold [&>a]:text-sky" {...payloadEditable(`content.${data.blockIndex}.content`)} dangerouslySetInnerHTML={{ __html: md2html(data.content) }} />
				</div>
			</div>
		</section>
	);
};

export default ProductWysiwyg;
