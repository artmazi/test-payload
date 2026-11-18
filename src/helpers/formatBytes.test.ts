import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatBytes } from './formatBytes.ts'

test('formatBytes', () => {
	assert.equal(formatBytes(0), '–')
	assert.equal(formatBytes(512), '512 B')
	assert.equal(formatBytes(2048), '2.0 KB')
	assert.equal(formatBytes(1.5 * 1024 * 1024), '1.5 MB')
})
