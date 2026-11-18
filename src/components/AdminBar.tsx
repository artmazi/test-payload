"use client";

import { useEffect, useState } from 'react';

export const ADMIN_KEY = 'i3d-admin-email';
// Runs before the first paint (inlined in the layout): a remembered login opens the bar via CSS, so it never jumps in
export const adminBarBootScript = `try{if(window.self===window.top&&localStorage.getItem('${ADMIN_KEY}')!==null)document.documentElement.classList.add('i3d-admin')}catch(e){}`;

const setOpen = (open: boolean) => document.documentElement.classList.toggle('i3d-admin', open);

// Shown only to logged-in users. Pages are static, so the login is confirmed in the browser via /api/users/me;
// a first login slides the bar open, a logout closes it. Open/closed is the `i3d-admin` class on <html> (see globals.css).
export default function AdminBar({ pageId }: { pageId: string }) {
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		// The admin's live preview loads the page in an iframe, where the bar is just noise
		if (window.self !== window.top) return;
		try {
			setEmail(localStorage.getItem(ADMIN_KEY));
		} catch {}
		fetch('/api/users/me', { credentials: 'include' })
			.then((r) => (r.ok ? r.json() : null))
			.then((d) => {
				const next: string | null = d?.user ? d.user.email || '' : null;
				setEmail(next);
				setOpen(next !== null);
				try {
					if (next === null) localStorage.removeItem(ADMIN_KEY);
					else localStorage.setItem(ADMIN_KEY, next);
				} catch {}
			})
			.catch(() => {});
	}, []);

	return (
		<div id="admin-bar" className="admin-bar order-first grid w-full">
			<div className="overflow-hidden">
				<div className="flex h-10 items-center justify-between gap-4 bg-blackTeal px-4 text-b3 text-white">
					<div className="flex items-center gap-4">
						<a href="/admin" className="font-semibold hover:text-sky">Admin</a>
						<a href={`/admin/collections/pages/${pageId}`} className="hover:text-sky">Edit page</a>
						<a href={`/admin/visual-editor/pages/${pageId}`} className="hover:text-sky">Visual editor</a>
					</div>
					<div className="flex items-center gap-4">
						{email ? <span className="hidden text-white/60 sm:inline">{email}</span> : null}
						<a
							href="/admin/logout"
							className="hover:text-sky"
							onClick={() => {
								try {
									localStorage.removeItem(ADMIN_KEY);
								} catch {}
							}}>
							Log out
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
