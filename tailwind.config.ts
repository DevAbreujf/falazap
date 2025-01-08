import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#1E1E1E',
        foreground: '#E5E5E5',
        primary: {
          DEFAULT: '#39FF14',
          light: '#39f18e',
          dark: '#0D0D0D',
          hover: '#00FF7F',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#4df1b5',
          foreground: '#A0A0B3'
        },
        muted: {
          DEFAULT: '#0D0D0D',
          foreground: '#A0A0B3'
        },
        accent: {
          DEFAULT: '#00FF7F',
          foreground: '#FFFFFF'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #39FF14, #39f18e)',
        'gradient-secondary': 'linear-gradient(to right, #0D0D0D, #1E1E1E)',
        'glass': 'linear-gradient(to right bottom, rgba(13, 13, 13, 0.7), rgba(13, 13, 13, 0.3))'
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
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
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(57, 255, 20, 0.8)' }
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      },
      boxShadow: {
        'neon': '0 0 15px rgba(57, 255, 20, 0.5)',
        'neon-hover': '0 0 30px rgba(57, 255, 20, 0.8)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;