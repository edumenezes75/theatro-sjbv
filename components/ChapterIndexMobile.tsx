'use client';
import { useEffect, useRef, useState } from 'react';

type H = { id: string; text: string };

// Índice de capítulos recolhível, só no celular/tablet (lg:hidden).
// Dá ao leitor uma visão geral e saltos rápidos em páginas longas.
export default function ChapterIndexMobile() {
  const [items, setItems] = useState<H[]>([]);
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const hs = Array.from(document.querySelectorAll<HTMLElement>('.prose-theatro h2'));
    setItems(hs.map((h, i) => {
      if (!h.id) h.id = 'cap-' + (i + 1);
      h.style.scrollMarginTop = '5rem';
      return { id: h.id, text: (h.textContent || '').trim() };
    }));
  }, []);
  if (items.length < 3) return null;
  const go = (id: string) => {
    if (ref.current) ref.current.open = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <details ref={ref} className="group mb-8 rounded-sm border border-gold/30 bg-cream/50 dark:bg-nightsoft/50 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-sans text-[0.7rem] uppercase tracking-eyebrow text-curtain dark:text-gold">
        <span>Neste capítulo · {items.length} seções</span>
        <span className="text-base transition-transform group-open:rotate-180" aria-hidden>⌄</span>
      </summary>
      <ul className="border-t border-gold/20 px-4 py-3 space-y-2">
        {items.map((it) => (
          <li key={it.id}>
            <button onClick={() => go(it.id)} className="block text-left font-sans text-sm leading-snug text-ink/75 dark:text-cream/75">
              {it.text}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
