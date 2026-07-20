'use client';
import { useEffect, useState } from 'react';

type H = { id: string; text: string };

// Índice fixo dos capítulos (h2 do texto), com destaque do trecho atual.
export default function ChapterIndex() {
  const [items, setItems] = useState<H[]>([]);
  const [active, setActive] = useState('');
  useEffect(() => {
    const hs = Array.from(document.querySelectorAll<HTMLElement>('.prose-theatro h2'));
    const list = hs.map((h, i) => {
      if (!h.id) h.id = 'cap-' + (i + 1);
      h.style.scrollMarginTop = '6rem';
      return { id: h.id, text: (h.textContent || '').trim() };
    });
    setItems(list);
    if (!list.length) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }),
      { rootMargin: '-15% 0px -75% 0px' },
    );
    hs.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);
  if (items.length < 3) return null;
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <nav className="sticky top-28 max-h-[80vh] overflow-y-auto" aria-label="Neste capítulo">
      <p className="mb-3 font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">Neste capítulo</p>
      <ul className="space-y-1.5 border-l border-gold/25">
        {items.map((it) => (
          <li key={it.id}>
            <button
              onClick={() => go(it.id)}
              className={`-ml-px block border-l-2 pl-3 text-left font-sans text-[0.78rem] leading-snug transition-colors ${active === it.id ? 'border-curtain text-curtain dark:border-gold dark:text-gold' : 'border-transparent text-ink/65 hover:text-ink/80 dark:text-cream/50 dark:hover:text-cream/80'}`}
            >
              {it.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
