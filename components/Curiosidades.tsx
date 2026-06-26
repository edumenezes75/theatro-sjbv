import type { Curiosidade } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';

const ORDEM = [
  'Fundação e inauguração',
  'Grandes nomes, grandes noites',
  'A casa de muitos usos',
  'O tempo do cinema',
  'Ameaça, restauro e mistérios',
];

const LEGENDA: Record<string, string> = {
  'Fundação e inauguração': 'De como uma cidade decidiu erguer o seu monumento — e a noite em que ele abriu as portas.',
  'Grandes nomes, grandes noites': 'Os artistas, os pianos e as plateias que passaram pelo palco.',
  'A casa de muitos usos': 'Rádio, rinque, redação de jornal: o edifício foi muito além do espetáculo.',
  'O tempo do cinema': 'As décadas em que o Theatro virou cinema — e os causos da plateia.',
  'Ameaça, restauro e mistérios': 'O fechamento, a luta para salvá-lo, a obra e o que ainda não se explica.',
};

function Card({ c }: { c: Curiosidade }) {
  return (
    <article className="card-lift flex flex-col rounded-sm border border-ink/10 p-6 hover:border-gold/50 dark:border-cream/10">
      <div className="flex items-center justify-between gap-2">
        <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">Você sabia?</span>
        <SeloEvidencia status={c.type} />
      </div>
      <h3 className="mt-3 font-display text-lg font-medium leading-tight">{c.title}</h3>
      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink/80 dark:text-cream/80">{c.text}</p>
      {c.filme && (
        <a
          href={`https://www.youtube.com/watch?v=e2stgoHtlAQ&t=${c.filme.s}s`}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-1.5 self-start font-sans text-[0.66rem] uppercase tracking-eyebrow text-curtain transition-colors hover:text-gold dark:text-gold"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
          Ouça no documentário · {c.filme.t}
        </a>
      )}
    </article>
  );
}

export default function Curiosidades({ itens, agrupar = true }: { itens: Curiosidade[]; agrupar?: boolean }) {
  const temTemas = agrupar && itens.some((c) => c.tema);
  if (!temTemas) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((c) => <Card key={c.id} c={c} />)}
      </div>
    );
  }
  const temas = ORDEM.filter((t) => itens.some((c) => c.tema === t));
  const extras = Array.from(new Set(itens.map((c) => c.tema).filter((t): t is string => !!t && !ORDEM.includes(t))));
  return (
    <div className="space-y-14">
      {[...temas, ...extras].map((tema) => {
        const grupo = itens.filter((c) => c.tema === tema);
        return (
          <section key={tema} aria-label={tema}>
            <div className="mb-6 border-l-2 border-gold/60 pl-4">
              <h3 className="font-display text-2xl leading-tight text-ink dark:text-cream">{tema}</h3>
              {LEGENDA[tema] && <p className="mt-1 max-w-reading font-sans text-sm italic text-ink/65 dark:text-cream/65">{LEGENDA[tema]}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {grupo.map((c) => <Card key={c.id} c={c} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
