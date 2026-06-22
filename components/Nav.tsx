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
  { href: '/restauracao', label: 'Restauro' },
  { href: '/pessoas', label: 'Pessoas' },
  { href: '/acervo', label: 'Acervo' },
  { href: '/programacao', label: 'Programação' },
  { href: '/visite', label: 'Visite' },
];
const MORE_GROUPS: { title: string | null; items: { href: string; label: string }[] }[] = [
  { title: 'Explorar', items: [
    { href: '/documentario', label: 'Documentário' },
    { href: '/linha-do-tempo', label: 'Linha do tempo' },
    { href: '/memorias', label: 'Memórias e curiosidades' },
    { href: '/visita-guiada', label: 'Visita guiada' },
  ] },
  { title: null, items: [
    { href: '/fontes', label: 'Pesquisa e fontes' },
  ] },
];
const MORE = MORE_GROUPS.flatMap((g) => g.items);

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

  const solid = scrolled || open;

  // Sobre fundo transparente (hero/foto), texto sempre claro e protegido por um leve degradê.
  const linkCls = (active: boolean) =>
    solid
      ? `font-sans text-[0.8rem] transition-colors hover:text-curtain dark:hover:text-gold ${active ? 'text-curtain dark:text-gold' : 'text-ink/75 dark:text-cream/75'}`
      : `font-sans text-[0.8rem] transition-colors hover:text-gold [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] ${active ? 'text-gold' : 'text-cream/90'}`;

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
            <span className={`font-sans text-[0.64rem] uppercase tracking-eyebrow ${solid ? 'text-ink/70 dark:text-cream/70' : 'text-cream/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]'}`}>São João da Boa Vista</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Navegação principal">
          {PRIMARY.map((l) => <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} className={linkCls(pathname === l.href)}>{l.label}</Link>)}
          <div className="relative" ref={moreRef}>
            <button onClick={() => setMore(!more)} className={`flex items-center gap-1 ${linkCls(MORE.some((m) => m.href === pathname))}`} aria-expanded={more}>
              Mais <IconChevron size={12} className={`transition-transform ${more ? 'rotate-90' : ''}`} />
            </button>
            {more && (
              <div className="absolute right-0 top-full mt-3 w-64 rounded-sm border border-gold/25 bg-cream p-2 shadow-xl dark:bg-nightsoft">
                {MORE_GROUPS.map((g, gi) => (
                  <div key={g.title ?? 'ref'} className={gi > 0 ? 'mt-1 border-t border-gold/15 pt-1' : ''}>
                    {g.title && <p className="px-3 pb-1 pt-2 font-sans text-[0.6rem] uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">{g.title}</p>}
                    {g.items.map((l) => (
                      <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} className="block rounded-sm px-3 py-2 font-sans text-sm text-ink/80 hover:bg-gold/10 dark:text-cream/80">{l.label}</Link>
                    ))}
                  </div>
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
        <nav className="relative max-h-[80vh] overflow-y-auto border-t border-gold/20 bg-cream px-5 pb-8 pt-2 dark:bg-night lg:hidden" aria-label="Navegação móvel">
          {[...PRIMARY, ...MORE].map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} className="block border-b border-ink/5 py-3 font-sans text-base text-ink/80 dark:border-cream/10 dark:text-cream/80">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
