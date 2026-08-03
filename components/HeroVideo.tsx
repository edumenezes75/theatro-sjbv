'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // O vídeo só entra depois do load + um respiro: o download/decode não disputa
    // CPU com a renderização inicial (o poster segura a cena até lá).
    let t: ReturnType<typeof setTimeout>;
    const arm = () => { t = setTimeout(() => setPlay(true), 2500); };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
    return () => { clearTimeout(t); window.removeEventListener('load', arm); };
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
        quality={55}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAQCwwODAoQDg0OEhEQExgoGhgWFhgxIyUdKDozPTw5Mzg3QEhcTkBEV0U3OFBtUVdfYmdoZz5NcXlwZHhcZWdj/9sAQwEREhIYFRgvGhovY0I4QmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Nj/8AAEQgACwAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A5+y1G3EFukzMGRSH5yDyf6YrQW5tJoixfLZ4+Zhx+BrlV4NW4iQBjjmuadNbnXBnSNbafwZre4LkZyshwfccUVasIY2tI2Zckj1NFc3O1oa2P//Z"
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
