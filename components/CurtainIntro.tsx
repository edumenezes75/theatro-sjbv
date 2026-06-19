'use client';
import { useEffect, useState } from 'react';

export default function CurtainIntro() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem('theatro-curtain')) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sessionStorage.setItem('theatro-curtain', '1');
    if (reduce) return;
    setDone(false);
    const t1 = setTimeout(() => setOpen(true), 450);
    const t2 = setTimeout(() => setDone(true), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none" onClick={() => setDone(true)}>
      <div className={`absolute inset-y-0 left-0 w-1/2 bg-curtaindark transition-transform duration-[1400ms] ease-[cubic-bezier(.76,0,.24,1)] ${open ? '-translate-x-full' : 'translate-x-0'}`} style={{ backgroundImage: 'repeating-linear-gradient(90deg,#6E1F17,#6E1F17 14px,#5A1812 14px,#5A1812 28px)' }} />
      <div className={`absolute inset-y-0 right-0 w-1/2 bg-curtaindark transition-transform duration-[1400ms] ease-[cubic-bezier(.76,0,.24,1)] ${open ? 'translate-x-full' : 'translate-x-0'}`} style={{ backgroundImage: 'repeating-linear-gradient(90deg,#5A1812,#5A1812 14px,#6E1F17 14px,#6E1F17 28px)' }} />
      <span className={`relative font-display text-gold text-sm uppercase tracking-eyebrow transition-opacity duration-500 ${open ? 'opacity-0' : 'opacity-100'}`}>Theatro Municipal</span>
    </div>
  );
}
