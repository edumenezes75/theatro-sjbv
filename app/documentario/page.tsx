import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import LiteYouTube from '@/components/LiteYouTube';
import TranscricaoFilme from '@/components/TranscricaoFilme';
import transcricao from '@/data/transcricao.json';

export const metadata: Metadata = {
  alternates: { canonical: '/documentario' },
  title: 'Documentário Música & Drama',
  description: 'Assista ao documentário Música & Drama e explore personagens, imagens e episódios da história do Theatro Municipal de São João da Boa Vista.',
};

const CAPS = [
  'A cidade antes do Theatro',
  'Companhia, projeto e construção',
  'A primeira noite e as décadas de espetáculos',
  'O Cine Theatro e as memórias de público',
  'Declínio e ameaça de demolição',
  'Mobilização, compra e tombamento',
  'Restauro e reabertura',
  'O Theatro vivo',
];
const ACESS = ['Legendas em português', 'Transcrição integral', 'Identificação de falantes', 'Audiodescrição das imagens', 'Controle de velocidade', 'Navegação por teclado'];

export default function DocumentarioPage() {
  const page = getPageBySlug('/documentario');
  return (
    <article>
      <ChapterHero eyebrow="A história do Theatro em filme" title="Música & Drama" status="texto público com produção pendente" />
      <div className="mx-auto max-w-4xl px-5 py-10">
        <LiteYouTube id="e2stgoHtlAQ" title="Música & Drama — A História do Theatro Municipal de São João da Boa Vista" />
        <p className="mt-4 max-w-reading font-sans text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          Dirigido por Eduardo Menezes, o filme reúne imagens, documentos e depoimentos sobre a trajetória do edifício, ampliando a pesquisa do livro do centenário e preservando vozes que não cabem em uma cronologia escrita.
        </p>
        <a href="https://www.youtube.com/watch?v=e2stgoHtlAQ" target="_blank" rel="noopener" className="mt-3 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Abrir no YouTube ↗</a>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Estrutura de capítulos</h2>
          <p className="mt-2 font-sans text-sm text-ink/60 dark:text-cream/60">Oito capítulos percorrem a trajetória do Theatro, do fim do século XIX ao patrimônio vivo de hoje.</p>
          <ol className="mt-6 divide-y divide-gold/20 border-y border-gold/20">
            {CAPS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-4 py-3.5">
                <span className="font-display text-lg font-medium text-curtain dark:text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-sans text-[0.97rem]">{c}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Transcrição navegável</h2>
          <p className="mt-3 max-w-reading font-sans text-[0.97rem] leading-relaxed text-ink/80 dark:text-cream/80">
            Transcrição do documentário gerada a partir das legendas e revisada nos nomes próprios. Busque por palavra, nome ou tema — e clique no minuto para abrir o filme exatamente naquele ponto.
          </p>
          <div className="mt-7">
            <TranscricaoFilme segs={transcricao} youtubeId="e2stgoHtlAQ" />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Acessibilidade</h2>
          <p className="mt-2 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">A transcrição navegável já está disponível acima; legendas e controles vêm do player do YouTube; recursos como audiodescrição seguem em preparação.</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {ACESS.map((a) => (
              <li key={a} className="flex items-center gap-2.5 font-sans text-[0.95rem] text-ink/80 dark:text-cream/80">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden /> {a}
              </li>
            ))}
          </ul>
        </section>

        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
