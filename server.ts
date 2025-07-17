import cluster from "cluster"
import { randomBytes } from "crypto"
import { createServer } from "http"
import { parse } from "url"
import dotenv from "dotenv"
import next from "next"
import { transformENV } from "scripts/transform-env"

const port = Number(process.env.PORT || "3001")
const host = process.env.HOST || "127.0.0.1"
const clusters = Number(process.env.CLUSTERS || 1)

if (cluster.isPrimary) {
  const envFile =
    process.env.NEXT_PUBLIC_APP_ENV === "prod" ? ".prod.env" : ".local.env"

  console.log("envFile", envFile)
  dotenv.config({ path: envFile })

  process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY =
    randomBytes(32).toString("hex")

  console.log(`Primary ${process.pid} is running`)

  // Start N workers for the number of CPUs
  for (let i = 0; i < clusters; i++) {
    cluster.fork()
  }

  cluster.on("exit", (worker, code) => {
    console.log(`Worker ${worker.process.pid} exited: ${code}`)
    process.exit(0)
  })
} else {
  const envs = transformENV()
  globalThis.publicENV = envs.publicENV
  globalThis.privateENV = envs.privateENV
  console.log("envs", envs)

  const app = next({ dev: false })

  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true)
      handle(req, res, parsedUrl)
    }).listen(port, host, () => {
      console.log(
        `> Server listening at http://localhost:${port} as NODE_ENV ${process.env.NODE_ENV}`,
      )
      console.log(
        "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY",
        process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY,
      )
    })
  })
}
