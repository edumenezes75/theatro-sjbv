import type { Metadata } from 'next';
import { fotosList } from '@/lib/data';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import GaleriaReal from '@/components/GaleriaReal';
import LazyMount from '@/components/LazyMount';

export const metadata: Metadata = {
  alternates: { canonical: '/acervo' },
  title: 'Acervo',
  description: 'Fotografias do Theatro Municipal de São João da Boa Vista — fachada, sala em ferradura, ornamentos, restauro e imagens históricas, com procedência.',
};

export default function AcervoPage() {
  const page = getPageBySlug('/acervo');
  const destaqueIds = ['h206', 'h049', 'h001', 'h050', 'h045', 'h020', 'h193', 'h087', 'h083', 'h016', 'h194', 'h028', 'h184', 'h096', 'h137', 'h024', 'h043', 'h095', 'h094'];
  const destaque = destaqueIds.map((id) => fotosList.find((f) => f.id === id)).filter(Boolean) as typeof fotosList;
  const CULT = ['arte-cultura', 'eventos', 'ii-semana-fernando-fulanetto', 'fundcao-oliveira-neto'];
  const ev = (f: (typeof fotosList)[number]) => CULT.includes(f.category);
  const hist = fotosList.filter((f) => f.epoca === 'Histórico'); // inclui a vida cultural de outrora
  const rest = fotosList.filter((f) => f.epoca === 'Restauro' && !ev(f));
  const hoje = fotosList.filter((f) => f.epoca === 'Atual' && !ev(f));
  const pre = fotosList.filter((f) => f.epoca === 'Pré-restauro' && !ev(f));
  const cult = fotosList.filter((f) => ev(f) && f.epoca !== 'Histórico'); // vida cultural moderna
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
          <span className="mr-1 font-sans text-[0.62rem] uppercase tracking-eyebrow text-ink/55 dark:text-cream/55">Saltar para</span>
          <a href="#cap-historico" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">O Theatro histórico</a>
          <a href="#cap-pre" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">A decadência</a>
          <a href="#cap-restauro" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">O restauro</a>
          <a href="#cap-hoje" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">O Theatro restaurado</a>
          <a href="#cap-cultural" className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">A vida cultural</a>
        </nav>

        <section id="cap-historico" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 1 · o Theatro de outras décadas</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">O Theatro histórico</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Da era do cinema aos bailes, da rádio à biblioteca e à ameaça de demolição — o edifício e a cidade em registros de outras décadas. <span className="text-curtain dark:text-gold">{hist.length} imagens.</span> Refine por tema; clique para ampliar ou use o modo apresentação.
          </p>
          <GaleriaReal fotos={hist} showEpoca={false} />
        </section>
        <section id="cap-pre" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 2 · a decadência</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">O Theatro antes do restauro</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            O abandono, as goteiras, os ornatos perdidos e as rachaduras — o estado em que o edifício foi encontrado. <span className="text-curtain dark:text-gold">{pre.length} imagens.</span> Refine por tema; clique para ampliar ou use o modo apresentação.
          </p>
          <LazyMount><GaleriaReal fotos={pre} showEpoca={false} /></LazyMount>
        </section>
        <section id="cap-restauro" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 3 · a recuperação</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">O restauro, etapa por etapa</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Andaimes por dentro e por fora, a escavação do fosso da orquestra, a decapagem e os artistas devolvendo cor aos ornatos. <span className="text-curtain dark:text-gold">{rest.length} imagens.</span> Refine por tema; clique para ampliar ou use o modo apresentação.
          </p>
          <LazyMount><GaleriaReal fotos={rest} showEpoca={false} /></LazyMount>
        </section>
        <section id="cap-hoje" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 4 · o edifício recuperado</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">O Theatro restaurado</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            A sala em ferradura recuperada, os ornamentos e a fachada eclética — o edifício desde a reabertura, em 2002. <span className="text-curtain dark:text-gold">{hoje.length} imagens.</span> Refine por tema; clique para ampliar ou use o modo apresentação.
          </p>
          <LazyMount><GaleriaReal fotos={hoje} showEpoca={false} /></LazyMount>
        </section>

        <section id="cap-cultural" className="mt-16 scroll-mt-24 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo 5 · o palco vivo</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">A vida cultural, do restauro aos dias de hoje</h2>
          <p className="mt-2 mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Concertos, festivais, exposições, teatro e dança que ocupam o Theatro desde o restauro — da Semana Guiomar Novaes à Semana Furlanetto, do Festival Assad aos corais e à dança. <span className="text-curtain dark:text-gold">{cult.length} imagens.</span> Refine por tema; clique para ampliar.
          </p>
          <LazyMount><GaleriaReal fotos={cult} showEpoca /></LazyMount>
        </section>

        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
