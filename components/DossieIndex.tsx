'use client';
import { useEffect, useState } from 'react';

type H = { id: string; text: string };

// Navegador vertical numerado dos capítulos do dossiê (modo "exposição").
export default function DossieIndex() {
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
    <nav className="sticky top-28 max-h-[80vh] overflow-y-auto pr-1" aria-label="Capítulos do episódio">
      <p className="mb-4 font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">Exposição</p>
      <ol className="space-y-3">
        {items.map((it, i) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <button onClick={() => go(it.id)} aria-current={on ? 'true' : undefined} className="group flex items-start gap-3 text-left">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-sans text-[0.7rem] tabular-nums transition-colors ${on ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-night' : 'border-ink/25 text-ink/55 group-hover:border-curtain/60 dark:border-cream/25 dark:text-cream/55'}`}>{i + 1}</span>
                <span className={`pt-0.5 font-sans text-[0.78rem] leading-snug transition-colors ${on ? 'text-curtain dark:text-gold' : 'text-ink/55 group-hover:text-ink/80 dark:text-cream/45 dark:group-hover:text-cream/80'}`}>{it.text}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
