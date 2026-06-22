import Image from 'next/image';

type Livro = { title: string; sub?: string; author: string; year: string; note: string; cover?: string };

// Para usar a capa real: salve a imagem em /public/livros/ e preencha `cover` (ex.: '/livros/100-anos.jpg').
const LIVROS: Livro[] = [
  { title: 'Theatro Municipal, 100 anos', sub: '1914–2014', author: 'Neusa Maria Soares de Menezes (ed.)', year: '2014',
    note: 'O livro do centenário — 306 páginas reunindo narrativa, cronologia, fotografias, programas e depoimentos. É a base documental deste site.' },
  { title: '90 anos — Teatro Municipal', author: 'Sidney Beraldo', year: '2004',
    note: 'Memória da aquisição pública, da preservação e da recuperação do edifício.' },
  { title: 'Theatro Municipal e a Trajetória das Artes em São João da Boa Vista', author: 'Jonathas Mattos Jr.', year: '2000',
    note: 'História cultural e artística local, citada extensamente na pesquisa acadêmica.' },
  { title: 'Arte e Cultura em São João da Boa Vista', author: 'Maria Célia de Campos Marcondes', year: '2011',
    note: 'Contextualização ampla da vida artística e cultural sanjoanense.' },
  { title: 'Uma memória e um espaço restaurado em dois tempos', sub: 'dissertação de mestrado · USP', author: 'Luis Pedro Dragão Jeronimo', year: '2020',
    note: 'Em dois volumes, é o levantamento acadêmico mais extenso sobre o Theatro — base para revisar datas e números.' },
];

export default function Livros() {
  return (
    <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
      {LIVROS.map((l) => (
        <article key={l.title} className="flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-[0_10px_28px_rgba(20,17,14,0.30)]">
            {l.cover ? (
              <Image src={l.cover} alt={`Capa de ${l.title}`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover" />
            ) : (
              <div className="flex h-full flex-col justify-between bg-gradient-to-br from-[#6E1F17] to-[#43120D] p-5 text-cream">
                <span className="h-0.5 w-10 bg-gold" aria-hidden />
                <div>
                  <h3 className="font-display text-[1.35rem] leading-[1.12]">{l.title}</h3>
                  {l.sub && <p className="mt-2 font-sans text-[0.62rem] uppercase tracking-eyebrow text-gold/90">{l.sub}</p>}
                </div>
                <p className="font-sans text-[0.72rem] text-cream/75">{l.author} · {l.year}</p>
              </div>
            )}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 to-transparent" aria-hidden />
          </div>
          <p className="mt-3 font-sans text-sm font-medium text-ink/85 dark:text-cream/85">{l.author}</p>
          <p className="font-sans text-xs text-curtain dark:text-gold">{l.year}</p>
          <p className="mt-1.5 max-w-reading font-sans text-[0.85rem] leading-relaxed text-ink/70 dark:text-cream/70">{l.note}</p>
        </article>
      ))}
    </div>
  );
}
