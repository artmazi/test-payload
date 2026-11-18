"use client";

import { useEffect, useState } from 'react';

// Shown only to logged-in users. The login is checked in the browser so pages can stay static and cached.
export default function AdminBar({ pageId }: { pageId: string }) {
	const [email, setEmail] = useState<string | null>(null);
	useEffect(() => {
		// The admin's live preview loads the page in an iframe, where the bar is just noise
		if (window.self !== window.top) return;
		fetch('/api/users/me', { credentials: 'include' })
			.then((r) => (r.ok ? r.json() : null))
			.then((d) => d?.user && setEmail(d.user.email || ''))
			.catch(() => {});
	}, []);
	if (email === null) return null;

	return (
		<div id="admin-bar" className="order-first flex h-10 w-full items-center justify-between gap-4 bg-blackTeal px-4 text-b3 text-white">
			<div className="flex items-center gap-4">
				<a href="/admin" className="font-semibold hover:text-sky">Admin</a>
				<a href={`/admin/collections/pages/${pageId}`} className="hover:text-sky">Edit page</a>
				<a href={`/admin/visual-editor/pages/${pageId}`} className="hover:text-sky">Visual editor</a>
			</div>
			<div className="flex items-center gap-4">
				{email ? <span className="hidden text-white/60 sm:inline">{email}</span> : null}
				<a href="/admin/logout" className="hover:text-sky">Log out</a>
			</div>
		</div>
	);
}
