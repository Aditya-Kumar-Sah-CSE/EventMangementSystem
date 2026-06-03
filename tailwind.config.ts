import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enable class-based dark mode
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ff', // cyber cyan
        accent: '#7f00ff', // neon purple
        darkBg: '#0f0f0f', // deep dark background
        cardBg: 'rgba(255,255,255,0.05)',
        borderGlow: 'rgba(255,255,255,0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;