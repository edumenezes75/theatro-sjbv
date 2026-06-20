import type { Metadata } from 'next';
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { Analytics } from '@vercel/analytics/next';

const display = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

const SITE = 'https://theatrosjbv.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Theatro Municipal de São João da Boa Vista — História e Memória', template: '%s — Theatro Municipal de São João da Boa Vista' },
  description: 'Conheça a história do Theatro Municipal de São João da Boa Vista, inaugurado em 1914, preservado pela mobilização da cidade e ainda vivo como palco de arte e cultura.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Theatro Municipal de São João da Boa Vista', images: [{ url: '/og-theatro.jpg', width: 1200, height: 630, alt: 'Fachada histórica do Theatro Municipal de São João da Boa Vista' }] },
  twitter: { card: 'summary_large_image', images: ['/og-theatro.jpg'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PerformingArtsTheater',
  name: 'Theatro Municipal de São João da Boa Vista',
  foundingDate: '1914-10-31',
  address: { '@type': 'PostalAddress', streetAddress: 'Praça da Catedral, 22 — Centro', addressLocality: 'São João da Boa Vista', addressRegion: 'SP', addressCountry: 'BR' },
  url: SITE,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theatro-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-curtain focus:px-4 focus:py-2 focus:text-cream">Pular para o conteúdo</a>
        <SmoothScroll />
        <Nav />
        <main id="conteudo">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
