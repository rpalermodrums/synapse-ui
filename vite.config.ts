import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import pluginLegacy from '@vitejs/plugin-legacy';


export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development",
    env = loadEnv(configEnv.mode, process.cwd());
  
    return {
      build: {
        outDir: 'dist',
        sourcemap: isDevelopment ? 'inline' : 'hidden',
        rollupOptions: {
          output: {
            manualChunks: (id, { getModuleIds }) => {
              const idsToHandle = new Set(getModuleIds());
              if (idsToHandle.has(id)) {
                return;
              }
              idsToHandle.add(id);
              if (id.includes('react-dom')) {
                return `vendor.react-dom.${id}`;
              }
              if (id.includes('react') || id.includes('redux')) {
                return `vendor.react.${id}`;
              }
              if (
                id.includes('@babel') ||
                id.includes('@swc') ||
                id.includes('@types') ||
                id.includes('@vitest') ||
                id.includes('date-fns') ||
                id.includes('typescript') ||
                id.includes('vite') ||
                id.includes('zod')
              ) {
                return `vendor.large.${id}`;
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
                return `vendor.ui.${id}`;
              }
              return id.includes('node_modules') ? `vendor.default.${id}` : `source.${id}`;
            },
          },
        },
      },
      plugins: [
        react(),
        splitVendorChunkPlugin(),
        tsconfigPaths(),
        pluginLegacy({
          targets: ['last 2 chrome versions', '>2%', 'not dead'],
        }),
        createHtmlPlugin({
          minify: true,
          inject: {
            data: {
              VITE_API_HOST: env.VITE_API_HOST,
              VITE_PORTAL_ENV: env.VITE_PORTAL_ENV,
              VITE_HEAP_API_KEY: env.VITE_HEAP_API_KEY,
              VITE_LAUNCHDARKLY_CLIENT_ID: env.VITE_LAUNCHDARKLY_CLIENT_ID,
            },
          },
        }),
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
