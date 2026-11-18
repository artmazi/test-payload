// Run: node --test --experimental-strip-types src/helpers/markdown.test.ts
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { md2htmlBreaks } from './markdown.ts'

test('line breaks and bold stay as before', () => {
  assert.equal(md2htmlBreaks('a\n**b**'), 'a<br /><strong>b</strong>')
  assert.equal(md2htmlBreaks(null), '')
})

test('"- " lines become one list, with no stray breaks around it', () => {
  assert.equal(
    md2htmlBreaks('Intro:\n- one\n- **two**\nAfter'),
    'Intro:<ul class="list-disc pl-6 my-2 space-y-1"><li>one</li><li><strong>two</strong></li></ul>After',
  )
})

test('a line starting with bold is not a list item', () => {
  assert.equal(md2htmlBreaks('**Bold** start'), '<strong>Bold</strong> start')
})
