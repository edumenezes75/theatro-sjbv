import Image from 'next/image';
import SeloEvidencia, { temSelo } from './SeloEvidencia';

export default function ChapterHero({ eyebrow, title, image, alt, status }: { eyebrow?: string; title: string; image?: string; alt?: string; status?: string }) {
  return (
    <header className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0 grain">
          <Image src={image} alt={alt || ''} fill priority className="object-cover" sizes="100vw" />
          {/* gradiente direcional: escuro embaixo p/ leitura, imagem viva em cima */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/55 to-transparent" />
        </div>
      )}
      <div className={`relative mx-auto max-w-6xl px-5 ${image ? 'pb-14 pt-48 text-cream' : 'pb-10 pt-44'}`}>
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className={`h-6 w-px ${image ? 'bg-gold' : 'bg-curtain dark:bg-gold'}`} />
            <p className={`font-sans text-[0.7rem] font-medium uppercase tracking-eyebrow ${image ? 'text-gold' : 'text-curtain dark:text-gold'}`}>{eyebrow}</p>
          </div>
        )}
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] sm:text-7xl">{title}</h1>
        {status && temSelo(status) && <div className="mt-6"><SeloEvidencia status={status} /></div>}
      </div>
    </header>
  );
}
