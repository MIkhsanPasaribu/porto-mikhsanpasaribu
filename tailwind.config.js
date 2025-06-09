/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        // Dark mode palette
        dark: {
          primary: "#000000",
          secondary: "#146C94",
          tertiary: "#19A7CE",
          background: "#F6F1F1",
        },
        // Light mode palette
        light: {
          primary: "#F2F7FF",
          secondary: "#0B409C",
          tertiary: "#10316B",
          accent: "#FDBE34",
        },
        // Keep existing colors for compatibility
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        cream: {
          50: "#FFFDF5",
          100: "#FFF8E1",
          200: "#FFEFC4",
          300: "#FFE6A6",
          400: "#FFDD88",
          500: "#FFD46B",
          600: "#FFCB4D",
          700: "#FFC22F",
          800: "#FFB911",
          900: "#F2AB00",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      textShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        md: "0 2px 4px rgba(0, 0, 0, 0.5)",
        lg: "0 4px 8px rgba(0, 0, 0, 0.5)",
        xl: "0 8px 16px rgba(0, 0, 0, 0.6)",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.1)",
        glow: "0 0 15px rgba(14, 165, 233, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: theme("colors.primary.700"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-md": {
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-lg": {
          textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-xl": {
          textShadow: "0 8px 16px rgba(0, 0, 0, 0.6)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };
      addUtilities(newUtilities);
    },
    function ({ addComponents }) {
      const components = {
        ".card": {
          backgroundColor: "white",
          borderRadius: "0.5rem",
          padding: "1.5rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        ".btn": {
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          transition: "all 0.2s ease",
        },
      };
      addComponents(components);
    },
  ],
};
