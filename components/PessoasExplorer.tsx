'use client';
import { useMemo, useState } from 'react';
import type { Pessoa } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';

const slugify = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const GROUPS: { title: string; sub: string; cats: string[] }[] = [
  { title: 'Fundação e construção', sub: 'Quem idealizou, projetou e ergueu o edifício.', cats: ['fundação', 'arquitetura', 'construção'] },
  { title: 'Palco, música e programação', sub: 'Artistas, mestres e educadores que deram voz e vida ao Theatro.', cats: ['música', 'educação', 'cultura local', 'trabalho'] },
  { title: 'Preservação e restauro', sub: 'A mobilização e o trabalho que salvaram a casa e a devolveram à cidade.', cats: ['preservação', 'restauro', 'artes e restauro', 'instituição'] },
  { title: 'Pesquisa, memória e documentação', sub: 'Quem registrou, pesquisou e contou esta história.', cats: ['pesquisa', 'audiovisual'] },
];

function BioVerMais({ texto }: { texto: string }) {
  const [open, setOpen] = useState(false);
  const paras = texto.split('\n\n');
  const long = paras.length > 1;
  const mostrar = open ? paras : paras.slice(0, 1);
  return (
    <div className="mt-3">
      <div className="space-y-3 font-sans text-sm leading-relaxed text-ink/80 dark:text-cream/80">
        {mostrar.map((par, i) => (<p key={i}>{par}</p>))}
      </div>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 border-b border-curtain pb-0.5 font-sans text-xs font-medium text-curtain transition-opacity hover:opacity-70 dark:border-gold dark:text-gold">
          {open ? 'Ver menos ↑' : 'Ver mais ↓'}
        </button>
      )}
    </div>
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

  const Card = (p: Pessoa) => (
    <article key={p.id} id={p.id} className="flex flex-col rounded-sm border border-ink/10 p-6 dark:border-cream/10">
      <div className="flex items-center justify-between gap-2">
        <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
        <SeloEvidencia status={p.status} />
      </div>
      <h3 className="mt-3 font-display text-xl leading-tight">{p.name}</h3>
      <p className="mt-1 font-sans text-sm font-medium text-ink/70 dark:text-cream/70">{p.role}</p>
      <BioVerMais texto={p.bio || p.summary} />
    </article>
  );

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
            {g.people.map((p) => Card(p))}
          </div>
        </section>
      ))}
    </div>
  );
}
