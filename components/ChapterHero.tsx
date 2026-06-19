import Image from 'next/image';
import SeloEvidencia from './SeloEvidencia';

export default function ChapterHero({ eyebrow, title, image, alt, status }: { eyebrow?: string; title: string; image?: string; alt?: string; status?: string }) {
  return (
    <header className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt={alt || ''} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-cream dark:to-night" />
        </div>
      )}
      <div className={`relative mx-auto max-w-6xl px-5 ${image ? 'pb-16 pt-44 text-cream' : 'pb-10 pt-40'}`}>
        {eyebrow && <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
        {status && <div className="mt-5"><SeloEvidencia status={status} /></div>}
      </div>
    </header>
  );
}
