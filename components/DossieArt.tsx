'use client';
import { useEffect, useRef } from 'react';
import Mark from './Mark';

// Line-art da fachada derivando bem de leve atrás do dossiê (duas camadas, profundidade).
// Só desktop; off em prefers-reduced-motion. Puramente decorativo (aria-hidden) e atrás do texto.
export default function DossieArt() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (a.current) a.current.style.transform = `translate3d(0, ${(y * -0.05).toFixed(1)}px, 0)`;
      if (b.current) b.current.style.transform = `translate3d(0, ${(y * 0.07).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none hidden overflow-hidden lg:block" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <div ref={a} className="absolute -right-32 top-[6%] text-curtain opacity-[0.05] will-change-transform dark:text-gold dark:opacity-[0.07]">
        <Mark size={560} />
      </div>
      <div ref={b} className="absolute -left-40 top-[52%] text-gold opacity-[0.055] will-change-transform dark:opacity-[0.08]">
        <Mark size={680} />
      </div>
    </div>
  );
}
