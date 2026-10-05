'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Curiosidade } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import { IconFachada, IconEstrela, IconRadio, IconFilme, IconFechadura, IconArrowRight } from './Icons';

// Uma página, um formato: cinco temas em abas, cada curiosidade num cartão
// igual aos outros (número, título, texto). Um tema por vez na tela — os
// outros continuam no HTML (atributo `hidden`), então a busca do site e os
// buscadores seguem enxergando todas.
type Tema = { nome: string; curto: string; slug: string; legenda: string; Icon: typeof IconFachada };
const TEMAS: Tema[] = [
  { nome: 'Fundação e inauguração', curto: 'Fundação', slug: 'fundacao', legenda: 'De como uma cidade decidiu erguer o seu monumento — e a noite em que ele abriu as portas.', Icon: IconFachada },
  { nome: 'Grandes nomes, grandes noites', curto: 'Grandes noites', slug: 'grandes-noites', legenda: 'Os artistas, os pianos e as plateias que passaram pelo palco.', Icon: IconEstrela },
  { nome: 'A casa de muitos usos', curto: 'Muitos usos', slug: 'muitos-usos', legenda: 'Rádio, rinque, redação de jornal: o edifício foi muito além do espetáculo.', Icon: IconRadio },
  { nome: 'O tempo do cinema', curto: 'Cinema', slug: 'cinema', legenda: 'As décadas em que o Theatro virou cinema — e os causos da plateia.', Icon: IconFilme },
  { nome: 'Ameaça, restauro e mistérios', curto: 'Restauro e mistérios', slug: 'misterios', legenda: 'O fechamento, a luta para salvá-lo, a obra e o que ainda não se explica.', Icon: IconFechadura },
];

// Espalha as que têm foto entre as que não têm, para a grade não começar
// com um bloco de imagens e terminar num bloco de texto.
function intercalar(itens: Curiosidade[]): Curiosidade[] {
  const com = itens.filter((c) => c.fotoInfo);
  const sem = itens.filter((c) => !c.fotoInfo);
  if (!com.length || !sem.length) return itens;
  const passo = Math.max(1, Math.floor(sem.length / com.length));
  const out: Curiosidade[] = [];
  let s = 0;
  for (const c of com) {
    out.push(c);
    out.push(...sem.slice(s, s + passo));
    s += passo;
  }
  return [...out, ...sem.slice(s)];
}

function Card({ c, n }: { c: Curiosidade; n: number }) {
  return (
    <article className="mb-5 break-inside-avoid overflow-hidden rounded-sm border border-gold/20 bg-cream dark:bg-nightsoft">
      {c.fotoInfo && (
        <Link href={`/acervo/${c.fotoInfo.id}`} className="group block overflow-hidden" aria-label={`Ver a imagem no acervo: ${c.fotoInfo.alt}`}>
          <Image
            src={`/${c.fotoInfo.file}`}
            alt={c.fotoInfo.alt}
            width={c.fotoInfo.w}
            height={c.fotoInfo.h}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className={`aspect-[3/2] w-full object-cover brightness-[.82] sepia-[.3] transition duration-500 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:sepia-0 ${c.fotoInfo.doc ? 'object-top' : ''}`}
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-2xl italic leading-none text-curtain dark:text-gold" aria-hidden>{String(n).padStart(2, '0')}</span>
          <SeloEvidencia status={c.type} />
        </div>
        <h3 className="mt-4 font-display text-xl font-medium leading-snug text-ink dark:text-cream">{c.title}</h3>
        <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-ink/80 dark:text-cream/80">{c.text}</p>
      </div>
    </article>
  );
}

export default function Curiosidades({ itens }: { itens: Curiosidade[] }) {
  const grupos = TEMAS.map((t) => ({ ...t, itens: intercalar(itens.filter((c) => c.tema === t.nome)) })).filter((g) => g.itens.length > 0);
  const [ativo, setAtivo] = useState(0);
  const topo = useRef<HTMLDivElement>(null);

  // /memorias#cinema abre direto no tema
  useEffect(() => {
    const i = grupos.findIndex((g) => g.slug === window.location.hash.slice(1));
    if (i >= 0) setAtivo(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const abrir = (i: number, rolar = false) => {
    setAtivo(i);
    history.replaceState(null, '', `#${grupos[i].slug}`);
    if (rolar) topo.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  let base = 0;
  return (
    <div ref={topo} className="scroll-mt-24">
      <div role="tablist" aria-label="Temas das curiosidades" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0">
        {grupos.map((g, i) => {
          const on = i === ativo;
          return (
            <button
              key={g.slug}
              type="button"
              role="tab"
              id={`tab-${g.slug}`}
              aria-selected={on}
              aria-controls={`painel-${g.slug}`}
              onClick={() => abrir(i)}
              className={`flex shrink-0 items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors sm:flex-col sm:items-start sm:gap-4 sm:p-5 ${on ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-gold/25 text-ink/75 hover:border-gold/70 hover:text-ink dark:text-cream/75 dark:hover:text-cream'}`}
            >
              <g.Icon size={26} className={on ? '' : 'text-curtain dark:text-gold'} />
              <span>
                <span className="block whitespace-nowrap font-display text-base leading-tight sm:whitespace-normal sm:text-lg">{g.curto}</span>
                <span className={`mt-0.5 block font-sans text-xs ${on ? 'opacity-80' : 'opacity-65'}`}>{g.itens.length} histórias</span>
              </span>
            </button>
          );
        })}
      </div>

      {grupos.map((g, i) => {
        const inicio = base;
        base += g.itens.length;
        const prox = grupos[(i + 1) % grupos.length];
        return (
          <section key={g.slug} role="tabpanel" id={`painel-${g.slug}`} aria-labelledby={`tab-${g.slug}`} hidden={i !== ativo} className="mt-10">
            <div className="mb-8 flex items-start gap-4">
              <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-curtain dark:text-gold"><g.Icon size={24} /></span>
              <div>
                <h2 className="font-display text-3xl leading-tight text-ink dark:text-cream">{g.nome}</h2>
                <p className="mt-1 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{g.legenda}</p>
              </div>
            </div>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {g.itens.map((c, j) => <Card key={c.id} c={c} n={inicio + j + 1} />)}
            </div>
            {grupos.length > 1 && (
              <button
                type="button"
                onClick={() => abrir((i + 1) % grupos.length, true)}
                className="group mt-6 flex w-full items-center justify-between gap-4 rounded-sm border border-gold/30 px-6 py-5 text-left transition-colors hover:border-gold"
              >
                <span className="flex items-center gap-4">
                  <prox.Icon size={24} className="shrink-0 text-curtain dark:text-gold" />
                  <span>
                    <span className="block font-sans text-xs uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">Próximo tema</span>
                    <span className="mt-1 block font-display text-xl text-ink dark:text-cream">{prox.nome}</span>
                  </span>
                </span>
                <IconArrowRight size={18} className="shrink-0 text-curtain transition-transform group-hover:translate-x-1 dark:text-gold" />
              </button>
            )}
          </section>
        );
      })}
    </div>
  );
}
