'use client';
import { useState } from 'react';

export default function Retrato({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <figure className="mt-7 overflow-hidden rounded-sm border border-gold/20 bg-ink/5 dark:bg-cream/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setOk(false)}
        className="mx-auto block max-h-[70vh] w-full object-contain"
        loading="lazy"
        decoding="async"
      />
      {caption && (
        <figcaption className="border-t border-gold/10 px-4 py-2.5 font-sans text-xs leading-snug text-ink/65 dark:text-cream/75">{caption}</figcaption>
      )}
    </figure>
  );
}
