// Serializes Lexical rich text into the Markdown dialect the Document layout reads (see splitDocument.ts):
// h1 -> bold title line, h2 "3. Preise" -> numbered section, other h2 -> "## ", h3+ "13.2. X" -> numbered sub-heading,
// other h3+ -> "### ", lists -> one line per item.
type Node = { type: string; children?: Node[]; [key: string]: any };

const BOLD = 1;
const ITALIC = 2;

// Text is inserted into HTML by md2html, so neutralise markup typed into the editor
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const inline = (nodes: Node[] = []): string =>
	nodes
		.map((n) => {
			if (n.type === 'text') {
				let t = escape(n.text ?? '');
				if (n.format & ITALIC) t = `<em>${t}</em>`;
				if (n.format & BOLD) t = `**${t}**`;
				return t;
			}
			if (n.type === 'linebreak') return '\n';
			if (n.type === 'link' || n.type === 'autolink') {
				const url = n.fields?.url ?? n.url ?? '';
				return `[${inline(n.children)}](${url})`;
			}
			return inline(n.children);
		})
		.join('');

const block = (n: Node): string => {
	switch (n.type) {
		case 'heading': {
			const text = inline(n.children).replace(/\*\*/g, '').trim();
			if (n.tag === 'h1') return `**${text}**`;
			if (n.tag === 'h2') return /^\d+\.\s/.test(text) ? `**${text}**` : `## ${text}`;
			// "13.2.1. Verfügbarkeit": a plain numbered line keeps its depth and number styling
			return /^\d+(\.\d+)+\.?\s/.test(text) ? text : `### ${text}`;
		}
		case 'list':
			return (n.children ?? [])
				.map((item, i) => `${n.listType === 'number' ? `${(n.start ?? 1) + i}.` : '•'} ${inline(item.children)}`)
				.join('\n');
		case 'horizontalrule':
			return '';
		default:
			return inline(n.children);
	}
};

export function lexicalToMarkdown(data: any): string {
	const children: Node[] = data?.root?.children ?? [];
	return children
		.map(block)
		.filter((s) => s.trim())
		.join('\n\n');
}
