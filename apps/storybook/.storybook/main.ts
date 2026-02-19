import { resolve } from "node:path"
import type { StorybookConfig } from "@storybook/react-vite"

// Storybook configuration for React Components E2B template
// Optimized for E2B proxy URL compatibility with Vite
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  // Vite configuration for E2B compatibility
  // Uses mergeConfig for deep merge to preserve Storybook's internal HMR config
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite")

    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": resolve(process.cwd(), "../../packages/ui/src"),
        },
        dedupe: ["react", "react-dom"],
      },
      server: {
        // Allow all hosts for E2B proxy URLs (Vite 5.x+)
        allowedHosts: true,
        fs: {
          allow: [
            resolve(process.cwd()),
            resolve(process.cwd(), "../"),
            resolve(process.cwd(), "../../"),
            resolve(process.cwd(), "../../packages/ui"),
          ],
        },
        hmr: {
          clientPort: 6006,
          host: "localhost",
        },
        host: "0.0.0.0",
        port: 6006,
        strictPort: true,
      },
    })
  },
}

export default config
