/**
 * Transform public environment variables
 * @returns publicEnv - A transformed object containing only public environment variables (prefixed with NEXT_PUBLIC_)
 */
export const transformENV = () => {
  const publicENV = {}
  const privateENV = {}
  for (const key in process.env) {
    if (String(key).startsWith("NEXT_PUBLIC_")) {
      publicENV[key] = process.env[key]
    }

    privateENV[key] = process.env[key]
  }

  return {
    publicENV: publicENV as typeof globalThis.publicENV,
    privateENV: privateENV as typeof globalThis.privateENV,
  }
}
