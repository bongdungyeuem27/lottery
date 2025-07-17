import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const root = process.cwd();

// absolute path to ./sitemap.config.js
const SIDEMAP_CONFIG_PATH = path.resolve(root, "scripts/sitemap.config.js");

export const buildSitemap = async () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  return execAsync(
    `./node_modules/.bin/next-sitemap --config ${SIDEMAP_CONFIG_PATH}`,
  );
};
