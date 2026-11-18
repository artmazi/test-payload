import assert from 'node:assert/strict'
import { test } from 'node:test'
import { richTextToHtml, hasRichText } from './richText.ts'

const t = (text: string, format = 0) => ({ type: 'text', text, format })
const p = (...children: any[]) => ({ type: 'paragraph', children })
const doc = (...children: any[]) => ({ root: { type: 'root', children } })

test('paragraphs, bold, line breaks', () => {
	assert.equal(richTextToHtml(doc(p(t('A '), t('B', 1)), p(t('x'), { type: 'linebreak' }, t('y')))), 'A <strong>B</strong><br /><br />x<br />y')
})

test('lists and links, text escaped', () => {
	const list = { type: 'list', listType: 'bullet', children: [{ type: 'listitem', children: [t('a<b')] }] }
	const link = { type: 'link', fields: { url: '/x', newTab: false }, children: [t('go')] }
	assert.equal(richTextToHtml(doc(p(link), list, p(t('z')))), '<a class="underline" href="/x" target="_self" rel="noopener noreferrer">go</a><ul class="list-disc pl-6 my-2 space-y-1"><li>a&lt;b</li></ul>z')
})

test('legacy markdown strings and empty values', () => {
	assert.equal(richTextToHtml('**x**'), '<strong>x</strong>')
	assert.equal(richTextToHtml(null), '')
	assert.equal(hasRichText(doc(p())), false)
})
