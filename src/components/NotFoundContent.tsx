'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const copy: Record<string, { title: string; text: string; home: string; contact: string }> = {
	de: { title: 'Diese Strasse ist noch nicht digitalisiert.', text: 'Die gesuchte Seite gibt es nicht oder sie wurde verschoben. Über die Startseite finden Sie schnell wieder auf den richtigen Weg.', home: 'Zur Startseite', contact: 'Kontakt aufnehmen' },
	en: { title: 'This road hasn’t been digitised yet.', text: 'The page you are looking for doesn’t exist or has moved. The home page will get you back on track.', home: 'Back to home', contact: 'Contact us' },
	fr: { title: 'Cette route n’est pas encore numérisée.', text: 'La page recherchée n’existe pas ou a été déplacée. La page d’accueil vous remettra sur la bonne voie.', home: 'Retour à l’accueil', contact: 'Nous contacter' },
	it: { title: 'Questa strada non è ancora digitalizzata.', text: 'La pagina cercata non esiste o è stata spostata. La home page vi riporterà sulla strada giusta.', home: 'Alla home page', contact: 'Contattaci' },
};

export default function NotFoundContent() {
	const locale = (usePathname() || '/de').split('/')[1] || 'de';
	const t = copy[locale] || copy.de;
	return (
		<main className="flex flex-1 items-center bg-white">
			<section className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 py-16 md:px-16 lg:grid-cols-2 lg:py-24">
				<div className="flex flex-col gap-6 max-lg:order-2 max-lg:text-center max-lg:items-center">
					<h1 className="text-h2 md:text-h1 font-black leading-tight text-teal">{t.title}</h1>
					<p className="text-b1 text-gray max-w-[520px]">{t.text}</p>
					<div className="flex flex-wrap gap-4 max-lg:justify-center">
						<Link href={`/${locale}`} className="rounded bg-sky px-6 py-3 text-b1 text-white transition-colors hover:bg-teal">
							{t.home}
						</Link>
						<a href="mailto:sales@inovitas.ch" className="rounded border border-sky px-6 py-3 text-b1 text-teal transition-colors hover:bg-water">
							{t.contact}
						</a>
					</div>
				</div>
				{/* Brand motif: a road in perspective over a point cloud, with the 404 marked on the road */}
				<svg viewBox="0 0 480 360" className="w-full max-w-[520px] mx-auto max-lg:max-w-[320px]" aria-hidden="true">
					<defs>
						<linearGradient id="nf-sky" x1="0" y1="0" x2="1" y2="1">
							<stop offset="0" stopColor="#0E3A51" />
							<stop offset="1" stopColor="#0D92D2" />
						</linearGradient>
						<linearGradient id="nf-road" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
							<stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
						</linearGradient>
					</defs>
					<rect width="480" height="360" rx="24" fill="url(#nf-sky)" />
					{Array.from({ length: 10 }, (_, row) =>
						Array.from({ length: 22 }, (_, col) => (
							<circle key={`${row}-${col}`} cx={12 + col * 22 + (row % 2) * 11} cy={150 + row * 22} r={1 + row * 0.2} fill="#fff" opacity={0.1 + row * 0.04} />
						)),
					)}
					<path d="M225 130 L255 130 L400 360 L80 360 Z" fill="url(#nf-road)" />
					<path d="M240 145v22M240 190v30M240 248v40M240 315v45" stroke="#E96200" strokeWidth="6" strokeLinecap="round" />
					<text x="240" y="100" textAnchor="middle" fill="#fff" fontSize="96" fontWeight="900" letterSpacing="4">404</text>
					{/* Scan marker that missed: dashed frame with a question mark */}
					<rect x="318" y="196" width="70" height="56" rx="8" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="6 5" />
					<text x="353" y="234" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="700">?</text>
				</svg>
			</section>
		</main>
	);
}
