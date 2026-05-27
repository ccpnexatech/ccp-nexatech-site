import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F4FF",
          100: "#E0EAFF",
          200: "#BACEFF",
          300: "#8FB2FF",
          400: "#618EFF",
          500: "#3D6EF5",
          600: "#2952E3",
          700: "#1E3DC9",
          800: "#182EA3",
          900: "#142480",
          950: "#0D1857",
        },
        accent: {
          50: "#FFF8F0",
          100: "#FFEEDB",
          200: "#FFDBB8",
          300: "#FFC28A",
          400: "#FF9F54",
          500: "#F97316",
          600: "#EA6007",
          700: "#C24D06",
          800: "#9A3F0B",
          900: "#7C340C",
          950: "#431806",
        },
        surface: {
          950: "#05080F",
          900: "#0A0F1E",
          800: "#0F1629",
          700: "#162035",
          600: "#1E2D4A",
          500: "#283D60",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "gradient-x": "gradientX 8s ease infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
