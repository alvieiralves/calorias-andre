export const REFEICOES = ["Café da manhã", "Almoço", "Jantar", "Lanche"]

export const ALIMENTOS_PADRAO = [
  { nome: "Arroz cozido", kcal100g: 130, proteina100g: 2.5, carbo100g: 28, gordura100g: 0.3, refeicao: "Almoço" },
  { nome: "Feijão cozido", kcal100g: 76, proteina100g: 4.8, carbo100g: 13.6, gordura100g: 0.5, refeicao: "Almoço" },
  { nome: "Peito de frango grelhado", kcal100g: 165, proteina100g: 31, carbo100g: 0, gordura100g: 3.6, refeicao: "Almoço" },
  { nome: "Ovo cozido", kcal100g: 155, proteina100g: 13, carbo100g: 1.1, gordura100g: 11, refeicao: "Café da manhã" },
  { nome: "Pão francês", kcal100g: 300, proteina100g: 8, carbo100g: 58, gordura100g: 3, refeicao: "Café da manhã" },
  { nome: "Banana", kcal100g: 89, proteina100g: 1.1, carbo100g: 23, gordura100g: 0.3, refeicao: "Lanche" },
  { nome: "Maçã", kcal100g: 52, proteina100g: 0.3, carbo100g: 14, gordura100g: 0.2, refeicao: "Lanche" },
  { nome: "Aveia", kcal100g: 389, proteina100g: 16.9, carbo100g: 66.3, gordura100g: 6.9, refeicao: "Café da manhã" },
]

export function formatarData(dataString) {
  if (!dataString) return ""
  const [ano, mes, dia] = dataString.split("-")
  return `${dia}/${mes}/${ano}`
}

export function calcularTMB({ peso, altura, idade, sexo }) {
  if (!peso || !altura || !idade || !sexo) return 0

  if (sexo === "masculino") {
    return 10 * peso + 6.25 * altura - 5 * idade + 5
  }

  return 10 * peso + 6.25 * altura - 5 * idade - 161
}

export function calcularGastoTotal(tmb, fatorAtividade) {
  return tmb * fatorAtividade
}

export function calcularMacros({ gramas, kcal100g, proteina100g, carbo100g, gordura100g }) {
  const fator = Number(gramas) / 100
  return {
    calorias: fator * Number(kcal100g),
    proteina: fator * Number(proteina100g),
    carbo: fator * Number(carbo100g),
    gordura: fator * Number(gordura100g),
  }
}
