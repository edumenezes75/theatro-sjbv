import type { Metadata } from 'next';
import { imagensList, fotosList } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import Galeria from '@/components/Galeria';
import GaleriaReal from '@/components/GaleriaReal';

export const metadata: Metadata = {
  title: 'Acervo',
  description: 'Fotografias do Theatro Municipal de São João da Boa Vista — fachada, sala em ferradura, ornamentos, restauro e imagens históricas, com procedência.',
};

export default function AcervoPage() {
  const page = getPageBySlug('/acervo');
  return (
    <article>
      <ChapterHero
        eyebrow="Fachada, sala, ornamentos, restauro e história"
        title="Acervo"
        image={`/${(fotosList.find((f) => f.category === 'fachada' && f.epoca === 'Atual') ?? fotosList.find((f) => f.category === 'fachada'))?.file ?? 'media/baile-no-theatro.png'}`}
        alt="Fachada do Theatro Municipal de São João da Boa Vista."
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="mb-3 max-w-reading font-sans text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          Mais de setenta fotografias do edifício — da fachada eclética à sala em ferradura, dos ornamentos restaurados às obras de recuperação. Filtre por tema e clique para ampliar.
        </p>
        <p className="mb-10 max-w-reading font-sans text-sm italic text-ink/70 dark:text-cream/70">
          Imagens do acervo do Theatro Municipal e da Prefeitura de São João da Boa Vista.
        </p>

        <GaleriaReal fotos={fotosList} />

        <section className="mt-20 border-t border-gold/25 pt-12">
          <h2 className="font-display text-3xl">Documentos do livro do centenário</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Imagens extraídas de <em>Theatro Municipal, 100 anos</em> (2014), com indicação de página.
          </p>
          <Galeria imagens={imagensList} />
        </section>

        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
