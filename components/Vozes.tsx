type Voz = { quote: string; author: string; role: string; source: string };

export default function Vozes({ vozes }: { vozes: Voz[] }) {
  return (
    <div className="space-y-12">
      {vozes.map((v, i) => (
        <figure key={i} className="border-l-2 border-gold/50 pl-6 sm:pl-8">
          <blockquote className="max-w-3xl font-display text-2xl italic leading-[1.3] text-ink dark:text-cream sm:text-[1.9rem]">
            “{v.quote}”
          </blockquote>
          <figcaption className="mt-4 font-sans text-sm text-ink/70 dark:text-cream/70">
            <span className="font-medium text-ink dark:text-cream">{v.author}</span> — {v.role}
            <span className="mt-0.5 block text-xs italic text-ink/40 dark:text-cream/40">{v.source}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
