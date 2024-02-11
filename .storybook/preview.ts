import type { Preview } from "@storybook/react";
import {withThemeByClassName, withThemeFromJSXProvider} from "@storybook/addon-themes";

import '../src/styles/index.css';
import 'tailwindcss/tailwind.css';
import {Theme} from "@radix-ui/themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName<any>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    withThemeFromJSXProvider<any>({
      Provider: Theme
    })
  ]
};

export default preview;
