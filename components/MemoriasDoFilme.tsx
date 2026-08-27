import fonte from '@/data/memorias-fonte.json';

const VID = 'e2stgoHtlAQ';
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

type Item = { id: string; titulo: string; texto: string; segundo: number };

// Abre o Livro de Memórias com lembranças já colhidas — as do documentário.
// Servem de exemplo do que é uma memória e evitam que a página nasça vazia,
// mas ficam claramente separadas dos envios do público: selo de origem e link
// que abre o filme no minuto exato, para quem quiser conferir na voz de quem contou.
export default function MemoriasDoFilme() {
  const items = (fonte as { items: Item[] }).items;
  if (!items.length) return null;

  return (
    <section className="mt-14">
      <div className="flex items-center gap-3">
        <span className="h-6 w-px bg-curtain dark:bg-gold" />
        <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">
          As primeiras páginas
        </p>
      </div>
      <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
        Memórias colhidas no documentário
      </h2>
      <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
        Em 2015, o documentário <em>Música &amp; Drama</em> registrou dezenas de sanjoanenses contando o
        Theatro que viveram. Estas cinco lembranças abrem o livro. Toque no minuto para ouvir cada uma
        na voz de quem contou.
      </p>

      <div className="mt-8 space-y-8">
        {items.map((m) => (
          <article key={m.id} className="border-l-2 border-gold/40 pl-5">
            <h3 className="font-display text-xl leading-tight">{m.titulo}</h3>
            <p className="mt-2 max-w-reading whitespace-pre-line font-read text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">
              {m.texto}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-full border border-gold/40 px-2.5 py-0.5 font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">
                Do documentário
              </span>
              <a
                href={`https://www.youtube.com/watch?v=${VID}&t=${m.segundo}s`}
                className="font-sans text-sm text-ink/60 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-curtain dark:text-cream/60 dark:hover:text-gold"
              >
                Ouvir em Música &amp; Drama ({mmss(m.segundo)}) →
              </a>
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-reading font-sans text-xs leading-relaxed text-ink/50 dark:text-cream/65">
        Transcrito do documentário <em>Música &amp; Drama</em> (2015), com pontuação acrescentada para
        leitura. As falas não foram alteradas.
      </p>
    </section>
  );
}
