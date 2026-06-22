import type { Metadata } from 'next';
import { fotosList } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import GaleriaReal from '@/components/GaleriaReal';
import Livros from '@/components/Livros';

export const metadata: Metadata = {
  alternates: { canonical: '/acervo' },
  title: 'Acervo',
  description: 'Fotografias do Theatro Municipal de São João da Boa Vista — fachada, sala em ferradura, ornamentos, restauro e imagens históricas, com procedência.',
};

export default function AcervoPage() {
  const page = getPageBySlug('/acervo');
  const destaqueIds = ['h048', 'h055', 'h036', 'h016', 'h011', 'h009', 'h023', 'h026', 'h081', 'h008'];
  const destaque = destaqueIds.map((id) => fotosList.find((f) => f.id === id)).filter(Boolean) as typeof fotosList;
  const SITE = 'https://www.theatromunicipalsjbv.com.br';
  const ldGallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Acervo de imagens do Theatro Municipal de São João da Boa Vista',
    description: 'Fotografias da fachada, da sala em ferradura, dos ornamentos, do palco, do restauro e da vida cultural do Theatro Municipal.',
    url: SITE + '/acervo',
    inLanguage: 'pt-BR',
    isPartOf: { '@type': 'WebSite', '@id': SITE + '/#website' },
    image: destaque.map((f) => ({ '@type': 'ImageObject', contentUrl: `${SITE}/${f.file}`, caption: f.alt, creditText: f.credit })),
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldGallery) }} />
      <ChapterHero
        eyebrow="Fachada, sala, ornamentos, restauro e história"
        title="Acervo"
        image={`/${(fotosList.find((f) => f.category === 'fachada' && f.epoca === 'Atual') ?? fotosList.find((f) => f.category === 'fachada'))?.file ?? 'fotos/hr-fachada-02.jpg'}`}
        alt="Fachada do Theatro Municipal de São João da Boa Vista."
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="mb-3 max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          O acervo reúne imagens do edifício, da sala, dos ornamentos, do palco, do período do cinema, da ameaça de demolição, do restauro e da vida cultural que mantém o Theatro em uso. Mais do que ilustrar a história, essas imagens ajudam a ver como a cidade se reconheceu nesse edifício.
        </p>
        <p className="mb-10 max-w-reading font-sans text-sm italic text-ink/70 dark:text-cream/70">
          Imagens do acervo do Theatro Municipal e da Prefeitura de São João da Boa Vista.
        </p>

        <section>
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Comece por aqui</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Comece por estes registros</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Uma seleção para entender, em poucas imagens, a construção, a sala em ferradura, o cinema, a ameaça de demolição, o restauro e a vida cultural do Theatro.
          </p>
          <GaleriaReal fotos={destaque} withFilter={false} />
        </section>

        <section className="mt-16 border-t border-gold/25 pt-12">
          <h2 className="font-display text-2xl leading-tight sm:text-3xl">O acervo completo</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Mais de setenta fotografias, da fachada eclética às obras de recuperação. Filtre por tema e época; clique para ampliar.
          </p>
          <GaleriaReal fotos={fotosList} />
        </section>

        <section className="mt-16 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Bibliografia</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Livros sobre o Theatro</h2>
          <p className="mt-2 mb-8 max-w-reading font-read text-sm leading-relaxed text-ink/75 dark:text-cream/75">
            A memória do Theatro foi registrada, ao longo das décadas, em livros locais que se complementam — do registro do centenário às histórias das artes na cidade e ao estudo acadêmico que sistematiza arquivos e controvérsias.
          </p>
          <Livros />
        </section>

        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
