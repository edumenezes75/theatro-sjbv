import Link from 'next/link';
import { getEventos } from '@/lib/content';
import { getEventosPrefeitura } from '@/lib/agendaPrefeitura';

// Faixa fina logo abaixo do hero: responde à pergunta nº 1 de quem chega
// ("o que tem no Theatro?") sem obrigar a rolar a home inteira.
// Quando não há evento futuro confirmado, em vez de sumir, a faixa vira
// uma linha de serviço — o topo da home nunca fica mudo.

const WPP =
  'https://wa.me/5519997195719?text=' +
  encodeURIComponent('Olá! Gostaria de saber a programação do Theatro Municipal.');

const chave = (e: { title: string; date: string }) =>
  e.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '') +
  '|' +
  e.date.slice(0, 10);

export default async function ProximoEvento() {
  const manuais = getEventos().filter((e) => !e.exemplo);
  const oficiais = await getEventosPrefeitura();
  const vistos = new Set(manuais.map(chave));
  const reais = [...manuais, ...oficiais.filter((e) => (vistos.has(chave(e)) ? false : (vistos.add(chave(e)), true)))];
  const now = new Date().toISOString();
  const proximo = reais.filter((e) => e.date >= now).sort((a, b) => (a.date > b.date ? 1 : -1))[0];

  const d = proximo ? new Date(proximo.date) : null;
  const data = d?.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
  const hora = d?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <section className="border-b border-gold/25 bg-bone dark:bg-nightsoft">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        {proximo ? (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">
                No palco
              </span>
              <span className="font-display text-base leading-tight text-ink dark:text-cream">
                {proximo.title}
              </span>
              <span className="font-sans text-sm text-ink/70 dark:text-cream/70">
                {data}
                {hora ? ` · ${hora}` : ''}
              </span>
            </p>
            <Link
              href="/programacao"
              className="shrink-0 self-start font-sans text-sm font-medium text-curtain underline decoration-gold/40 underline-offset-4 hover:decoration-current dark:text-gold sm:self-auto"
            >
              Ver programação →
            </Link>
          </>
        ) : (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">
                Visite o Theatro
              </span>
              <span className="font-sans text-sm text-ink/75 dark:text-cream/75">
                Praça da Catedral, 22 — Centro. Informações e agendamento de visitas pelo WhatsApp.
              </span>
            </p>
            <span className="flex shrink-0 gap-4 self-start sm:self-auto">
              <a
                href={WPP}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm font-medium text-curtain underline decoration-gold/40 underline-offset-4 hover:decoration-current dark:text-gold"
              >
                WhatsApp ↗
              </a>
              <Link
                href="/programacao"
                className="font-sans text-sm font-medium text-curtain underline decoration-gold/40 underline-offset-4 hover:decoration-current dark:text-gold"
              >
                Programação →
              </Link>
            </span>
          </>
        )}
      </div>
    </section>
  );
}
