import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { pessoasList, pessoaSlug, pessoaBySlug, pessoaById, conexoesPessoa, fotoTitulo, pessoaNoDocumentario } from '@/lib/data';
import SeloEvidencia from '@/components/SeloEvidencia';
import Retrato from '@/components/Retrato';
import Monograma from '@/components/Monograma';
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
  const { fotos: fotosRel, eventos: eventosRel } = conexoesPessoa(p.name);
  const docCitacao = !p.vozFilme ? pessoaNoDocumentario(p.name) : null;

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

      <nav aria-label="Trilha" className="font-sans text-xs text-ink/65 dark:text-cream/75">
        <Link href="/" className="hover:text-curtain dark:hover:text-gold">Início</Link>
        <span className="px-1.5">/</span>
        <Link href="/pessoas" className="hover:text-curtain dark:hover:text-gold">Pessoas</Link>
        <span className="px-1.5">/</span>
        <span className="text-ink/75 dark:text-cream/75">{p.name}</span>
      </nav>

      <header className="mt-6 border-b border-gold/25 pb-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
          <SeloEvidencia status={p.status} />
        </div>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">{p.name}</h1>
        <p className="mt-2 font-sans text-base font-medium text-ink/70 dark:text-cream/70">{p.role}</p>
        {p.born && <p className="mt-1 font-sans text-sm text-ink/65 dark:text-cream/75">Nascimento: {p.born}</p>}
      </header>

      {p.image ? <Retrato src={p.image} alt={p.imageAlt || p.name} caption={p.imageAlt} /> : <Monograma name={p.name} />}

      <div className="mt-7 space-y-4">
        {paras.map((para, i) => (
          <p key={i} className="font-read text-[1.08rem] leading-[1.8] text-ink/85 dark:text-cream/85">{para}</p>
        ))}
      </div>

      {p.vozFilme && (
        <blockquote className="mt-8 border-l-2 border-gold/40 pl-5">
          <p className="font-display text-xl italic leading-snug text-ink/90 dark:text-cream/90">“{p.vozFilme.quote}”</p>
          <a href={`https://www.youtube.com/watch?v=e2stgoHtlAQ&t=${p.vozFilme.s}s`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain hover:text-gold dark:text-gold">No documentário Música &amp; Drama · {p.vozFilme.t} ↗</a>
        </blockquote>
      )}



      {docCitacao && (
        <a href={`https://www.youtube.com/watch?v=e2stgoHtlAQ&t=${docCitacao.s}s`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-sm border border-gold/30 px-4 py-2.5 font-sans text-sm text-ink/80 transition-colors hover:border-gold hover:text-curtain dark:text-cream/80 dark:hover:text-gold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
          Citado(a) no documentário <em>Música &amp; Drama</em> · {docCitacao.t} ↗
        </a>
      )}

      <div className="mt-10"><Compartilhar title={p.name} /></div>

      {fotosRel.length > 0 && (
        <section className="mt-12 border-t border-gold/20 pt-8">
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">No acervo</p>
          <h2 className="mt-2 font-display text-2xl leading-tight">Em {fotosRel.length} {fotosRel.length === 1 ? 'imagem' : 'imagens'} do acervo</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {fotosRel.slice(0, 6).map((f) => (
              <Link key={f.id} href={`/acervo/${f.id}`} className="card-lift group relative aspect-[4/3] overflow-hidden rounded-sm bg-ink" aria-label={fotoTitulo(f.alt)}>
                <Image src={`/${f.file}`} alt={f.alt} fill className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" sizes="(max-width:640px) 50vw, 240px" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-2.5 font-sans text-[0.66rem] leading-snug text-cream/90">{fotoTitulo(f.alt)}</span>
              </Link>
            ))}
          </div>
          {fotosRel.length > 6 && (
            <Link href="/acervo" className="mt-4 inline-block font-sans text-sm text-curtain underline decoration-gold/40 underline-offset-4 dark:text-gold">Ver o acervo completo →</Link>
          )}
        </section>
      )}

      {eventosRel.length > 0 && (
        <section className="mt-12 border-t border-gold/20 pt-8">
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Na linha do tempo</p>
          <ul className="mt-4 space-y-3">
            {eventosRel.map((e) => (
              <li key={e.id}>
                <Link href={`/linha-do-tempo#${e.id}`} className="card-lift block rounded-sm border border-ink/12 px-5 py-3.5 hover:border-gold/50 dark:border-cream/12">
                  <span className="font-display text-base font-medium text-curtain dark:text-gold">{e.display}</span>
                  <span className="mt-0.5 block font-sans text-sm text-ink/80 dark:text-cream/80">{e.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
