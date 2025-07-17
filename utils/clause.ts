export const tryClause = <T = any, F = T>(
  callback: (...args: any[]) => T,
  options?: {
    fallback?: F
    // default 0
    retry?: number
  },
): T | F | Error => {
  const retry = options?.retry || 0
  const fallback = options?.fallback
  let result: T | F | Error = fallback as F

  for (let i = 0; i <= retry; i++) {
    try {
      result = callback()
      break
    } catch (error) {
      if (i === retry) {
        if (fallback) {
          result = fallback
        } else {
          result = error
        }
      }
    }
  }

  return result
}
