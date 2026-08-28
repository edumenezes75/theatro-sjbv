import Link from 'next/link';

export default function ReconheceuAlguem() {
  return (
    <section className="mt-16 border-t border-gold/25 pt-12">
      <div className="relative overflow-hidden rounded-sm border border-gold/30 bg-gold/5 px-6 py-8 sm:px-10 sm:py-10 dark:bg-gold/10">
        <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Ajude a completar esta história</p>
        <h2 className="mt-3 max-w-reading font-display text-2xl leading-tight sm:text-3xl">Reconheceu alguém? Lembra de uma sessão, um baile, uma data?</h2>
        <p className="mt-3 max-w-reading font-sans text-sm leading-relaxed text-ink/75 dark:text-cream/75">
          Esta memória é da cidade. Se uma foto trouxe um rosto, um nome ou uma história, deixe a sua lembrança no Livro de Memórias — cada relato ajuda a identificar imagens e a guardar o Theatro para quem vem depois.
        </p>
        <Link
          href="/livro-de-memorias"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-curtain px-5 py-2.5 font-sans text-sm font-medium text-cream transition-colors hover:bg-curtain/90 dark:bg-gold dark:text-night dark:hover:bg-gold/90"
        >
          Deixar uma lembrança
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
    </section>
  );
}
