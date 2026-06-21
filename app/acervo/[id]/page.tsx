import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fotosList, fotoById, fotoTitulo } from '@/lib/data';

const SITE = 'https://www.theatromunicipalsjbv.com.br';

export function generateStaticParams() {
  return fotosList.map((f) => ({ id: f.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const f = fotoById(params.id);
  if (!f) return {};
  const titulo = fotoTitulo(f.alt);
  return {
    title: `${titulo} — Acervo`,
    description: f.alt,
    alternates: { canonical: `/acervo/${f.id}` },
    openGraph: { title: `${titulo} — Acervo do Theatro Municipal`, description: f.alt, images: [`${SITE}/${f.file}`], type: 'article' },
  };
}

export default function FotoPage({ params }: { params: { id: string } }) {
  const f = fotoById(params.id);
  if (!f) notFound();
  const titulo = fotoTitulo(f.alt);
  const url = `${SITE}/acervo/${f.id}`;
  const relacionadas = fotosList.filter((o) => o.category === f.category && o.id !== f.id).slice(0, 6);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageObject',
        '@id': url,
        contentUrl: `${SITE}/${f.file}`,
        url,
        name: titulo,
        caption: f.alt,
        description: f.alt,
        creditText: f.credit,
        width: f.w,
        height: f.h,
        isPartOf: { '@type': 'ImageGallery', name: 'Acervo do Theatro Municipal de São João da Boa Vista', url: `${SITE}/acervo` },
        representativeOfPage: true,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: 'Início', item: SITE },
          { name: 'Acervo', item: `${SITE}/acervo` },
          { name: titulo, item: url },
        ].map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: x.item })),
      },
    ],
  };

  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-28 sm:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <nav aria-label="Trilha" className="font-sans text-xs text-ink/55 dark:text-cream/55">
        <Link href="/" className="hover:text-curtain dark:hover:text-gold">Início</Link>
        <span className="px-1.5">/</span>
        <Link href="/acervo" className="hover:text-curtain dark:hover:text-gold">Acervo</Link>
        <span className="px-1.5">/</span>
        <span className="text-ink/75 dark:text-cream/75">{f.categoryLabel}</span>
      </nav>

      <figure className="mt-5 overflow-hidden rounded-sm bg-ink/5 dark:bg-cream/5">
        <Image src={`/${f.file}`} alt={f.alt} width={f.w} height={f.h} priority sizes="(max-width:1024px) 100vw, 900px" className="h-auto w-full object-contain" />
      </figure>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{f.categoryLabel}</span>
          {f.epoca && <span className="rounded-full border border-gold/30 px-2.5 py-0.5 font-sans text-[0.62rem] uppercase tracking-eyebrow text-ink/55 dark:text-cream/55">{f.epoca}</span>}
        </div>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{titulo}</h1>
        <p className="mt-3 max-w-reading font-read text-[1.05rem] leading-relaxed text-ink/85 dark:text-cream/85">{f.alt}</p>
        <p className="mt-4 font-sans text-xs italic text-ink/55 dark:text-cream/55">{f.credit}</p>
      </header>

      {relacionadas.length > 0 && (
        <section className="mt-12 border-t border-gold/20 pt-8">
          <h2 className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Mais em {f.categoryLabel}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {relacionadas.map((o) => (
              <Link key={o.id} href={`/acervo/${o.id}`} className="card-lift block overflow-hidden rounded-sm bg-ink/5 dark:bg-cream/5">
                <Image src={`/${o.file}`} alt={o.alt} width={o.w} height={o.h} sizes="(max-width:640px) 50vw, 33vw" className="aspect-[4/3] h-auto w-full object-cover" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 border-t border-gold/20 pt-6">
        <Link href="/acervo" className="font-sans text-sm text-curtain underline decoration-gold/40 underline-offset-4 dark:text-gold">← Voltar ao acervo</Link>
      </div>
    </article>
  );
}
