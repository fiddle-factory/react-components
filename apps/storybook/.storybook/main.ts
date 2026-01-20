import { mergeConfig } from 'vite';
import originalConfig from './original-main';

const customConfig = {
  server: {
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  }
};

export default {
  ...originalConfig,
  viteFinal: async (config, { configType }) => {
    // Call original viteFinal first if it exists
    let finalConfig = config;
    if (originalConfig.viteFinal) {
      finalConfig = await originalConfig.viteFinal(config, { configType });
    }

    // Merge with custom configuration
    finalConfig = mergeConfig(finalConfig, customConfig);
  if (process.env.BUILD_STATIC !== 'true') {
      finalConfig.base = '/storybook';
    }
    finalConfig.server.hmr.host = `${finalConfig.server.hmr.port}-${process.env.E2B_SANDBOX_ID}.e2b.app`;
    return finalConfig;
  },
};
