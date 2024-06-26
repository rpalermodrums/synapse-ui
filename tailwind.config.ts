import tailwindAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "32px",
      screens: {
        "2xl": "1860px",
      },
    },
    extend: {
      colors: {
        navy: "#091f6a",
        "navy-inactive": "#8a8da4",
        royal: "#2e4799",
        "royal-inactive": "#6178c3",
        "royal-hover": "#0e2576",
        "blue-inactive": "#93c5ec",
        blue: "#0071d0",
        "blue-hover": "#005399",
        teal: "#4cb6ac",
        "teal-hover": "#0c8e82",
        gold: "#ffba0c",
        "gold-hover": "#ff9e00",
        "gold-inactive": "#ffdf81",
        "translucent-teal": "rgba(176, 225, 221, 0.25)",
        "secondary-teal": "#b0e1dd",
        "accent-active": "#ff7868",
        "accent-inactive": "#fcb8b0",
        "accent-hover": "#da5a4b",
        "primary-text": "#444444",
        "primary-text-disabled": "#646464",
        "secondary-grey": "#737373",
        "divider-grey": "#bdbdbd",
        "progress-bar-bg": "#d8d8d8",
        "light-grey": "#f5f5f5",
        "formfield-grey": "#e3e3e3",
        error: "#c91518",
        "search-field": "#efefef",
        "side-filter-bg": "#e6eff8",
        white: "#ffffff",
        "missing-client-border": "#272727",
        success: "#189f5c",
        transparent: "rgba(255, 255, 255, 0)",
        mist: "#fafafa",
        border: "#bdbdbd",
        input: "#e3e3e3",
        ring: "#0071d0",
        background: "#fafafa",
        foreground: "#444444",
        primary: {
          DEFAULT: "#091f6a",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#4cb6ac",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#c91518",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#646464",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "#ff7868",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#e6eff8",
          foreground: "#444444",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#444444",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        DEFAULT: "0 10px 35px 0 rgba(30, 30, 30, 0.13)",
        darker: "0 10px 35px 0 rgba(30, 30, 30, 0.51)",
        floating: "2px 0 10px 0 rgba(30, 30, 30, 0.35)",
      },
    },
  },
  plugins: [tailwindAnimate],
}
