import type { Metadata } from 'next';
import { eventos } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import TimelineExplorer from '@/components/TimelineExplorer';

export const metadata: Metadata = {
  title: 'Linha do tempo',
  description: 'Mais de um século da história do Theatro Municipal de São João da Boa Vista, da ideia de 1911 ao patrimônio vivo de hoje.',
};

export default function LinhaDoTempoPage() {
  const page = getPageBySlug('/linha-do-tempo');
  return (
    <article>
      <ChapterHero eyebrow="Da pedra fundamental ao patrimônio vivo" title="Linha do tempo" />
      <div className="mx-auto max-w-3xl px-5 pb-14">
        <p className="mb-2 max-w-reading font-sans text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          Filtre por era, busque por tema ou pessoa e leia cada marco com sua fonte e seu selo de evidência.
        </p>
        <TimelineExplorer eventos={eventos} />
        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
