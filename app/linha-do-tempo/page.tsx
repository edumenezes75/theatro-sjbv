import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import GrandeLinha from '@/components/GrandeLinha';

export const metadata: Metadata = {
  alternates: { canonical: '/linha-do-tempo' },
  title: 'Linha do tempo — a história inteira',
  description: 'A história do Theatro Municipal de São João da Boa Vista numa rolagem só: os oito capítulos, os marcos datados, as fotos do acervo, as vozes do documentário e os episódios — de 1911 a hoje.',
  openGraph: { title: 'Linha do tempo — Theatro Municipal SJBV', description: 'Um século do Theatro numa rolagem só: capítulos, marcos, fotos, vozes e dossiês, de 1911 a hoje.', type: 'website', images: ['https://www.theatromunicipalsjbv.com.br/fotos/hr-fachada-02.jpg'] },
};

export default function LinhaDoTempoPage() {
  const page = getPageBySlug('/linha-do-tempo');
  return (
    <article>
      <ChapterHero eyebrow="Da pedra fundamental ao patrimônio vivo" title="Linha do tempo" />
      <div className="mx-auto max-w-3xl px-5 pb-16 sm:pb-20">
        <p className="mt-2 max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          A história inteira, numa rolagem só. Oito capítulos abrem as eras; entre eles correm os marcos
          datados, cada um com sua fonte — e, no seu lugar do tempo, as fotos do acervo, as vozes do
          documentário e os episódios para descer mais fundo sem sair da linha.
        </p>
        <GrandeLinha />
        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
