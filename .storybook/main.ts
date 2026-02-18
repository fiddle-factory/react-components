import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite")

    return mergeConfig(config, {
      resolve: {
        dedupe: ["react", "react-dom"],
      },
      server: {
        allowedHosts: true,
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
