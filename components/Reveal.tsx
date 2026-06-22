'use client';
import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => setShown(true);
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') { reveal(); return; }
    // Se já está (mesmo que parcialmente) na viewport ao carregar, revela na hora.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) { reveal(); return; }
    // threshold 0 = dispara com qualquer pixel visível (corrige blocos mais altos que a tela).
    const obs = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { reveal(); obs.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    // Fail-safe: o conteúdo NUNCA fica escondido, aconteça o que acontecer.
    const t = window.setTimeout(reveal, 1200);
    return () => { obs.disconnect(); window.clearTimeout(t); };
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(10px)', transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .6s cubic-bezier(.22,1,.36,1) ${delay}ms` }}
    >
      {children}
    </div>
  );
}
