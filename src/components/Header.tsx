"use client";

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Button from '@/components/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Logo = '/logo.svg';
const SupportAgent = '/support-agent.svg';

// From infra3dcom's i18n home.buttons (to_platform / demo)
const homeButtons: Record<string, { login: string; trial: string }> = {
	de: { login: 'Login', trial: 'Trial' },
	en: { login: 'Login', trial: 'Trial' },
	fr: { login: 'Se connecter', trial: 'Compte d’essai' },
};

const Header = ({ categoryMenus = {} }: { categoryMenus?: Record<string, any[]> }) => {
	const { pathname } = { pathname: usePathname() || '' };

	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [openSection, setOpenSection] = useState<number | null>(null);
	const [panelTop, setPanelTop] = useState(0);
	const headerRef = useRef<HTMLElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	// Mobile menu: close on navigation; while open lock page scroll, Esc closes, focus moves in and back out
	useEffect(() => setShowMobileMenu(false), [pathname]);
	useEffect(() => {
		if (!showMobileMenu) return;
		setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
		const overflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowMobileMenu(false);
		window.addEventListener('keydown', onKey);
		panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
		const toggle = toggleRef.current;
		return () => {
			document.body.style.overflow = overflow;
			window.removeEventListener('keydown', onKey);
			toggle?.focus({ preventScroll: true });
		};
	}, [showMobileMenu]);

	// Elevate the sticky header once content scrolls under it
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const partialPath = pathname.split('/');
	const locale = partialPath[1] || 'de';
	// Menu URLs are stored without locale: /verwaltungen/platform -> /de/verwaltungen/platform
	const toHref = (url?: string) => (!url ? '#' : url.startsWith('/') ? `/${locale}${url}` : url);
	// Active = same category and section, so /verwaltungen/software/* marks the "Software" item
	const isActiveLink = (url?: string) => {
		if (!url?.startsWith('/')) return false;
		const [cat, section] = url.split('/').filter(Boolean);
		return cat === partialPath[2] && (section ?? '') === (partialPath[3] ?? '');
	};

	// The header shows the menu of the category in the URL; global pages (no category segment) show none
	const menuItems = categoryMenus[partialPath[2]] || [];

	// The home page (/<locale> alone) keeps infra3dcom's own top bar over the hero: logo, Login, Trial, language
	if (partialPath.filter(Boolean).length <= 1) {
		const labels = homeButtons[partialPath[1]] || homeButtons.de;
		return (
			<header className="absolute top-0 left-0 w-full z-[999]">
				<div className="p-2 md:m-0 md:mt-[50px] flex w-full justify-between items-center md:px-16 sm:px-4 xl:px-32">
					<div>
						<img alt="logo" src={Logo} className="max-h-[50px] pl-2 md:pl-0 md:max-h-[70px]" />
					</div>
					<div className="flex items-center gap-2 md:gap-3">
						<a
							href="https://app.infra3d.com/login"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full border border-white/50 px-4 md:px-6 py-2 text-b3 md:text-b2 font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10">
							{labels.login}
						</a>
						<a
							href="https://app.infra3d.com/signup/trial"
							target="_blank"
							rel="noopener noreferrer"
							className="rounded-full bg-sky px-4 md:px-6 py-2 text-b3 md:text-b2 font-semibold text-white shadow-lg shadow-sky/30 transition-all hover:brightness-110">
							{labels.trial}
						</a>
						<LanguageSwitcher className="!ms-1" />
					</div>
				</div>
			</header>
		);
	}

	return (
		<header ref={headerRef} className={clsx('flex w-full bg-white sticky top-0 z-[999] custom-header-styles border-b border-[#0000000F] transition-shadow duration-200', scrolled && 'shadow-[0_6px_20px_-8px_rgba(14,58,81,0.18)]')}>
			<div className="flex w-full mx-auto py-4 lg:px-16 px-4 flex-row items-center justify-between gap-8">
				
				{/* Logo */}
				<Link href={`/${partialPath[1] || ''}`} className="cursor-pointer shrink-0">
					<img alt="logo" src={Logo} className="max-h-[70px] logo" />
				</Link>

				{/* Mobile: language + menu toggle (48px tap target) */}
				<div className="xl:hidden flex items-center gap-2">
					<LanguageSwitcher />
					{menuItems.length > 0 && (
						<button
							ref={toggleRef}
							type="button"
							aria-expanded={showMobileMenu}
							aria-controls="mobile-menu"
							aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
							onClick={() => {
								// Open with the current section expanded
								if (!showMobileMenu) setOpenSection(menuItems.findIndex((i: any) => [i, ...(i.subMenus || [])].some((x: any) => isActiveLink(x.url))));
								setShowMobileMenu(!showMobileMenu);
							}}
							className="grid place-items-center w-12 h-12 -mr-2 rounded-full text-teal hover:bg-water transition-colors">
							<svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
								{showMobileMenu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M10 17h10" />}
							</svg>
						</button>
					)}
				</div>

				{/* Desktop menu */}
				<nav aria-label="Main" className="hidden xl:flex items-center gap-6 2xl:gap-8 text-teal">
						{menuItems.map((item: any, index: number) => (
							<div key={index} className="relative group flex items-center">
								<Link
									href={toHref(item.url || item.subMenus?.[0]?.url)}
									{...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
									className={clsx('flex items-center gap-1 py-2 h-fit border-b-2 border-transparent hover:border-teal transition-all the-link', {
										'border-b-2 !border-teal': item.url && isActiveLink(item.url),
									})}>
									{item.name}
									{item.subMenus?.length > 0 && (
										<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
											<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
										</svg>
									)}
								</Link>

								{/* Sub-items: hover / keyboard-focus dropdown.
								    The dropdown's top padding bridges the gap so the pointer can travel into it. */}
								{item.subMenus?.length > 0 && (
									<div className="hidden group-hover:block group-focus-within:block absolute top-full left-1/2 -translate-x-1/2 pt-2 z-10">
										<div className="flex flex-col min-w-[220px] py-2 bg-white rounded-md border border-[#0000000F] shadow-[0_10px_30px_-10px_rgba(14,58,81,0.25)]">
											{item.subMenus.map((subItem: any, subIndex: number) => {
												const href = toHref(subItem.url);
												return (
													<Link
														key={subIndex}
														href={href}
														aria-current={href === pathname ? 'page' : undefined}
														className={clsx(
															'px-4 py-2 text-b2 whitespace-nowrap transition-colors hover:bg-water',
															href === pathname && 'text-sky font-semibold',
														)}>
														{subItem.name}
													</Link>
												);
											})}
										</div>
									</div>
								)}
							</div>
						))}
						
					{menuItems.length > 0 && (
						<Button color="primary" onClick={() => window.open('https://app.infra3d.com/signup/trial', '_blank')}>
							Trial
						</Button>
					)}
				</nav>

				{/* Mobile menu: panel under the header (logo and close stay visible), accordion sections, contact + CTA pinned to the bottom */}
				{menuItems.length > 0 && (
					<div
						id="mobile-menu"
						ref={panelRef}
						inert={!showMobileMenu}
						style={{ top: panelTop }}
						className={clsx(
							'xl:hidden fixed inset-x-0 bottom-0 z-[1000] flex flex-col bg-white motion-safe:transition-[opacity,transform] motion-safe:duration-200',
							showMobileMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
						)}>
						<nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-4 py-2">
							<ul className="divide-y divide-[#0000000F]">
								{menuItems.map((item: any, index: number) => {
									const subs = item.subMenus || [];
									const active = [item, ...subs].some((x: any) => isActiveLink(x.url));
									const rowClass = clsx('flex items-center justify-between w-full min-h-[56px] text-lg text-left', active ? 'text-sky font-semibold' : 'text-teal');
									if (!subs.length)
										return (
											<li key={index}>
												<Link href={toHref(item.url)} {...(item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-current={isActiveLink(item.url) ? 'page' : undefined} className={rowClass}>
													{item.name}
													{item.newTab && <span aria-hidden="true" className="text-gray text-base">↗</span>}
												</Link>
											</li>
										);
									const open = openSection === index;
									return (
										<li key={index}>
											<button type="button" aria-expanded={open} aria-controls={`mm-${index}`} onClick={() => setOpenSection(open ? null : index)} className={rowClass}>
												{item.name}
												<svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={clsx('w-5 h-5 text-gray motion-safe:transition-transform', open && 'rotate-180')}>
													<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
												</svg>
											</button>
											<ul id={`mm-${index}`} hidden={!open} className="pb-3">
												{/* A parent with its own page stays reachable as the first entry */}
												{item.url && (
													<li>
														<Link href={toHref(item.url)} className="flex items-center min-h-[44px] pl-4 border-l-2 border-[#0000000F] text-b1 text-gray">
															{item.name} – Übersicht
														</Link>
													</li>
												)}
												{subs.map((sub: any, si: number) => {
													const href = toHref(sub.url);
													const current = href === pathname;
													return (
														<li key={si}>
															<Link href={href} aria-current={current ? 'page' : undefined} className={clsx('flex items-center min-h-[44px] pl-4 border-l-2 text-b1', current ? 'border-sky text-sky font-semibold bg-light' : 'border-[#0000000F] text-teal')}>
																{sub.name}
															</Link>
														</li>
													);
												})}
											</ul>
										</li>
									);
								})}
							</ul>
						</nav>
						<div className="border-t border-[#0000000F] px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col gap-3">
							<Button color="primary" className="w-full !py-3" onClick={() => window.open('https://app.infra3d.com/signup/trial', '_blank')}>
								Trial
							</Button>
							<div className="grid grid-cols-2 gap-3">
								<a href="tel:+41565520570" className="flex items-center justify-center gap-2 min-h-[44px] rounded border border-[#0000001A] text-b2 text-teal">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
									Anrufen
								</a>
								<a href="mailto:sales@inovitas.ch" className="flex items-center justify-center gap-2 min-h-[44px] rounded border border-[#0000001A] text-b2 text-teal">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
									E-Mail
								</a>
							</div>
						</div>
					</div>
				)}

				{/* Desktop Right Side: Agent + Lang Switcher */}
				<div className="flex-row justify-center items-center gap-3 hidden xl:flex">
					{/* Phone / email only from 1536px: below that the 7-item menu needs the room (the footer and contact cards repeat it) */}
					<div className="hidden min-[1536px]:flex gap-1">
						<figure className="shrink-0 mr-2 relative p-3 bg-teal rounded-full before:absolute before:w-[16px] before:h-[16px] before:right-[7.5%] before:top-0 before:rounded-full before:content-[' '] before:animate-spulse before:bg-green">
							<img src={SupportAgent} className="w-[24px] h-[24px]" alt="agent-icon" />
						</figure>
						<div className="flex flex-col">
							<a className="text-b1 text-gray font-semibold whitespace-nowrap" href="tel:+41565520570">
								+41 56 552 05 70
							</a>
							<a className="text-b3 text-gray" href="mailto:sales@inovitas.ch">
								sales@inovitas.ch
							</a>
						</div>
					</div>
					<LanguageSwitcher className="ms-4" />
				</div>
			</div>
		</header>
	);
};

export default Header;
