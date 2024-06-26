import { mergeConfig } from "vite";

export default {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      fastRefresh: true
    }
  },
  features: {
    storyStoreV7: true,
  },

  async viteFinal(config: Record<string, any>) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ['storybook-dark-mode', '@storybook/addon-themes'],
      },
    });
  },

  docs: {
    autodocs: true,
  },
};
