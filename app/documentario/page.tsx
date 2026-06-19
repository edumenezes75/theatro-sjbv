import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import SeloEvidencia from '@/components/SeloEvidencia';
import LiteYouTube from '@/components/LiteYouTube';

export const metadata: Metadata = {
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
          <h2 className="font-display text-2xl">Estrutura de capítulos</h2>
          <p className="mt-2 font-sans text-sm text-ink/60 dark:text-cream/60">Os timecodes serão preenchidos após transcrição e revisão do arquivo-mestre.</p>
          <ol className="mt-6 divide-y divide-gold/20 border-y border-gold/20">
            {CAPS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-4 py-3.5">
                <span className="font-display text-lg text-curtain dark:text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-sans text-[0.97rem]">{c}</span>
                <span className="font-sans text-xs italic text-ink/40 dark:text-cream/40">a marcar</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-sm border border-gold/25 bg-cream/50 p-7 dark:bg-night/40">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl">Transcrição pesquisável</h2>
            <SeloEvidencia status="em pesquisa" label="Em produção" />
          </div>
          <p className="mt-3 max-w-reading font-sans text-[0.97rem] leading-relaxed text-ink/80 dark:text-cream/80">
            A página final trará transcrição sincronizada, com busca por palavra e link direto para o momento correspondente. Nomes de pessoas e lugares funcionarão como filtros, conectando o filme à linha do tempo e às páginas temáticas.
          </p>
          <p className="mt-4 border-l-2 border-curtain pl-4 font-display text-lg italic dark:border-gold">
            00:37:12 — Trecho de depoimento… <Link href="/pessoas" className="text-sm not-italic text-curtain dark:text-gold">[Ver pessoa]</Link>
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl">Acessibilidade</h2>
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
