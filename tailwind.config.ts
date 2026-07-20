import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE3',     // ivory quente
        bone: '#EBE2D0',      // painéis sutis
        ink: '#1C1815',       // texto
        curtain: '#6E1B22',   // granada (acento principal, contraste AA no creme)
        curtainbright: '#8E2B20',
        curtaindark: '#4E1219',
        gold: '#A9863F',      // ornamento (fios, detalhes) — não usar como texto sobre creme
        moss: '#54624A',
        night: '#14110E',     // "palco às escuras"
        nightsoft: '#211B16',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        read: ['var(--font-read)', 'Georgia', 'serif'],
      },
      maxWidth: { reading: '36rem' },
      letterSpacing: { eyebrow: '0.28em' },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'curtain-rise': { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-100%)' } },
      },
      animation: { 'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both' },
    },
  },
  plugins: [],
};
export default config;
