"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React, { useState } from 'react';
import { bgImage } from '@/helpers/bgImage';

const Chevron = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
		<path d="m6 9 6 6 6-6" />
	</svg>
);

const HomeLanding = ({ data }: { data: any }) => {
	const [open, setOpen] = useState(false);
	const bg = data.bgImage?.url || '/home-hero.webp';

	return (
		<section
			style={{ backgroundImage: bgImage(bg) }}
			className="relative isolate flex flex-col text-white gap-4 items-center justify-center w-full bg-top bg-no-repeat bg-cover min-h-[100vh] py-16">
			{/* Darken the busy photo: navy wash top/bottom plus a soft spot behind the text */}
			<div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-blackTeal/70 via-blackTeal/40 to-blackTeal/85" />
			<div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(0,20,35,0.6),transparent)]" />

			<div className="container flex-grow flex flex-col">
				<div className="flex flex-col gap-12 md:gap-16 px-4 flex-grow justify-center">
					<div className="text-center [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]">
						<h1
							className="mx-auto max-w-4xl text-[28px] md:text-[48px] leading-[1.15] font-extrabold tracking-tight text-balance"
							{...payloadEditable(`content.${data.blockIndex}.title`)}>
							{data.title}
						</h1>
						<p
							className="mx-auto mt-5 max-w-2xl text-b2 md:text-[20px] leading-relaxed text-white/85 text-balance"
							{...payloadEditable(`content.${data.blockIndex}.description`)}>
							{data.description}
						</p>
					</div>

					<div className="relative w-full px-0 md:px-4">
						{/* Hover opens on desktop, click toggles on touch */}
						<div
							onMouseEnter={() => setOpen(true)}
							onMouseLeave={() => setOpen(false)}
							className="relative mx-auto w-full max-w-[700px]">
							<button
								type="button"
								aria-expanded={open}
								onClick={() => setOpen((o) => !o)}
								className={clsx(
									'group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 md:px-7 md:py-6 text-left text-b1 md:text-[20px] font-medium backdrop-blur-md transition-all cursor-pointer',
									open ? 'border-white bg-white/15' : 'border-white/60 bg-white/5 hover:border-white hover:bg-white/10'
								)}>
								{data.chooseCategory}
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
									<Chevron className={clsx('h-5 w-5 transition-transform duration-200', open && 'rotate-180')} />
								</span>
							</button>

							{/* pt bridges the gap so hover doesn't drop between trigger and menu */}
							<div className={clsx('absolute left-0 right-0 top-full z-10 pt-2', open ? 'block' : 'hidden')}>
								<div className="grid gap-1 rounded-2xl bg-white p-2 text-blackTeal shadow-2xl shadow-black/30 md:grid-cols-2">
									{data.categories?.map((c: any, i: number) => (
										<Link
											key={c.id ?? i}
											href={c.url}
											className="group/item flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-b2 font-medium transition-colors hover:bg-water hover:text-sky">
											{c.title}
											<Chevron className="h-4 w-4 shrink-0 -rotate-90 text-sky opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<nav className="w-full text-center md:absolute bottom-8 left-0 gap-x-6 gap-y-2 md:gap-x-8 flex justify-center pb-4 md:pb-0 flex-wrap text-b3 text-white/70">
					{data.links?.map((l: any, i: number) => (
						<Link key={l.id ?? i} href={l.url} className="transition-colors hover:text-white">
							{l.title}
						</Link>
					))}
				</nav>
			</div>
		</section>
	);
};

export default HomeLanding;
