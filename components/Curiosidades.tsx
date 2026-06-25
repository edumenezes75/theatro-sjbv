import type { Curiosidade } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';

export default function Curiosidades({ itens }: { itens: Curiosidade[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {itens.map((c) => (
        <article key={c.id} className="card-lift flex flex-col rounded-sm border border-ink/10 p-6 hover:border-gold/50 dark:border-cream/10">
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">Você sabia?</span>
            <SeloEvidencia status={c.type} />
          </div>
          <h3 className="mt-3 font-display text-lg font-medium leading-tight">{c.title}</h3>
          <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink/80 dark:text-cream/80">{c.text}</p>
        </article>
      ))}
    </div>
  );
}
