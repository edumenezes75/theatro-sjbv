'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/o-theatro', label: 'O Theatro' },
  { href: '/historia', label: 'História' },
  { href: '/arquitetura', label: 'Arquitetura' },
  { href: '/restauracao', label: 'Restauro' },
  { href: '/pessoas', label: 'Pessoas' },
  { href: '/memorias', label: 'Memórias' },
  { href: '/documentario', label: 'Documentário' },
  { href: '/acervo', label: 'Acervo' },
  { href: '/linha-do-tempo', label: 'Linha do tempo' },
  { href: '/programacao', label: 'Programação' },
  { href: '/visite', label: 'Visite' },
  { href: '/fontes', label: 'Fontes' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`fixed top-0 z-50 w-full transition-colors duration-500 ${scrolled || open ? 'bg-cream/90 backdrop-blur-md border-b border-gold/20 dark:bg-night/90' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-lg tracking-tight">Theatro Municipal</span>
          <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-curtain dark:text-gold">São João da Boa Vista</span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={`font-sans text-[0.8rem] transition-colors hover:text-curtain dark:hover:text-gold ${active ? 'text-curtain dark:text-gold' : 'text-ink/75 dark:text-cream/75'}`}>
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open} className="p-2">
            <span className="block h-px w-6 bg-current" />
            <span className="mt-1.5 block h-px w-6 bg-current" />
            <span className="mt-1.5 block h-px w-6 bg-current" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-gold/20 bg-cream px-5 pb-6 pt-2 dark:bg-night xl:hidden" aria-label="Navegação móvel">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="block border-b border-ink/5 py-3 font-sans text-base text-ink/80 dark:border-cream/10 dark:text-cream/80">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
