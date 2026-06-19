type Kind = 'documentado' | 'memoria' | 'pesquisa' | 'servico';
function classify(raw: string): Kind {
  const s = (raw || '').toLowerCase();
  if (s.includes('servi')) return 'servico';
  if (s.includes('revis') || s.includes('pesquis')) return 'pesquisa';
  if (s.includes('memó') || s.includes('memo') || s.includes('crôn') || s.includes('cron')) return 'memoria';
  return 'documentado';
}
const LABEL: Record<Kind, string> = { documentado: 'Documentado', memoria: 'Memória', pesquisa: 'Em pesquisa', servico: 'Serviço' };
const DOT: Record<Kind, string> = { documentado: 'bg-gold', memoria: 'bg-curtain', pesquisa: 'bg-moss', servico: 'bg-ink/40 dark:bg-cream/40' };

export default function SeloEvidencia({ status, label }: { status: string; label?: string }) {
  const k = classify(status);
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-[0.58rem] font-medium uppercase tracking-[0.16em] text-ink/45 dark:text-cream/45" title={label || status}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${DOT[k]}`} aria-hidden />
      {label || LABEL[k]}
    </span>
  );
}
