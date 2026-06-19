'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Mark from './Mark';
import { IconChevron, IconMenu, IconClose } from './Icons';

const PRIMARY = [
  { href: '/o-theatro', label: 'O Theatro' },
  { href: '/historia', label: 'História' },
  { href: '/arquitetura', label: 'Arquitetura' },
  { href: '/pessoas', label: 'Pessoas' },
  { href: '/programacao', label: 'Programação' },
  { href: '/visite', label: 'Visite' },
];
const MORE = [
  { href: '/restauracao', label: 'Preservação e restauro' },
  { href: '/memorias', label: 'Memórias e curiosidades' },
  { href: '/documentario', label: 'Documentário' },
  { href: '/acervo', label: 'Acervo' },
  { href: '/linha-do-tempo', label: 'Linha do tempo' },
  { href: '/fontes', label: 'Pesquisa e fontes' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMore(false); }, [pathname]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMore(false); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const linkCls = (active: boolean) =>
    `font-sans text-[0.82rem] transition-colors hover:text-curtain dark:hover:text-gold ${active ? 'text-curtain dark:text-gold' : 'text-ink/75 dark:text-cream/75'}`;

  return (
    <header className={`fixed top-0 z-50 w-full transition-colors duration-500 ${scrolled || open ? 'border-b border-gold/20 bg-cream/90 backdrop-blur-md dark:bg-night/90' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5 leading-none">
          <Mark className="text-curtain transition-colors group-hover:text-gold dark:text-gold" size={30} />
          <span className="flex flex-col">
            <span className="font-display text-lg tracking-tight">Theatro Municipal</span>
            <span className="font-sans text-[0.58rem] uppercase tracking-eyebrow text-ink/60 dark:text-cream/60">São João da Boa Vista</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {PRIMARY.map((l) => <Link key={l.href} href={l.href} className={linkCls(pathname === l.href)}>{l.label}</Link>)}
          <div className="relative" ref={moreRef}>
            <button onClick={() => setMore(!more)} className={`flex items-center gap-1 ${linkCls(MORE.some((m) => m.href === pathname))}`} aria-expanded={more}>
              Mais <IconChevron size={12} className={`transition-transform ${more ? 'rotate-90' : ''}`} />
            </button>
            {more && (
              <div className="absolute right-0 top-full mt-3 w-60 rounded-sm border border-gold/25 bg-cream p-2 shadow-xl dark:bg-nightsoft">
                {MORE.map((l) => (
                  <Link key={l.href} href={l.href} className="block rounded-sm px-3 py-2 font-sans text-sm text-ink/80 hover:bg-gold/10 dark:text-cream/80">{l.label}</Link>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} className="p-2">
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-gold/20 bg-cream px-5 pb-8 pt-2 dark:bg-night lg:hidden" aria-label="Navegação móvel">
          {[...PRIMARY, ...MORE].map((l) => (
            <Link key={l.href} href={l.href} className="block border-b border-ink/5 py-3 font-sans text-base text-ink/80 dark:border-cream/10 dark:text-cream/80">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
