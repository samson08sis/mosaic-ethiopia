/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arizonia: ["var(--font-arizonia)", "cursive"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--white)",
          50: "rgb(var(--primary-50))",
          100: "rgb(var(--primary-100))",
          200: "rgb(var(--primary-200))",
          300: "rgb(var(--primary-300))",
          400: "rgb(var(--primary-400))",
          500: "rgb(var(--primary-500))",
          600: "rgb(var(--primary-600))",
          700: "rgb(var(--primary-700))",
          800: "rgb(var(--primary-800))",
          900: "rgb(var(--primary-900))",
          950: "rgb(var(--primary-950))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--white)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--white)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--white)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--dark)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          foreground: "var(--white)",
        },
        muted: {
          DEFAULT: "var(--gray)",
          foreground: "var(--white)",
        },
        accent: {
          DEFAULT: "var(--indigo)",
          foreground: "var(--white)",
        },
        light: {
          DEFAULT: "var(--light)",
          foreground: "var(--dark)",
        },
        dark: {
          DEFAULT: "var(--dark)",
          foreground: "var(--light)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
