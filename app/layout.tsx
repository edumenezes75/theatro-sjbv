import type { Metadata } from 'next';
import { Bodoni_Moda, Hanken_Grotesk, Literata } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { Analytics } from '@vercel/analytics/next';
import ConsentBanner from '@/components/ConsentBanner';

const display = Bodoni_Moda({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-display', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans', display: 'swap' });
const read = Literata({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'], variable: '--font-read', display: 'swap' });

const SITE = 'https://www.theatromunicipalsjbv.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'Theatro Municipal de São João da Boa Vista — História e Memória', template: '%s — Theatro Municipal de São João da Boa Vista' },
  description: 'Conheça a história do Theatro Municipal de São João da Boa Vista, inaugurado em 1914, preservado pela mobilização da cidade e ainda vivo como palco de arte e cultura.',
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Theatro Municipal de São João da Boa Vista', images: [{ url: '/og-theatro.jpg', width: 1200, height: 630, alt: 'Fachada histórica do Theatro Municipal de São João da Boa Vista' }] },
  twitter: { card: 'summary_large_image', images: ['/og-theatro.jpg'] },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': SITE + '/#website',
      name: 'Theatro Municipal de São João da Boa Vista',
      url: SITE,
      inLanguage: 'pt-BR',
      publisher: { '@id': SITE + '/#theatro' },
    },
    {
      '@type': ['PerformingArtsTheater', 'TouristAttraction', 'LandmarksOrHistoricalBuildings'],
      '@id': SITE + '/#theatro',
      name: 'Theatro Municipal de São João da Boa Vista',
      alternateName: 'Theatro Municipal',
      url: SITE,
      image: SITE + '/og-theatro.jpg',
      logo: SITE + '/icon.svg',
      description: 'Casa de espetáculos histórica inaugurada em 1914, em São João da Boa Vista (SP). Sala em ferradura de tradição italiana, preservada pela mobilização popular, tombada e restaurada — palco de música, teatro, dança e cinema.',
      foundingDate: '1914-10-31',
      telephone: '+55-19-3636-4872',
      address: { '@type': 'PostalAddress', streetAddress: 'Praça da Catedral, 22 — Centro', addressLocality: 'São João da Boa Vista', addressRegion: 'SP', addressCountry: 'BR' },
      geo: { '@type': 'GeoCoordinates', latitude: -21.9693, longitude: -46.7976 },
      hasMap: 'https://www.google.com/maps/search/?api=1&query=Theatro%20Municipal%20de%20S%C3%A3o%20Jo%C3%A3o%20da%20Boa%20Vista',
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '11:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '17:00' },
      ],
      sameAs: [
        'https://www.saojoao.sp.gov.br/equipamentos-culturais/theatro-municipal',
        'https://pt.wikipedia.org/wiki/Teatro_Municipal_de_S%C3%A3o_Jo%C3%A3o_da_Boa_Vista',
        'https://www.youtube.com/watch?v=e2stgoHtlAQ',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${read.variable}`} suppressHydrationWarning>
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
        <ConsentBanner />
      </body>
    </html>
  );
}
