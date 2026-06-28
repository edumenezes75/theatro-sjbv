import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPages, getEditorialSlugs, getPageBySlug } from '@/lib/content';
import { fotosList, antesDepoisList, curiosidadesList } from '@/lib/data';
import ChapterHero from '@/components/ChapterHero';
import MapaVisita from '@/components/MapaVisita';
import FontesDaPagina from '@/components/FontesDaPagina';
import ReconheceuAlguem from '@/components/ReconheceuAlguem';
import GaleriaReal from '@/components/GaleriaReal';
import AntesDepois from '@/components/AntesDepois';
import Curiosidades from '@/components/Curiosidades';
import Reveal from '@/components/Reveal';
import ReadingProgress from '@/components/ReadingProgress';
import ChapterIndex from '@/components/ChapterIndex';
import ChapterIndexMobile from '@/components/ChapterIndexMobile';
import VisitaInfo from '@/components/VisitaInfo';
import RestauroResumo from '@/components/RestauroResumo';
import VideoOlhares from '@/components/VideoOlhares';
import LiteYouTube from '@/components/LiteYouTube';

const LABELS: Record<string, string> = {
  '/o-theatro': 'O Theatro', '/historia': 'História', '/arquitetura': 'Arquitetura',
  '/restauracao': 'Restauração', '/pessoas': 'Pessoas', '/acervo': 'Acervo',
  '/documentario': 'Documentário', '/programacao': 'Programação', '/linha-do-tempo': 'Linha do tempo',
  '/visite': 'Visite', '/fontes': 'Fontes', '/memorias': 'Memórias e curiosidades', '/sobre': 'Sobre o projeto', '/visita-guiada': 'Visita guiada',
};
const RELATED: Record<string, string[]> = {
  'o-theatro': ['/historia', '/arquitetura', '/acervo'],
  historia: ['/restauracao', '/arquitetura', '/linha-do-tempo', '/fontes'],
  arquitetura: ['/acervo', '/restauracao', '/historia'],
  restauracao: ['/pessoas', '/acervo', '/documentario', '/fontes'],
  memorias: ['/historia', '/pessoas', '/acervo'],
  visite: ['/programacao', '/acervo', '/historia'],
  fontes: ['/acervo', '/pessoas', '/documentario'],
};


export function generateStaticParams() {
  return getEditorialSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getPageBySlug('/' + params.slug);
  if (!page) return {};
  const SITE = 'https://www.theatromunicipalsjbv.com.br';
  const heroImg = page.meta.hero_image
    ? (page.meta.hero_image.startsWith('http') ? page.meta.hero_image : SITE + page.meta.hero_image)
    : `${SITE}/og-theatro-card.jpg`;
  return {
    title: page.meta.title,
    description: page.meta.seo_description,
    alternates: { canonical: '/' + params.slug },
    openGraph: {
      title: page.meta.title,
      description: page.meta.seo_description || undefined,
      type: 'article',
      images: [{ url: heroImg, alt: page.meta.hero_alt || page.meta.title }],
    },
  };
}

const GALLERIES: Record<string, { title: string; cats: string[] }> = {
  'o-theatro': { title: 'O Theatro em imagens', cats: ['fachada', 'sala'] },
  arquitetura: { title: 'A arquitetura em imagens', cats: ['sala', 'ornamentos'] },
  restauracao: { title: 'O restauro em imagens', cats: ['restauro', 'ornamentos'] },
};
const ANTES_DEPOIS = new Set(['restauracao', 'arquitetura']);

export default function EditorialPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug('/' + params.slug);
  if (!page) notFound();
  const words = page.html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const readMin = Math.max(1, Math.round(words / 200));
  const gal = GALLERIES[params.slug];
  const galFotos = gal ? fotosList.filter((f) => gal.cats.includes(f.category)).slice(0, 16) : [];
  const showAD = ANTES_DEPOIS.has(params.slug);
  const h2count = (page.html.match(/<h2/g) || []).length;
  const longRead = h2count >= 4;
  const JOURNEY = ['/o-theatro', '/historia', '/arquitetura', '/restauracao', '/pessoas', '/acervo', '/documentario', '/memorias', '/visita-guiada', '/linha-do-tempo', '/programacao', '/visite', '/fontes'];
  const ji = JOURNEY.indexOf('/' + params.slug);
  const nextHref = ji >= 0 && ji < JOURNEY.length - 1 ? JOURNEY[ji + 1] : null;

  const SITE = 'https://www.theatromunicipalsjbv.com.br';
  const url = `${SITE}/${params.slug}`;
  const img = page.meta.hero_image ? (page.meta.hero_image.startsWith('http') ? page.meta.hero_image : SITE + page.meta.hero_image) : `${SITE}/og-theatro-card.jpg`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: page.meta.title,
        description: page.meta.seo_description || undefined,
        image: img,
        inLanguage: 'pt-BR',
        isPartOf: { '@type': 'WebSite', name: 'Theatro Municipal de São João da Boa Vista', url: SITE },
        author: { '@type': 'Organization', name: 'Theatro Municipal de São João da Boa Vista' },
        publisher: { '@type': 'Organization', name: 'Theatro Municipal de São João da Boa Vista' },
        mainEntityOfPage: url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: page.meta.title, item: url },
        ],
      },
      ...(params.slug === 'historia' ? [{
        '@type': 'VideoObject',
        name: '100 Anos do Theatro Municipal',
        description: 'Retrospectiva do centenário do Theatro Municipal de São João da Boa Vista (2014), produzida pela TV UNIFAE.',
        thumbnailUrl: [`${SITE}/video/centenario-poster.jpg`],
        uploadDate: '2014-11-15',
        embedUrl: 'https://www.youtube-nocookie.com/embed/4HDvmltqv3I',
        contentUrl: 'https://www.youtube.com/watch?v=4HDvmltqv3I',
        inLanguage: 'pt-BR',
        about: { '@type': 'PerformingArtsTheater', '@id': SITE + '/#theatro' },
      }] : []),
      ...(params.slug === 'restauracao' ? [{
        '@type': 'VideoObject',
        name: 'Olhares',
        description: 'Filme sobre o Theatro Municipal de São João da Boa Vista. Roteiro e direção de Paschoal Neto; realização Fundação Oliveira Neto.',
        thumbnailUrl: [`${SITE}/video/olhares-1-poster.jpg`],
        uploadDate: '2002-01-01',
        contentUrl: `${SITE}/video/olhares-1.mp4`,
        inLanguage: 'pt-BR',
        director: { '@type': 'Person', name: 'Paschoal Neto' },
        about: { '@type': 'PerformingArtsTheater', '@id': SITE + '/#theatro' },
      }, {
        '@type': 'VideoObject',
        name: 'Reforma do Theatro Municipal de São João da Boa Vista',
        description: 'Registro em vídeo das obras de restauração do Theatro Municipal, reunido por Clovis Vieira.',
        thumbnailUrl: ['https://i.ytimg.com/vi/tczda96slZ0/hqdefault.jpg'],
        uploadDate: '2014-01-01',
        embedUrl: 'https://www.youtube-nocookie.com/embed/tczda96slZ0',
        contentUrl: 'https://www.youtube.com/watch?v=tczda96slZ0',
        inLanguage: 'pt-BR',
        about: { '@type': 'PerformingArtsTheater', '@id': SITE + '/#theatro' },
      }] : []),
    ],
  };

  return (
    <article>
      {longRead && <ReadingProgress />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ChapterHero eyebrow={page.meta.eyebrow} title={page.meta.title} image={page.meta.hero_image} alt={page.meta.hero_alt} status={page.meta.status} />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        {params.slug === 'visite' && <VisitaInfo />}
        {longRead ? (
          <div className="lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
            <aside className="hidden lg:block"><ChapterIndex /></aside>
            <div className="min-w-0">
              <ChapterIndexMobile />
              <p className="read-meta mb-8 max-w-reading font-sans text-xs uppercase tracking-eyebrow text-ink/75 dark:text-cream/75">{readMin} min de leitura</p>
              <Reveal>
                <div className="prose-theatro" dangerouslySetInnerHTML={{ __html: page.html }} />
              </Reveal>
            </div>
          </div>
        ) : (
          <>
            <p className="read-meta mx-auto mb-8 max-w-reading font-sans text-xs uppercase tracking-eyebrow text-ink/75 dark:text-cream/75">{readMin} min de leitura</p>
            <Reveal>
              <div className="prose-theatro mx-auto" dangerouslySetInnerHTML={{ __html: page.html }} />
            </Reveal>
          </>
        )}

        {params.slug === 'restauracao' && <RestauroResumo />}

        {showAD && antesDepoisList.length > 0 && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <h2 className="mb-2 font-display text-3xl">O medalhão de Carlos Gomes</h2>
            <p className="mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              Passo a passo do restauro: a fotografia do comício de 1919 guiou a decapagem; sob a tinta, o retrato surgiu danificado; recuperado o rosto, os ornamentos em volta foram repintados. Toque em cada imagem para ampliar e ver o detalhe.
            </p>
            <AntesDepois pares={antesDepoisList} />
          </section>
        )}

        {gal && galFotos.length > 0 && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <h2 className="mb-2 font-display text-3xl">{gal.title}</h2>
            <p className="mb-8 max-w-reading font-sans text-sm italic text-ink/70 dark:text-cream/70">
              Acervo do Theatro Municipal — Prefeitura de São João da Boa Vista.
            </p>
            <GaleriaReal fotos={galFotos} withFilter={false} />
          </section>
        )}

        {params.slug === 'restauracao' && <VideoOlhares />}
        {params.slug === 'restauracao' && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Filme</p>
            <h2 className="mt-3 font-display text-3xl">A reforma do Theatro, em vídeo</h2>
            <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              Registro das obras de restauração reunido por Clovis Vieira — o edifício em recuperação, etapa por etapa.
            </p>
            <div className="mt-6"><LiteYouTube id="tczda96slZ0" title="Reforma do Theatro Municipal — Clovis Vieira" /></div>
          </section>
        )}
        {params.slug === 'historia' && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Filme</p>
            <h2 className="mt-3 font-display text-3xl">100 Anos do Theatro Municipal</h2>
            <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              Retrospectiva do centenário do Theatro (2014), produzida pela TV UNIFAE.
            </p>
            <div className="mt-6"><LiteYouTube id="4HDvmltqv3I" title="100 Anos do Theatro Municipal — TV UNIFAE" poster="/video/centenario-poster.jpg" /></div>
            <dl className="mt-8 grid max-w-reading grid-cols-1 gap-x-10 gap-y-3 font-sans text-sm sm:grid-cols-2">
              {[
                ['Roteiro e direção', 'Paschoal Neto'],
                ['Imagens', 'Rafael Brunelli e Ana Paula Malheiros'],
                ['Edição', 'Vinicius D. Idesti e Ana Paula Malheiros'],
                ['Videografia', 'Thiago Luz e Marcelo Gonçalves'],
                ['Locução', 'Antonio Magalhães'],
                ['Trilha original', 'Zezinho Só'],
                ['Apoio de produção', 'Matheus Salvi e Fábio Vilela'],
                ['Realização', 'TV UNIFAE'],
              ].map(([papel, nome]) => (
                <div key={papel}>
                  <dt className="text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">{papel}</dt>
                  <dd className="mt-0.5 text-ink/80 dark:text-cream/80">{nome}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {params.slug === 'visite' && <MapaVisita />}

        {params.slug === 'memorias' && curiosidadesList.length > 0 && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <h2 className="font-display text-3xl">Curiosidades, por tema</h2>
            <p className="mb-10 mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              Episódios apoiados em documentos e lembranças, reunidos em cinco capítulos — da fundação aos mistérios da casa.
            </p>
            <Curiosidades itens={curiosidadesList} />
          </section>
        )}

        {nextHref && (
          <a href={nextHref} className="card-lift group mt-16 flex items-center justify-between gap-4 rounded-sm border border-gold/30 bg-cream px-6 py-5 transition-colors hover:border-gold dark:bg-nightsoft">
            <span>
              <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">Próxima página</span>
              <span className="mt-1 block font-display text-xl text-ink dark:text-cream">{LABELS[nextHref] ?? nextHref}</span>
            </span>
            <span className="font-display text-2xl text-curtain transition-transform group-hover:translate-x-1 dark:text-gold">→</span>
          </a>
        )}

        {RELATED[params.slug] && (
          <section className="mt-16 border-t border-gold/25 pt-10">
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Continue explorando</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {RELATED[params.slug].map((href) => (
                <a key={href} href={href} className="card-lift rounded-sm border border-ink/12 px-5 py-3 font-sans text-sm text-ink/80 hover:border-gold/50 hover:text-curtain dark:border-cream/12 dark:text-cream/80 dark:hover:text-gold">
                  {LABELS[href] ?? href} →
                </a>
              ))}
            </div>
          </section>
        )}

        {(params.slug === 'historia' || params.slug === 'memorias') && <ReconheceuAlguem />}

        <FontesDaPagina fontes={page.fontes} />
      </div>
    </article>
  );
}
