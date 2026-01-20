#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Paths
// storybookdir = commandArg || process.cwd + '/.storybook'
const storybookDir = path.join(process.argv[2] || process.cwd(), '.storybook');

console.log(`Using storybook directory to find main.ts: ${storybookDir}`);
const mainTsPath = path.join(storybookDir, 'main.ts');

if (!fs.existsSync(mainTsPath)) {
  console.error('.storybook/main.ts not found creating new');
}

const HMR_HOST_PATH='`${finalConfig.server.hmr.port}-${process.env.E2B_SANDBOX_ID}.e2b.app`';

// Create new main.ts content
const newMainTsContent = `import { mergeConfig } from 'vite';
import originalConfig from './original-main';

const customConfig = {
  server: {
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: true
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
    finalConfig.base = '/storybook';
    finalConfig.server.hmr.clientPort = 443;
    finalConfig.server.hmr.host = ${HMR_HOST_PATH};
    return finalConfig;
  },
};
`;


const mainTsDir = path.dirname(mainTsPath);
const originalMainPath = path.join(mainTsDir, 'original-main.ts');

if (!fs.existsSync(mainTsDir)) {
  fs.mkdirSync(mainTsDir, { recursive: true });
  console.log(`✅ Created directory: ${mainTsDir}`);
}

const mainContent = fs.readFileSync(mainTsPath, 'utf-8');

const viteFrameworkRegex = /@storybook\/.+-vite/;




if (fs.existsSync(originalMainPath)) {
  console.log('⏭️  original-main.ts already exists, skipping write');
} else {
  if (
    !viteFrameworkRegex.test(mainContent) &&
    !mainContent.includes('builder-vite')
  ) {console.log('Storybook is not using Vite builder. Nothing to do.');process.exit(0);}

  if (fs.existsSync(mainTsPath)) {
    fs.copyFileSync(mainTsPath, originalMainPath);
    console.log(`📋 Backed up original to: ${originalMainPath}`);
  }
  
  // Write new content
  fs.writeFileSync(mainTsPath, newMainTsContent, 'utf-8');
  console.log(`✅ Written new content to: ${mainTsPath}`);
}
