import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import pluginLegacy from '@vitejs/plugin-legacy';


export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development",
    env = loadEnv(configEnv.mode, process.cwd()),
    idsToHandle = new Set<string>();
  
    return {
      build: {
        outDir: 'dist',
        sourcemap: isDevelopment ? 'inline' : 'hidden',
        rollupOptions: {
          output: {
            manualChunks: (id, { getModuleIds }) => {
              if (idsToHandle.has(id)) {
                return;
              }
              idsToHandle.add(id);
              if (id.includes('react-dom')) {
                return 'vendor.react-dom';
              }
              if (id.includes('react') || id.includes('redux')) {
                return 'vendor.react_redux';
              }
              if (
                id.includes('@tanstack') ||
                id.includes('@radix-ui') ||
                id.includes('@storybook') ||
                id.includes('@tailwind') ||
                id.includes('embla-carousel-react') ||
                id.includes('lucide-react') ||
                id.includes('next-themes') ||
                id.includes('sonner') ||
                id.includes('vaul')
              ) {
                return `vendor.ui.${id.split('/')[1]}`;
              }
              if (id.includes('node_modules')) {
                return 'vendor.default';
              }
            },
          },
        },
      },
      plugins: [
        react(),
        tsconfigPaths(),
        // TODO: Understand requirements WRT legacy browsers/polyfills
        pluginLegacy(),
      ],
      server: {
        port: 8081,
        host: true,
      },
      esbuild: {
        jsxInject: `import React from 'react'`,
        sourcemap: !!isDevelopment,
        treeShaking: !isDevelopment,
      },
      optimizeDeps: {
        esbuildOptions: {
          loader: { '.js': 'jsx' },
        },
      },
    };
});
