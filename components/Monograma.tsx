// Medalhão com as iniciais, para pessoas sem retrato conhecido.
// Mantém a página com dignidade visual e convida à contribuição.
const HONORIFICOS = new Set(['padre', 'maestro', 'dona', 'dom', 'dr', 'dra', 'prof', 'profa', 'pe', 'cel', 'coronel']);

function iniciais(nome: string): string {
  const base = nome.split(/[—·-]/)[0]; // ignora apelido após travessão
  const tokens = base
    .replace(/[“”"'’.]/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !HONORIFICOS.has(t.toLowerCase()) && t.length > 1 || /^[A-Z]/.test(t));
  const sig = tokens.filter((t) => !HONORIFICOS.has(t.toLowerCase()));
  const arr = sig.length ? sig : tokens;
  if (!arr.length) return '·';
  const first = arr[0][0];
  const last = arr.length > 1 ? arr[arr.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function Monograma({ name }: { name: string }) {
  return (
    <figure className="mt-7 flex flex-col items-center rounded-sm border border-gold/20 bg-gradient-to-b from-curtain/8 to-transparent py-12 dark:from-gold/8">
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full border border-gold/40 bg-cream font-display text-5xl font-medium text-curtain shadow-sm dark:bg-nightsoft dark:text-gold"
        aria-hidden
      >
        {iniciais(name)}
      </div>
      <figcaption className="mt-4 font-sans text-[0.72rem] uppercase tracking-eyebrow text-ink/45 dark:text-cream/45">
        Retrato ainda não localizado
      </figcaption>
    </figure>
  );
}
