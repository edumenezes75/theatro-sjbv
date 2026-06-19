import Image from 'next/image';
import Link from 'next/link';
import CurtainIntro from '@/components/CurtainIntro';
import { fotosList } from '@/lib/data';
import Reveal from '@/components/Reveal';

const FACTS = [
  ['1913', 'Início da construção'],
  ['1914', 'Inauguração em 31 de outubro'],
  ['1987', 'Tombamento estadual'],
  ['2002', 'Reabertura na Semana Guiomar Novaes'],
];

const PILLARS = [
  { t: 'Construído por uma rede local', d: 'A Companhia Teatral Sanjoanense reuniu mais de uma centena de acionistas — comerciantes, profissionais e famílias — em torno de um projeto ousado.' },
  { t: 'Uma sala de tradição italiana', d: 'Plateia, frisas, camarotes e galerias formam a curva em ferradura, que aproxima palco e público e muda conforme o lugar ocupado.' },
  { t: 'Quase desapareceu', d: 'No início dos anos 1980, a deterioração e a possibilidade de venda alimentaram o temor da demolição. A cidade reagiu.' },
  { t: 'Voltou a viver', d: 'A compra pelo município, o tombamento e a restauração por etapas devolveram o edifício à cidade — e ao palco.' },
];

export default function Home() {
  const strip = ['fachada', 'sala', 'detalhes', 'restauro', 'foyer', 'historicas']
    .map((c) => fotosList.find((f) => f.category === c))
    .filter(Boolean)
    .slice(0, 6) as typeof fotosList;
  return (
    <>
      <CurtainIntro />

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/media/aquarela-theatro.png" alt="Aquarela da fachada histórica do Theatro Municipal de São João da Boa Vista." fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-cream dark:to-night" />
          <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(142,43,32,0.35), transparent 60%)' }} />
        </div>
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-40 text-cream">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">História, arte e memória</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] sm:text-7xl md:text-8xl">Um palco construído pela cidade</h1>
            <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-cream/85">
              Em 1914, São João da Boa Vista não inaugurou apenas um edifício. Inaugurou uma ambição: colocar a arte no centro da vida da cidade.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/historia" className="rounded-full bg-curtain px-6 py-3 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03]">Explorar a história</Link>
              <Link href="/documentario" className="rounded-full border border-cream/40 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold">Assistir ao documentário</Link>
              <Link href="/visite" className="rounded-full border border-cream/40 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold">Planejar uma visita</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FACT STRIP */}
      <section className="border-y border-gold/25 bg-cream dark:bg-night">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-gold/20 px-5 md:grid-cols-4">
          {FACTS.map(([y, l], i) => (
            <Reveal key={y} delay={i * 90} className={`px-5 py-9 ${i >= 2 ? 'border-t border-gold/20 md:border-t-0' : ''}`}>
              <p className="font-display text-4xl text-curtain dark:text-gold">{y}</p>
              <p className="mt-2 font-sans text-sm leading-snug text-ink/70 dark:text-cream/70">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASA DE MUITAS VIDAS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-start gap-14 md:grid-cols-2">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Uma casa de muitas vidas</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Teatro, cinema, baile, rádio, escola e ponto de encontro</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="max-w-reading space-y-4 font-sans text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
              <p>O Theatro nasceu para receber companhias dramáticas, música e grandes espetáculos. Logo passou a servir a quase tudo o que mobilizava a cidade: festivais beneficentes, formaturas, comícios, bailes, festas juninas, sessões de cinema, aulas e programas de rádio.</p>
              <p>Para algumas gerações, foi sobretudo teatro. Para outras, o Cine Theatro, com matinês e bomboniere. Para quem viveu o abandono, uma presença ameaçada. Para quem restaurou, a prova de que uma comunidade pode salvar aquilo que reconhece como seu.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILARES */}
      <section className="bg-ink text-cream dark:bg-black">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal><h2 className="font-display text-3xl sm:text-4xl">O que torna este Theatro especial</h2></Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 80} className="bg-ink p-8 dark:bg-black">
                <span className="font-display text-2xl text-gold">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl">{p.t}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cream/75">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE FEATURE */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <figure>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
              <Image src="/media/fachada-decada-1920.png" alt="Fachada histórica do Theatro Municipal na década de 1920." fill className="object-cover" sizes="100vw" />
            </div>
            <figcaption className="mt-3 max-w-2xl font-sans text-sm italic text-ink/60 dark:text-cream/60">
              Fachada do Theatro na década de 1920. A praça, as portas e a escala do edifício ajudam a compreender o impacto da nova construção na paisagem urbana. <span className="not-italic">— Livro, p. 40.</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* PESSOAS */}
      <section className="border-t border-gold/20 bg-cream dark:bg-night">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Uma história contada por pessoas</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Quem afinou instrumentos, vendeu ingressos, pintou cenários e ocupou uma poltrona</h2>
            <Link href="/pessoas" className="mt-7 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Conhecer as pessoas do Theatro →</Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="max-w-reading space-y-4 font-sans text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
              <p>A história do Theatro não pertence somente aos nomes famosos que passaram pelo palco. Por isso, este site não organiza o passado apenas por datas: permite seguir pessoas, objetos, ambientes e lembranças.</p>
              <p>Uma fotografia de baile conduz à sala em ferradura. Um cartaz leva ao elenco de uma peça. Um depoimento sobre cinema se liga ao antigo bar, à bilheteria e às sessões de domingo.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* O THEATRO EM IMAGENS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">O Theatro em imagens</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">Da fachada eclética à sala em ferradura</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {strip.map((f) => (
              <Link key={f.id} href="/acervo" className="group relative block overflow-hidden rounded-sm">
                <Image src={`/${f.file}`} alt={f.alt} width={f.w} height={f.h} className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="(max-width:768px) 50vw, 33vw" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 pt-10">
                  <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-gold">{f.categoryLabel}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/acervo" className="mt-7 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Ver o acervo completo →</Link>
        </Reveal>
      </section>

      {/* DOCUMENTARIO CTA */}
      <section className="relative overflow-hidden bg-curtaindark text-cream">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg,#6E1F17,#6E1F17 18px,#5A1812 18px,#5A1812 36px)' }} />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">Documentário</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-5xl">Música &amp; Drama</h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg italic leading-relaxed text-cream/85">
              “Antes de ser um filme sobre um prédio, Música &amp; Drama é um filme sobre as pessoas que deram voz, corpo e futuro a esse palco.”
            </p>
            <Link href="/documentario" className="mt-9 inline-block rounded-full bg-gold px-7 py-3 font-sans text-sm font-medium text-ink transition-transform hover:scale-[1.03]">Assistir e explorar o documentário</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
