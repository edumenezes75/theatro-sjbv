'use client';
import { useCallback, useEffect, useState } from 'react';
import { IconClose } from './Icons';

const VID = 'e2stgoHtlAQ';

// Intercepta os links "ouvir no documentário (MM:SS)" e toca o filme inline,
// no minuto exato, sem tirar a pessoa do site. Player nocookie; autoplay só após o clique.
export default function DocPlayer() {
  const [start, setStart] = useState<number | null>(null);
  const close = useCallback(() => setStart(null), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.href || '';
      if (!href.includes('youtube.com/watch') || !href.includes(VID)) return;
      let t = 0;
      try { t = parseInt((new URL(href).searchParams.get('t') || '0').replace('s', ''), 10) || 0; } catch {}
      e.preventDefault();
      setStart(t);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (start === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [start, close]);

  if (start === null) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Documentário Música & Drama" onClick={close}
      className="fixed inset-0 z-[140] flex items-center justify-center bg-night/92 p-4 animate-[lbfade_.4s_ease]">
      <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-sans text-xs uppercase tracking-eyebrow text-cream/70">Documentário · Música &amp; Drama</span>
          <button onClick={close} aria-label="Fechar" className="text-cream/70 transition-colors hover:text-gold"><IconClose size={22} /></button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-sm bg-black ring-1 ring-gold/30">
          <iframe className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${VID}?start=${start}&autoplay=1&rel=0&modestbranding=1`}
            title="Documentário Música & Drama" loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        </div>
        <a href={`https://www.youtube.com/watch?v=${VID}&t=${start}s`} target="_blank" rel="noopener noreferrer"
          className="mt-2 inline-block font-sans text-xs text-cream/55 underline decoration-gold/30 underline-offset-2 hover:text-gold">Abrir no YouTube ↗</a>
      </div>
    </div>
  );
}
