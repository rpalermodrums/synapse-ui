import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development",
    idsToHandle = new Set<string>();
  
    return {
      build: {
        outDir: 'dist',
        sourcemap: isDevelopment ? 'inline' : 'hidden',
        rollupOptions: {
          output: {
            manualChunks: (id) => {
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
        // TODO: Understand requirements WRT legacy browsers -- can we just compile to ES5 and avoid the extra bundle size? Or do we need polyfills?
      ],
      resolve: {
        alias: {
          '@': '/src',
        },
      },
      server: {
        port: 8081,
        host: true,
      },
      esbuild: {
        jsxInject: `import React from 'react'`,
        sourcemap: isDevelopment,
        treeShaking: !isDevelopment,
      },
    };
});
