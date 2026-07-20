import type { Metadata } from 'next';
import { fotosList, pessoasIndexMin } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import GaleriaReal from '@/components/GaleriaReal';
import ReconheceuAlguem from '@/components/ReconheceuAlguem';
import LazyMount from '@/components/LazyMount';

export const metadata: Metadata = {
  alternates: { canonical: '/acervo' },
  title: 'Acervo',
  description: 'Fotografias do Theatro Municipal de São João da Boa Vista — fachada, sala em ferradura, ornamentos, restauro e imagens históricas, com procedência.',
  openGraph: { title: 'Acervo — Theatro Municipal de São João da Boa Vista', description: 'Fachada, sala em ferradura, ornamentos, restauro e imagens históricas, com procedência.', type: 'website', images: ['https://www.theatromunicipalsjbv.com.br/fotos/hr-fachada-02.jpg'] },
};

export default function AcervoPage() {
  const page = getPageBySlug('/acervo');
  const destaqueIds = ['h206', 'h049', 'h001', 'h050', 'h045', 'h020', 'h193', 'h087', 'h083', 'h016', 'h194', 'h028', 'h184', 'h096', 'h137', 'h024', 'h043', 'h095', 'h094'];
  const destaque = destaqueIds.map((id) => fotosList.find((f) => f.id === id)).filter(Boolean) as typeof fotosList;
  const doc = (f: (typeof fotosList)[number]) => f.category === 'documentos';
  const vis = fotosList.filter((f) => !f.hideAcervo);
  // Quatro capítulos: o histórico, a decadência→restauro, o Theatro hoje (restaurado + vivo) e os documentos.
  const hist = vis.filter((f) => f.epoca === 'Histórico' && !doc(f)); // edifício e vida cultural de outrora
  const decRest = vis.filter((f) => (f.epoca === 'Pré-restauro' || f.epoca === 'Restauro') && !doc(f)); // abandono + obra + eventos durante o restauro
  const hoje = vis.filter((f) => f.epoca === 'Atual' && !doc(f)); // o Theatro restaurado e em uso
  const docs = vis.filter(doc);
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

        <nav aria-label="Saltar para um capítulo" className="mt-12 flex flex-wrap items-center gap-2 border-y border-gold/20 py-4">
          <span className="mr-1 font-sans text-[0.68rem] uppercase tracking-eyebrow text-ink/65 dark:text-cream/75">Saltar para</span>
          <a href="#cap-historico" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">O Theatro histórico</a>
          <a href="#cap-restauro" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">Da decadência ao restauro</a>
          <a href="#cap-hoje" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">O Theatro hoje</a>
          <a href="#cap-documentos" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">Documentos</a>
        </nav>

        <section id="cap-historico" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 1 · o Theatro de outras décadas</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">O Theatro histórico</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Da era do cinema aos bailes, da rádio à biblioteca e à ameaça de demolição — o edifício e a cidade em registros de outras décadas. <span className="text-curtain dark:text-gold">{hist.length} imagens.</span> Filtre por tema; clique para ampliar ou use o modo apresentação.
          </p>
          <GaleriaReal fotos={hist} pessoasIndex={pessoasIndexMin} showEpoca={false} colorLast />
        </section>

        <section id="cap-restauro" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 2 · da ruína à recuperação</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Da decadência ao restauro</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            O abandono, as goteiras e os ornatos perdidos — e, depois, os andaimes, a escavação do fosso da orquestra, a decapagem, os artistas devolvendo cor à sala — e os primeiros eventos na sala ainda em obras (a Bienal de Artes, a Semana Furlanetto). <span className="text-curtain dark:text-gold">{decRest.length} imagens.</span> Use o filtro de época e de tema para separar a obra dos eventos.
          </p>
          <LazyMount><GaleriaReal fotos={decRest} pessoasIndex={pessoasIndexMin} showEpoca /></LazyMount>
        </section>

        <section id="cap-hoje" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 3 · o edifício recuperado e o palco vivo</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">O Theatro hoje</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            A sala em ferradura recuperada, os ornamentos e a fachada eclética — e o palco em uso: concertos, festivais, teatro e dança que ocupam o Theatro desde a reabertura, em 2002. <span className="text-curtain dark:text-gold">{hoje.length} imagens.</span> Filtre por tema; clique para ampliar.
          </p>
          <LazyMount><GaleriaReal fotos={hoje} pessoasIndex={pessoasIndexMin} showEpoca /></LazyMount>
        </section>

        <section id="cap-documentos" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 4 · papéis que contam a história</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Documentos</h2>
          <p className="mt-2 mb-10 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Estatutos, escrituras, projetos, programas e o abaixo-assinado que salvou o edifício — os papéis que registram, em cartório e na imprensa, cada etapa da história do Theatro. <span className="text-curtain dark:text-gold">{docs.length} itens.</span> Clique para ampliar e ler.
          </p>
          <LazyMount>
            <div className="space-y-12">
              {[
                ['fundacao', 'Fundação, leis e projetos', 'A lei de 1912, os estatutos, a escritura e os desenhos do edifício.'],
                ['imprensa', 'Imprensa da época', 'O Theatro nas páginas dos jornais, da pedra fundamental ao restauro.'],
                ['programas', 'Programas e convites', 'Festivais, recitais e espetáculos anunciados ao público.'],
                ['preservacao', 'Preservação e tombamento', 'O abaixo-assinado, a Fundação Oliveira Neto e o tombamento de 1987.'],
              ].map(([key, titulo, sub]) => {
                const grupo = docs.filter((f) => f.docgrupo === key);
                if (!grupo.length) return null;
                return (
                  <div key={key}>
                    <div className="mb-5 border-l-2 border-gold/50 pl-4">
                      <h3 className="font-display text-xl leading-tight text-ink dark:text-cream">{titulo}</h3>
                      <p className="mt-1 max-w-reading font-sans text-[0.82rem] italic text-ink/60 dark:text-cream/60">{sub}</p>
                    </div>
                    <GaleriaReal fotos={grupo} pessoasIndex={pessoasIndexMin} withFilter={false} showEpoca={false} />
                  </div>
                );
              })}
            </div>
          </LazyMount>
        </section>

        <ReconheceuAlguem />

        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
