import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPages, getEditorialSlugs, getPageBySlug } from '@/lib/content';
import { fotosList, antesDepoisList, curiosidadesList } from '@/lib/data';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import GaleriaReal from '@/components/GaleriaReal';
import AntesDepois from '@/components/AntesDepois';
import Curiosidades from '@/components/Curiosidades';
import Reveal from '@/components/Reveal';

export function generateStaticParams() {
  return getEditorialSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getPageBySlug('/' + params.slug);
  if (!page) return {};
  return { title: page.meta.seo_title || page.meta.title, description: page.meta.seo_description };
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

  return (
    <article>
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

        {params.slug === 'memorias' && curiosidadesList.length > 0 && (
          <section className="mt-16 border-t border-gold/25 pt-12">
            <h2 className="mb-8 font-display text-3xl">Você sabia?</h2>
            <Curiosidades itens={curiosidadesList} />
          </section>
        )}

        <FontesDaPagina fontes={page.fontes} />
      </div>
    </article>
  );
}
