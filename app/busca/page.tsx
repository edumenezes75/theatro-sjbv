import type { Metadata } from 'next';
import BuscaGlobal, { type ItemBusca } from '@/components/BuscaGlobal';
import { pessoasList, pessoaSlug, fotosList, fotoTitulo, eventos, curiosidadesList } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Busque por nomes, fotografias, datas e curiosidades em todo o site do Theatro Municipal de São João da Boa Vista.',
  alternates: { canonical: '/busca' },
  robots: { index: false, follow: true },
};

function indice(): ItemBusca[] {
  const out: ItemBusca[] = [];
  for (const p of pessoasList) {
    out.push({ tipo: 'Pessoa', titulo: p.name, sub: p.role, texto: (p.summary || p.bio || '').replace(/\s+/g, ' ').slice(0, 160), href: `/pessoas/${pessoaSlug(p)}`, thumb: p.image || undefined });
  }
  for (const f of fotosList) {
    out.push({ tipo: 'Foto', titulo: fotoTitulo(f.alt), sub: [f.categoryLabel, f.epoca].filter(Boolean).join(' · '), texto: f.alt, href: `/acervo/${f.id}`, thumb: `/${f.file}` });
  }
  for (const e of eventos) {
    out.push({ tipo: 'Linha do tempo', titulo: e.title, sub: e.display, texto: (e.summary || '').replace(/\s+/g, ' ').slice(0, 160), href: '/linha-do-tempo' });
  }
  for (const c of curiosidadesList) {
    out.push({ tipo: 'Curiosidade', titulo: c.title, texto: (c.text || '').replace(/\s+/g, ' ').slice(0, 160), href: '/memorias' });
  }
  return out;
}

export default function BuscaPage() {
  const itens = indice();
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:pt-32">
      <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Busca</p>
      <h1 className="mt-3 mb-2 font-display text-4xl leading-tight sm:text-5xl">Buscar no site</h1>
      <p className="mb-8 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
        Procure por uma pessoa, uma fotografia, uma data da linha do tempo ou uma curiosidade — tudo num só lugar.
      </p>
      <BuscaGlobal itens={itens} />
    </article>
  );
}
