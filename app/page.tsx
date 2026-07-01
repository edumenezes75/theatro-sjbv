import Image from 'next/image';
import Link from 'next/link';
import CurtainIntro from '@/components/CurtainIntro';
import { fotosList } from '@/lib/data';
import HeroVideo from '@/components/HeroVideo';
import Vozes from '@/components/Vozes';
import { vozesList } from '@/lib/data';
import Mark from '@/components/Mark';
import Reveal from '@/components/Reveal';

const MARCOS: [string, string, string][] = [
  ['1911–1913', 'A cidade ergue o seu palco', 'Por subscrição popular, sanjoanenses compram ações para construir o Theatro.'],
  ['1914', 'A inauguração', 'Em 31 de outubro, a casa abre as portas como o maior teatro do interior paulista.'],
  ['1937–1980', 'O Cine Theatro', 'Por décadas, vira cinema — a matinê de domingo de gerações inteiras.'],
  ['1981–1987', 'A cidade impede a perda', 'Ameaçado de demolição, é comprado pelo poder público e tombado.'],
  ['2002', 'O renascimento', 'Restaurado, reabre na Semana Guiomar Novaes e volta a ser palco vivo.'],
];

const PILLARS = [
  { t: 'Construído por uma rede local', d: 'A Companhia Teatral Sanjoanense reuniu mais de uma centena de acionistas — comerciantes, profissionais e famílias — em torno de um projeto ousado.' },
  { t: 'Uma sala de tradição italiana', d: 'Plateia, frisas, camarotes e galerias formam a curva em ferradura, que aproxima palco e público e muda conforme o lugar ocupado.' },
  { t: 'Quase desapareceu', d: 'No início dos anos 1980, a deterioração e a possibilidade de venda alimentaram o temor da demolição. A cidade reagiu.' },
  { t: 'Voltou a viver', d: 'A compra pelo município, o tombamento e a restauração por etapas devolveram o edifício à cidade — e ao palco.' },
];

const GUIA = [
  { href: '/historia', tag: 'História', t: 'A história completa', d: 'Da ideia de 1911 ao patrimônio vivo de hoje, década a década.', cta: 'Ler a história' },
  { href: '/arquitetura', tag: 'Arquitetura', t: 'A sala em ferradura', d: 'Fachada, plateia, frisas, camarotes, palco e ornamentos.', cta: 'Conhecer o edifício' },
  { href: '/restauracao', tag: 'Restauro', t: 'A luta contra a demolição', d: 'Da retroescavadeira no palco à reabertura, pela mobilização da cidade.', cta: 'Ver a restauração' },
  { href: '/documentario', tag: 'Documentário', t: 'Música & Drama', d: 'A memória do Theatro contada por quem a viveu.', cta: 'Assistir ao filme' },
];

const MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Theatro Municipal de São João da Boa Vista, Praça da Catedral, 22 - Centro, São João da Boa Vista - SP');
const WPP = 'https://wa.me/5519997195719?text=' + encodeURIComponent('Olá! Gostaria de informações para visitar o Theatro Municipal.');

export default function Home() {
  // tira curada (exclusiva da home, sem repetir outras páginas): fachada · sala em ferradura · escadaria · ornamento · restauro · baile de 1930
  const STRIP_IDS = ['h024', 'h154', 'h133', 'h184', 'h089', 'h082'];
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
          <div className="absolute inset-0" style={{ background: 'radial-gradient(130% 90% at 70% 10%, rgba(110,27,34,0.28), transparent 55%)' }} />
        </div>
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-40 text-cream">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-7 w-px bg-gold" />
              <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">História, arte e memória</p>
            </div>
            <h1 className="kinetic-title mt-6 max-w-5xl font-display text-[clamp(2.4rem,12vw,3.4rem)] font-medium leading-[0.96] sm:text-8xl md:text-[8.5rem]">
              Um palco construído<br /><em className="line-2 font-normal italic text-gold">pela cidade</em>
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md font-read text-lg leading-relaxed text-cream/85">
                Em 1914, São João da Boa Vista não inaugurou apenas um edifício. Inaugurou uma ambição: colocar a arte no centro da vida da cidade.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/historia" className="rounded-full bg-curtain px-6 py-3 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03]">Explorar a história</Link>
                <Link href="/documentario" className="rounded-full border border-cream/40 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold">Documentário</Link>
                <Link href="/visite" className="rounded-full border border-cream/40 px-6 py-3 font-sans text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold">Visitar</Link>
              </div>
            </div>
            <p className="mt-7 max-w-xl font-sans text-[0.78rem] leading-relaxed text-cream/55">
              Projeto independente de memória histórica.{' '}
              <Link href="/sobre" className="whitespace-nowrap underline decoration-cream/30 underline-offset-2 transition-colors hover:text-gold">Sobre o projeto →</Link>
            </p>
          </Reveal>
          <span className="pointer-events-none absolute right-6 top-44 hidden font-display text-sm italic tracking-wide text-cream/40 lg:block">desde 1914</span>
        </div>
      </section>

      {/* EM 1 MINUTO */}
      <section className="border-y border-gold/25 bg-cream dark:bg-night">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-6 w-px bg-curtain dark:bg-gold" />
              <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Em 1 minuto</p>
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">A história do Theatro em cinco tempos</h2>
          </Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-sm border border-gold/20 bg-gold/20 sm:grid-cols-3 lg:grid-cols-5">
            {MARCOS.map(([periodo, titulo, linha], i) => (
              <Reveal key={periodo} delay={i * 80} className="flex flex-col bg-cream p-5 dark:bg-night">
                <span className="font-display text-2xl text-curtain dark:text-gold">{periodo}</span>
                <span className="mt-2 font-display text-base font-medium leading-tight text-ink dark:text-cream">{titulo}</span>
                <span className="mt-2 font-sans text-[0.82rem] leading-relaxed text-ink/65 dark:text-cream/65">{linha}</span>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-6 font-sans text-sm text-ink/60 dark:text-cream/60">
              <Link href="/historia" className="underline decoration-gold/40 underline-offset-2 transition-colors hover:text-curtain dark:hover:text-gold">Ler a história completa</Link>
              {' · '}
              <Link href="/linha-do-tempo" className="underline decoration-gold/40 underline-offset-2 transition-colors hover:text-curtain dark:hover:text-gold">Ver a linha do tempo</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* COMECE POR AQUI */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Comece por aqui</p>
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">Quatro caminhos para conhecer o Theatro</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUIA.map((g) => (
              <Link key={g.href} href={g.href} className="card-lift group flex flex-col rounded-sm border border-ink/10 p-6 hover:border-gold/50 dark:border-cream/10">
                <span className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{g.tag}</span>
                <h3 className="mt-2 font-display text-xl leading-tight">{g.t}</h3>
                <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{g.d}</p>
                <span className="mt-4 font-sans text-sm text-curtain dark:text-gold">{g.cta} →</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CASA DE MUITAS VIDAS */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Uma casa de muitas vidas</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Teatro, cinema, baile, rádio, escola e ponto de encontro</h2>
            <div className="mt-6 max-w-reading space-y-4 font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
              <p>O Theatro nasceu para receber companhias dramáticas, música e grandes espetáculos. Logo passou a servir a quase tudo o que mobilizava a cidade: festivais beneficentes, formaturas, comícios, bailes, festas juninas, sessões de cinema, aulas e programas de rádio.</p>
              <p>Para algumas gerações, foi sobretudo teatro. Para outras, o Cine Theatro, com matinês e bomboniere. Para quem viveu o abandono, uma presença ameaçada. Para quem restaurou, a prova de que uma comunidade pode salvar aquilo que reconhece como seu.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure>
              <div className="overflow-hidden rounded-sm">
                <Image src="/fotos/hr-sala-01.jpg" alt="O interior em ferradura num baile histórico, com a plateia ocupada sob as galerias e os camarotes." width={1800} height={1140} className="aspect-[4/3] h-auto w-full object-cover" sizes="(max-width:768px) 100vw, 48vw" />
              </div>
              <figcaption className="mt-3 font-sans text-sm italic leading-relaxed text-ink/70 dark:text-cream/70">Um baile ocupando a plateia, sob as galerias e os camarotes — o Theatro como ponto de encontro da cidade.</figcaption>
            </figure>
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

      {/* FRASE-EIXO — faixa editorial assimétrica */}
      <section className="bg-night text-cream">
        <div className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
          <Reveal>
            <Mark className="text-gold" size={40} />
            <blockquote className="mt-8 max-w-4xl font-display text-3xl italic leading-[1.12] sm:text-5xl md:text-[3.6rem]">
              A cidade ergueu este Theatro, reinventou seus usos a cada geração e, diante da ameaça de demolição, recusou-se a perdê-lo. Hoje, é a arte que o mantém de pé.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* IMAGE FEATURE — sangria com legenda deslocada */}
      <section className="py-24">
        <Reveal>
          <figure>
            <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9] sm:rounded-sm md:mx-auto md:max-w-[88rem]">
              <Image src="/fotos/hr2-sala-05.jpg" alt="A sala em ferradura restaurada, vista do palco." width={1800} height={704} className="h-full w-full object-cover" sizes="100vw" />
            </div>
            <figcaption className="mx-auto mt-4 max-w-6xl px-5 sm:flex sm:justify-end">
              <span className="block max-w-sm font-sans text-sm italic leading-relaxed text-ink/70 dark:text-cream/70">
                A sala em ferradura restaurada — plateia, frisas, camarotes e galeria na curva que aproxima palco e público.
              </span>
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
            <div className="max-w-reading space-y-4 font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
              <p>A história do Theatro não pertence somente aos nomes famosos que passaram pelo palco. Por isso, este site não organiza o passado apenas por datas: permite seguir pessoas, objetos, ambientes e lembranças.</p>
              <p>Uma fotografia de baile conduz à sala em ferradura. Um cartaz leva ao elenco de uma peça. Um depoimento sobre cinema se liga ao antigo bar, à bilheteria e às sessões de domingo.</p>
            </div>
          </Reveal>
        </div>
      </section>

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
                  <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-gold">{f.categoryLabel}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link href="/acervo" className="mt-7 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Ver o acervo completo →</Link>
        </Reveal>
      </section>

      {/* LIVRO DE MEMÓRIAS — convite à participação */}
      <section className="border-t border-gold/20 bg-curtain text-cream dark:bg-gold/10">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">Livro de Memórias</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">Esta história é da cidade — e está incompleta sem a sua lembrança.</h2>
            <p className="mt-5 max-w-reading font-sans text-base leading-relaxed text-cream/85">
              Você assistiu a uma sessão de cinema de domingo, dançou num baile de Carnaval, subiu a escada da galeria, reconheceu um rosto numa foto antiga? Deixe a sua memória no livro aberto do Theatro. Cada lembrança ajuda a identificar imagens e a guardar a casa para quem vem depois.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/livro-de-memorias" className="rounded-full bg-gold px-7 py-3.5 font-sans text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">Deixar a minha lembrança</Link>
              <Link href="/livro-de-memorias" className="rounded-full border border-cream/40 px-7 py-3.5 font-sans text-sm text-cream transition-colors hover:border-gold hover:text-gold">Ler as memórias</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VOZES DO THEATRO */}
      <section className="border-t border-gold/20 bg-cream dark:bg-night">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Vozes do Theatro</p>
            <h2 className="mt-4 mb-12 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">Quem passou pelo palco e pela plateia</h2>
          </Reveal>
          <Reveal delay={100}><Vozes vozes={vozesList} /></Reveal>
        </div>
      </section>

      {/* VISITE */}
      <section className="border-t border-gold/20">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Visite</p>
              <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">No centro histórico, diante da Praça da Catedral</h2>
              <p className="mt-5 max-w-reading font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">
                O Theatro fica na Praça da Catedral, 22 — Centro, São João da Boa Vista (SP). O atendimento administrativo é de segunda a sexta, das 7h às 11h e das 13h às 17h; horários de espetáculo, bilheteria e visita guiada variam conforme a programação.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                  <a href={MAPS} target="_blank" rel="noopener noreferrer" className="rounded-full bg-curtain px-6 py-3 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03] dark:bg-gold dark:text-ink">Como chegar ↗</a>
                  <a href={WPP} target="_blank" rel="noopener noreferrer" className="rounded-full border border-curtain/40 px-6 py-3 font-sans text-sm text-curtain transition-colors hover:border-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink">WhatsApp</a>
                  <Link href="/programacao" className="rounded-full border border-curtain/40 px-6 py-3 font-sans text-sm text-curtain transition-colors hover:border-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink">Programação</Link>
                </div>
                <Link href="/visite" className="self-start border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Planeje sua visita →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DOCUMENTARIO CTA — cinematográfico */}
      <section className="relative overflow-hidden text-cream">
        <Image src="/fotos/hr-historicas-37.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/85 to-night/65" />
        <div className="absolute inset-0 bg-curtaindark/35 mix-blend-multiply" aria-hidden />
        <div className="absolute inset-0 grain opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:py-32">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">Documentário</p>
            <h2 className="mx-auto mt-4 font-display text-4xl leading-[1.04] sm:text-6xl">Música &amp; Drama</h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-cream/80 sm:text-lg">
              A história do Theatro contada por quem a viveu. O filme completo, dividido em capítulos e momentos, com transcrição navegável.
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
    </>
  );
}
