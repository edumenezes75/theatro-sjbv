import Image from 'next/image';
import Link from 'next/link';

// Banner da série "As Histórias do Theatro" na home, com a arte do evento
// (letreiro, fachada em traço e padrão sobre o vinho). Os canais ficam
// numa lista só: quando YouTube e Spotify existirem, basta pôr o href.

const CANAIS: { nome: string; href?: string }[] = [
  { nome: 'Instagram', href: 'https://www.instagram.com/ashistoriasdotheatro/' },
  { nome: 'TikTok', href: 'https://www.tiktok.com/@ashistoriasdotheatro' },
  { nome: 'YouTube' },
  { nome: 'Spotify' },
];

// Depois da noite de estreia, o convite vira registro.
const FIM_DA_ESTREIA = new Date('2026-10-02T23:59:00-03:00');

export default function HistoriasDoTheatro() {
  const antes = Date.now() < FIM_DA_ESTREIA.getTime();

  return (
    <section aria-labelledby="historias-titulo" className="relative isolate overflow-hidden bg-curtain text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{ background: 'url(/evento/pattern.png) 50% 0 / clamp(260px, 36vw, 480px) repeat' }}
      />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
        <div className="border border-gold/45 px-6 py-10 sm:px-10 sm:py-14 md:px-14">
          <div className="grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-14">
            <div>
              <h2 id="historias-titulo" className="historias-lockup uppercase leading-[1.06]">
                <span className="block whitespace-nowrap text-gold">As Histórias</span>
                <span className="block whitespace-nowrap text-white">do Theatro</span>
              </h2>
              <p className="historias-sub mt-3 uppercase tracking-[0.04em] text-white">Um palco e suas memórias</p>

              <p className="mt-7 max-w-md font-read text-lg leading-relaxed text-cream/85">
                Quem pesquisou, viveu e salvou o Theatro conta como foi. A primeira noite é no palco. Depois, as histórias seguem em vídeo e em áudio.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  href="/evento"
                  className="inline-block bg-gold px-6 py-3.5 text-center font-sans text-sm font-bold uppercase tracking-[0.09em] text-curtain transition-colors hover:bg-white"
                >
                  {antes ? 'A noite de 2 de outubro' : 'Como foi a estreia'}
                </Link>
                {antes && (
                  <span className="font-sans text-sm text-cream/75">Sexta, 19h30 · Entrada franca</span>
                )}
              </div>

              <div className="mt-10 border-t border-gold/30 pt-5">
                <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">Acompanhe</p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
                  {CANAIS.map((c) => (
                    <li key={c.nome}>
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cream underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold hover:decoration-current"
                        >
                          {c.nome} ↗
                        </a>
                      ) : (
                        <span className="text-cream/50">
                          {c.nome} <span className="text-xs">· em breve</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-sans text-sm text-cream/60">@ashistoriasdotheatro</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[26rem] md:max-w-none">
              <Image
                src="/evento/fachada.png"
                alt="A fachada do Theatro Municipal em traço branco, a arte de As Histórias do Theatro."
                width={1498}
                height={947}
                className="h-auto w-full"
                priority={false}
                loading="eager"
                sizes="(max-width:768px) 90vw, 42vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
