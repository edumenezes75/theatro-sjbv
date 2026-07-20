'use client';
import { useEffect, useState } from 'react';

// Título datilografado — começa COMPLETO (SSR/no-JS mostram o texto inteiro)
// e só anima depois de montar, respeitando prefers-reduced-motion.
export default function TypewriterTitle({ text, className }: { text: string; className?: string }) {
  const [n, setN] = useState(text.length);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // mantém texto completo
    setTyping(true);
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) { clearInterval(id); setTyping(false); }
    }, 48);
    return () => clearInterval(id);
  }, [text]);
  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {typing && <span aria-hidden="true" className="tw-caret">|</span>}
    </h1>
  );
}
