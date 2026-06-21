'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  if (!play) {
    // SSR e reduced-motion: poster como imagem prioritária (alvo de LCP)
    return (
      <Image
        src="/video/hero-theatro-poster.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    );
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
