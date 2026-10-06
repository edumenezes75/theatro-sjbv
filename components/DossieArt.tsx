'use client';
import { useEffect, useRef } from 'react';

// A fachada desenhada de As Histórias do Theatro derivando bem de leve atrás do
// episódio (duas camadas, profundidade). O PNG (só o prédio, sem a legenda manuscrita) é traço branco sobre transparente:
// entra como máscara, para receber a cor do tema.
// Só desktop; off em prefers-reduced-motion. Puramente decorativo (aria-hidden) e atrás do texto.
const ARTE = "url('/evento/fachada-limpa.png')";
function Fachada({ largura }: { largura: number }) {
  return (
    <div
      style={{
        width: largura, height: Math.round(largura * 783 / 1498), backgroundColor: 'currentColor',
        WebkitMaskImage: ARTE, maskImage: ARTE,
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      }}
    />
  );
}

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
      <div ref={a} className="absolute -right-40 top-[5%] text-curtain opacity-[0.06] will-change-transform dark:text-gold dark:opacity-[0.07]">
        <Fachada largura={820} />
      </div>
      <div ref={b} className="absolute -left-52 top-[52%] text-gold opacity-[0.06] will-change-transform dark:opacity-[0.075]">
        <Fachada largura={980} />
      </div>
    </div>
  );
}
