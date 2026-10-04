'use client';
import { useState } from 'react';

type Voz = { quote: string; author: string; role: string; source: string };

// Na home aparecem as quatro primeiras; as demais ficam a um toque. Todas
// continuam no HTML (ocultas no CSS) para a busca e os buscadores.
const VISIVEIS = 4;

export default function Vozes({ vozes }: { vozes: Voz[] }) {
  const [todas, setTodas] = useState(false);
  const resto = vozes.length - VISIVEIS;
  return (
    <div>
      <div className="space-y-12">
        {vozes.map((v, i) => (
          <figure key={i} className={`border-l-2 border-gold/50 pl-6 sm:pl-8 ${!todas && i >= VISIVEIS ? 'hidden' : ''}`}>
            <blockquote className="max-w-3xl font-display text-2xl italic leading-[1.3] text-ink dark:text-cream sm:text-[1.9rem]">
              “{v.quote}”
            </blockquote>
            <figcaption className="mt-4 font-sans text-sm text-ink/70 dark:text-cream/70">
              <span className="font-medium text-ink dark:text-cream">{v.author}</span> — {v.role}
              <span className="mt-0.5 block text-xs italic text-ink/65 dark:text-cream/75">{v.source}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {!todas && resto > 0 && (
        <button type="button" onClick={() => setTodas(true)} className="mt-10 border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">
          Mais {resto} vozes →
        </button>
      )}
    </div>
  );
}
