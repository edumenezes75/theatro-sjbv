'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { Foto } from '@/lib/data';

export default function GaleriaReal({ fotos, withFilter = true }: { fotos: Foto[]; withFilter?: boolean }) {
  const cats = useMemo(() => {
    const map = new Map<string, string>();
    fotos.forEach((f) => map.set(f.category, f.categoryLabel));
    return [['todas', 'Todas'], ...Array.from(map.entries())] as [string, string][];
  }, [fotos]);
  const [cat, setCat] = useState('todas');
  const [open, setOpen] = useState<Foto | null>(null);
  const list = cat === 'todas' ? fotos : fotos.filter((f) => f.category === cat);

  return (
    <div>
      {withFilter && (
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map(([c, label]) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-1.5 font-sans text-xs transition-colors ${cat === c ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-ink/20 text-ink/70 hover:border-curtain dark:border-cream/20 dark:text-cream/70'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {list.map((f) => (
          <button
            key={f.id}
            onClick={() => setOpen(f)}
            className="group relative block w-full overflow-hidden rounded-sm bg-ink/5"
          >
            <Image
              src={`/${f.file}`}
              alt={f.alt}
              width={f.w}
              height={f.h}
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-2 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-gold">{f.categoryLabel}</span>
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/92 p-4 sm:p-8"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
        >
          <button onClick={() => setOpen(null)} aria-label="Fechar" className="absolute right-5 top-4 text-3xl text-cream/80 hover:text-gold">×</button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={`/${open.file}`} alt={open.alt} width={open.w} height={open.h} className="max-h-[78vh] w-auto rounded-sm object-contain" />
            <figcaption className="mt-3 max-w-2xl font-sans text-sm text-cream/85">
              <span className="font-medium text-gold">{open.categoryLabel}.</span> {open.alt}
              <span className="mt-1 block text-xs text-cream/55">{open.credit}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
