import { build } from "esbuild";
import { execSync } from "child_process";
import { cp, mkdir, rm } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..");
const widadDir = path.resolve(repoRoot, "artifacts", "widad");
const frontendPublicDir = path.resolve(repoRoot, "artifacts", "widad", "dist", "public");
const apiDistDir = path.resolve(__dirname, "dist");
const apiPublicDir = path.resolve(apiDistDir, "public");

function buildFrontend() {
  const pnpmCmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

  try {
    execSync(`${pnpmCmd} --filter @workspace/widad build`, {
      cwd: repoRoot,
      stdio: "inherit",
    });
  } catch {
    execSync("npx --yes vite build --config vite.config.ts", {
      cwd: widadDir,
      stdio: "inherit",
    });
  }
}

async function buildAll() {
  buildFrontend();

  await rm(apiDistDir, { recursive: true, force: true });

  await build({
    absWorkingDir: __dirname,
    entryPoints: ["src/app.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "esm",
    outfile: "dist/index.js",
    sourcemap: true,
    packages: "bundle",
  });

  await mkdir(apiDistDir, { recursive: true });
  await cp(frontendPublicDir, apiPublicDir, { recursive: true });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
