'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Pessoa } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import Abas, { type Aba } from './Abas';
import { IconFachada, IconEstrela, IconEscudo, IconLivro } from './Icons';

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

const GROUPS: { title: string; curto: string; Icon: Aba['Icon']; sub: string; cats: string[] }[] = [
  { title: 'Fundação e construção', curto: 'Fundação', Icon: IconFachada, sub: 'Quem idealizou, projetou e ergueu o edifício.', cats: ['fundação', 'arquitetura', 'construção'] },
  { title: 'Palco, música e programação', curto: 'Palco e música', Icon: IconEstrela, sub: 'Artistas, mestres e educadores que deram voz e vida ao Theatro.', cats: ['música', 'educação', 'cultura local', 'trabalho'] },
  { title: 'Preservação e restauro', curto: 'Preservação', Icon: IconEscudo, sub: 'A mobilização e o trabalho que salvaram a casa e a devolveram à cidade.', cats: ['preservação', 'restauro', 'artes e restauro', 'instituição'] },
  { title: 'Pesquisa, memória e documentação', curto: 'Pesquisa', Icon: IconLivro, sub: 'Quem registrou, pesquisou e contou esta história.', cats: ['pesquisa', 'audiovisual'] },
];

function Avatar({ p }: { p: Pessoa }) {
  const [err, setErr] = useState(false);
  const base = 'h-14 w-14 shrink-0 rounded-full border border-gold/30 object-cover';
  if (p.image && !err) {
    // eslint-disable-next-line @next/next/no-img-element
    // retrato de 56px: pede ao otimizador uma versão pequena em vez do arquivo original
    const src = p.image.startsWith('/') ? `/_next/image?url=${encodeURIComponent(p.image)}&w=128&q=75` : p.image;
    return <img src={src} alt="" onError={() => setErr(true)} loading="lazy" className={base} />;
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
      className="card-lift flex flex-col rounded-sm border border-gold/20 bg-cream p-5 transition-colors hover:border-gold/60 dark:bg-nightsoft"
    >
      <div className="flex items-start gap-4">
        <Avatar p={p} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">{p.category}</span>
            <SeloEvidencia status={p.status} />
          </div>
          <h3 className="mt-1.5 font-display text-lg leading-tight">{p.name}</h3>
          <p className="mt-0.5 font-sans text-sm font-medium leading-snug text-ink/70 dark:text-cream/70">{p.role}</p>
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
    if (rest.length) secs.push({ title: 'Outras presenças', curto: 'Outras', Icon: IconEstrela, sub: 'Nomes ligados à vida do Theatro.', cats: [], people: rest });
    return secs;
  }, [pessoas]);

  const abas: Aba[] = grouped.map((g) => ({
    slug: slugify(g.title), nome: g.title, curto: g.curto, legenda: g.sub, Icon: g.Icon,
    conta: `${g.people.length} ${g.people.length === 1 ? 'pessoa' : 'pessoas'}`,
    conteudo: (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {g.people.map((p) => <Card key={p.id} p={p} />)}
      </div>
    ),
  }));
  return <Abas abas={abas} rotulo="Grupos de pessoas" />;
}
