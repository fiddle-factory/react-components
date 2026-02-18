import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/components/index.ts"],
  external: ["react", "react-dom"],
  format: "esm",
  loader: {
    ".css": "copy",
  },
})
