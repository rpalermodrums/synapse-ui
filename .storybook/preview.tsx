import React from "react";
import {Provider} from "react-redux";
import type { Preview } from "@storybook/react";
import {withThemeByClassName, withThemeFromJSXProvider} from "@storybook/addon-themes";

import '../src/styles/index.css';
import 'tailwindcss/tailwind.css';
import {Theme} from "@radix-ui/themes";
import {store} from "../src/app/store";

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
      Provider: ({children}: React.PropsWithChildren) => <Theme><Provider store={store}>{children}</Provider></Theme>,
    })
  ]
};

export default preview;
