// Splits legal-style markdown into title, intro and numbered sections.
// A section starts at a line that is only bold and begins with a number ("**3. Preise**"), or at an unnumbered "## Heading".
// Inside a section, a line like "13.2.1.  Verfügbarkeit" is a sub-heading (depth = number of parts - 1); "### Heading" is an unnumbered one.
const NUMBERED = /^\s*\*\*\s*(\d+)\.[\s ]+(.+?)\*\*[\s ]*$/;
const SUB = /^[\s ]*(\d+(?:\.\d+)+)\.?[\s ]+(.+?)[\s ]*$/;
const MD_HEADING = /^\s*##\s+(.+?)\s*$/;
const MD_SUB = /^\s*###\s+(.+?)\s*$/;
const BOLD_LINE = /^\s*\*\*(.+?)\*\*[\s ]*$/;
const clean = (s: string) => s.replace(/[\s ]+/g, ' ').trim();
// Source text pads with runs of (non-breaking) spaces; pre-line keeps nbsp, so collapse them
const tidy = (s: string) => s.replace(/[  ]{2,}/g, ' ').trim();

export type DocPart = { type: 'text'; md: string } | { type: 'sub'; num: string; title: string; depth: number };
export type DocSection = { id: string; num: string; title: string; parts: DocPart[] };

const isSub = (line: string) => {
	const m = line.match(SUB);
	// A sentence ending in punctuation is body text that happens to start with a number
	return m && !/[.:;!?]$/.test(clean(m[2])) ? m : null;
};

export function splitDocument(md: string) {
	let title: string | undefined;
	const intro: string[] = [];
	const sections: (DocSection & { buf: string[] })[] = [];

	const flush = (s: (typeof sections)[number]) => {
		const text = tidy(s.buf.join('\n'));
		if (text) s.parts.push({ type: 'text', md: text });
		s.buf = [];
	};

	for (const line of (md || '').split('\n')) {
		const num = line.match(NUMBERED);
		const heading = !num && line.match(MD_HEADING);
		if (num || heading) {
			if (sections.length) flush(sections.at(-1)!);
			// Index in the id: source numbering can repeat (agb-deutschland has two "14.")
			const id = `section-${sections.length + 1}`;
			sections.push(num
				? { id, num: num[1], title: clean(num[2]), parts: [], buf: [] }
				: { id, num: '', title: clean((heading as RegExpMatchArray)[1]), parts: [], buf: [] });
			continue;
		}
		const current = sections.at(-1);
		const sub = current && isSub(line);
		if (current && sub) {
			flush(current);
			current.parts.push({ type: 'sub', num: sub[1], title: clean(sub[2]), depth: sub[1].split('.').length - 1 });
			continue;
		}
		const mdSub = current && line.match(MD_SUB);
		if (current && mdSub) {
			flush(current);
			current.parts.push({ type: 'sub', num: '', title: clean(mdSub[1]), depth: 1 });
			continue;
		}
		const bold = !title && !sections.length && line.match(BOLD_LINE);
		if (bold) {
			title = clean(bold[1]);
			continue;
		}
		(current?.buf ?? intro).push(line);
	}
	if (sections.length) flush(sections.at(-1)!);

	return {
		title,
		intro: tidy(intro.join('\n')),
		sections: sections.map(({ buf, ...s }) => s),
	};
}
