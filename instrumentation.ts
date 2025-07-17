import { transformENV } from "scripts/transform-env"

export async function register() {
  if (!globalThis.privateENV || !globalThis.publicENV) {
    const envs = transformENV()
    globalThis.publicENV = envs.publicENV
    globalThis.privateENV = envs.privateENV
  }
}
