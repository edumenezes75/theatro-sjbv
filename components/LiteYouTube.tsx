'use client';
import { useState } from 'react';

export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-ink">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen
        />
      ) : (
        <button onClick={() => setActive(true)} aria-label={`Reproduzir: ${title}`} className="group absolute inset-0 h-full w-full">
          <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} onError={(e) => { const t = e.currentTarget; const step = t.dataset.fb || '0'; if (step === '0') { t.dataset.fb = '1'; t.src = `https://i.ytimg.com/vi/${id}/sddefault.jpg`; } else if (step === '1') { t.dataset.fb = '2'; t.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; } }} alt={`Capa do vídeo: ${title}`} className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-0 bg-ink/30" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-curtain/90 transition-transform group-hover:scale-110">
            <span className="ml-1 border-y-[12px] border-l-[20px] border-y-transparent border-l-cream" />
          </span>
        </button>
      )}
    </div>
  );
}
