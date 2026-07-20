'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    setPlay(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return (
    <>
      {/* Poster é o alvo de LCP: prioritária e NUNCA desmontada. */}
      <Image
        src="/video/hero-theatro-poster.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Vídeo entra por cima, sem trocar o elemento de LCP. */}
      {play && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-theatro-loop.mp4" type="video/mp4" />
        </video>
      )}
    </>
  );
}
