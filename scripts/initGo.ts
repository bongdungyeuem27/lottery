import { exec } from "child_process"
import fs from "fs"
import { promisify } from "util"
const execAsync = promisify(exec)

const root = process.cwd()

export const initGo = async () => {
  if (process.env.NODE_ENV !== "production") {
    return
  }

  await fs.promises.mkdir("./temp", { recursive: true }).catch(console.log)

  return execAsync("go mod download", { cwd: root })
}
