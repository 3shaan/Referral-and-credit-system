import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  target: "es2020",
  outDir: "dist",
  dts: false,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
  splitting: false,
  shims: true,
  bundle: true,

});
