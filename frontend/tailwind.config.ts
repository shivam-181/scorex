import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#DC143C',
        apricot: '#FBCEB1',
        dark: '#0a0a0a',
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        // Add a cool font like 'Clash Display' or 'Outfit' via Google Fonts later
        sans: ['var(--font-inter)'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;