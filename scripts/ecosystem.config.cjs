// ecosystem.config.mjs
const CURRENT_PATH = process.cwd();

module.exports = {
  apps: [
    {
      name: "lottery",
      script: `${CURRENT_PATH}/server.ts`,
      interpreter: "/home/ubuntu/.bun/bin/bun", // Use bun as the interpreter
      env: {
        NEXT_PUBLIC_APP_ENV: "prod",
        CLUSTERS: 1,
        PORT: 4000,
      },
    },
  ],
};
