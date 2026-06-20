import type { Metadata } from 'next';
import { eventos } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import TimelineExplorer from '@/components/TimelineExplorer';
import NoPalco from '@/components/NoPalco';

export const metadata: Metadata = {
  title: 'Linha do tempo',
  description: 'Mais de um século da história do Theatro Municipal de São João da Boa Vista, da ideia de 1911 ao patrimônio vivo de hoje.',
};

export default function LinhaDoTempoPage() {
  const page = getPageBySlug('/linha-do-tempo');
  return (
    <article>
      <ChapterHero eyebrow="Da pedra fundamental ao patrimônio vivo" title="Linha do tempo" />
      <div className="mx-auto max-w-6xl px-5 pt-14">
        <NoPalco />
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-14">
        <div className="mt-16 border-t border-gold/25 pt-12">
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Ano a ano</p>
          <h2 className="mt-2 font-display text-3xl leading-tight">A história completa, com fontes</h2>
          <p className="mt-3 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Filtre por era, busque por tema ou pessoa e leia cada marco com sua fonte e seu selo de evidência.
          </p>
        </div>
        <TimelineExplorer eventos={eventos} />
        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
