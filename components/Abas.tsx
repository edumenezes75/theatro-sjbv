'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { IconArrowRight } from './Icons';

// O padrão do site para páginas com grupos (Curiosidades, Pessoas): abas com
// ícone no topo, um grupo por vez na tela, cabeçalho igual em todos os painéis
// e, no fim, o atalho para o grupo seguinte. Os painéis fechados continuam no
// HTML (atributo `hidden`), então a busca do site e os buscadores enxergam tudo.
export type Aba = {
  slug: string;
  nome: string;      // título do painel
  curto: string;     // rótulo da aba
  legenda?: string;
  conta: string;     // "12 histórias", "8 pessoas"
  Icon: (p: { size?: number; className?: string }) => JSX.Element;
  conteudo: ReactNode;
};

export default function Abas({ abas, rotulo }: { abas: Aba[]; rotulo: string }) {
  const [ativo, setAtivo] = useState(0);
  const topo = useRef<HTMLDivElement>(null);

  // /pagina#slug abre direto no grupo
  useEffect(() => {
    const i = abas.findIndex((a) => a.slug === window.location.hash.slice(1));
    if (i >= 0) setAtivo(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const abrir = (i: number, rolar = false) => {
    setAtivo(i);
    history.replaceState(null, '', `#${abas[i].slug}`);
    if (rolar) topo.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const colunas = abas.length >= 5 ? 'sm:grid-cols-5' : abas.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3';
  return (
    <div ref={topo} className="scroll-mt-24">
      <div role="tablist" aria-label={rotulo} className={`-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:gap-3 sm:overflow-visible sm:px-0 ${colunas}`}>
        {abas.map((a, i) => {
          const on = i === ativo;
          return (
            <button
              key={a.slug}
              type="button"
              role="tab"
              id={`tab-${a.slug}`}
              aria-selected={on}
              aria-controls={`painel-${a.slug}`}
              onClick={() => abrir(i)}
              className={`flex shrink-0 items-center gap-3 rounded-sm border px-4 py-3 text-left transition-colors sm:flex-col sm:items-start sm:gap-4 sm:p-5 ${on ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-gold/25 text-ink/75 hover:border-gold/70 hover:text-ink dark:text-cream/75 dark:hover:text-cream'}`}
            >
              <a.Icon size={26} className={on ? '' : 'text-curtain dark:text-gold'} />
              <span>
                <span className="block whitespace-nowrap font-display text-base leading-tight sm:whitespace-normal sm:text-lg">{a.curto}</span>
                <span className={`mt-0.5 block font-sans text-xs ${on ? 'opacity-80' : 'opacity-65'}`}>{a.conta}</span>
              </span>
            </button>
          );
        })}
      </div>

      {abas.map((a, i) => {
        const prox = abas[(i + 1) % abas.length];
        return (
          <section key={a.slug} role="tabpanel" id={`painel-${a.slug}`} aria-labelledby={`tab-${a.slug}`} hidden={i !== ativo} className="mt-10">
            <div className="mb-8 flex items-start gap-4">
              <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-curtain dark:text-gold"><a.Icon size={24} /></span>
              <div>
                <h2 className="font-display text-3xl leading-tight text-ink dark:text-cream">{a.nome}</h2>
                {a.legenda && <p className="mt-1 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{a.legenda}</p>}
              </div>
            </div>
            {a.conteudo}
            {abas.length > 1 && (
              <button
                type="button"
                onClick={() => abrir((i + 1) % abas.length, true)}
                className="group mt-6 flex w-full items-center justify-between gap-4 rounded-sm border border-gold/30 px-6 py-5 text-left transition-colors hover:border-gold"
              >
                <span className="flex items-center gap-4">
                  <prox.Icon size={24} className="shrink-0 text-curtain dark:text-gold" />
                  <span>
                    <span className="block font-sans text-xs uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">A seguir</span>
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
