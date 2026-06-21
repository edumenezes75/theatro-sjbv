'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Foto } from '@/lib/data';
import { IconClose, IconChevron } from './Icons';

export default function GaleriaReal({ fotos, withFilter = true }: { fotos: Foto[]; withFilter?: boolean }) {
  const CAT_ORDER = ['fachada', 'sala', 'ornamentos', 'eventos', 'pessoas', 'historicas', 'restauro'];
  const EP_ORDER = ['Histórico', 'Restauro', 'Atual'];
  const cats = useMemo(() => {
    const label = new Map<string, string>();
    const count = new Map<string, number>();
    fotos.forEach((f) => { label.set(f.category, f.categoryLabel); count.set(f.category, (count.get(f.category) || 0) + 1); });
    const present = Array.from(label.keys());
    const ordered = [...CAT_ORDER.filter((c) => label.has(c)), ...present.filter((c) => !CAT_ORDER.includes(c))];
    return [['todas', 'Todas', fotos.length], ...ordered.map((c) => [c, label.get(c)!, count.get(c)!])] as [string, string, number][];
  }, [fotos]);
  const [cat, setCat] = useState('todas');
  const [ep, setEp] = useState('todas');
  const epocas = useMemo(() => {
    const count = new Map<string, number>();
    fotos.forEach((f) => { if (f.epoca) count.set(f.epoca, (count.get(f.epoca) || 0) + 1); });
    const ordered = EP_ORDER.filter((e) => count.has(e));
    return [['todas', 'Todas as épocas', fotos.length], ...ordered.map((e) => [e, e, count.get(e)!])] as [string, string, number][];
  }, [fotos]);
  const list = useMemo(() => fotos.filter((f) => (cat === 'todas' || f.category === cat) && (ep === 'todas' || f.epoca === ep)), [cat, ep, fotos]);
  const [idx, setIdx] = useState<number | null>(null);
  const STEP = 24;
  const [limit, setLimit] = useState(STEP);
  useEffect(() => { setLimit(STEP); }, [cat, ep]);

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
          {cats.map(([c, label, n]) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors ${cat === c ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-ink/20 text-ink/70 hover:border-curtain dark:border-cream/20 dark:text-cream/70'}`}>
              {label}<span className="ml-1.5 tabular-nums opacity-50">{n}</span>
            </button>
          ))}
          <span className="mx-1 hidden w-px self-stretch bg-gold/25 sm:block" aria-hidden />
          {epocas.map(([e, label, n]) => (
            <button key={e} onClick={() => setEp(e)} aria-pressed={ep === e} className={`rounded-full border px-3 py-1.5 font-sans text-xs transition-colors ${ep === e ? 'border-ink bg-ink text-cream dark:border-cream dark:bg-cream dark:text-ink' : 'border-ink/20 text-ink/70 hover:border-curtain hover:text-curtain dark:border-cream/20 dark:text-cream/70 dark:hover:text-gold'}`}>
              {label}<span className="ml-1.5 tabular-nums opacity-50">{n}</span>
            </button>
          ))}
        </div>
      )}

      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {list.slice(0, limit).map((f, i) => (
          <button key={f.id} onClick={() => setIdx(i)} className="group relative block w-full overflow-hidden rounded-sm bg-ink/5">
            <Image src={`/${f.file}`} alt={f.alt} width={f.w} height={f.h} className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-gold">{f.categoryLabel}</span>
            </span>
          </button>
        ))}
      </div>

      {list.length > limit && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setLimit((n) => n + STEP)} className="rounded-full border border-curtain/40 px-6 py-2.5 font-sans text-sm text-curtain transition-colors hover:border-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink">
            Ver mais imagens <span className="tabular-nums opacity-60">({list.length - limit})</span>
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[120] flex flex-col bg-night" role="dialog" aria-modal="true" aria-label={open.alt}>
          <div className="flex items-center justify-between px-5 py-4 text-cream/70">
            <span className="read-meta font-sans text-xs uppercase tracking-eyebrow">{(idx ?? 0) + 1} / {list.length}</span>
            <button onClick={close} aria-label="Fechar" className="text-cream/70 hover:text-gold"><IconClose size={24} /></button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-2 sm:px-16" onClick={close}>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-night/50 p-3 text-cream/85 transition-colors hover:bg-night/70 hover:text-gold sm:left-4"><IconChevron size={30} className="rotate-180" /></button>
            <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
              <Image src={`/${open.file}`} alt={open.alt} width={open.w} height={open.h} className="max-h-[78vh] w-auto rounded-sm object-contain" priority />
            </figure>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Próxima" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-night/50 p-3 text-cream/85 transition-colors hover:bg-night/70 hover:text-gold sm:right-4"><IconChevron size={30} /></button>
          </div>
          <figcaption className="border-t border-cream/10 bg-night px-6 pb-6 pt-3.5 text-center font-sans text-[0.8rem] leading-relaxed text-cream/90">
            <span className="mx-auto block max-w-2xl"><span className="font-semibold text-gold">{open.categoryLabel}.</span> {open.alt}</span>
            <Link href={`/acervo/${open.id}`} className="mt-2 inline-block font-sans text-[0.72rem] uppercase tracking-eyebrow text-gold/90 underline decoration-gold/40 underline-offset-2 hover:text-gold">Ver ficha completa →</Link>
          </figcaption>
        </div>
      )}
    </div>
  );
}
