'use client';
import { useEffect, useState } from 'react';

// Régua fixa das eras da linha do tempo: mostra onde se está no século
// e permite saltar. Fica logo abaixo do cabeçalho do site.
export default function EraRail({ eras }: { eras: { id: string; rail: string }[] }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = eras
      .map((e) => document.getElementById(`era-${e.id}`))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: '-20% 0px -70% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [eras]);

  // no celular a régua transborda; mantém o item ativo à vista rolando só a
  // própria régua na horizontal (scrollIntoView aqui poderia puxar a página)
  useEffect(() => {
    if (!active) return;
    const btn = document.querySelector<HTMLElement>(`[data-rail="${active}"]`);
    const nav = btn?.closest('nav');
    if (!btn || !nav) return;
    const alvo = btn.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, alvo), behavior: 'smooth' });
  }, [active]);

  const go = (id: string) => {
    document.getElementById(`era-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Eras da história"
      className="sticky top-[3.9rem] z-30 -mx-5 overflow-x-auto border-b border-gold/25 bg-cream/95 px-5 backdrop-blur-sm [scrollbar-width:none] dark:bg-night/95 sm:top-[4.1rem]"
    >
      <div className="flex gap-5 whitespace-nowrap py-2.5">
        {eras.map((e) => {
          const on = active === `era-${e.id}`;
          return (
            <button
              key={e.id}
              data-rail={`era-${e.id}`}
              onClick={() => go(e.id)}
              className={`border-b-2 pb-0.5 font-sans text-[0.68rem] uppercase tracking-[0.14em] transition-colors ${on ? 'border-gold font-semibold text-curtain dark:text-gold' : 'border-transparent text-ink/55 hover:text-curtain dark:text-cream/55 dark:hover:text-gold'}`}
            >
              {e.rail}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
