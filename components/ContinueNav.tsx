import { LABELS, proximaPagina } from '@/lib/rotas';

// O fecho padrão de toda página de conteúdo: a próxima da ordem de leitura e,
// quando há, os desvios relacionados — num bloco só.
export default function ContinueNav({ href, relacionadas = [] }: { href: string; relacionadas?: string[] }) {
  const prox = proximaPagina(href);
  const outras = relacionadas.filter((r) => r !== prox);
  if (!prox && outras.length === 0) return null;
  return (
    <nav aria-label="Continue no site" className="mt-12 border-t border-gold/25 pt-10">
      {prox && (
        <a href={prox} className="card-lift group flex items-center justify-between gap-4 rounded-sm border border-gold/30 bg-cream px-6 py-5 transition-colors hover:border-gold dark:bg-nightsoft">
          <span>
            <span className="font-sans text-xs uppercase tracking-eyebrow text-curtain/70 dark:text-gold/70">Próxima página</span>
            <span className="mt-1 block font-display text-xl text-ink dark:text-cream">{LABELS[prox] ?? prox}</span>
          </span>
          <span className="font-display text-2xl text-curtain transition-transform group-hover:translate-x-1 dark:text-gold">→</span>
        </a>
      )}
      {outras.length > 0 && (
        <p className={`flex flex-wrap items-baseline gap-x-5 gap-y-2 font-sans text-sm text-ink/65 dark:text-cream/65${prox ? ' mt-5' : ''}`}>
          <span>{prox ? 'Ou siga para' : 'Continue em'}</span>
          {outras.map((r) => (
            <a key={r} href={r} className="text-curtain underline decoration-gold/40 underline-offset-4 hover:decoration-current dark:text-gold">
              {LABELS[r] ?? r}
            </a>
          ))}
        </p>
      )}
    </nav>
  );
}
