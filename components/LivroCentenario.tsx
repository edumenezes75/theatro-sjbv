import Image from 'next/image';
import Reveal from '@/components/Reveal';

// O livro do centenário para download — "Theatro Municipal, 100 anos" (2014).
// O volume é montado em CSS 3D (capa, lombada, corte das páginas); a capa vem
// de /livro/capa.jpg — trocar esse arquivo troca a capa do mockup.
// O PDF em /livro/ é o miolo completo, já no formato final da página.

const PDF = '/livro/theatro-municipal-100-anos.pdf';

export default function LivroCentenario() {
  return (
    <section aria-labelledby="livro-centenario-titulo" className="livro-palco relative isolate overflow-hidden border-t border-gold/20 bg-night text-cream">
      <div aria-hidden className="livro-luz pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 sm:py-28 md:grid-cols-[1fr_1.1fr] md:gap-10 lg:py-32">
        {/* o livro */}
        <Reveal>
          <div className="livro-cena">
            <div className="livro3d" role="img" aria-label="O livro Theatro Municipal, 100 anos, com o selo do centenário (1914–2014) na capa.">
              <div className="livro-face livro-contracapa" />
              <div className="livro-face livro-paginas-topo" />
              <div className="livro-face livro-paginas-lado" />
              <div className="livro-face livro-lombada">
                <span>Theatro Municipal</span>
                <span className="livro-lombada-ano">100 anos</span>
              </div>
              <div className="livro-face livro-capa">
                <Image src="/livro/capa.jpg" alt="" fill sizes="(max-width:768px) 60vw, 320px" className="object-cover" />
              </div>
            </div>
            <div aria-hidden className="livro-sombra" />
          </div>
        </Reveal>

        {/* o convite */}
        <Reveal delay={120}>
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">O livro do centenário</p>
          </div>
          <h2 id="livro-centenario-titulo" className="mt-5 font-display font-normal text-[clamp(2.4rem,7vw,4.4rem)] leading-[1.02]">
            Theatro Municipal,<br />
            <em className="italic text-gold">100 anos</em>
          </h2>
          <p className="mt-7 max-w-reading font-read text-lg leading-relaxed text-cream/85">
            Um século de palco em 302 páginas: a construção, o Cine Theatro, a luta pela restauração, os programas, as crônicas e a cronologia da casa. Neusa Menezes oferece aqui a edição completa de 2014, para baixar, ler e guardar.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={PDF}
              download="Theatro Municipal, 100 anos.pdf"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-7 py-3.5 font-sans text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform group-hover:translate-y-0.5">
                <path d="M8 2v8.5M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" />
              </svg>
              Baixar o livro
            </a>
            <a href={PDF} target="_blank" rel="noopener" className="self-start border-b border-gold pb-0.5 font-sans text-sm text-gold sm:self-auto">
              Ler no navegador →
            </a>
          </div>
          <p className="mt-5 font-sans text-xs uppercase tracking-eyebrow text-cream/65">PDF · 302 páginas · 22 MB · gratuito</p>
        </Reveal>
      </div>
    </section>
  );
}
