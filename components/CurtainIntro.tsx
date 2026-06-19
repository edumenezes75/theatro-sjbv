'use client';
import { useEffect, useState } from 'react';
import Mark from './Mark';

export default function CurtainIntro() {
  const [lift, setLift] = useState(false);
  const [done, setDone] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem('theatro-curtain')) return;
    sessionStorage.setItem('theatro-curtain', '1');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setDone(false);
    const t1 = setTimeout(() => setLift(true), 650);
    const t2 = setTimeout(() => setDone(true), 1650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (done) return null;
  return (
    <div
      onClick={() => setDone(true)}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-night transition-transform duration-[1000ms] ease-[cubic-bezier(.76,0,.24,1)] ${lift ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className={`flex flex-col items-center gap-4 transition-opacity duration-500 ${lift ? 'opacity-0' : 'opacity-100'}`}>
        <Mark className="text-gold" size={56} />
        <span className="font-display text-lg font-medium italic text-cream/90">Theatro Municipal</span>
      </div>
      <span className="absolute bottom-0 left-0 h-px w-full bg-gold/40" />
    </div>
  );
}
