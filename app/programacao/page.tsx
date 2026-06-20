import type { Metadata } from 'next';
import { getEventos } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';

export const metadata: Metadata = {
  title: 'Programação',
  description: 'Agenda de espetáculos, concertos e eventos do Theatro Municipal de São João da Boa Vista.',
};

const fmt = (iso: string) => {
  const d = new Date(iso);
  const data = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const dia = d.toLocaleDateString('pt-BR', { weekday: 'long' });
  return { data, hora, dia };
};

function Card({ e }: { e: ReturnType<typeof getEventos>[number] }) {
  const { data, hora, dia } = fmt(e.date);
  return (
    <article className="grid gap-4 border-b border-gold/20 py-7 sm:grid-cols-[auto_1fr] sm:gap-8">
      <div className="sm:w-40">
        <p className="font-display text-2xl leading-none text-curtain dark:text-gold">{data}</p>
        <p className="mt-1 font-sans text-xs capitalize text-ink/70 dark:text-cream/70">{dia} · {hora}</p>
        {e.categoria && <span className="mt-2 inline-block rounded-full border border-curtain/30 px-2.5 py-0.5 font-sans text-[0.6rem] uppercase tracking-eyebrow text-curtain dark:border-gold/40 dark:text-gold">{e.categoria}</span>}
      </div>
      <div>
        <h3 className="font-display text-xl leading-tight">{e.title}</h3>
        {e.local && <p className="mt-1 font-sans text-sm text-ink/60 dark:text-cream/60">{e.local}</p>}
        {e.html && <div className="prose-theatro mt-2 max-w-none text-sm" dangerouslySetInnerHTML={{ __html: e.html }} />}
        {e.ingresso && <a href={e.ingresso} target="_blank" rel="noopener" className="mt-3 inline-block rounded-full bg-curtain px-4 py-1.5 font-sans text-xs font-medium text-cream hover:opacity-90">Ingressos ↗</a>}
      </div>
    </article>
  );
}

export default function ProgramacaoPage() {
  const eventos = getEventos();
  const now = new Date().toISOString();
  const futuros = eventos.filter((e) => e.date >= now || e.status === 'agendado').sort((a, b) => (a.date > b.date ? 1 : -1));
  const passados = eventos.filter((e) => !(e.date >= now || e.status === 'agendado'));

  return (
    <article>
      <ChapterHero eyebrow="Agenda de espetáculos, concertos e eventos" title="Programação" />
      <div className="mx-auto max-w-4xl px-5 py-14">
        <p className="mb-10 max-w-reading font-sans text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          O Theatro continua vivo. Veja o que está por vir e o que já passou pelo palco. Horários de bilheteria e regras de entrada variam — confirme com a organização antes de ir.
        </p>

        <h2 className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Próximos eventos</h2>
        <div className="mt-4">
          {futuros.length ? futuros.map((e) => <Card key={e.slug} e={e} />) : <p className="py-8 font-sans text-ink/60 dark:text-cream/60">Nenhum evento agendado no momento.</p>}
        </div>

        {passados.length > 0 && (
          <>
            <h2 className="mt-16 font-sans text-xs uppercase tracking-eyebrow text-ink/65 dark:text-cream/65">Já aconteceu</h2>
            <div className="mt-4 opacity-75">{passados.map((e) => <Card key={e.slug} e={e} />)}</div>
          </>
        )}
      </div>
    </article>
  );
}
