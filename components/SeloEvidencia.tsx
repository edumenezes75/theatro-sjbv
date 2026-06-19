type Kind = 'documentado' | 'memoria' | 'pesquisa' | 'servico';

function classify(raw: string): Kind {
  const s = (raw || '').toLowerCase();
  if (s.includes('servi')) return 'servico';
  if (s.includes('revis') || s.includes('pesquis')) return 'pesquisa';
  if (s.includes('memó') || s.includes('memo') || s.includes('crôn') || s.includes('cron')) return 'memoria';
  return 'documentado';
}

const LABEL: Record<Kind, string> = {
  documentado: 'Documentado',
  memoria: 'Memória',
  pesquisa: 'Em pesquisa',
  servico: 'Informação de serviço',
};
const STYLE: Record<Kind, string> = {
  documentado: 'border-gold/60 text-gold',
  memoria: 'border-curtain/50 text-curtain dark:text-gold',
  pesquisa: 'border-moss/60 text-moss',
  servico: 'border-ink/30 text-ink/70 dark:border-cream/30 dark:text-cream/70',
};

export default function SeloEvidencia({ status, label }: { status: string; label?: string }) {
  const k = classify(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.62rem] font-sans font-medium uppercase tracking-[0.12em] ${STYLE[k]}`}
      title={label || status}
    >
      <span className="inline-block h-1.5 w-1.5 rotate-45 bg-current" aria-hidden />
      {label || LABEL[k]}
    </span>
  );
}
