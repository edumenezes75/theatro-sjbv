'use client';
import { useEffect } from 'react';
// @ts-ignore -- 'lenis' é resolvido no build da Vercel
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Sem rolagem suave quando o usuário pede menos movimento, em telas de
    // toque (celular/tablet) ou telas pequenas — evita travar em aparelhos
    // medianos e respeita a acessibilidade.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = window.matchMedia('(max-width: 1024px)').matches;
    if (reduce || coarse || small) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}
