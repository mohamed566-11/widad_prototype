import { build } from "esbuild";

await build({
  entryPoints: ["src/app.ts"],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "esm",
  outfile: "dist/index.js",
  sourcemap: true,
  external: [],
});
