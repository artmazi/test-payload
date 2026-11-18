"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import facebook from '@/assets/socials/facebook.svg';
import instagram from '@/assets/socials/instagram.svg';
import linkedin from '@/assets/socials/linkedin.svg';
import twitter from '@/assets/socials/twitter.svg';
import youtube from '@/assets/socials/youtube.svg';

const icons: Record<string, any> = { facebook, instagram, linkedin, twitter, youtube };

const Footer = ({ data }: any) => {
	const segments = (usePathname() || '').split('/').filter(Boolean);
	// The home page (/<locale> alone) carries its own bottom links
	if (segments.length <= 1) return null;
	const locale = segments[0];

	return (
		<footer className="container flex flex-col gap-8 w-full max-w-[1600px] mx-auto py-8 md:px-16 xl:px-32 px-4">
			<div className="flex flex-1 gap-4">
				<div className="flex flex-1 text-gray flex-col gap-6 text-b1">
					<p className="font-black">{data.companyName}</p>
					<p className="whitespace-pre-line">{data.companyAddress}</p>
					{data.companyPhone ? <a href={`tel:${data.companyPhone.replace(/[^\d+]/g, '')}`} className="hover:text-sky">{data.companyPhone}</a> : null}
					{data.companyEmail ? <a href={`mailto:${data.companyEmail}`} className="hover:text-sky">{data.companyEmail}</a> : null}
				</div>
				<div className="flex flex-1 lg:flex-2 justify-end">
					<iframe
						title="Map"
						src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10787.624860124415!2d8.305585!3d47.472257!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47901340285400e5%3A0x12d189dce86a1820!2siNovitas%20AG!5e0!3m2!1sen!2sus!4v1693416594662!5m2!1sen!2sus"
						width="400"
						height="200"
						loading="lazy"
						className="w-full"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</div>
			<hr className="w-full border-gray opacity-10" />
			<div className="flex text-gray flex-col lg:flex-row gap-4 lg:gap-0">
				<div className="flex flex-1 justify-center lg:justify-start">
					<p className="text-b3">{data.copyrights}</p>
				</div>
				<div className="flex flex-2 justify-between flex-col lg:flex-row gap-6 lg:gap-0">
					<div className="flex flex-wrap justify-center gap-x-8 gap-y-2 lg:justify-start">
						{(data.links || []).map((l: any, i: number) => (
							<Link key={i} className="text-b3 hover:text-sky" href={l.url?.startsWith('/') ? `/${locale}${l.url}` : l.url || '#'}>
								{l.title}
							</Link>
						))}
					</div>
					<div className="flex gap-3 justify-center lg:justify-start">
						{(data.socials || []).map((s: any, i: number) =>
							icons[s.type] ? (
								<a href={s.url} target="_blank" rel="noreferrer" key={i} aria-label={s.type}>
									<Image src={icons[s.type]} alt="" />
								</a>
							) : null,
						)}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
