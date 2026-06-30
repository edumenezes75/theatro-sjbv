import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Página não encontrada — Theatro Municipal de São João da Boa Vista' };

export default function NotFound() {
  const destinos: [string, string][] = [
    ['/', 'Início'],
    ['/historia', 'A história'],
    ['/acervo', 'O acervo de fotos'],
    ['/livro-de-memorias', 'O Livro de Memórias'],
  ];
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-40 text-center">
      <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Página não encontrada</p>
      <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">As cortinas estão fechadas aqui</h1>
      <p className="mt-4 max-w-reading font-sans text-ink/70 dark:text-cream/70">
        A página que você procura não está mais em cartaz — pode ter mudado de lugar. Mas há muita história à sua espera por aqui.
      </p>
      <nav aria-label="Caminhos" className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
        {destinos.map(([href, label]) => (
          <Link key={href} href={href} className="card-lift rounded-full border border-ink/15 px-5 py-2 font-sans text-sm text-ink/80 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/80 dark:hover:text-gold">
            {label} →
          </Link>
        ))}
      </nav>
    </div>
  );
}
