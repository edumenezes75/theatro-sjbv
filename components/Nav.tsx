'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Mark from './Mark';
import { IconChevron, IconMenu, IconClose } from './Icons';

type Item = { href: string; label: string; hint?: string; hintNoCelular?: boolean };
type Grupo = { label: string; items?: Item[]; href?: string };

// O menu vai do mais largo ao mais fundo, porque o site atende quatro públicos:
// o leigo (História, Fotos, Visite), o curioso (Documentário, Pessoas,
// Curiosidades), o amante do Theatro (Arquitetura, Restauro, Episódios) e o
// pesquisador (Pesquisa: livro, repertório, fontes). No topo, só palavras que o
// visitante já traz na cabeça, cada uma a um toque; só abrem "História", que
// tem de fato cinco jeitos de entrar, e "Pesquisa", o material de consulta. URLs intocadas — é só rótulo
// e agrupamento. As `hint` dizem em poucas palavras o que há atrás de cada
// item; no celular aparecem onde o nome sozinho não basta (`hintNoCelular`).
const MENU: Grupo[] = [
  { label: 'História', items: [
    { href: '/historia', label: 'A história do Theatro', hint: 'Do começo ao fim, em 8 capítulos', hintNoCelular: true },
    { href: '/linha-do-tempo', label: 'Linha do tempo', hint: 'As datas, uma a uma, de 1911 a hoje', hintNoCelular: true },
    { href: '/arquitetura', label: 'Arquitetura', hint: 'O prédio, por fora e por dentro', hintNoCelular: true },
    { href: '/restauracao', label: 'Restauro', hint: 'Como a cidade salvou o Theatro', hintNoCelular: true },
    { href: '/episodios', label: 'Episódios', hint: 'Onze histórias contadas em detalhe', hintNoCelular: true },
  ] },
  { label: 'Fotos', href: '/acervo' },
  { label: 'Documentário', href: '/documentario' },
  { label: 'Pessoas', href: '/pessoas' },
  { label: 'Curiosidades', href: '/memorias' },
  { label: 'Visite', href: '/visite' },
  { label: 'Pesquisa', items: [
    { href: '/#livro', label: 'O livro do centenário', hint: 'As 302 páginas, para baixar em PDF', hintNoCelular: true },
    { href: '/repertorio', label: 'O que passou pelo palco', hint: 'Todos os espetáculos de 2002 a 2013', hintNoCelular: true },
    { href: '/fontes', label: 'Fontes', hint: 'De onde vem cada afirmação', hintNoCelular: true },
    { href: '/sobre', label: 'Sobre o projeto', hint: 'O que é este site — e o que não é', hintNoCelular: true },
  ] },
];

const Lupa = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);            // menu móvel
  const [aberto, setAberto] = useState<string | null>(null); // dropdown desktop ativo
  const navRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // intenção de hover: abre na hora, fecha com um respiro (evita piscar ao varrer)
  const abrir = (label: string) => { if (timer.current) clearTimeout(timer.current); setAberto(label); };
  const agendarFechar = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setAberto(null), 350); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); setAberto(null); }, [pathname]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setAberto(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAberto(null); setOpen(false); } };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  const solid = scrolled || open;
  const naSecao = (g: Grupo) => (g.href ? g.href === pathname : !!g.items?.some((i) => i.href === pathname));

  const topCls = (active: boolean) =>
    solid
      ? `font-sans text-sm transition-colors hover:text-curtain dark:hover:text-gold ${active ? 'text-curtain dark:text-gold' : 'text-ink/75 dark:text-cream/75'}`
      : `font-sans text-sm transition-colors hover:text-gold [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] ${active ? 'text-gold' : 'text-cream/90'}`;

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
            {/* até 359px o subtítulo sai (o cabeçalho ficava com 106px de altura);
                entre 360 e 639px vai menor e mais fechado, para caber numa linha só */}
            <span className={`whitespace-nowrap font-sans text-[0.65rem] uppercase tracking-[0.16em] max-[359px]:hidden sm:text-xs sm:tracking-eyebrow ${solid ? 'text-ink/70 dark:text-cream/70' : 'text-cream/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]'}`}>São João da Boa Vista</span>
          </span>
        </Link>

        <nav ref={navRef} className="hidden items-center gap-5 lg:flex" aria-label="Navegação principal">
          {MENU.map((g) => {
            const ativo = aberto === g.label;
            if (g.href) {
              return (
                <Link
                  key={g.label}
                  href={g.href}
                  aria-current={pathname === g.href ? 'page' : undefined}
                  className={`relative py-1 ${topCls(naSecao(g))}`}
                >
                  {g.label}
                  <span className={`pointer-events-none absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300 ${naSecao(g) ? 'w-full opacity-70' : 'w-0 opacity-0'}`} />
                </Link>
              );
            }
            return (
              <div key={g.label} className="relative" onMouseEnter={() => abrir(g.label)} onMouseLeave={agendarFechar}>
                <button
                  onClick={() => setAberto((a) => (a === g.label ? null : g.label))}
                  aria-expanded={ativo}
                  aria-haspopup="true"
                  className={`relative flex items-center gap-1 py-1 ${topCls(naSecao(g))}`}
                >
                  {g.label} <IconChevron size={11} className={`transition-transform duration-200 ${ativo ? 'rotate-90' : ''}`} />
                  <span className={`pointer-events-none absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300 ${naSecao(g) || ativo ? 'w-full opacity-70' : 'w-0 opacity-0'}`} />
                </button>
                {ativo && (
                  <div className={`absolute top-full z-50 pt-3 ${g.label === 'Pesquisa' ? 'right-0' : 'left-1/2 -translate-x-1/2'}`} onMouseEnter={() => abrir(g.label)} onMouseLeave={agendarFechar}>
                    <div className="w-72 origin-top animate-[menupop_.16s_ease-out] overflow-hidden rounded-sm border border-gold/25 bg-cream shadow-xl dark:bg-nightsoft" role="menu">
                      {g.items!.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          role="menuitem"
                          onClick={() => setAberto(null)}
                          aria-current={pathname === l.href ? 'page' : undefined}
                          className={`block border-l-2 px-3.5 py-2.5 font-sans transition-colors hover:bg-gold/10 ${pathname === l.href ? 'border-curtain text-curtain dark:border-gold dark:text-gold' : 'border-transparent text-ink/80 dark:text-cream/80'}`}
                        >
                          <span className="block text-sm">{l.label}</span>
                          {l.hint && (
                            <span className="mt-0.5 block text-xs leading-snug text-ink/50 dark:text-cream/65">{l.hint}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <Link href="/busca" aria-label="Buscar no site" className={`flex items-center ${topCls(pathname === '/busca')}`}><Lupa /></Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/busca" aria-label="Buscar no site" className="p-2 text-ink/75 dark:text-cream/85"><Lupa /></Link>
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} className="p-2">
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="relative max-h-[82vh] overflow-y-auto border-t border-gold/20 bg-cream px-5 pb-8 pt-3 dark:bg-night lg:hidden" aria-label="Navegação móvel">
          {MENU.map((g) =>
            g.href ? (
              // Destino direto: tem de PARECER destino. Antes usava o mesmo estilo
              // dos títulos de grupo e, sem a seta dos acordeões, lia-se como um
              // rótulo morto. Agora vem no corpo dos itens navegáveis, com seta.
              <Link
                key={g.label}
                href={g.href}
                aria-current={pathname === g.href ? 'page' : undefined}
                className={`flex items-center justify-between border-b border-ink/8 py-4 font-sans text-base font-medium dark:border-cream/10 ${pathname === g.href ? 'text-curtain dark:text-gold' : 'text-ink/85 dark:text-cream/85'}`}
              >
                {g.label}
                <span aria-hidden className="text-curtain/70 dark:text-gold/70">→</span>
              </Link>
            ) : (
              <details key={g.label} open={naSecao(g)} className="group border-b border-ink/8 dark:border-cream/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-sans text-sm uppercase tracking-[0.2em] text-curtain/75 dark:text-gold/75">
                  {g.label}
                  <IconChevron size={14} className="transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <div className="pb-2">
                  {g.items!.map((l) => (
                    <Link key={l.href} href={l.href} aria-current={pathname === l.href ? 'page' : undefined} onClick={() => setOpen(false)} className={`block rounded-sm py-2.5 pl-3 font-sans text-base ${pathname === l.href ? 'text-curtain dark:text-gold' : 'text-ink/80 dark:text-cream/80'}`}>
                      {l.label}
                      {l.hintNoCelular && l.hint && <span className="mt-0.5 block text-xs leading-snug text-ink/60 dark:text-cream/65">{l.hint}</span>}
                    </Link>
                  ))}
                </div>
              </details>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
