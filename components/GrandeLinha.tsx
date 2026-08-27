import Image from 'next/image';
import Link from 'next/link';
import { getGrandeLinha, passosDaEra, type Era, type Passo } from '@/lib/grandeLinha';
import { pessoasNoTexto, pessoaSlug } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import Reveal from './Reveal';
import EraRail from './EraRail';

const VID = 'e2stgoHtlAQ';
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// A linha do tempo: uma rolagem só, de 1911 a hoje. Cada era abre com o capítulo
// da História, segue com os marcos datados e recebe, no seu lugar do tempo, o
// que o site guarda daquela época.
//
// HIERARQUIA DE PESOS (a regra que mantém a página elegante):
//   a era fala alto (8×) · o evento fala em tom normal (98×) · o recheio sussurra.
// Só o evento — que é um momento no tempo — leva losango. Foto, citação e
// episódio se penduram na linha sem marca própria: não são datas.
// Nada de caixas: fundo e borda eram cinco vozes brigando numa coluna só.

// Nome que já está escrito na frase vira link ali mesmo. Antes o resumo dizia
// "Recital da professora Miriam Pipano." e logo abaixo "Com Miriam Pipano." —
// o mesmo nome duas vezes em duas linhas. Agora o link é a própria menção.
const semAcento = (c: string) =>
  c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ');

function ligarNoTexto(texto: string, pessoas: { slug: string; name: string }[]) {
  // índice normalizado ↔ índice original, caractere a caractere
  let norm = '';
  const mapa: number[] = [];
  for (let i = 0; i < texto.length; i++) {
    const n = semAcento(texto[i]);
    for (const ch of n) { norm += ch; mapa.push(i); }
  }
  const achados: { ini: number; fim: number; p: { slug: string; name: string } }[] = [];
  for (const p of pessoas) {
    const chave = semAcento(p.name).trim();
    if (chave.length < 6) continue;
    const at = norm.indexOf(chave);
    if (at < 0) continue;
    const ini = mapa[at];
    const fim = mapa[at + chave.length - 1] + 1;
    if (achados.some((a) => ini < a.fim && fim > a.ini)) continue;
    achados.push({ ini, fim, p });
  }
  achados.sort((a, b) => a.ini - b.ini);
  const restantes = pessoas.filter((p) => !achados.some((a) => a.p.slug === p.slug));
  if (!achados.length) return { nos: [texto] as React.ReactNode[], restantes };
  const nos: React.ReactNode[] = [];
  let cursor = 0;
  achados.forEach((a, i) => {
    if (a.ini > cursor) nos.push(texto.slice(cursor, a.ini));
    nos.push(
      <Link
        key={`${a.p.slug}-${i}`}
        href={`/pessoas/${a.p.slug}`}
        className="text-inherit underline decoration-gold/45 underline-offset-2 transition-colors hover:text-curtain hover:decoration-current dark:hover:text-gold"
      >
        {texto.slice(a.ini, a.fim)}
      </Link>,
    );
    cursor = a.fim;
  });
  if (cursor < texto.length) nos.push(texto.slice(cursor));
  return { nos, restantes };
}

const ligarNomes = (nomes: { slug: string; name: string }[]) =>
  nomes.map((p, i) => (
    <span key={p.slug}>
      {i > 0 && (i === nomes.length - 1 ? ' e ' : ', ')}
      <Link
        href={`/pessoas/${p.slug}`}
        className="text-curtain underline decoration-gold/40 underline-offset-2 transition-colors hover:decoration-current dark:text-gold"
      >
        {p.name}
      </Link>
    </span>
  ));

function PassoNode({ passo }: { passo: Passo }) {
  if (passo.tipo === 'evento') {
    const e = passo.evento;
    const pessoas = pessoasNoTexto(`${e.title} ${e.summary}`).map((p) => ({ slug: pessoaSlug(p), name: p.name }));
    const { nos: resumo, restantes } = ligarNoTexto(e.summary, pessoas);
    return (
      <li id={e.id} className="relative mb-[26px] scroll-mt-40">
        <span
          aria-hidden
          className="absolute -left-[1.68rem] top-[0.7rem] h-[7px] w-[7px] rotate-45 border border-curtain bg-cream dark:border-gold dark:bg-night sm:-left-[2.72rem]"
        />
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-sans text-xs uppercase tracking-[0.1em] text-curtain dark:text-gold">{e.display}</span>
            <SeloEvidencia status={e.status} />
          </div>
          <h3 className="mt-0.5 font-display text-[1.12rem] font-medium leading-snug">{e.title}</h3>
          <p className="mt-1 max-w-reading font-sans text-[0.88rem] leading-relaxed text-ink/70 dark:text-cream/70">
            {resumo}
            {restantes.length > 0 && <> <span className="text-ink/45 dark:text-cream/65">Com {ligarNomes(restantes)}.</span></>}
          </p>
        </Reveal>
      </li>
    );
  }

  if (passo.tipo === 'foto') {
    const f = passo.foto;
    return (
      <li className="my-[34px]">
        <Reveal>
          <figure>
            <Link href={`/acervo/${f.id}`} className="group block max-w-xl">
              <span className="relative block overflow-hidden rounded-sm bg-ink/5 dark:bg-cream/5">
                <Image
                  src={`/${f.file}`}
                  alt={f.alt}
                  width={f.w}
                  height={f.h}
                  sizes="(max-width: 640px) 92vw, 560px"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </span>
              <figcaption className="mt-2 block max-w-xl font-sans text-sm italic leading-relaxed text-ink/52 dark:text-cream/65">
                {f.alt}{' '}
                <span className="whitespace-nowrap not-italic text-curtain underline decoration-gold/40 underline-offset-2 dark:text-gold">
                  Ver no acervo →
                </span>
              </figcaption>
            </Link>
          </figure>
        </Reveal>
      </li>
    );
  }

  const v = passo.voz;
  return (
    <li className="my-[34px]">
      <Reveal>
        <figure className="max-w-xl border-l-2 border-gold pl-5">
          <blockquote className="font-display text-[1.22rem] italic leading-snug text-ink/90 dark:text-cream/90">
            “{v.quote}”
          </blockquote>
          <figcaption className="mt-2 font-sans text-sm leading-relaxed text-ink/50 dark:text-cream/65">
            {v.autor} · {v.papel}
          </figcaption>
          {typeof v.segundo === 'number' && (
            <a
              href={`https://www.youtube.com/watch?v=${VID}&t=${v.segundo}s`}
              className="mt-1.5 inline-block font-sans text-sm text-curtain underline decoration-gold/45 underline-offset-4 transition-colors hover:decoration-current dark:text-gold"
            >
              Ouvir em Música &amp; Drama ({mmss(v.segundo)})
            </a>
          )}
        </figure>
      </Reveal>
    </li>
  );
}

function EraBloco({ era, ultima }: { era: Era; ultima: boolean }) {
  const passos = passosDaEra(era);
  return (
    <section aria-labelledby={`era-${era.id}`}>
      <header id={`era-${era.id}`} className="scroll-mt-32 pt-2">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-eyebrow text-ink/40 dark:text-cream/65">
            Capítulo {era.capitulo} de 8
          </p>
          <p className="mt-1.5 font-display text-[2.1rem] font-medium leading-[1.05] text-curtain dark:text-gold sm:text-4xl">
            {era.anos}
          </p>
          <h2 className="mt-0.5 font-display text-[1.3rem] font-medium leading-snug sm:text-2xl">{era.titulo}</h2>
          <p className="mt-2.5 max-w-reading font-read text-[0.98rem] leading-relaxed text-ink/80 dark:text-cream/80">
            {era.abre}
          </p>
          <Link
            href={`/historia#${era.capAnchor}`}
            className="mt-2 inline-block font-sans text-sm text-curtain underline decoration-gold/45 underline-offset-4 transition-colors hover:decoration-current dark:text-gold"
          >
            Ler o capítulo completo →
          </Link>
        </Reveal>
      </header>

      <ol className="relative mt-6 border-l border-gold/35 pl-6 sm:pl-10">
        {passos.map((p, i) => (
          <PassoNode key={i} passo={p} />
        ))}

        {/* Episódios: uma lista, não três caixas iguais repetindo o mesmo rótulo */}
        {era.dossies.length > 0 && (
          <li className="my-[34px] max-w-xl border-y border-gold/30 py-4">
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-eyebrow text-ink/45 dark:text-cream/65">
                Para se aprofundar nesta era
              </p>
              <ul className="mt-2">
                {era.dossies.map((d) => (
                  <li key={d.slug} className="border-t border-ink/8 first:border-t-0 dark:border-cream/10">
                    <Link
                      href={d.slug}
                      title={d.desc}
                      className="flex items-baseline justify-between gap-4 py-2 transition-colors hover:text-curtain dark:hover:text-gold"
                    >
                      <span className="font-display text-[1.02rem] leading-snug">{d.titulo}</span>
                      <span aria-hidden className="font-sans text-gold">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        )}

        {/* Pessoas: frase, não pílulas */}
        {era.pessoas.length > 0 && (
          <li className="mt-[22px] max-w-xl">
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-eyebrow text-ink/45 dark:text-cream/65">
                Quem viveu esta era
              </p>
              <p className="mt-1 font-sans text-[0.86rem] leading-loose text-ink/60 dark:text-cream/60">
                {ligarNomes(era.pessoas)}.
              </p>
            </Reveal>
          </li>
        )}
      </ol>

      {/* Fim de era: respiro e filete. O antigo bloco "A seguir" anunciava o que
          o cabeçalho seguinte diz melhor, dois centímetros abaixo. */}
      {!ultima && <hr className="mb-[30px] mt-[56px] border-t border-gold/30" />}
    </section>
  );
}

export default function GrandeLinha() {
  const eras = getGrandeLinha();
  return (
    <>
      <EraRail eras={eras.map((e) => ({ id: e.id, rail: e.rail }))} />
      <div className="mt-8 space-y-0">
        {eras.map((era, i) => (
          <EraBloco key={era.id} era={era} ultima={i === eras.length - 1} />
        ))}
      </div>
    </>
  );
}
