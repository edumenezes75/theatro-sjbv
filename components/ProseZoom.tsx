'use client';
import { useEffect, useState } from 'react';

// As fotos dentro do texto ficam na largura da coluna de leitura. Um clique
// abre a mesma foto em tela cheia, com a legenda — sem tirar o leitor da página.
export default function ProseZoom() {
  const [foto, setFoto] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el || el.tagName !== 'IMG' || !el.closest('.prose-theatro') || el.closest('a')) return;
      const img = el as HTMLImageElement;
      let original = img.getAttribute('src') || '';
      const m = original.match(/[?&]url=([^&]+)/);
      if (m) original = decodeURIComponent(m[1]);
      const grande = original.startsWith('/') ? `/_next/image?url=${encodeURIComponent(original)}&w=1920&q=80` : original;
      setFoto({ src: grande, alt: img.alt });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!foto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFoto(null); };
    document.addEventListener('keydown', onKey);
    const antes = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = antes; };
  }, [foto]);

  if (!foto) return null;
  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-night" role="dialog" aria-modal="true" aria-label={foto.alt} onClick={() => setFoto(null)}>
      <div className="flex justify-end px-5 py-4">
        <button type="button" aria-label="Fechar" className="text-cream/70 hover:text-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 sm:px-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={foto.src} alt={foto.alt} className="max-h-full max-w-full animate-[lbfade_.4s_ease] rounded-sm object-contain" />
      </div>
      {foto.alt && <p className="mx-auto max-w-3xl px-5 py-5 text-center font-sans text-sm leading-relaxed text-cream/85">{foto.alt}</p>}
    </div>
  );
}
