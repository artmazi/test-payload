'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import React from 'react';

import { btnStyles } from '@/components/Button';
import { linkHref } from '@/helpers/linkHref';

// Renders a buttonsField value. `secondaryClassName` adapts the outlined style to the block's background.
const LinkButtons = ({ buttons, path, secondaryClassName }: { buttons?: any[]; path: string; secondaryClassName?: string }) => {
	const { locale } = useParams<{ locale: string }>();
	if (!buttons?.length) return null;

	return (
		<div className="flex flex-wrap gap-4">
			{buttons.map((b: any, i: number) => {
				const href = linkHref(b, locale);
				// Full URLs leave the site (e.g. the trial signup), so they open in a new tab
				const external = /^https?:\/\//.test(href);
				return (
					<Link
						key={b.id ?? i}
						href={href}
						{...(external && { target: '_blank', rel: 'noopener noreferrer' })}
						// Links don't centre their text like <button>s, and the row stretches them to equal height
						className={clsx('inline-flex items-center justify-center text-center w-fit hover:opacity-90 transition-all', btnStyles[b.style || 'primary'], b.style === 'secondary' && secondaryClassName)}>
						<span {...payloadEditable(`${path}.${i}.title`)}>{b.title || b.page?.title}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default LinkButtons;
