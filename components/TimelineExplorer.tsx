import Link from 'next/link';
import type { Evento } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';
import Reveal from './Reveal';

type EventoRede = Evento & { pessoas?: { slug: string; name: string }[] };

export default function TimelineExplorer({ eventos }: { eventos: EventoRede[] }) {
  return (
    <ol className="relative mt-6 border-l-2 border-gold/30 pl-6 sm:pl-10">
      {eventos.map((e) => (
        <li key={e.id} id={e.id} className="relative mb-10 scroll-mt-28">
          <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rotate-45 border-2 border-curtain bg-cream dark:border-gold dark:bg-night sm:-left-[2.9rem]" aria-hidden />
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-lg font-medium text-curtain dark:text-gold">{e.display}</span>
              <SeloEvidencia status={e.status} />
            </div>
            <h2 className="mt-1 font-display text-xl leading-tight">{e.title}</h2>
            <p className="mt-2 max-w-reading font-sans text-[0.97rem] leading-relaxed text-ink/80 dark:text-cream/80">{e.summary}</p>
            {e.pessoas && e.pessoas.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="font-sans text-[0.66rem] uppercase tracking-eyebrow text-ink/45 dark:text-cream/45">Quem aparece</span>
                {e.pessoas.map((pe) => (
                  <Link key={pe.slug} href={`/pessoas/${pe.slug}`} className="rounded-full border border-ink/12 px-3 py-0.5 font-sans text-[0.8rem] text-ink/75 transition-colors hover:border-gold/60 hover:text-curtain dark:border-cream/12 dark:text-cream/75 dark:hover:text-gold">{pe.name} →</Link>
                ))}
              </div>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
