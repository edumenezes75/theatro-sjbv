'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Mark from './Mark';
import { IconChevron, IconMenu, IconClose } from './Icons';

type Item = { href: string; label: string };
type Grupo = { label: string; items: Item[] };

const MENU: Grupo[] = [
  { label: 'O Theatro', items: [
    { href: '/o-theatro', label: 'Visão geral' },
    { href: '/historia', label: 'História' },
    { href: '/arquitetura', label: 'Arquitetura' },
    { href: '/restauracao', label: 'Restauro' },
  ] },
  { label: 'Acervo', items: [
    { href: '/acervo', label: 'Acervo de imagens' },
    { href: '/documentario', label: 'Documentário' },
    { href: '/linha-do-tempo', label: 'Linha do tempo' },
    { href: '/pessoas', label: 'Pessoas' },
  ] },
  { label: 'Memória', items: [
    { href: '/memorias', label: 'Curiosidades' },
    { href: '/livro-de-memorias', label: 'Livro de Memórias' },
  ] },
  { label: 'Visite', items: [
    { href: '/programacao', label: 'Programação' },
    { href: '/visite', label: 'Como visitar' },
    { href: '/visita-guiada', label: 'Visita guiada' },
  ] },
  { label: 'O projeto', items: [
    { href: '/sobre', label: 'Sobre o projeto' },
    { href: '/fontes', label: 'Pesquisa e fontes' },
  ] },
];

const Lupa = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);      // menu móvel
  const [aberto, setAberto] = useState<string | null>(null); // dropdown desktop ativo
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); setAberto(null); }, [pathname]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setAberto(null); };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const solid = scrolled || open;
  const naSecao = (g: Grupo) => g.items.some((i) => i.href === pathname);

  const topCls = (active: boolean) =>
    solid
      ? `font-sans text-[0.82rem] transition-colors hover:text-curtain dark:hover:text-gold ${active ? 'text-curtain dark:text-gold' : 'text-ink/75 dark:text-cream/75'}`
      : `font-sans text-[0.82rem] transition-colors hover:text-gold [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] ${active ? 'text-gold' : 'text-cream/90'}`;

  return (
    <header className={`fixed top-0 z-50 w-full transition-colors duration-500 ${solid ? 'border-b border-gold/20 bg-cream/90 backdrop-blur-md dark:bg-night/90' : 'bg-transparent'}`}>
      {!solid && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/75 via-night/35 to-transparent" />
      )}
      <div className={`relative mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 ${solid ? '' : 'text-cream'}`}>
        <Link href="/" className="group flex items-center gap-2.5 leading-none">
          <Mark className={`transition-colors group-hover:text-gold ${solid ? 'text-curtain dark:text-gold' : 'text-cream'}`} size={30} />
          <span className="flex flex-col">
            <span className={`font-display text-lg font-medium tracking-tight ${solid ? '' : '[text-shadow:0_1px_2px_rgba(0,0,0,0.45)]'}`}>Theatro Municipal</span>
            <span className={`font-sans text-[0.7rem] uppercase tracking-eyebrow ${solid ? 'text-ink/70 dark:text-cream/70' : 'text-cream/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]'}`}>São João da Boa Vista</span>
          </span>
        </Link>

        <nav ref={navRef} className="hidden items-center gap-5 lg:flex" aria-label="Navegação principal" onMouseLeave={() => setAberto(null)}>
          {MENU.map((g) => (
            <div key={g.label} className="relative" onMouseEnter={() => setAberto(g.label)}>
              <button
                onClick={() => setAberto((a) => (a === g.label ? null : g.label))}
                aria-expanded={aberto === g.label}
                className={`flex items-center gap-1 ${topCls(naSecao(g))}`}
              >
                {g.label} <IconChevron size={11} className={`transition-transform ${aberto === g.label ? 'rotate-90' : ''}`} />
              </button>
              {aberto === g.label && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-sm border border-gold/25 bg-cream p-2 shadow-xl dark:bg-nightsoft">
                  {g.items.map((l) => (
                    <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} className={`block rounded-sm px-3 py-2 font-sans text-sm transition-colors hover:bg-gold/10 ${pathname === l.href ? 'text-curtain dark:text-gold' : 'text-ink/80 dark:text-cream/80'}`}>{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/busca" aria-label="Buscar no site" className={`flex items-center ${topCls(pathname === '/busca')}`}><Lupa /></Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/busca" aria-label="Buscar no site" className="p-2 text-ink/75 dark:text-cream/85"><Lupa /></Link>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} className="p-2">
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="relative max-h-[80vh] overflow-y-auto border-t border-gold/20 bg-cream px-5 pb-8 pt-2 dark:bg-night lg:hidden" aria-label="Navegação móvel">
          {MENU.map((g) => (
            <div key={g.label}>
              <p className="pb-1 pt-5 font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">{g.label}</p>
              {g.items.map((l) => (
                <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} className="block border-b border-ink/5 py-3 font-sans text-base text-ink/80 dark:border-cream/10 dark:text-cream/80">{l.label}</Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
