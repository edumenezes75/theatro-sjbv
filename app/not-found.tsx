import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-40 text-center">
      <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Página não encontrada</p>
      <h1 className="mt-4 font-display text-5xl">As cortinas estão fechadas aqui</h1>
      <p className="mt-4 font-sans text-ink/70 dark:text-cream/70">A página que você procura não existe ou foi movida.</p>
      <Link href="/" className="mt-8 rounded-full bg-curtain px-6 py-3 font-sans text-sm text-cream">Voltar ao início</Link>
    </div>
  );
}
