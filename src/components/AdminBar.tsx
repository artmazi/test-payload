"use client";

import { useEffect, useState } from 'react';

// Shown only to logged-in users (rendered by the page route after payload.auth)
export default function AdminBar({ pageId, email }: { pageId: string; email?: string }) {
	const [inIframe, setInIframe] = useState(false);
	// The admin's live preview loads the page in an iframe, where the bar is just noise
	useEffect(() => setInIframe(window.self !== window.top), []);
	if (inIframe) return null;

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
