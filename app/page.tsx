import Image from 'next/image';
import Link from 'next/link';
import CurtainIntro from '@/components/CurtainIntro';
import { fotosList } from '@/lib/data';
import HeroVideo from '@/components/HeroVideo';
import Vozes from '@/components/Vozes';
import { vozesList } from '@/lib/data';
import Reveal from '@/components/Reveal';
import HistoriasDoTheatro from '@/components/HistoriasDoTheatro';
import LivroCentenario from '@/components/LivroCentenario';


const GUIA = [
  { href: '/linha-do-tempo', tag: 'A História', t: 'Linha do tempo', d: 'Um século numa rolagem só: capítulos, marcos, fotos e vozes — de 1911 a hoje.', cta: 'Percorrer a linha' },
  { href: '/arquitetura', tag: 'Arquitetura', t: 'A sala em ferradura', d: 'Fachada, plateia, frisas, camarotes, palco e ornamentos.', cta: 'Conhecer o edifício' },
  { href: '/restauracao', tag: 'Restauro', t: 'A luta contra a demolição', d: 'Da retroescavadeira no palco à reabertura, pela mobilização da cidade.', cta: 'Ver a restauração' },
  { href: '/pessoas', tag: 'Pessoas', t: 'Quem fez o Theatro', d: 'Quem construiu, ocupou o palco, defendeu e restaurou a casa.', cta: 'Conhecer as pessoas' },
];

const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Theatro Municipal de São João da Boa Vista, Praça da Catedral, 22 - Centro, São João da Boa Vista - SP');

export default function Home() {
  // tira curada (exclusiva da home, sem repetir outras páginas): fachada · sala em ferradura · escadaria · ornamento · restauro · baile de 1930
  const STRIP_IDS = ['h024', 'h100', 'h133', 'h184', 'h089', 'h082'];
  // rótulos específicos p/ a tira (evita dois 'Eventos' e informa melhor)
  const STRIP_LABELS: Record<string, string> = { h100: 'Concertos', h082: 'Bailes' };
  const strip = STRIP_IDS
    .map((id) => fotosList.find((f) => f.id === id))
    .filter(Boolean) as typeof fotosList;
  return (
    <>
      <CurtainIntro />

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 grain">
          <HeroVideo />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/65 via-night/20 to-transparent" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(130% 90% at 70% 10%, rgba(107,16,33,0.28), transparent 55%)' }} />
        </div>
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-40 text-cream">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-7 w-px bg-gold" />
              <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">História, arte e memória</p>
            </div>
            <h1 className="kinetic-title mt-6 max-w-5xl font-display text-[clamp(2.3rem,11vw,3.2rem)] font-normal leading-[0.98] sm:text-7xl md:text-[7.5rem]">
              Um palco construído<br /><em className="line-2 font-normal italic text-gold">pela cidade</em>
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md font-read text-lg leading-relaxed text-cream/85">
                Em 1914, São João da Boa Vista não inaugurou apenas um edifício. Inaugurou uma ambição: colocar a arte no centro da vida da cidade.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/linha-do-tempo" className="rounded-full bg-curtain px-6 py-3 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03]">Explorar a história</Link>
              </div>
            </div>
            <p className="mt-7 max-w-xl font-sans text-sm leading-relaxed text-cream/65">
              Projeto independente de memória histórica.{' '}
              <Link href="/sobre" className="whitespace-nowrap underline decoration-cream/30 underline-offset-2 transition-colors hover:text-gold">Sobre o projeto →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* COMECE POR AQUI */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Comece por aqui</p>
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-[2.5rem]">Quatro caminhos para conhecer o Theatro</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUIA.map((g) => (
              <Link key={g.href} href={g.href} className="card-lift group flex flex-col rounded-sm border border-ink/10 p-6 hover:border-gold/50 dark:border-cream/10">
                <h3 className="font-display text-xl leading-tight">{g.t}</h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{g.d}</p>
                <span className="mt-4 font-sans text-sm text-curtain dark:text-gold">{g.cta} →</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FRASE-EIXO sobre a sala — a frase e a foto larga, que eram dois blocos, num só */}
      <section className="relative overflow-hidden grain">
        <Image src="/fotos/hr2-sala-05.jpg" alt="A sala em ferradura restaurada, vista do palco." fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/45" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-40">
          <Reveal>
            <blockquote className="max-w-4xl font-display text-3xl italic leading-[1.12] text-cream sm:text-5xl md:text-[3.4rem]">
              A cidade ergueu este Theatro, reinventou seus usos a cada geração e, diante da ameaça de demolição, recusou-se a perdê-lo. Hoje, é a arte que o mantém de pé.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* AS HISTÓRIAS DO THEATRO — série: registro da estreia + canais */}
      <HistoriasDoTheatro />

      {/* CASA DE MUITAS VIDAS */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Uma casa de muitas vidas</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.5rem]">Teatro, cinema, baile, rádio, escola e ponto de encontro</h2>
            <div className="mt-6 max-w-reading space-y-4 font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
              <p>O Theatro nasceu para receber companhias dramáticas, música e grandes espetáculos. Logo passou a servir a quase tudo o que mobilizava a cidade: festivais beneficentes, formaturas, comícios, bailes, festas juninas, sessões de cinema, aulas e programas de rádio.</p>
              <p>Para algumas gerações, foi sobretudo teatro. Para outras, o Cine Theatro, com matinês e bomboniere. Para quem viveu o abandono, uma presença ameaçada. Para quem restaurou, a prova de que uma comunidade pode salvar aquilo que reconhece como seu.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure>
              <div className="overflow-hidden rounded-sm">
                <Image src="/fotos/hr-sala-01.jpg" alt="O interior em ferradura numa festa junina, com a plateia ocupada sob as galerias e os camarotes." width={1800} height={1140} className="aspect-[4/3] h-auto w-full object-cover" sizes="(max-width:768px) 100vw, 48vw" />
              </div>
              <figcaption className="mt-3 font-sans text-sm italic leading-relaxed text-ink/70 dark:text-cream/70">Uma festa junina ocupando a plateia, sob as galerias e os camarotes — o Theatro como ponto de encontro da cidade.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* DOCUMENTARIO CTA — cinematográfico */}
      <section className="relative overflow-hidden text-cream">
        <Image src="/fotos/hr-historicas-37.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/85 to-night/65" />
        <div className="absolute inset-0 bg-curtaindark/35 mix-blend-multiply" aria-hidden />
        <div className="absolute inset-0 grain opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:py-32">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">Documentário</p>
            <h2 className="mx-auto mt-4 font-display text-4xl leading-[1.04] sm:text-6xl">Música &amp; Drama</h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-cream/80 sm:text-lg">
              A história do Theatro contada por quem a viveu. O filme completo, dividido em capítulos e momentos.
            </p>
            <Link href="/documentario" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 font-sans text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/15">
                <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M0 0v12l11-6z" /></svg>
              </span>
              Assistir ao documentário
            </Link>
          </Reveal>
        </div>
      </section>

      {/* O LIVRO DO CENTENÁRIO — download autorizado */}
      <LivroCentenario />

      {/* FULL-BLEED — imagem + frase */}
      <section className="relative h-[78vh] min-h-[460px] overflow-hidden grain">
        <Image src="/fotos/hr-pessoas-19.jpg" alt="Vista antiga da praça e do entorno do Theatro, no centro da cidade." fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-night/10" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-5 pb-16">
          <Reveal>
            <p className="max-w-2xl font-display text-3xl italic leading-tight text-cream sm:text-4xl md:text-5xl">
              Aos domingos, a fila dobrava a esquina: por décadas, o Cine Theatro foi o maior programa da cidade.
            </p>
          </Reveal>
        </div>
      </section>

      {/* O THEATRO EM IMAGENS */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">O Theatro em imagens</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-[2.5rem]">Da fachada eclética à sala em ferradura</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {strip.map((f) => (
              <Link key={f.id} href="/acervo" className="group relative block overflow-hidden rounded-sm">
                <Image src={`/${f.file}`} alt={f.alt} width={f.w} height={f.h} className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" sizes="(max-width:768px) 50vw, 33vw" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-3 pt-10">
                  <span className="font-sans text-xs uppercase tracking-eyebrow text-gold">{STRIP_LABELS[f.id] ?? f.categoryLabel}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/acervo" className="mt-7 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Ver o acervo completo →</Link>
        </Reveal>
      </section>

      {/* VOZES DO THEATRO */}
      <section className="border-t border-gold/20 bg-cream dark:bg-night">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Vozes do Theatro</p>
            <h2 className="mt-4 mb-12 max-w-2xl font-display text-3xl leading-tight sm:text-4xl lg:text-[2.5rem]">Quem passou pelo palco e pela plateia</h2>
          </Reveal>
          <Reveal delay={100}><Vozes vozes={vozesList} /></Reveal>
        </div>
      </section>

      {/* VISITE */}
      <section className="border-t border-gold/20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Visite</p>
              <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.5rem]">No centro histórico, diante da Praça da Catedral</h2>
              <p className="mt-5 max-w-reading font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
                O Theatro fica na Praça da Catedral, 22 — Centro, São João da Boa Vista (SP). O atendimento administrativo é de segunda a sexta, das 7h às 11h e das 13h às 17h; horários de espetáculo, bilheteria e visita guiada variam conforme a programação.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                  <a href={MAPS} target="_blank" rel="noopener noreferrer" className="rounded-full bg-curtain px-6 py-3 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03] dark:bg-gold dark:text-ink">Como chegar ↗</a>
                </div>
                <Link href="/visite" className="self-start border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Planeje sua visita →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
