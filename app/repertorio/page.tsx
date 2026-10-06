import ContinueNav from '@/components/ContinueNav';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import Repertorio from '@/components/Repertorio';
import rep from '@/data/repertorio.json';
import GaleriaReal from '@/components/GaleriaReal';
import { fotosList } from '@/lib/data';

// Em cena: fotos de espetáculos da casa reaberta, com as legendas do livro do centenário.
const EM_CENA = ['h321', 'h343', 'h344', 'h341', 'h342', 'h336', 'h335', 'h328', 'h324', 'h325', 'h326', 'h329', 'h327', 'h330', 'h331', 'h334', 'h347', 'h332', 'h346', 'h345', 'h340', 'h333', 'h337', 'h338', 'h339'];

export const metadata: Metadata = {
  alternates: { canonical: '/repertorio' },
  title: 'O que passou pelo palco',
  description:
    'A programação do Theatro Municipal de São João da Boa Vista entre a reabertura, em 2002, e 2013: teatro, música, dança, cinema e os projetos da casa, ano a ano.',
  openGraph: {
    title: 'O que passou pelo palco — Theatro Municipal de São João da Boa Vista',
    description: 'Doze anos de programação, título a título: de 2002 a 2013.',
    type: 'website',
    images: ['https://www.theatromunicipalsjbv.com.br/fotos/hr4-sala-05.jpg'],
  },
};

const PROJETOS: { nome: string; texto: string }[] = [
  { nome: 'Semana Guiomar Novaes', texto: 'Anual, em homenagem à pianista sanjoanense. Reúne músicos da cidade e artistas de reconhecimento nacional. Foi ela que reabriu a casa restaurada, em 2002, na sua 25ª edição.' },
  { nome: 'Cineclube Beloca', texto: 'Criado em 2007, exibe de graça os filmes que não chegariam ao circuito comercial, seguidos de debate. Ocupa a sala do segundo andar.' },
  { nome: 'Teatro de Quinta', texto: 'Apresentações nas noites de quinta-feira, abertas à cidade.' },
  { nome: 'Concertos Matinais', texto: 'Música erudita nas manhãs de domingo, para aproximar o repertório de quem nunca entrou numa sala de concerto.' },
  { nome: 'Semana do Theatro', texto: 'Em novembro, uma semana gratuita para celebrar o aniversário da casa. A média era de 600 pessoas por noite.' },
  { nome: 'Ensaio Aberto', texto: 'Duas vezes por semana, grupos amadores da cidade podem ensaiar no próprio palco.' },
  { nome: 'Monofest', texto: 'Desde 2007, festival de monólogos de até quinze minutos, com texto próprio. Iniciativa de Renata Cabrera e Marli Marques.' },
  { nome: 'Festival de Teatro Amador “Atílio Gallo Lopes”', texto: 'Anual e regional, acompanha o amadurecimento dos grupos jovens ano após ano.' },
  { nome: 'Festival Regional de Teatro Amador “Leilah Assumpção”', texto: 'Iniciativa do Departamento de Cultura da cidade, reúne sobretudo grupos das escolas de ensino médio.' },
];

export default function RepertorioPage() {
  const page = getPageBySlug('/repertorio');
  const dados = rep as { itens: unknown[] };
  const emCena = EM_CENA.map((id) => fotosList.find((f) => f.id === id)).filter(Boolean) as typeof fotosList;
  return (
    <article>
      <ChapterHero
        eyebrow="A programação de 2002 a 2013, ano a ano"
        title="O que passou pelo palco"
        image="/fotos/hr4-sala-05.jpg"
        alt="A sala em ferradura do Theatro Municipal, vista do palco."
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          A casa reabriu em 2002. Do que veio depois, a memória guarda os nomes grandes e esquece a maior
          parte — e a maior parte é justamente o que mantém um teatro vivo: o coral da escola, o festival de
          teatro amador, a matinê de domingo, o filme que o circuito comercial não exibiria.
        </p>
        <p className="mt-4 max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          Esta é a relação que a AMITE levantou para o centenário: <strong>{dados.itens.length} títulos</strong> em
          doze anos. Está aqui inteira, como foi registrada — e não como uma seleção do que hoje parece
          importante.
        </p>
        <p className="mt-4 max-w-reading font-sans text-sm italic leading-relaxed text-ink/65 dark:text-cream/65">
          A relação termina em 2013, às vésperas do centenário. Para a história da casa, veja a{' '}
          <Link href="/linha-do-tempo" className="text-curtain underline decoration-gold/45 underline-offset-2 dark:text-gold">
            linha do tempo
          </Link>
          .
        </p>

        {emCena.length > 0 && (
          <section className="mt-14 border-t border-gold/25 pt-12">
            <div className="flex items-center gap-3">
              <span className="h-6 w-px bg-curtain dark:bg-gold" />
              <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Em cena</p>
            </div>
            <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Alguns dos que passaram pelo palco</h2>
            <p className="mb-8 mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              Fotografias de espetáculos entre 2003 e 2014, com as legendas do livro do centenário.
            </p>
            <GaleriaReal fotos={emCena} withFilter={false} legendas />
          </section>
        )}

        <div className="mt-12">
          <Repertorio />
        </div>

        <section className="mt-20 border-t border-gold/25 pt-12">
          <div className="flex items-center gap-3">
            <span className="h-6 w-px bg-curtain dark:bg-gold" />
            <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">O que se repete todo ano</p>
          </div>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">Os projetos que mantêm a casa viva</h2>
          <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
            Boa parte do que está na lista acima não é evento avulso: pertence a um projeto que se repete.
            São eles que explicam como um teatro do interior chega a cento e cinquenta eventos num ano.
          </p>
          <dl className="mt-8 max-w-3xl">
            {PROJETOS.map((p) => (
              <div key={p.nome} className="border-t border-ink/10 py-4 dark:border-cream/10">
                <dt className="font-display text-lg leading-snug">{p.nome}</dt>
                <dd className="mt-1 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{p.texto}</dd>
              </div>
            ))}
          </dl>
        </section>

        <FontesDaPagina fontes={page?.fontes ?? null} />
        <ContinueNav href="/repertorio" />
      </div>
    </article>
  );
}
