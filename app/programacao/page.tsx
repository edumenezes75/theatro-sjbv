import type { Metadata } from 'next';
import { getEventos } from '@/lib/content';
import { getEventosPrefeitura } from '@/lib/agendaPrefeitura';
import ChapterHero from '@/components/ChapterHero';

export const revalidate = 21600; // 6h — agenda se renova sozinha

export const metadata: Metadata = {
  alternates: { canonical: '/programacao' },
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

const chave = (e: { title: string; date: string }) =>
  e.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '') + '|' + e.date.slice(0, 10);

export default async function ProgramacaoPage() {
  const manuais = getEventos().filter((e) => !e.exemplo);
  const oficiais = await getEventosPrefeitura();
  // Eventos cadastrados à mão (CMS) têm prioridade; os da Prefeitura entram se não duplicarem
  const vistos = new Set(manuais.map(chave));
  const reais = [...manuais, ...oficiais.filter((e) => (vistos.has(chave(e)) ? false : (vistos.add(chave(e)), true)))];
  const temOficiais = oficiais.length > 0;
  const now = new Date().toISOString();
  const futuros = reais.filter((e) => e.date >= now || e.status === 'agendado').sort((a, b) => (a.date > b.date ? 1 : -1));
  const passados = reais.filter((e) => !(e.date >= now || e.status === 'agendado')).sort((a, b) => (a.date > b.date ? -1 : 1));
  const recentes = passados.slice(0, 6);

  const SITE = 'https://www.theatromunicipalsjbv.com.br';
  const ldEventos = futuros.length ? {
    '@context': 'https://schema.org',
    '@graph': futuros.map((e) => ({
      '@type': 'Event',
      name: e.title,
      startDate: e.date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: 'Theatro Municipal de São João da Boa Vista', address: { '@type': 'PostalAddress', streetAddress: 'Praça da Catedral, 22 — Centro', addressLocality: 'São João da Boa Vista', addressRegion: 'SP', addressCountry: 'BR' } },
      ...(e.categoria ? { description: e.categoria } : {}),
      organizer: { '@type': 'Organization', name: 'Theatro Municipal de São João da Boa Vista', url: SITE },
    })),
  } : null;

  return (
    <article>
      {ldEventos && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldEventos) }} />}
      <ChapterHero eyebrow="Agenda de espetáculos, concertos e eventos" title="Programação" />
      <div className="mx-auto max-w-4xl px-5 py-14">
        <p className="mb-10 max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          O Theatro continua vivo. Veja o que está por vir e o que já passou pelo palco. A programação está sujeita a alteração — confirme sempre datas, horários e ingressos pelos canais oficiais do Theatro e da Prefeitura antes de ir.
        </p>

        <h2 className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Próximos eventos</h2>
        <div className="mt-4">
          {futuros.length ? futuros.map((e) => <Card key={e.slug} e={e} />) : <p className="max-w-reading py-6 font-sans text-ink/70 dark:text-cream/70">O Theatro segue ativo. Quando há eventos com data confirmada, eles aparecem aqui automaticamente. Para a agenda mais recente, consulte os canais oficiais abaixo.</p>}
        </div>

        {recentes.length > 0 && (
          <section className="mt-14">
            <h2 className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Últimos eventos no Theatro</h2>
            <div className="mt-4 opacity-90">{recentes.map((e) => <Card key={e.slug} e={e} />)}</div>
          </section>
        )}

        <section className="mt-14">
          <h2 className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Canais oficiais</h2>
          <p className="mt-2 max-w-reading font-sans text-sm text-ink/65 dark:text-cream/65">Onde encontrar a programação atualizada e falar com a organização do Theatro.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <a href="https://www.saojoao.sp.gov.br/eventos" target="_blank" rel="noopener" className="card-lift rounded-sm border border-ink/10 p-5 hover:border-gold/50 dark:border-cream/10">
              <p className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">Prefeitura</p>
              <p className="mt-2 font-display text-lg leading-tight">Agenda cultural oficial</p>
              <p className="mt-1 font-sans text-sm text-ink/60 dark:text-cream/60">Programação de eventos do município →</p>
            </a>
            <a href="https://www.instagram.com/prefeitura.saojoao" target="_blank" rel="noopener" className="card-lift rounded-sm border border-ink/10 p-5 hover:border-gold/50 dark:border-cream/10">
              <p className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">Instagram</p>
              <p className="mt-2 font-display text-lg leading-tight">@prefeitura.saojoao</p>
              <p className="mt-1 font-sans text-sm text-ink/60 dark:text-cream/60">Divulgações e estreias do dia a dia →</p>
            </a>
            <a href="https://wa.me/5519997195719?text=Ol%C3%A1!%20Gostaria%20de%20saber%20a%20programa%C3%A7%C3%A3o%20do%20Theatro%20Municipal." target="_blank" rel="noopener" className="card-lift rounded-sm border border-ink/10 p-5 hover:border-gold/50 dark:border-cream/10">
              <p className="font-sans text-[0.62rem] uppercase tracking-eyebrow text-curtain dark:text-gold">WhatsApp</p>
              <p className="mt-2 font-display text-lg leading-tight">Falar com o Theatro</p>
              <p className="mt-1 font-sans text-sm text-ink/60 dark:text-cream/60">Informações, agendamentos e visitas →</p>
            </a>
          </div>
        </section>

        {temOficiais && (
          <p className="mt-4 font-sans text-xs text-ink/50 dark:text-cream/50">
            Agenda atualizada automaticamente a partir da{' '}
            <a href="https://www.saojoao.sp.gov.br/eventos" target="_blank" rel="noopener" className="underline decoration-gold/40 underline-offset-2 hover:text-curtain dark:hover:text-gold">programação oficial da Prefeitura</a>. Confirme sempre datas e ingressos pelos canais oficiais.
          </p>
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
