import { IconMapPin, IconClock, IconPhone, IconAccessible } from './Icons';

const MAPS = 'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Theatro Municipal de São João da Boa Vista, Praça da Catedral, 22 - Centro, São João da Boa Vista - SP');
const WPP = 'https://wa.me/5519997195719?text=' + encodeURIComponent('Olá! Gostaria de informações para visitar o Theatro Municipal.');

const CARDS = [
  { icon: IconMapPin, t: 'Endereço', lines: ['Praça da Catedral, 22 — Centro', 'São João da Boa Vista — SP'], href: MAPS, cta: 'Abrir no mapa ↗' },
  { icon: IconClock, t: 'Atendimento administrativo', lines: ['Segunda a sexta', '7h–11h e 13h–17h'] },
  { icon: IconPhone, t: 'Contato', lines: ['WhatsApp (19) 99719-5719', 'Cultura (19) 3636-4872'], href: WPP, cta: 'Falar no WhatsApp ↗' },
  { icon: IconAccessible, t: 'Acessibilidade', lines: ['Percurso sem degraus até a sala,', 'sanitários e lugares reservados.'] },
];

export default function VisitaInfo() {
  return (
    <section aria-label="Planeje sua visita" className="mb-14">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.t} className="flex flex-col rounded-sm border border-ink/10 p-5 dark:border-cream/10">
              <Icon size={20} className="text-curtain dark:text-gold" />
              <h3 className="mt-3 font-sans text-[0.7rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{c.t}</h3>
              <div className="mt-1.5 flex-1 font-sans text-[0.9rem] leading-snug text-ink/80 dark:text-cream/80">
                {c.lines.map((l) => <p key={l}>{l}</p>)}
              </div>
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener" className="mt-3 font-sans text-xs text-curtain underline decoration-gold/40 underline-offset-2 dark:text-gold">{c.cta}</a>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={MAPS} target="_blank" rel="noopener" className="rounded-full bg-curtain px-5 py-2.5 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03] dark:bg-gold dark:text-ink">Como chegar ↗</a>
        <a href={WPP} target="_blank" rel="noopener" className="rounded-full border border-curtain/40 px-5 py-2.5 font-sans text-sm text-curtain transition-colors hover:border-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink">WhatsApp</a>
        <a href="/programacao" className="rounded-full border border-curtain/40 px-5 py-2.5 font-sans text-sm text-curtain transition-colors hover:border-curtain hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink">Ver programação</a>
      </div>
    </section>
  );
}
