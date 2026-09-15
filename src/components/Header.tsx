"use client";

import clsx from 'clsx';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import Button from '@/components/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Logo = '/logo.svg';
const Menu = '/menu.svg';
const SupportAgent = '/support-agent.svg';
const X = '/x.svg';

const Header = ({ data }: any) => {
	const router = useRouter();
	const { pathname } = { pathname: usePathname() || '' };

	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const partialPath = pathname.split('/');
	const isActiveLink = (path: string) => path.includes(`/${partialPath[2]}`);

	const menuItems = data.menuItems || data.mobileMenuItems || [];

	return (
		<header className="flex w-full bg-white sticky top-0 z-[999] custom-header-styles">
			<div className="flex w-full mx-auto py-4 lg:px-16 xl:px-16 px-4 flex-row items-center justify-between">
				
				{/* Logo */}
				<div className="cursor-pointer z-[1001]" onClick={() => navigate.push('/')}>
					<img alt="logo" src={Logo} className="max-h-[70px] logo" />
				</div>

				{/* Hamburger / Mobile Lang Switcher */}
				<div className="lg:hidden flex items-center z-[1001]">
					<LanguageSwitcher className="mr-5" />
					<img 
						src={showMobileMenu ? X : Menu} 
						alt="menu" 
						className="cursor-pointer w-[24px] h-[24px]"
						onClick={() => setShowMobileMenu(!showMobileMenu)} 
					/>
				</div>

				{/* Unified Menu Container */}
				<div
					className={clsx(
						'fixed inset-0 z-[1000] flex flex-col bg-teal transition-all ease-in-out duration-300',
						'lg:static lg:flex-row lg:bg-transparent lg:h-auto lg:w-auto lg:p-0 lg:z-auto lg:translate-x-0',
						{
							'-translate-x-full lg:translate-x-0': !showMobileMenu,
							'translate-x-0': showMobileMenu,
						}
					)}>
					
					{/* Mobile Top Spacer (to account for absolute positioned logo/hamburger) */}
					<div className="h-[102px] lg:hidden w-full"></div>

					<nav className="flex flex-col lg:flex-row flex-1 lg:flex-none overflow-y-auto lg:overflow-visible px-4 lg:px-0 lg:items-center gap-2 lg:gap-8 menu-wrapper text-white lg:text-teal w-full lg:w-auto">
						{menuItems.map((item: any, index: number) => (
							<div key={index} className="flex flex-col lg:flex-row lg:items-center">
								<Link
									href={item.url || '#'}
									target={item.target || ''}
									onClick={() => setShowMobileMenu(false)}
									className={clsx(
										'py-2 h-fit border-b-2 border-transparent hover:border-teal transition-all the-link',
										{
											'border-b-2 !border-teal': item.url && isActiveLink(item.url),
										}
									)}>
									{item.name}
								</Link>

								{/* Mobile Submenus (Hidden on desktop in original design, or displayed as dropdowns? Currently hidden on desktop to match original behavior if desired) */}
								{item.subMenus && item.subMenus.length > 0 && (
									<div className="flex flex-col pl-4 lg:hidden">
										{item.subMenus.map((subItem: any, subIndex: number) => (
											<Link
												key={subIndex}
												href={subItem.url || '#'}
												onClick={() => setShowMobileMenu(false)}
												className={clsx(
													'py-1 h-fit border-b-2 border-transparent hover:border-teal transition-all text-sm',
													{
														'border-b-2 !border-teal': subItem.url && isActiveLink(subItem.url),
													}
												)}>
												{subItem.name}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
						
						{menuItems.length > 0 && (
							<Button
								color="primary"
								className="mt-4 lg:mt-0 w-fit"
								onClick={() => window.open('https://app.infra3d.com/signup/trial', '_blank')}>
								Trial
							</Button>
						)}
					</nav>
				</div>

				{/* Desktop Right Side: Agent + Lang Switcher */}
				<div className="flex-row justify-center items-center gap-3 hidden lg:flex">
					<div className="flex gap-1">
						<figure className="mr-2 relative p-3 bg-teal rounded-full before:absolute before:w-[16px] before:h-[16px] before:right-[7.5%] before:top-0 before:rounded-full before:content-[' '] before:animate-spulse before:bg-green">
							<img src={SupportAgent} className="w-[24px] h-[24px]" alt="agent-icon" />
						</figure>
						<div className="flex flex-col">
							<a className="text-b1 text-gray font-semibold" href="tel:+41565520570">
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
