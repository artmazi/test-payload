import { lexicalToMarkdown } from './lexicalToMarkdown.ts'
import { md2htmlBreaks } from './markdown.ts'

// Block text fields are Lexical rich text; values saved before the switch may still be Markdown strings
type Node = { type: string; children?: Node[]; [key: string]: any }

const BOLD = 1
const ITALIC = 2
const UNDERLINE = 8
const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const inline = (nodes: Node[] = []): string =>
	nodes
		.map((n) => {
			if (n.type === 'text') {
				let t = escape(n.text ?? '')
				if (n.format & UNDERLINE) t = `<u>${t}</u>`
				if (n.format & ITALIC) t = `<em>${t}</em>`
				if (n.format & BOLD) t = `<strong>${t}</strong>`
				return t
			}
			if (n.type === 'linebreak') return '<br />'
			if (n.type === 'link' || n.type === 'autolink') {
				const url = escape(n.fields?.url ?? n.url ?? '')
				const blank = n.fields?.newTab ? ' target="_blank"' : ' target="_self"'
				return `<a class="underline" href="${url}"${blank} rel="noopener noreferrer">${inline(n.children)}</a>`
			}
			return inline(n.children)
		})
		.join('')

const isList = (n?: Node) => n?.type === 'list'

// Inline HTML in the same shape md2htmlBreaks produced (paragraphs = blank line = two breaks, lists as <ul>),
// so it can go inside the blocks' existing <p>/<h3> wrappers and their [&_strong] styling still applies
export const richTextToHtml = (value: unknown): string => {
	if (!value) return ''
	if (typeof value === 'string') return md2htmlBreaks(value)
	const blocks: Node[] = (value as any)?.root?.children ?? []
	let html = ''
	blocks.forEach((n, i) => {
		// Paragraph after paragraph = blank line (two breaks); lists are block elements and space themselves
		if (i > 0 && !isList(n) && !isList(blocks[i - 1])) html += '<br /><br />'
		if (isList(n)) {
			const tag = n.listType === 'number' ? 'ol' : 'ul'
			const cls = tag === 'ol' ? 'list-decimal' : 'list-disc'
			html += `<${tag} class="${cls} pl-6 my-2 space-y-1">${(n.children ?? []).map((li) => `<li>${inline(li.children)}</li>`).join('')}</${tag}>`
		} else html += inline(n.children)
	})
	return html
}

// Block-level HTML that keeps each paragraph / heading as its own element, for layouts that style by tag
// (Facts mosaic: paragraphs are labels, headings are the figures)
export const richTextToBlocksHtml = (value: unknown): string => {
	const blocks: Node[] = (value as any)?.root?.children ?? []
	return blocks
		.map((n) => {
			if (n.type === 'heading' && /^h[1-6]$/.test(n.tag)) return `<${n.tag}>${inline(n.children)}</${n.tag}>`
			if (isList(n)) return richTextToHtml({ root: { children: [n] } })
			return `<p>${inline(n.children)}</p>`
		})
		.join('')
}

// For the Wysiwyg document layout, which parses Markdown
export const richTextToMarkdown = (value: unknown): string => (typeof value === 'string' ? value : value ? lexicalToMarkdown(value) : '')

export const hasRichText = (value: unknown): boolean => !!richTextToHtml(value).replace(/<br \/>/g, '').trim()
