import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4EDE4',     // ivory quente — o mesmo creme do hotsite do evento
        bone: '#EBE2D0',      // painéis sutis
        ink: '#1C1815',       // texto
        curtain: '#6B1021',   // vinho (acento principal; o mesmo do hotsite do evento; 10.5:1 no creme)
        curtainbright: '#8A1A2C',
        curtaindark: '#3B0912',
        gold: '#C79C6E',      // dourado do hotsite (7.5:1 sobre night) — nunca como texto sobre creme (1.9:1)
        moss: '#54624A',
        night: '#14110E',     // "palco às escuras"
        nightsoft: '#211B16',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        read: ['var(--font-read)', 'Georgia', 'serif'],
      },
      // Escada de apoio: xs 12.8px (rótulos em caixa alta, com tracking) e
      // sm 15.2px (texto de cards, legendas, nav, rodapé). Antes eram 11.5/13.3px
      // — pequeno demais para texto corrido. Vale para o site inteiro de uma vez.
      fontSize: {
        xs: ['0.8rem', { lineHeight: '1.5' }],
        sm: ['0.95rem', { lineHeight: '1.6' }],
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
