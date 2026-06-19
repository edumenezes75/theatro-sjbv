import { IconChevron } from './Icons';
export default function FontesDaPagina({ fontes }: { fontes: string | null }) {
  if (!fontes) return null;
  return (
    <details className="group mx-auto mt-16 max-w-reading border-t border-gold/30 pt-4">
      <summary className="cursor-pointer list-none font-sans text-xs uppercase tracking-eyebrow text-ink/60 transition-colors hover:text-curtain dark:text-cream/60 dark:hover:text-gold">
        <IconChevron size={13} className="inline-block transition-transform group-open:rotate-90" /> Fontes desta página
      </summary>
      <p className="mt-3 font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{fontes}</p>
    </details>
  );
}
