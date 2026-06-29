import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPages } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Dossiês',
  description: 'Leituras longas sobre episódios marcantes da história do Theatro Municipal de São João da Boa Vista — da sociedade de acionistas que o ergueu à campanha que o salvou da demolição.',
  alternates: { canonical: '/dossies' },
};

export default function DossiesPage() {
  const dossies = getAllPages()
    .filter((p) => p.meta.status === 'dossiê')
    .sort((a, b) => a.meta.title.localeCompare(b.meta.title, 'pt-BR'));

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:pt-36">
      <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Dossiês</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Histórias para se aprofundar</h1>
      <p className="mt-4 max-w-reading font-sans text-base leading-relaxed text-ink/75 dark:text-cream/75">
        Cada dossiê destrincha um episódio da vida do Theatro com calma e fontes à mostra —
        a sociedade de acionistas que o financiou, o que a cidade de fato via no palco e a
        mobilização que o salvou da demolição.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {dossies.map((d) => (
          <Link
            key={d.meta.slug}
            href={d.meta.slug}
            className="card-lift group flex flex-col rounded-sm border border-gold/30 bg-cream p-6 transition-colors hover:border-gold dark:bg-nightsoft"
          >
            <span className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">{d.meta.eyebrow}</span>
            <span className="mt-2 font-display text-2xl text-ink dark:text-cream">
              {d.meta.title} <span className="text-curtain transition-transform group-hover:translate-x-0.5 dark:text-gold">→</span>
            </span>
            <span className="mt-3 font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{d.meta.seo_description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
