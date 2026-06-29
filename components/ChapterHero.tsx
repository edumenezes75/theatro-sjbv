import SeloEvidencia, { temSelo } from './SeloEvidencia';
import ParallaxImage from './ParallaxImage';
import TypewriterTitle from './TypewriterTitle';

export default function ChapterHero({ eyebrow, title, image, alt, status, typewriter }: { eyebrow?: string; title: string; image?: string; alt?: string; status?: string; typewriter?: boolean }) {
  return (
    <header className="relative overflow-hidden">
      {image && (
        <>
          <ParallaxImage src={image} alt={alt} />
          {/* gradiente direcional: escuro embaixo p/ leitura, imagem viva em cima (fixo, não acompanha o parallax) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/5" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/55 to-transparent" />
        </>
      )}
      <div className={`relative mx-auto max-w-6xl px-5 ${image ? 'pb-14 pt-48 text-cream' : 'pb-10 pt-44'}`}>
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className={`h-6 w-px ${image ? 'bg-gold' : 'bg-curtain dark:bg-gold'}`} />
            <p className={`font-sans text-[0.7rem] font-medium uppercase tracking-eyebrow ${image ? 'text-gold' : 'text-curtain dark:text-gold'}`}>{eyebrow}</p>
          </div>
        )}
        {typewriter
          ? <TypewriterTitle text={title} className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] sm:text-7xl" />
          : <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] sm:text-7xl">{title}</h1>}
        {status && temSelo(status) && <div className="mt-6"><SeloEvidencia status={status} /></div>}
      </div>
    </header>
  );
}
