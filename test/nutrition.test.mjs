import test from 'node:test'
import assert from 'node:assert/strict'
import { calcularGastoTotal, calcularMacros, calcularTMB, formatarData } from '../src/utils/nutrition.js'

test('formatarData converte yyyy-mm-dd para dd/mm/yyyy', () => {
  assert.equal(formatarData('2026-03-30'), '30/03/2026')
})

test('calcularTMB retorna 0 para dados incompletos', () => {
  assert.equal(calcularTMB({ peso: 80, altura: 180, idade: 30, sexo: '' }), 0)
})

test('calcularTMB masculino', () => {
  assert.equal(calcularTMB({ peso: 80, altura: 180, idade: 30, sexo: 'masculino' }), 1780)
})

test('calcularGastoTotal multiplica TMB por atividade', () => {
  assert.equal(calcularGastoTotal(1780, 1.55), 2759)
})

test('calcularMacros para 150g', () => {
  const macros = calcularMacros({ gramas: 150, kcal100g: 200, proteina100g: 20, carbo100g: 10, gordura100g: 5 })
  assert.deepEqual(macros, { calorias: 300, proteina: 30, carbo: 15, gordura: 7.5 })
})
