import test from 'node:test'
import assert from 'node:assert/strict'
import { safeParseJSON } from '../src/utils/storage.js'

test('safeParseJSON retorna fallback para null', () => {
  assert.deepEqual(safeParseJSON(null, {}), {})
})

test('safeParseJSON retorna fallback para json inválido', () => {
  assert.deepEqual(safeParseJSON('{x', []), [])
})

test('safeParseJSON retorna valor parseado', () => {
  assert.deepEqual(safeParseJSON('{"ok":true}', {}), { ok: true })
})
