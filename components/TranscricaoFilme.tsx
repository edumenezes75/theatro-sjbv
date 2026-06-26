'use client';
import { useMemo, useState } from 'react';

type Seg = { t: string; s: number; text: string; link?: { href: string; label: string } };
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function TranscricaoFilme({ segs, youtubeId }: { segs: Seg[]; youtubeId: string }) {
  const [q, setQ] = useState('');
  const nq = norm(q.trim());
  const list = useMemo(() => (nq.length < 2 ? segs : segs.filter((x) => norm(x.text).includes(nq))), [nq, segs]);

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-1 bg-cream/95 px-1 py-2 backdrop-blur dark:bg-night/95">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busque por palavra, nome ou tema…"
          aria-label="Buscar na transcrição do documentário"
          className="w-full rounded-sm border border-ink/20 bg-transparent px-4 py-3 font-sans text-sm text-ink/90 placeholder:text-ink/45 focus-visible:border-curtain dark:border-cream/20 dark:text-cream/90 dark:placeholder:text-cream/45 dark:focus-visible:border-gold"
        />
        {nq.length >= 2 && (
          <p className="mt-2 px-1 font-sans text-xs text-ink/75 dark:text-cream/75">
            {list.length} {list.length === 1 ? 'trecho encontrado' : 'trechos encontrados'} para “{q.trim()}”.
          </p>
        )}
      </div>

      <ol className="mt-4 divide-y divide-gold/15 border-y border-gold/15">
        {list.map((x) => (
          <li key={x.s} className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-5">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}&t=${x.s}s`}
              target="_blank"
              rel="noopener"
              className="shrink-0 self-start rounded-full border border-curtain/30 bg-curtain/5 px-3 py-1 font-sans text-xs font-medium tabular-nums text-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:bg-gold/5 dark:text-gold dark:hover:bg-gold dark:hover:text-ink"
              title="Abrir o filme neste momento"
            >
              ▸ {x.t}
            </a>
            <div className="min-w-0">
              <p className="font-sans text-[0.97rem] leading-relaxed text-ink/85 dark:text-cream/85">{x.text}</p>
              {x.link && (
                <a href={x.link.href} className="mt-1.5 inline-block font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain hover:text-gold dark:text-gold">ver: {x.link.label} →</a>
              )}
            </div>
          </li>
        ))}
        {list.length === 0 && (
          <li className="py-8 font-sans text-sm text-ink/75 dark:text-cream/75">Nenhum trecho encontrado. Tente outra palavra.</li>
        )}
      </ol>
    </div>
  );
}
