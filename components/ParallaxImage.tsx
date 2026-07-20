'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Parallax sutil para o hero: a imagem desliza um pouco mais devagar que o scroll.
// Desliga em prefers-reduced-motion e em telas de toque (onde fica instável).
export default function ParallaxImage({ src, alt }: { src: string; alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, 500);
      el.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="grain absolute inset-x-0 will-change-transform" style={{ top: '-16%', height: '132%' }}>
      <Image src={src} alt={alt || ''} fill priority className="object-cover" sizes="100vw" />
    </div>
  );
}
