'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Pessoa } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';

const slugify = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const HONOR = new Set(['padre', 'maestro', 'dona', 'dom', 'dr', 'dra', 'prof', 'profa', 'pe', 'cel', 'coronel']);
function iniciais(nome: string): string {
  const base = nome.split(/[—·-]/)[0].replace(/[“”"'’.]/g, ' ');
  const toks = base.split(/\s+/).map((t) => t.trim()).filter(Boolean);
  const sig = toks.filter((t) => !HONOR.has(t.toLowerCase()) && t.length > 1);
  const arr = sig.length ? sig : toks;
  if (!arr.length) return '·';
  return (arr[0][0] + (arr.length > 1 ? arr[arr.length - 1][0] : '')).toUpperCase();
}

const GROUPS: { title: string; sub: string; cats: string[] }[] = [
  { title: 'Fundação e construção', sub: 'Quem idealizou, projetou e ergueu o edifício.', cats: ['fundação', 'arquitetura', 'construção'] },
  { title: 'Palco, música e programação', sub: 'Artistas, mestres e educadores que deram voz e vida ao Theatro.', cats: ['música', 'educação', 'cultura local', 'trabalho'] },
  { title: 'Preservação e restauro', sub: 'A mobilização e o trabalho que salvaram a casa e a devolveram à cidade.', cats: ['preservação', 'restauro', 'artes e restauro', 'instituição'] },
  { title: 'Pesquisa, memória e documentação', sub: 'Quem registrou, pesquisou e contou esta história.', cats: ['pesquisa', 'audiovisual'] },
];

function Avatar({ p }: { p: Pessoa }) {
  const [err, setErr] = useState(false);
  const base = 'h-14 w-14 shrink-0 rounded-full border border-gold/30 object-cover';
  if (p.image && !err) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.image} alt="" onError={() => setErr(true)} loading="lazy" className={base} />;
  }
  return (
    <div className={`${base} flex items-center justify-center bg-cream font-display text-lg text-curtain dark:bg-nightsoft dark:text-gold`} aria-hidden>
      {iniciais(p.name)}
    </div>
  );
}

function Card({ p }: { p: Pessoa }) {
  return (
    <Link
      href={`/pessoas/${slugify(p.name)}`}
      className="card-lift flex flex-col rounded-sm border border-ink/10 p-5 transition-colors hover:border-gold/50 dark:border-cream/10"
    >
      <div className="flex items-start gap-4">
        <Avatar p={p} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
            <SeloEvidencia status={p.status} />
          </div>
          <h3 className="mt-1.5 font-display text-lg leading-tight">{p.name}</h3>
          <p className="mt-0.5 font-sans text-[0.82rem] font-medium leading-snug text-ink/70 dark:text-cream/70">{p.role}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 font-sans text-sm leading-relaxed text-ink/75 dark:text-cream/75">{p.summary || p.bio}</p>
      <span className="mt-3 inline-block font-sans text-xs font-medium text-curtain transition-opacity group-hover:opacity-70 dark:text-gold">Ver perfil →</span>
    </Link>
  );
}

export default function PessoasExplorer({ pessoas }: { pessoas: Pessoa[] }) {
  const grouped = useMemo(() => {
    const used = new Set<string>();
    const secs = GROUPS.map((g) => {
      const people = pessoas.filter((p) => g.cats.includes(p.category));
      people.forEach((p) => used.add(p.id));
      return { ...g, people };
    }).filter((g) => g.people.length > 0);
    const rest = pessoas.filter((p) => !used.has(p.id));
    if (rest.length) secs.push({ title: 'Outras presenças', sub: 'Nomes ligados à vida do Theatro.', cats: [], people: rest });
    return secs;
  }, [pessoas]);

  return (
    <div>
      <nav className="mb-10 flex flex-wrap gap-2" aria-label="Seções de pessoas">
        {grouped.map((g) => (
          <a key={g.title} href={`#${slugify(g.title)}`} className="rounded-full border border-ink/15 px-3.5 py-1.5 font-sans text-xs text-ink/75 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/15 dark:text-cream/75 dark:hover:text-gold">{g.title}</a>
        ))}
      </nav>
      {grouped.map((g) => (
        <section key={g.title} id={slugify(g.title)} className="mt-14 scroll-mt-24 first:mt-0">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <h2 className="font-display text-2xl leading-tight sm:text-3xl">{g.title}</h2>
          </div>
          <p className="mt-2 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">{g.sub}</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.people.map((p) => <Card key={p.id} p={p} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
