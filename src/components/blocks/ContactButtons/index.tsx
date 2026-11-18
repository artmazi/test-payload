"use client";

import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

const icon = 'h-5 w-5 shrink-0';
const PhoneIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
	</svg>
);
const MailIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">
		<rect x="2" y="4" width="20" height="16" rx="2" />
		<path d="m22 7-10 6L2 7" />
	</svg>
);

const LinkIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden="true">
		<path d="M5 12h14" />
		<path d="m12 5 7 7-7 7" />
	</svg>
);

type ButtonData = { type: 'phone' | 'email' | 'link'; label: string; value: string };

// Href, icon and link attributes follow from the button type
const toLink = ({ type, value = '' }: ButtonData) => {
	if (type === 'phone') return { href: `tel:${value.replace(/[^\d+]/g, '')}`, Icon: PhoneIcon, extra: {} };
	if (type === 'email') return { href: `mailto:${value.trim()}`, Icon: MailIcon, extra: {} };
	const external = /^https?:\/\//.test(value);
	return { href: value, Icon: LinkIcon, extra: external ? { target: '_blank', rel: 'noopener noreferrer' } : {} };
};

const button =
	'inline-flex items-center justify-center gap-3 rounded-full border border-sky px-6 py-3 text-b2 font-medium text-sky transition-colors hover:bg-sky hover:text-white';

const ContactButtons = ({ data }: { data: any }) => (
	<section id="contact-buttons" className="flex flex-col">
		{/* By default the same grid as the Document layout, so it lines up with the text column; "centered" drops the TOC column */}
		<div className={data.centered ? 'w-full max-w-[1200px] mx-auto px-4 md:px-16 pb-16 md:pb-24 flex justify-center' : 'w-full max-w-[1200px] mx-auto px-4 md:px-16 pb-16 md:pb-24 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16'}>
			<div className={`${data.centered ? 'w-full' : 'lg:col-start-2'} max-w-[72ch] rounded-2xl bg-water/50 p-6 md:p-8 text-center`}>
				{data.text && (
					<p className="mb-5 text-b1 font-semibold text-teal whitespace-pre-line" {...payloadEditable(`content.${data.blockIndex}.text`)}>
						{data.text}
					</p>
				)}
				<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
					{(data.buttons as ButtonData[] | undefined)?.map((b, i) => {
						const { href, Icon, extra } = toLink(b);
						return (
							<a key={i} href={href} className={button} {...extra}>
								<Icon />
								<span {...payloadEditable(`content.${data.blockIndex}.buttons.${i}.label`)}>{b.label}</span>
							</a>
						);
					})}
				</div>
			</div>
		</div>
	</section>
);

export default ContactButtons;
