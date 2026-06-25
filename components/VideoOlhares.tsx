'use client';
import { useState } from 'react';

const CREDITOS: [string, string][] = [
  ['Roteiro e direção', 'Paschoal Neto'],
  ['Imagens', 'José F. Bernardi'],
  ['Edição de imagens', 'Antônio Carlos Rosa'],
  ['Trilha sonora', 'Zezinho Só'],
  ['Locução', 'Ricardo Bressan'],
  ['Apoio técnico', 'Beto Furtado'],
  ['Computação', 'Pedro Prata'],
  ['Produção', 'Telecine'],
  ['Realização', 'Fundação Oliveira Neto'],
];

export default function VideoOlhares() {
  const [play, setPlay] = useState(false);
  return (
    <section className="mt-16 border-t border-gold/25 pt-12">
      <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Filme</p>
      <h2 className="mt-3 font-display text-3xl">Olhares</h2>
      <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
        Um curta sobre o Theatro Municipal de São João da Boa Vista, realizado pela Fundação Oliveira Neto.
      </p>

      <div className="mt-8 overflow-hidden rounded-sm bg-night">
        {play ? (
          <video controls autoPlay playsInline preload="auto" poster="/video/olhares-1-poster.jpg" className="aspect-video h-auto w-full">
            <source src="/video/olhares-1.mp4" type="video/mp4" />
            Seu navegador não consegue reproduzir este vídeo.
          </video>
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group relative block w-full" aria-label="Reproduzir o filme Olhares">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/video/olhares-1-poster.jpg" alt="Cartela de abertura do filme Olhares, sobre o Theatro Municipal de São João da Boa Vista." className="aspect-video h-auto w-full object-cover" loading="lazy" decoding="async" />
            <span className="absolute inset-0 bg-night/30 transition-colors group-hover:bg-night/15" aria-hidden />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/95 text-ink shadow-lg transition-transform group-hover:scale-110">
                <svg width="20" height="22" viewBox="0 0 11 12" fill="currentColor" aria-hidden><path d="M0 0v12l11-6z" /></svg>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="mt-6 grid max-w-2xl gap-x-10 gap-y-3 sm:grid-cols-2">
        {CREDITOS.map(([role, name]) => (
          <div key={role}>
            <p className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-curtain/80 dark:text-gold/80">{role}</p>
            <p className="font-sans text-sm text-ink/85 dark:text-cream/85">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
