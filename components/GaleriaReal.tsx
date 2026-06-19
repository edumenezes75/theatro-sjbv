'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Foto } from '@/lib/data';
import { IconClose, IconChevron } from './Icons';

export default function GaleriaReal({ fotos, withFilter = true }: { fotos: Foto[]; withFilter?: boolean }) {
  const cats = useMemo(() => {
    const map = new Map<string, string>();
    fotos.forEach((f) => map.set(f.category, f.categoryLabel));
    return [['todas', 'Todas'], ...Array.from(map.entries())] as [string, string][];
  }, [fotos]);
  const [cat, setCat] = useState('todas');
  const list = useMemo(() => (cat === 'todas' ? fotos : fotos.filter((f) => f.category === cat)), [cat, fotos]);
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + list.length) % list.length)), [list.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % list.length)), [list.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [idx, close, prev, next]);

  const open = idx !== null ? list[idx] : null;

  return (
    <div>
      {withFilter && (
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map(([c, label]) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors ${cat === c ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-ink/20 text-ink/70 hover:border-curtain dark:border-cream/20 dark:text-cream/70'}`}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {list.map((f, i) => (
          <button key={f.id} onClick={() => setIdx(i)} className="group relative block w-full overflow-hidden rounded-sm bg-ink/5">
            <Image src={`/${f.file}`} alt={f.alt} width={f.w} height={f.h} className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-gold">{f.categoryLabel}</span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-[120] flex flex-col bg-night/96 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={open.alt}>
          <div className="flex items-center justify-between px-5 py-4 text-cream/70">
            <span className="read-meta font-sans text-xs uppercase tracking-eyebrow">{(idx ?? 0) + 1} / {list.length}</span>
            <button onClick={close} aria-label="Fechar" className="text-cream/70 hover:text-gold"><IconClose size={24} /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-2 sm:px-16" onClick={close}>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-cream/60 transition-colors hover:text-gold sm:left-4"><IconChevron size={30} className="rotate-180" /></button>
            <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
              <Image src={`/${open.file}`} alt={open.alt} width={open.w} height={open.h} className="max-h-[78vh] w-auto rounded-sm object-contain" priority />
            </figure>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Próxima" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-cream/60 transition-colors hover:text-gold sm:right-4"><IconChevron size={30} /></button>
          </div>
          <figcaption className="mx-auto max-w-2xl px-6 pb-7 pt-2 text-center font-sans text-sm text-cream/85">
            <span className="font-medium text-gold">{open.categoryLabel}.</span> {open.alt}
            <span className="mt-1 block text-xs text-cream/45">{open.credit}</span>
          </figcaption>
        </div>
      )}
    </div>
  );
}
