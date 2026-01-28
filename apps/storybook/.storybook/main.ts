import { mergeConfig } from 'vite';
import originalConfig from './original-main';

const getStories = () => {
  const envStories = process.env.STORIES;

  if (envStories) {
    // Split by comma and process each path
    const s = envStories.split(',').map(pattern => {
      let trimmed = pattern.trim();

      // Strip leading ./ or ../ to normalize the path
      trimmed = trimmed.replace(/^\.\.?\//, '');

      // Prepend ../ to make it relative to .storybook directory
      const path = `../${trimmed}`;

      // If it's a specific file (has an extension), convert to a glob pattern
      // that Storybook's indexer can match
      if (path.match(/\.(tsx|ts|jsx|js|mjs)$/)) {
        // Replace the specific extension with a glob pattern
        return path.replace(/\.(tsx|ts|jsx|js|mjs)$/, '.@(js|jsx|mjs|ts|tsx)');
      }

      // If it's already a pattern (contains **), return as is
      return path;
    });
    console.log(`Using STORIES from env: ${JSON.stringify(s)}`);
    return s;
  }

  return undefined;
};

const stories = getStories();

export default {
  ...originalConfig,
  ...(stories ? { stories } : {}),
  viteFinal: async (config, { configType, port, host }) => {
    // Call original viteFinal first if it exists
    const customConfig = {
      server: {
        host: '0.0.0.0',
        strictPort: false,
        allowedHosts: true,
        hmr: {
          clientPort: 443,
          host: `${port}-${process.env.E2B_SANDBOX_ID}.e2b.app`,
          overlay: false,
        }
      }
  };
    let finalConfig = config;
    if (originalConfig.viteFinal) {
      finalConfig = await originalConfig.viteFinal(config, { configType });
    }

    // Merge with custom configuration
    finalConfig = mergeConfig(finalConfig, customConfig);
  
  // BUILD_STATIC is set to true to work around a storybook static build bug we discorered
  // where base is set the static assets doesn't respect the base path 
  // But the URLs do get prefixed correctly during the build so setting base to /storybook
  // To fix this, we do not set the base during static builds
  if (process.env.BUILD_STATIC !== 'true') {
      finalConfig.base = '/storybook';
    }
    return finalConfig;
  },
};
