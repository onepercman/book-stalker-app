const { hairlineWidth } = require("nativewind/theme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        content: colors.black,
        default: colors.gray[100],
        border: colors.gray[50],
        input: colors.gray[200],
        ring: colors.gray[100],
        background: colors.white,
        foreground: colors.gray[500],
        primary: {
          DEFAULT: colors.violet[500],
          foreground: colors.violet[100],
        },
        secondary: {
          DEFAULT: colors.yellow[500],
          foreground: colors.yellow[100],
        },
        destructive: {
          DEFAULT: colors.red[500],
          foreground: colors.red[100],
        },
        muted: {
          DEFAULT: colors.gray[500],
          foreground: colors.gray[600],
        },
        accent: {
          DEFAULT: colors.blue[500],
          foreground: colors.blue[100],
        },
        popover: {
          DEFAULT: colors.gray[500],
          foreground: colors.gray[100],
        },
        card: {
          DEFAULT: colors.gray[500],
          foreground: colors.gray[100],
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      borderRadius: {
        DEFAULT: "8px",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
