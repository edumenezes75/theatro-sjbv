'use client';
import { useMemo, useState } from 'react';
import type { Evento } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import Reveal from './Reveal';

export default function TimelineExplorer({ eventos }: { eventos: Evento[] }) {
  const eras = useMemo(() => ['todas', ...Array.from(new Set(eventos.map((e) => e.era)))], [eventos]);
  const [era, setEra] = useState('todas');
  const [q, setQ] = useState('');
  const filtered = eventos.filter((e) => {
    const okEra = era === 'todas' || e.era === era;
    const okQ = !q || (e.title + ' ' + e.summary + ' ' + e.tags.join(' ')).toLowerCase().includes(q.toLowerCase());
    return okEra && okQ;
  });

  return (
    <div>
      <div className="sticky top-[60px] z-10 -mx-5 bg-cream/85 px-5 py-4 backdrop-blur-md dark:bg-night/85">
        <input
          type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por evento, tema ou pessoa…"
          className="w-full rounded-full border border-gold/30 bg-transparent px-5 py-2.5 font-sans text-sm outline-none focus:border-curtain dark:focus:border-gold"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {eras.map((er) => (
            <button key={er} onClick={() => setEra(er)} className={`rounded-full border px-3 py-1 font-sans text-xs capitalize transition-colors ${era === er ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-ink/15 text-ink/65 hover:border-curtain dark:border-cream/15 dark:text-cream/65'}`}>
              {er}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-sans text-xs uppercase tracking-eyebrow text-ink/50 dark:text-cream/50">{filtered.length} registros</p>

      <ol className="relative mt-6 border-l-2 border-gold/30 pl-6 sm:pl-10">
        {filtered.map((e) => (
          <li key={e.id} className="relative mb-10">
            <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rotate-45 border-2 border-curtain bg-cream dark:border-gold dark:bg-night sm:-left-[2.9rem]" aria-hidden />
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg font-medium text-curtain dark:text-gold">{e.display}</span>
                <SeloEvidencia status={e.status} />
              </div>
              <h2 className="mt-1 font-display text-xl leading-tight">{e.title}</h2>
              <p className="mt-2 max-w-reading font-sans text-[0.97rem] leading-relaxed text-ink/80 dark:text-cream/80">{e.summary}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {e.tags.map((t) => (
                  <button key={t} onClick={() => setQ(t)} className="font-sans text-[0.65rem] uppercase tracking-wide text-ink/45 hover:text-curtain dark:text-cream/45 dark:hover:text-gold">#{t}</button>
                ))}
              </div>
              <p className="mt-1.5 font-sans text-xs italic text-ink/45 dark:text-cream/45">{e.sources.join('; ')}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
