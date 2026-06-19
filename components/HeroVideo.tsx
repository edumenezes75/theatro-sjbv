'use client';
import { useEffect, useState } from 'react';

export default function HeroVideo() {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  if (!play) {
    // respeita reduced-motion: imagem estática
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/video/hero-theatro-poster.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />;
  }
  return (
    <video
      autoPlay muted loop playsInline preload="metadata"
      poster="/video/hero-theatro-poster.jpg" aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/video/hero-theatro-loop.mp4" type="video/mp4" />
    </video>
  );
}
