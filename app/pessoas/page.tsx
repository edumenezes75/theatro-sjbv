import type { Metadata } from 'next';
import { pessoasList } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import PessoasExplorer from '@/components/PessoasExplorer';

export const metadata: Metadata = {
  title: 'Pessoas',
  description: 'Fundadores, artistas, professores, restauradores e moradores que deram vida ao Theatro Municipal de São João da Boa Vista.',
};

export default function PessoasPage() {
  const page = getPageBySlug('/pessoas');
  return (
    <article>
      <ChapterHero eyebrow="Quem deu corpo e voz ao palco" title="Pessoas" image="/fotos/hr-pessoas-26.jpg" alt="Retrato de Guiomar Novaes ao piano." />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="mb-10 max-w-reading font-sans text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          O Theatro também é feito pelos nomes que o construíram, administraram, defenderam, restauraram, pesquisaram e ocuparam seus palcos. Aqui eles estão reunidos pelo papel que tiveram nessa história — siga as conexões entre eles.
        </p>
        <PessoasExplorer pessoas={pessoasList} />
        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
