'use client';
import { useMemo, useState } from 'react';
import rep from '@/data/repertorio.json';

// O repertório de 2002 a 2013: 966 títulos numa página só. A regra aqui é a mesma
// da linha do tempo — o ano fala alto, o título fala em tom normal, o resto sussurra.
// Nada de cartões: uma lista longa que se lê como uma lista, com filtros que a
// encurtam quando o visitante já sabe o que procura.

type Item = { ano: number; cat: string; t: string; proj?: string; filmeAno?: number };
type Resumo = { linhas: string[]; total: number | null };

const dados = rep as { fonte: string; nota: string; resumos: Record<string, Resumo>; itens: Item[] };
const ITENS = dados.itens;

const CATS = ['Música', 'Teatro', 'Comédia', 'Infantil', 'Dança', 'Cinema', 'Formação', 'Outros'];
const ANOS = Array.from(new Set(ITENS.map((i) => i.ano))).sort();

const semAcento = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors ${
        on
          ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-night'
          : 'border-ink/15 text-ink/75 hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold'
      }`}
    >
      {children}
    </button>
  );
}

export default function Repertorio() {
  const [cat, setCat] = useState<string | null>(null);
  const [ano, setAno] = useState<number | null>(null);
  const [q, setQ] = useState('');

  const filtrados = useMemo(() => {
    const busca = semAcento(q.trim());
    return ITENS.filter(
      (i) =>
        (!cat || i.cat === cat) &&
        (!ano || i.ano === ano) &&
        (!busca || semAcento(i.t).includes(busca) || semAcento(i.proj || '').includes(busca)),
    );
  }, [cat, ano, q]);

  const porAno = useMemo(() => {
    const m = new Map<number, Item[]>();
    for (const i of filtrados) {
      const l = m.get(i.ano);
      if (l) l.push(i);
      else m.set(i.ano, [i]);
    }
    return Array.from(m.entries()).sort((a, b) => a[0] - b[0]);
  }, [filtrados]);

  const filtrando = !!cat || !!ano || !!q.trim();

  return (
    <div>
      <div className="border-y border-gold/25 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-sans text-xs uppercase tracking-eyebrow text-ink/60 dark:text-cream/60">Linguagem</span>
          {CATS.map((c) => (
            <Chip key={c} on={cat === c} onClick={() => setCat(cat === c ? null : c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-sans text-xs uppercase tracking-eyebrow text-ink/60 dark:text-cream/60">Ano</span>
          {ANOS.map((a) => (
            <Chip key={a} on={ano === a} onClick={() => setAno(ano === a ? null : a)}>
              {a}
            </Chip>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex-1 min-w-[16rem]">
            <span className="sr-only">Procurar um título, um artista ou um projeto</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Procurar um título, um artista, um projeto…"
              className="w-full border-b border-ink/20 bg-transparent py-2 font-sans text-sm text-ink placeholder:text-ink/40 focus:border-curtain focus:outline-none dark:border-cream/20 dark:text-cream dark:placeholder:text-cream/40 dark:focus:border-gold"
            />
          </label>
          {filtrando && (
            <button
              type="button"
              onClick={() => { setCat(null); setAno(null); setQ(''); }}
              className="font-sans text-xs text-curtain underline decoration-gold/45 underline-offset-4 transition-colors hover:decoration-current dark:text-gold"
            >
              Limpar
            </button>
          )}
        </div>
        <p aria-live="polite" className="mt-3 font-sans text-xs text-ink/55 dark:text-cream/55">
          {filtrados.length === 0
            ? 'Nada encontrado com esses filtros.'
            : `${filtrados.length} ${filtrados.length === 1 ? 'título' : 'títulos'}${filtrando ? ' nesta seleção' : ' no total'}.`}
        </p>
      </div>

      {porAno.map(([a, lista]) => {
        const r = dados.resumos[String(a)];
        return (
          <section key={a} aria-labelledby={`ano-${a}`} className="mt-12 scroll-mt-28">
            <header id={`ano-${a}`} className="flex flex-wrap items-baseline gap-x-4">
              <h2 className="font-display text-3xl font-medium leading-none text-curtain dark:text-gold sm:text-4xl">{a}</h2>
              <p className="font-sans text-xs text-ink/50 dark:text-cream/50">
                {lista.length} {lista.length === 1 ? 'título' : 'títulos'} nesta relação
                {r?.total ? ` · a AMITE contabilizou ${r.total} eventos culturais no ano` : ''}
              </p>
            </header>

            <ul className="mt-4 border-t border-ink/10 dark:border-cream/10">
              {lista.map((i, n) => (
                <li key={`${a}-${n}`} className="border-b border-ink/8 py-2.5 dark:border-cream/10">
                  <span className="font-read text-[0.95rem] leading-relaxed text-ink/85 dark:text-cream/85">{i.t}</span>
                  <span className="ml-2 whitespace-nowrap font-sans text-[0.68rem] uppercase tracking-[0.12em] text-ink/40 dark:text-cream/40">
                    {i.cat}
                    {i.proj ? ` · ${i.proj}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
