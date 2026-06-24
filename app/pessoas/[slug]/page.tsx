import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { pessoasList, pessoaSlug, pessoaBySlug, pessoaById } from '@/lib/data';
import SeloEvidencia from '@/components/SeloEvidencia';
import Compartilhar from '@/components/Compartilhar';

const SITE = 'https://www.theatromunicipalsjbv.com.br';

export function generateStaticParams() {
  return pessoasList.map((p) => ({ slug: pessoaSlug(p) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = pessoaBySlug(params.slug);
  if (!p) return {};
  const desc = p.summary || (p.bio ? p.bio.replace(/\s+/g, ' ').slice(0, 155) : `${p.name} na história do Theatro Municipal de São João da Boa Vista.`);
  return {
    title: `${p.name} — ${p.role}`,
    description: desc,
    alternates: { canonical: `/pessoas/${params.slug}` },
    openGraph: { title: `${p.name} — Theatro Municipal de São João da Boa Vista`, description: desc, type: 'profile', images: [`${SITE}/og-theatro-card.jpg`] },
  };
}

export default function PessoaPage({ params }: { params: { slug: string } }) {
  const p = pessoaBySlug(params.slug);
  if (!p) notFound();
  const related = (p.related || []).map((rid) => pessoaById(rid)).filter(Boolean) as typeof pessoasList;
  const paras = (p.bio || p.summary || '').split('\n\n').map((x) => x.trim()).filter(Boolean);
  const url = `${SITE}/pessoas/${params.slug}`;

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: p.name,
        jobTitle: p.role,
        description: p.summary,
        ...(p.born ? { birthDate: p.born } : {}),
        url,
        mainEntityOfPage: url,
        ...(p.related && related.length ? { knows: related.map((r) => ({ '@type': 'Person', name: r.name })) } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Início', item: SITE },
          { name: 'Pessoas', item: `${SITE}/pessoas` },
          { name: p.name, item: url },
        ].map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.item })),
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <nav aria-label="Trilha" className="font-sans text-xs text-ink/55 dark:text-cream/55">
        <Link href="/" className="hover:text-curtain dark:hover:text-gold">Início</Link>
        <span className="px-1.5">/</span>
        <Link href="/pessoas" className="hover:text-curtain dark:hover:text-gold">Pessoas</Link>
        <span className="px-1.5">/</span>
        <span className="text-ink/75 dark:text-cream/75">{p.name}</span>
      </nav>

      <header className="mt-6 border-b border-gold/25 pb-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
          <SeloEvidencia status={p.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">{p.name}</h1>
        <p className="mt-2 font-sans text-base font-medium text-ink/70 dark:text-cream/70">{p.role}</p>
        {p.born && <p className="mt-1 font-sans text-sm text-ink/55 dark:text-cream/55">Nascimento: {p.born}</p>}
      </header>

      {p.image && (
        <figure className="mt-7 overflow-hidden rounded-sm border border-gold/20 bg-ink/5 dark:bg-cream/5">
          <img src={p.image} alt={p.imageAlt || p.name} className="mx-auto block max-h-[70vh] w-full object-contain" loading="lazy" decoding="async" />
          {p.imageAlt && <figcaption className="border-t border-gold/10 px-4 py-2.5 font-sans text-xs leading-snug text-ink/55 dark:text-cream/55">{p.imageAlt}</figcaption>}
        </figure>
      )}

      <div className="mt-7 space-y-4">
        {paras.map((para, i) => (
          <p key={i} className="font-read text-[1.08rem] leading-[1.8] text-ink/85 dark:text-cream/85">{para}</p>
        ))}
      </div>

      {p.vozFilme && (
        <blockquote className="mt-8 border-l-2 border-gold/40 pl-5">
          <p className="font-display text-xl italic leading-snug text-ink/90 dark:text-cream/90">“{p.vozFilme.quote}”</p>
          <a href={`https://www.youtube.com/watch?v=e2stgoHtlAQ&t=${p.vozFilme.s}s`} target="_blank" rel="noopener" className="mt-3 inline-block font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain hover:text-gold dark:text-gold">No documentário Música &amp; Drama · {p.vozFilme.t} ↗</a>
        </blockquote>
      )}



      <div className="mt-10"><Compartilhar title={p.name} /></div>

      <section className="mt-12 border-t border-gold/20 pt-8">
        <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Continue explorando</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href="/pessoas" className="card-lift rounded-sm border border-ink/12 px-5 py-3 font-sans text-sm text-ink/80 hover:border-gold/50 hover:text-curtain dark:border-cream/12 dark:text-cream/80 dark:hover:text-gold">Todas as pessoas →</a>
          <a href="/acervo" className="card-lift rounded-sm border border-ink/12 px-5 py-3 font-sans text-sm text-ink/80 hover:border-gold/50 hover:text-curtain dark:border-cream/12 dark:text-cream/80 dark:hover:text-gold">Acervo de imagens →</a>
          <a href="/linha-do-tempo" className="card-lift rounded-sm border border-ink/12 px-5 py-3 font-sans text-sm text-ink/80 hover:border-gold/50 hover:text-curtain dark:border-cream/12 dark:text-cream/80 dark:hover:text-gold">Linha do tempo →</a>
        </div>
      </section>

      <div className="mt-12 border-t border-gold/20 pt-6">
        <Link href="/pessoas" className="font-sans text-sm text-curtain underline decoration-gold/40 underline-offset-4 hover:text-curtain dark:text-gold">← Todas as pessoas</Link>
      </div>
    </article>
  );
}
