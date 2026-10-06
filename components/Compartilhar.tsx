'use client';
import { useState } from 'react';

// Um botão só: copiar o link serve em qualquer aparelho e para qualquer destino.
export default function Compartilhar(_: { title?: string }) {
  const [copied, setCopied] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* sem permissão */ }
  };

  const cls = 'inline-flex items-center gap-1.5 rounded-full border border-curtain/30 px-3.5 py-1.5 font-sans text-xs font-medium text-curtain transition-colors hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink';

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button onClick={copiar} className={cls} aria-label="Copiar o link">{copied ? 'Link copiado ✓' : 'Copiar link'}</button>
    </div>
  );
}
