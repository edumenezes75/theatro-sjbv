'use client';
import { useMemo, useState } from 'react';
import type { Pessoa } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import { IconClose } from './Icons';

const GROUPS: { title: string; sub: string; cats: string[] }[] = [
  { title: 'Fundação e construção', sub: 'Quem idealizou, projetou e ergueu o edifício.', cats: ['fundação', 'arquitetura', 'construção'] },
  { title: 'Palco, música e programação', sub: 'Artistas, mestres e educadores que deram voz e vida ao Theatro.', cats: ['música', 'educação', 'cultura local', 'trabalho'] },
  { title: 'Preservação e restauro', sub: 'A mobilização e o trabalho que salvaram a casa e a devolveram à cidade.', cats: ['preservação', 'restauro', 'artes e restauro', 'instituição'] },
  { title: 'Pesquisa, memória e documentação', sub: 'Quem registrou, pesquisou e contou esta história.', cats: ['pesquisa', 'audiovisual'] },
];

export default function PessoasExplorer({ pessoas }: { pessoas: Pessoa[] }) {
  const [open, setOpen] = useState<Pessoa | null>(null);
  const byId = useMemo(() => Object.fromEntries(pessoas.map((p) => [p.id, p])), [pessoas]);
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
    <article key={p.id} id={p.id} className="card-lift flex flex-col rounded-sm border border-ink/10 p-6 hover:border-gold/50 dark:border-cream/10">
      <div className="flex items-center justify-between gap-2">
        <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
        <SeloEvidencia status={p.status} />
      </div>
      <h3 className="mt-3 font-display text-xl leading-tight">{p.name}</h3>
      <p className="mt-1 font-sans text-sm font-medium text-ink/70 dark:text-cream/70">{p.role}</p>
      <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink/80 dark:text-cream/80">{p.summary}</p>
      {p.bio && (
        <button onClick={() => setOpen(p)} className="mt-4 self-start border-b border-curtain pb-0.5 font-sans text-xs font-medium text-curtain hover:opacity-70 dark:border-gold dark:text-gold">
          Ler biografia →
        </button>
      )}
      {p.related?.length > 0 && (
        <div className="mt-4 border-t border-gold/20 pt-3">
          <span className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-ink/65 dark:text-cream/65">Relacionados</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.related.map((rid) => byId[rid] && (
              <a key={rid} href={`#${rid}`} className="rounded-full border border-curtain/30 bg-curtain/5 px-3 py-1 font-sans text-xs text-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:bg-gold/5 dark:text-gold">
                {byId[rid].name}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );

  return (
    <div>
      {grouped.map((g) => (
        <section key={g.title} className="mt-14 first:mt-0">
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

      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-ink/85 p-4 sm:p-10" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.name}>
          <div className="relative my-auto w-full max-w-2xl rounded-sm bg-cream p-7 sm:p-10 dark:bg-night" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Fechar" className="absolute right-4 top-3 text-ink/65 hover:text-curtain dark:text-cream/65"><IconClose size={22} /></button>
            <div className="flex items-center gap-3">
              <span className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{open.category}</span>
              <SeloEvidencia status={open.status} />
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight">{open.name}</h2>
            <p className="mt-1 font-sans text-sm font-medium text-ink/65 dark:text-cream/65">{open.role}</p>
            <div className="prose-theatro mt-5 max-w-none">
              {open.bio!.split('\n\n').map((para, i) => (
                <p key={i} className="font-sans text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">{para}</p>
              ))}
            </div>
            {open.source && <p className="mt-5 border-t border-gold/25 pt-3 font-sans text-xs italic text-ink/70 dark:text-cream/70">Fonte: {open.source}</p>}
            {open.related?.length > 0 && (
              <div className="mt-4">
                <span className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-ink/65 dark:text-cream/65">Relacionados</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {open.related.map((rid) => byId[rid] && (
                    <button key={rid} onClick={() => setOpen(byId[rid])} className="rounded-full border border-curtain/30 bg-curtain/5 px-3 py-1 font-sans text-xs text-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:bg-gold/5 dark:text-gold">
                      {byId[rid].name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
