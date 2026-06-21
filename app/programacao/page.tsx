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
  const reais = eventos.filter((e) => !e.exemplo);
  const futuros = reais.filter((e) => e.date >= now || e.status === 'agendado').sort((a, b) => (a.date > b.date ? 1 : -1));
  const passados = reais.filter((e) => !(e.date >= now || e.status === 'agendado'));

  return (
    <article>
      <ChapterHero eyebrow="Agenda de espetáculos, concertos e eventos" title="Programação" />
      <div className="mx-auto max-w-4xl px-5 py-14">
        <p className="mb-10 max-w-reading font-sans text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          O Theatro continua vivo. Veja o que está por vir e o que já passou pelo palco. A programação está sujeita a alteração — confirme sempre datas, horários e ingressos pelos canais oficiais do Theatro e da Prefeitura antes de ir.
        </p>

        <h2 className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Próximos eventos</h2>
        <div className="mt-4">
          {futuros.length ? futuros.map((e) => <Card key={e.slug} e={e} />) : <p className="max-w-reading py-6 font-sans text-ink/70 dark:text-cream/70">A próxima agenda ainda não foi publicada aqui. Para saber o que está por vir, fale com a organização do Theatro pelo WhatsApp abaixo ou acompanhe os canais oficiais da Prefeitura.</p>}
        </div>

        {passados.length > 0 && (
          <>
            <h2 className="mt-16 font-sans text-xs uppercase tracking-eyebrow text-ink/65 dark:text-cream/65">Já aconteceu</h2>
            <div className="mt-4 opacity-75">{passados.map((e) => <Card key={e.slug} e={e} />)}</div>
          </>
        )}

        <aside className="mt-16 rounded-sm border border-gold/25 bg-ink/[0.03] p-8 text-center dark:bg-cream/[0.03]">
          <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Fique por dentro</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl leading-snug">Receba a programação do Theatro pelo WhatsApp</h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">Estreias, concertos e visitas guiadas, direto da organização do Theatro.</p>
          <a href="https://wa.me/5519997195719?text=Ol%C3%A1!%20Gostaria%20de%20receber%20a%20programa%C3%A7%C3%A3o%20do%20Theatro%20Municipal." target="_blank" rel="noopener" className="mt-6 inline-block rounded-full bg-curtain px-7 py-3 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03] dark:bg-gold dark:text-ink">Falar no WhatsApp →</a>
        </aside>
      </div>
    </article>
  );
}
