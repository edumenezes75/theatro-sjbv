import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPages, getEditorialSlugs, getPageBySlug } from '@/lib/content';
import { fotosList, antesDepoisList, curiosidadesList } from '@/lib/data';
import ChapterHero from '@/components/ChapterHero';
import MapaVisita from '@/components/MapaVisita';
import FontesDaPagina from '@/components/FontesDaPagina';
import GaleriaReal from '@/components/GaleriaReal';
import AntesDepois from '@/components/AntesDepois';
import Curiosidades from '@/components/Curiosidades';
import Reveal from '@/components/Reveal';

const LABELS: Record<string, string> = {
  '/o-theatro': 'O Theatro', '/historia': 'História', '/arquitetura': 'Arquitetura',
  '/restauracao': 'Restauração', '/pessoas': 'Pessoas', '/acervo': 'Acervo',
  '/documentario': 'Documentário', '/programacao': 'Programação', '/linha-do-tempo': 'Linha do tempo',
  '/visite': 'Visite', '/fontes': 'Fontes', '/memorias': 'Memórias e curiosidades',
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
  return { title: page.meta.title, description: page.meta.seo_description };
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

  const SITE = 'https://www.theatromunicipalsjbv.com.br';
  const url = `${SITE}/${params.slug}`;
  const img = page.meta.hero_image ? (page.meta.hero_image.startsWith('http') ? page.meta.hero_image : SITE + page.meta.hero_image) : `${SITE}/og-theatro.jpg`;
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
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ChapterHero eyebrow={page.meta.eyebrow} title={page.meta.title} image={page.meta.hero_image} alt={page.meta.hero_alt} status={page.meta.status} />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="read-meta mx-auto mb-8 max-w-reading font-sans text-xs uppercase tracking-eyebrow text-ink/65 dark:text-cream/65">{readMin} min de leitura</p>
        <Reveal>
          <div className="prose-theatro mx-auto" dangerouslySetInnerHTML={{ __html: page.html }} />
        </Reveal>

        {showAD && antesDepoisList.length > 0 && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <h2 className="mb-2 font-display text-3xl">Antes e depois do restauro</h2>
            <p className="mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              Arraste a divisória para comparar o edifício durante a obra e depois da restauração.
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

        {params.slug === 'visite' && <MapaVisita />}

        {params.slug === 'memorias' && curiosidadesList.length > 0 && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <h2 className="mb-8 font-display text-3xl">Você sabia?</h2>
            <Curiosidades itens={curiosidadesList} />
          </section>
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

        <FontesDaPagina fontes={page.fontes} />
      </div>
    </article>
  );
}
