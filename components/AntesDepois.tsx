'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { IconArrowsLR } from './Icons';
import { BLUR } from '@/lib/blur';

type Img = { src: string; full?: string; label: string; alt?: string };
type Par = { id: string; title: string; caption: string; antes: string; depois: string; w: number; h: number; credit: string; mode?: string; labelAntes?: string; labelDepois?: string; imagens?: Img[] };

function Slider({ par }: { par: Par }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const setFromX = (clientX: number) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <figure>
      <div
        ref={ref}
        className="relative aspect-[4/3] w-full [touch-action:pan-y] select-none overflow-hidden rounded-sm bg-ink"
        onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); setFromX(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current) setFromX(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
      >
        <Image src={`/${par.depois}`} alt={`${par.title} — depois do restauro`} fill className="object-cover" sizes="(max-width:768px) 100vw, 700px" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={`/${par.antes}`} alt={`${par.title} — durante a obra`} fill className="object-cover" sizes="(max-width:768px) 100vw, 700px" />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-eyebrow text-gold">{par.labelAntes ?? 'Em obra'}</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-eyebrow text-cream">{par.labelDepois ?? 'Restaurado'}</span>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
          <div className="mx-auto h-full w-0.5 bg-cream/90" />
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-curtain text-cream shadow-lg"><IconArrowsLR size={16} /></div>
        </div>
        <input
          type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparar antes e depois: ${par.title}`}
          className="absolute inset-x-0 bottom-2 mx-auto h-1 w-[88%] cursor-pointer appearance-none rounded bg-cream/40 accent-curtain"
        />
      </div>
      <figcaption className="mt-3 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">
        <span className="font-display text-base font-medium text-ink dark:text-cream">{par.title}.</span> {par.caption}
        <span className="mt-0.5 block text-xs italic text-ink/75 dark:text-cream/75">{par.credit}</span>
      </figcaption>
    </figure>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-3 sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <div className={`relative flex max-h-full max-w-full ${zoom ? 'overflow-auto' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/${src}`}
          alt={alt}
          onClick={() => setZoom((z) => !z)}
          className={zoom ? 'max-w-none cursor-zoom-out rounded-sm' : 'max-h-[86vh] max-w-[92vw] cursor-zoom-in rounded-sm object-contain'}
          style={zoom ? { width: 'min(1800px, 240vw)' } : undefined}
        />
      </div>
      <button aria-label="Fechar" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 text-lg text-cream backdrop-blur-sm transition-colors hover:bg-cream/25">✕</button>
      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-3 py-1 font-sans text-[0.66rem] uppercase tracking-eyebrow text-cream/85">Toque na imagem para ampliar · Esc fecha</p>
    </div>
  );
}

function Galeria({ par }: { par: Par }) {
  const imgs = par.imagens ?? [];
  const [open, setOpen] = useState<Img | null>(null);
  return (
    <figure>
      <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {imgs.map((im, i) => (
          <li key={i} className="relative">
            <button
              onClick={() => setOpen(im)}
              aria-label={`Ampliar: ${im.label}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-ink"
            >
              <Image src={`/${im.src}`} alt={im.alt ?? `${par.title} — ${im.label}`} placeholder="blur" blurDataURL={BLUR} fill className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 270px" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-2.5 pt-7">
                <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-gold">{im.label}</span>
              </span>
              <span className="pointer-events-none absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink/55 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-center font-sans text-xs italic text-ink/65 dark:text-cream/70">{par.credit}</figcaption>
      {open && <Lightbox src={open.full ?? open.src} alt={open.alt ?? `${par.title} — ${open.label}`} onClose={() => setOpen(null)} />}
    </figure>
  );
}

export default function AntesDepois({ pares }: { pares: Par[] }) {
  const multi = pares.length > 1 && pares.every((p) => !p.imagens?.length);
  return (
    <div className={multi ? 'grid gap-10 md:grid-cols-2' : 'grid gap-10'}>
      {pares.map((p) => (p.imagens?.length ? <Galeria key={p.id} par={p} /> : <Slider key={p.id} par={p} />))}
    </div>
  );
}
