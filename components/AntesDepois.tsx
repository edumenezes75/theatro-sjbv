'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { IconArrowsLR } from './Icons';

type Par = { id: string; title: string; caption: string; antes: string; depois: string; w: number; h: number; credit: string };

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
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-eyebrow text-gold">Em obra</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-eyebrow text-cream">Restaurado</span>
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
        <span className="mt-0.5 block text-xs italic text-ink/65 dark:text-cream/65">{par.credit}</span>
      </figcaption>
    </figure>
  );
}

export default function AntesDepois({ pares }: { pares: Par[] }) {
  return <div className="grid gap-10 md:grid-cols-2">{pares.map((p) => <Slider key={p.id} par={p} />)}</div>;
}
