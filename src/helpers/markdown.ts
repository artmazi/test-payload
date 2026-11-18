export function md2html(markdown: string): string {
	return markdown
		.replace(
			/\[([^\]]+)\]\(((?:https?:\/\/|mailto:|tel:|\/)[^\s)]+)\)/g,
			'<a class="underline" href="$2" target="_self" rel="noopener noreferrer">$1</a>'
		) // Convert Markdown links (web, mailto:, tel: and site-relative)
		.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** text
		.replace(/__(.*?)__/g, '<strong>$1</strong>'); // Convert __bold__ text
}

// md2html plus line breaks and "- " bullet lists: replaces the old i18n <Trans> markup (<0/> = break, <0>x</0> = highlight) for CMS text
export const md2htmlBreaks = (markdown?: string | null): string => {
	let html = '';
	let items: string[] = [];
	let afterText = false; // a <br /> separates two text lines, but not a line from a list
	const flush = () => {
		if (!items.length) return;
		html += `<ul class="list-disc pl-6 my-2 space-y-1">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
		items = [];
		afterText = false;
	};
	for (const line of md2html(markdown || '').split('\n')) {
		const item = line.match(/^\s*[-*]\s+(.*)$/);
		if (item) {
			items.push(item[1]);
			continue;
		}
		flush();
		html += (afterText ? '<br />' : '') + line;
		afterText = true;
	}
	flush();
	return html;
};
