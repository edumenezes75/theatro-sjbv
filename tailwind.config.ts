import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        ink: '#1A1714',
        curtain: '#8E2B20',
        curtaindark: '#6E1F17',
        gold: '#B08D4C',
        moss: '#5A6B4F',
        night: '#13110F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { reading: '38rem' },
      letterSpacing: { eyebrow: '0.22em' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'curtain-left': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-100%)' } },
        'curtain-right': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(100%)' } },
      },
      animation: { 'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both' },
    },
  },
  plugins: [],
};
export default config;
