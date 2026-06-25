'use client';
import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type ItemBusca = {
  tipo: 'Pessoa' | 'Foto' | 'Linha do tempo' | 'Curiosidade';
  titulo: string;
  sub?: string;
  texto?: string;
  href: string;
  thumb?: string;
};

const norm = (s: string) =>
  (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const ORDEM: ItemBusca['tipo'][] = ['Pessoa', 'Foto', 'Linha do tempo', 'Curiosidade'];

export default function BuscaGlobal({ itens, initialQ = '' }: { itens: ItemBusca[]; initialQ?: string }) {
  const [q, setQ] = useState(initialQ);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);

  const indexados = useMemo(
    () => itens.map((it) => ({ it, hay: norm(`${it.titulo} ${it.sub ?? ''} ${it.texto ?? ''}`), htit: norm(it.titulo) })),
    [itens],
  );

  const resultados = useMemo(() => {
    const termo = norm(q.trim());
    if (termo.length < 2) return [] as ItemBusca[];
    const toks = termo.split(/\s+/);
    const scored = indexados
      .map(({ it, hay, htit }) => {
        if (!toks.every((t) => hay.includes(t))) return null;
        let score = 0;
        for (const t of toks) { if (htit.includes(t)) score += 3; if (hay.startsWith(t)) score += 1; }
        return { it, score };
      })
      .filter(Boolean) as { it: ItemBusca; score: number }[];
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 60).map((x) => x.it);
  }, [q, indexados]);

  const grupos = useMemo(() => {
    const m = new Map<string, ItemBusca[]>();
    for (const r of resultados) { const a = m.get(r.tipo) ?? []; a.push(r); m.set(r.tipo, a); }
    return ORDEM.filter((t) => m.has(t)).map((t) => [t, m.get(t)!] as [string, ItemBusca[]]);
  }, [resultados]);

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 dark:text-cream/40">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </span>
        <input
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="Busque por um nome, uma foto, uma data, uma curiosidade…"
          aria-label="Buscar no site"
          className="w-full rounded-sm border border-ink/20 bg-cream/60 py-3.5 pl-12 pr-4 font-sans text-base text-ink outline-none transition-colors focus:border-curtain dark:border-cream/20 dark:bg-night/50 dark:text-cream dark:focus:border-gold"
        />
      </div>

      {q.trim().length >= 2 && (
        <p className="mt-3 font-sans text-sm text-ink/60 dark:text-cream/60">
          {resultados.length === 0 ? 'Nada encontrado. Tente outro termo.' : `${resultados.length} resultado${resultados.length > 1 ? 's' : ''}.`}
        </p>
      )}

      <div className="mt-6 space-y-10">
        {grupos.map(([tipo, lista]) => (
          <section key={tipo}>
            <h2 className="mb-3 font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">{tipo} · {lista.length}</h2>
            <ul className="divide-y divide-ink/8 dark:divide-cream/10">
              {lista.map((it, i) => (
                <li key={i}>
                  <Link href={it.href} className="group flex items-start gap-4 py-3">
                    {it.thumb ? (
                      <span className="relative block h-14 w-14 flex-none overflow-hidden rounded-sm bg-ink/10 dark:bg-cream/5">
                        <Image src={it.thumb} alt="" fill className="object-cover" sizes="56px" />
                      </span>
                    ) : (
                      <span className="flex h-14 w-14 flex-none items-center justify-center rounded-sm bg-gold/10 text-gold" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 19.5V6a2 2 0 0 1 2-2h12v16H6a2 2 0 0 1-2-2Z"/><path d="M8 7h7M8 11h7"/></svg>
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block font-display text-lg leading-snug text-ink group-hover:text-curtain dark:text-cream dark:group-hover:text-gold">{it.titulo}</span>
                      {it.sub && <span className="block font-sans text-sm text-ink/65 dark:text-cream/65">{it.sub}</span>}
                      {it.texto && <span className="mt-0.5 block max-w-2xl font-sans text-sm leading-relaxed text-ink/55 dark:text-cream/55 line-clamp-2">{it.texto}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
