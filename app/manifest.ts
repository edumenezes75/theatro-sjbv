import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Theatro Municipal de São João da Boa Vista',
    short_name: 'Theatro SJBV',
    description: 'História, acervo, documentário e memórias do Theatro Municipal de São João da Boa Vista.',
    start_url: '/',
    display: 'standalone',
    background_color: '#14110E',
    theme_color: '#14110E',
    lang: 'pt-BR',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
