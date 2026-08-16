import Image from 'next/image';
import Link from 'next/link';
import { getGrandeLinha, passosDaEra, type Era, type Passo } from '@/lib/grandeLinha';
import { pessoasNoTexto, pessoaSlug, fotoTitulo } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import Reveal from './Reveal';
import EraRail from './EraRail';

const VID = 'e2stgoHtlAQ';
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

// A Grande Linha: uma rolagem só, de 1911 a hoje. Cada era abre com o capítulo
// da História (a voz narrativa), segue com os eventos datados e recebe, no seu
// lugar do tempo, o que o site guarda daquela época — fotos, vozes do filme,
// dossiês e pessoas. Os links do documentário abrem no minuto exato (DocPlayer).

const Losango = ({ cheio = false }: { cheio?: boolean }) => (
  <span
    aria-hidden
    className={`absolute -left-[1.85rem] top-2 h-3 w-3 rotate-45 border-2 sm:-left-[2.9rem] ${cheio ? 'border-gold bg-gold' : 'border-curtain bg-cream dark:border-gold dark:bg-night'}`}
  />
);

function PassoNode({ passo }: { passo: Passo }) {
  if (passo.tipo === 'evento') {
    const e = passo.evento;
    const pessoas = pessoasNoTexto(`${e.title} ${e.summary}`).map((p) => ({ slug: pessoaSlug(p), name: p.name }));
    return (
      <li id={e.id} className="relative mb-10 scroll-mt-40">
        <Losango />
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-lg font-medium text-curtain dark:text-gold">{e.display}</span>
            <SeloEvidencia status={e.status} />
          </div>
          <h3 className="mt-1 font-display text-xl leading-tight">{e.title}</h3>
          <p className="mt-2 max-w-reading font-sans text-[0.97rem] leading-relaxed text-ink/80 dark:text-cream/80">{e.summary}</p>
          {pessoas.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-ink/45 dark:text-cream/45">Quem aparece</span>
              {pessoas.map((pe) => (
                <Link key={pe.slug} href={`/pessoas/${pe.slug}`} className="rounded-full border border-ink/12 px-3 py-0.5 font-sans text-[0.8rem] text-ink/75 transition-colors hover:border-gold/60 hover:text-curtain dark:border-cream/12 dark:text-cream/75 dark:hover:text-gold">{pe.name} →</Link>
              ))}
            </div>
          )}
        </Reveal>
      </li>
    );
  }

  if (passo.tipo === 'foto') {
    const f = passo.foto;
    return (
      <li className="relative mb-10">
        <Losango cheio />
        <Reveal>
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
            <span className="mt-2 block font-sans text-[0.82rem] italic leading-relaxed text-ink/60 dark:text-cream/60">
              {f.alt} <span className="not-italic text-curtain underline decoration-gold/40 underline-offset-2 dark:text-gold">Ver no acervo →</span>
            </span>
          </Link>
        </Reveal>
      </li>
    );
  }

  if (passo.tipo === 'voz') {
    const v = passo.voz;
    return (
      <li className="relative mb-10">
        <Losango cheio />
        <Reveal>
          <figure className="max-w-xl rounded-sm bg-night p-6 text-cream">
            <blockquote className="font-display text-lg italic leading-relaxed">“{v.quote}”</blockquote>
            <figcaption className="mt-3 font-sans text-[0.8rem] text-cream/65">
              {v.autor} — {v.papel}
            </figcaption>
            {typeof v.segundo === 'number' && (
              <a
                href={`https://www.youtube.com/watch?v=${VID}&t=${v.segundo}s`}
                className="mt-3 inline-block font-sans text-sm text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-current"
              >
                ▶ Ouvir em Música &amp; Drama ({mmss(v.segundo)})
              </a>
            )}
          </figure>
        </Reveal>
      </li>
    );
  }

  const d = passo.dossie;
  return (
    <li className="relative mb-10">
      <Losango cheio />
      <Reveal>
        <Link href={d.slug} className="card-lift block max-w-xl rounded-sm border border-gold/45 bg-gold/[0.05] p-5 hover:border-gold/70">
          <p className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain dark:text-gold">Para se aprofundar</p>
          <p className="mt-1.5 font-display text-xl leading-tight">{d.titulo}</p>
          <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/75 dark:text-cream/75">{d.desc}</p>
          <span className="mt-2 inline-block font-sans text-sm text-curtain underline decoration-gold/40 underline-offset-4 dark:text-gold">Ler o dossiê →</span>
        </Link>
      </Reveal>
    </li>
  );
}

function EraBloco({ era, proxima }: { era: Era; proxima?: Era }) {
  return (
    <section aria-labelledby={`era-${era.id}`}>
      <header id={`era-${era.id}`} className="scroll-mt-32 pt-12">
        <Reveal>
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Capítulo {era.capitulo} de 8</p>
          <p className="mt-2 font-display text-4xl font-medium leading-none text-curtain dark:text-gold sm:text-5xl">{era.anos}</p>
          <h2 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{era.titulo}</h2>
          <p className="mt-4 max-w-reading font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">{era.abre}</p>
          <Link href={`/historia#${era.capAnchor}`} className="mt-3 inline-block font-sans text-sm text-curtain underline decoration-gold/40 underline-offset-4 hover:decoration-current dark:text-gold">
            Ler o capítulo completo →
          </Link>
        </Reveal>
      </header>

      <ol className="relative mt-8 border-l-2 border-gold/30 pl-6 sm:pl-10">
        {passosDaEra(era).map((p, i) => (
          <PassoNode key={i} passo={p} />
        ))}

        {era.pessoas.length > 0 && (
          <li className="relative mb-4">
            <Losango cheio />
            <p className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-ink/45 dark:text-cream/45">Quem viveu esta era</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {era.pessoas.map((pe) => (
                <Link key={pe.slug} href={`/pessoas/${pe.slug}`} title={pe.role} className="rounded-full border border-ink/12 px-3 py-1 font-sans text-[0.82rem] text-ink/75 transition-colors hover:border-gold/60 hover:text-curtain dark:border-cream/12 dark:text-cream/75 dark:hover:text-gold">
                  {pe.name} →
                </Link>
              ))}
            </div>
          </li>
        )}
      </ol>

      {proxima && (
        <div className="border-t border-gold/25 py-8 text-center">
          <p className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-ink/45 dark:text-cream/45">A seguir · {proxima.anos}</p>
          <p className="mt-1.5 font-display text-xl text-curtain dark:text-gold">{proxima.titulo} ↓</p>
        </div>
      )}
    </section>
  );
}

export default function GrandeLinha() {
  const eras = getGrandeLinha();
  return (
    <>
      <EraRail eras={eras.map((e) => ({ id: e.id, rail: e.rail }))} />
      {eras.map((era, i) => (
        <EraBloco key={era.id} era={era} proxima={eras[i + 1]} />
      ))}
    </>
  );
}
