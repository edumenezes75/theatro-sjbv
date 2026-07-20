const STATS = [
  ['+2.000', 'assinaturas pela preservação'],
  ['1984–85', 'compra do prédio pelo município'],
  ['1987', 'tombamento estadual (CONDEPHAAT)'],
  ['2002', 'reabertura ao público'],
];
const FASES = [
  ['Início dos anos 1980', 'Deterioração e ameaça de demolição mobilizam artistas e cidadãos.'],
  ['1984–1985', 'O município adquire o edifício em duas etapas.'],
  ['1986–1987', 'Início das obras e tombamento estadual.'],
  ['1992', 'Recuperação da fachada e inauguração do Foyer.'],
  ['Anos 1990', 'Obra estrutural, fosso da orquestra e restauro artístico dos ornatos.'],
  ['2002', 'Reabertura, na 25ª Semana Guiomar Novaes.'],
];

export default function RestauroResumo() {
  return (
    <section className="mt-16 border-t border-gold/25 pt-12">
      <h2 className="font-display text-3xl">A restauração em números e fases</h2>
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gold/20 bg-gold/15 sm:grid-cols-4">
        {STATS.map(([n, l]) => (
          <div key={l} className="bg-cream p-5 dark:bg-night">
            <p className="font-display text-3xl text-curtain dark:text-gold">{n}</p>
            <p className="mt-1 font-sans text-xs leading-snug text-ink/70 dark:text-cream/70">{l}</p>
          </div>
        ))}
      </div>
      <ol className="mt-10 border-l-2 border-gold/30 pl-6">
        {FASES.map(([ano, txt]) => (
          <li key={ano} className="relative mb-6">
            <span className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rotate-45 border-2 border-curtain bg-cream dark:border-gold dark:bg-night" aria-hidden />
            <p className="font-display text-lg text-curtain dark:text-gold">{ano}</p>
            <p className="mt-0.5 max-w-reading font-sans text-[0.92rem] leading-relaxed text-ink/80 dark:text-cream/80">{txt}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
