'use client';
import { useEffect, useState } from 'react';

// Barra fina de progresso de leitura no topo das páginas longas.
export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div className="h-full bg-gold transition-[width] duration-150 ease-out" style={{ width: `${p * 100}%` }} />
    </div>
  );
}
