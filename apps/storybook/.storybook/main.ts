import type { StorybookConfig } from "@storybook/react-vite"
import { resolve } from "node:path"

// Storybook configuration for React Components E2B template
// Optimized for E2B proxy URL compatibility with Vite
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  
  // Vite configuration for E2B compatibility
  viteFinal: async (config) => {
    // Configure server for E2B environment
    config.server = {
      ...config.server,
      host: '0.0.0.0',
      port: 6006,
      strictPort: true,
      // HMR configuration for E2B
      hmr: {
        clientPort: 6006,
        host: 'localhost',
      },
      fs: {
        allow: Array.from(
          new Set([
            ...(config.server?.fs?.allow ?? []),
            resolve(process.cwd()),
            resolve(process.cwd(), "../"),
            resolve(process.cwd(), "../../"),
            resolve(process.cwd(), "../../packages/ui"),
          ])
        ),
      },
    } as any;
    
    // CRITICAL: Allow all hosts for E2B proxy URLs (Vite 5.x+)
    // Using type assertion because TypeScript definitions may not be up to date
    (config.server as any).allowedHosts = true;

    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@": resolve(process.cwd(), "../../packages/ui/src"),
        "@nattui/react-components": resolve(
          process.cwd(),
          "../../packages/ui/src/index.ts"
        ),
      },
    };
    
    return config;
  },
}

export default config
