export function safeParseJSON(valor, fallback) {
  if (!valor) return fallback

  try {
    return JSON.parse(valor)
  } catch {
    return fallback
  }
}
