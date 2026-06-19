'use client';
import { useMemo, useState } from 'react';
import type { Pessoa } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';

export default function PessoasExplorer({ pessoas }: { pessoas: Pessoa[] }) {
  const cats = useMemo(() => ['todas', ...Array.from(new Set(pessoas.map((p) => p.category)))], [pessoas]);
  const [cat, setCat] = useState('todas');
  const [open, setOpen] = useState<Pessoa | null>(null);
  const byId = useMemo(() => Object.fromEntries(pessoas.map((p) => [p.id, p])), [pessoas]);
  const filtered = cat === 'todas' ? pessoas : pessoas.filter((p) => p.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3.5 py-1.5 font-sans text-xs capitalize transition-colors ${cat === c ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-ink/20 text-ink/70 hover:border-curtain dark:border-cream/20 dark:text-cream/70'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <article key={p.id} id={p.id} className="flex flex-col rounded-sm border border-gold/25 bg-cream/60 p-6 dark:bg-night/40">
            <div className="flex items-center justify-between gap-2">
              <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
              <SeloEvidencia status={p.status} />
            </div>
            <h2 className="mt-3 font-display text-xl leading-tight">{p.name}</h2>
            <p className="mt-1 font-sans text-sm font-medium text-ink/70 dark:text-cream/70">{p.role}{p.born ? ` · n. ${p.born}` : ''}</p>
            <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink/80 dark:text-cream/80">{p.summary}</p>
            {p.bio && (
              <button onClick={() => setOpen(p)} className="mt-4 self-start border-b border-curtain pb-0.5 font-sans text-xs font-medium text-curtain hover:opacity-70 dark:border-gold dark:text-gold">
                Ler biografia →
              </button>
            )}
            {p.related?.length > 0 && (
              <div className="mt-4 border-t border-gold/20 pt-3">
                <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-ink/50 dark:text-cream/50">Relacionados</span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.related.map((rid) => byId[rid] && (
                    <a key={rid} href={`#${rid}`} className="rounded-full border border-curtain/30 px-2.5 py-0.5 font-sans text-xs text-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold">
                      {byId[rid].name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-ink/85 p-4 sm:p-10" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.name}>
          <div className="relative my-auto w-full max-w-2xl rounded-sm bg-cream p-7 sm:p-10 dark:bg-night" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Fechar" className="absolute right-4 top-3 text-2xl text-ink/50 hover:text-curtain dark:text-cream/50">×</button>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{open.category}</span>
              <SeloEvidencia status={open.status} />
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight">{open.name}</h2>
            <p className="mt-1 font-sans text-sm font-medium text-ink/65 dark:text-cream/65">{open.role}{open.born ? ` · nascida em ${open.born}` : ''}</p>
            <div className="prose-theatro mt-5 max-w-none">
              {open.bio!.split('\n\n').map((para, i) => (
                <p key={i} className="font-sans text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">{para}</p>
              ))}
            </div>
            {open.source && <p className="mt-5 border-t border-gold/25 pt-3 font-sans text-xs italic text-ink/55 dark:text-cream/55">Fonte: {open.source}</p>}
            {open.related?.length > 0 && (
              <div className="mt-4">
                <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-ink/50 dark:text-cream/50">Relacionados</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {open.related.map((rid) => byId[rid] && (
                    <button key={rid} onClick={() => setOpen(byId[rid])} className="rounded-full border border-curtain/30 px-2.5 py-0.5 font-sans text-xs text-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold">
                      {byId[rid].name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
