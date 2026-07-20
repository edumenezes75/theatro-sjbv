'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('theatro-theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const d = stored ? stored === 'dark' : prefers;
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
    localStorage.setItem('theatro-theme', d ? 'dark' : 'light');
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className="rounded-full border border-current/20 p-2 text-current/70 transition-colors hover:text-curtain dark:hover:text-gold"
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      )}
    </button>
  );
}
