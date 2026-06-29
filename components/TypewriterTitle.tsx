'use client';
import { useEffect, useState } from 'react';

export default function TypewriterTitle({ text, className }: { text: string; className?: string }) {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(text.length); setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, 48);
    return () => clearInterval(id);
  }, [text]);
  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {!done && <span aria-hidden="true" className="tw-caret">|</span>}
    </h1>
  );
}
