import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageBySlug } from '@/lib/content';
import ChapterHero from '@/components/ChapterHero';
import FontesDaPagina from '@/components/FontesDaPagina';
import LiteYouTube from '@/components/LiteYouTube';
import TranscricaoFilme from '@/components/TranscricaoFilme';
import Comentarios from '@/components/Comentarios';
import transcricao from '@/data/transcricao.json';
import { pessoasNoDocumentario, pessoaSlug } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/documentario' },
  title: 'Documentário Música & Drama',
  description: 'Assista ao documentário Música & Drama e explore personagens, imagens e episódios da história do Theatro Municipal de São João da Boa Vista.',
  openGraph: { title: 'Documentário Música & Drama — Theatro Municipal SJBV', description: 'Assista ao documentário Música & Drama sobre o Theatro Municipal de São João da Boa Vista.', type: 'website', images: ['https://www.theatromunicipalsjbv.com.br/fotos/hr-fachada-02.jpg'] },
};

const CAPS = [
  'A cidade antes do Theatro',
  'Companhia, projeto e construção',
  'A primeira noite e as décadas de espetáculos',
  'O Cine Theatro e as memórias de público',
  'Declínio e ameaça de demolição',
  'Mobilização, compra e tombamento',
  'Restauro e reabertura',
  'O Theatro vivo',
];
const ACESS_OK = ['Legendas em português (YouTube)', 'Transcrição integral e navegável', 'Busca por palavra, nome ou tema', 'Salto para o minuto exato no filme', 'Controle de velocidade (YouTube)', 'Navegação por teclado'];
const ACESS_PREP = ['Audiodescrição das imagens'];

export default function DocumentarioPage() {
  const page = getPageBySlug('/documentario');
  const SITE = 'https://www.theatromunicipalsjbv.com.br';
  const YT = 'e2stgoHtlAQ';
  const citados = pessoasNoDocumentario();
  const TEMA: Record<string, string> = { '/historia': 'História', '/arquitetura': 'Arquitetura', '/restauracao': 'Restauro', '/linha-do-tempo': 'Linha do tempo', '/memorias': 'Memórias', '/pessoas': 'Pessoas' };
  const momentos: [number, string, string][] = [
    [34, 'A primeira ida ao teatro', '/memorias'],
    [195, 'A arte e a cultura como genética sanjoanense', '/historia'],
    [499, 'O Teatro Apolo e a ideia de uma casa de espetáculos', '/historia'],
    [697, 'A Companhia Teatral Sanjoanense e a pedra fundamental (1913)', '/historia'],
    [741, 'A inauguração de 31 de outubro de 1914', '/historia'],
    [799, 'A fachada eclética e os medalhões dos compositores', '/arquitetura'],
    [955, 'A estrutura metálica vinda da Bélgica', '/arquitetura'],
    [1067, 'A acústica e a referência ao Scala', '/arquitetura'],
    [1205, 'As grandes companhias e a Branca de Neve', '/linha-do-tempo'],
    [1547, 'Villa-Lobos e a Sociedade de Cultura Artística', '/linha-do-tempo'],
    [2046, 'Roberto Carlos e a Jovem Guarda', '/linha-do-tempo'],
    [2298, 'Decadência e ameaça de demolição', '/restauracao'],
    [2636, 'A greve de fome contra a venda do Theatro', '/restauracao'],
    [2876, 'O abaixo-assinado e o tombamento', '/restauracao'],
    [3502, 'A escavadeira no subsolo e o restauro estrutural', '/restauracao'],
    [4324, 'O restauro do medalhão de Carlos Gomes', '/arquitetura'],
    [4609, 'A reabertura em 2002, na Semana Guiomar Novaes', '/restauracao'],
    [4913, 'A criação da AMITE e a gestão do Theatro', '/pessoas'],
  ];
  const ldVideo = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Música & Drama — A História do Theatro Municipal de São João da Boa Vista',
    description: 'Documentário de Eduardo Menezes sobre a história do Theatro Municipal de São João da Boa Vista: a construção em 1913–1914, as décadas de espetáculos e cinema, a ameaça de demolição, a mobilização popular, o tombamento, o restauro e a vida cultural do edifício.',
    inLanguage: 'pt-BR',
    thumbnailUrl: [`https://img.youtube.com/vi/${YT}/maxresdefault.jpg`],
    duration: 'PT1H45M',
    embedUrl: `https://www.youtube.com/embed/${YT}`,
    contentUrl: `https://www.youtube.com/watch?v=${YT}`,
    director: { '@type': 'Person', name: 'Eduardo Menezes' },
    about: { '@type': 'PerformingArtsTheater', name: 'Theatro Municipal de São João da Boa Vista', '@id': SITE + '/#theatro' },
    mainEntityOfPage: SITE + '/documentario',
    hasPart: momentos.map(([sec, name]) => ({
      '@type': 'Clip',
      name,
      startOffset: sec,
      url: `https://www.youtube.com/watch?v=${YT}&t=${sec}s`,
    })),
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldVideo) }} />
      <ChapterHero eyebrow="A história do Theatro em filme" title="Música & Drama" />
      <div className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
        <LiteYouTube id="e2stgoHtlAQ" title="Música & Drama — A História do Theatro Municipal de São João da Boa Vista" />
        <div className="mt-4 max-w-reading space-y-4 font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          <p>Dirigido por Eduardo Menezes e lançado em 2015, <em>Música &amp; Drama</em> reconstrói um século de vida do Theatro pela voz de quem o frequentou, defendeu e restaurou. Em pouco mais de cem minutos, costura imagens, documentos e dezenas de depoimentos — das memórias de infância no cinema à batalha contra a demolição, do projeto de 1913 à reabertura de 2002.</p>
          <p>Mais do que a cronologia de um edifício, é o retrato da relação entre uma cidade e o lugar onde ela se reconheceu. A transcrição completa, navegável abaixo, transforma esses relatos em fonte de consulta.</p>
        </div>
        <a href="https://www.youtube.com/watch?v=e2stgoHtlAQ" target="_blank" rel="noopener" className="mt-3 inline-block border-b border-curtain pb-0.5 font-sans text-sm text-curtain dark:border-gold dark:text-gold">Abrir no YouTube ↗</a>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Ficha técnica</h2>
          <p className="mt-2 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">Lançado em 2015, com cerca de 108 minutos.</p>
          <dl className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {[
              ['Direção e edição', 'Eduardo Menezes'],
              ['Roteiro', 'Neusa Menezes'],
              ['Fotografia', 'Marcelo Gonçalves'],
              ['Produção', 'Adriana Torati'],
              ['Áudio', 'Diogo Felipe'],
              ['Assistência de câmera', 'Filipe Della Torre'],
              ['Imagens adicionais', 'Leonardo Nogueira e Leonardo Beraldo'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-gold/15 py-2">
                <dt className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{k}</dt>
                <dd className="text-right font-sans text-[0.95rem] text-ink/85 dark:text-cream/85">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">O filme como fonte histórica</h2>
          <div className="mt-5 max-w-reading space-y-4 font-read text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">
            <p>O filme abre na memória, não na data. Um sanjoanense relembra a primeira ida ao teatro, ainda criança, de terninho azul-marinho, quando um ator entrou pela plateia disfarçado de mendigo e subiu ao palco — <em>As Mãos de Eurídice</em>, com Rodolfo Mayer. A partir daí, dezenas de vozes reconstroem o ritual do antigo Cine Theatro: o footing antes da sessão, os namoros nas últimas fileiras, o “galinheiro” mais barato no alto, a fileira que ninguém ocupava porque do camarote cuspiam, e os meninos que pulavam a parede do banheiro para entrar sem pagar.</p>
            <p>Outras lembranças desenham a vida ao redor do palco: o Bar Theatro de seu Arnaldo Posse, com a coalhada e o Bauru famosos; o cão Amigo, que dormia à porta; a Sociedade de Cultura Artística e a Sociedade Cultural de Debates, no segundo andar, que receberam nomes como Villa-Lobos e foram, segundo um depoente, o núcleo da futura Academia de Letras local; a rádio e a biblioteca que dividiram o mesmo pavimento; e os recitais ligados a Guiomar Novaes, que elogiava a acústica da casa.</p>
            <p>O documentário guarda também o testemunho direto da quase-perda. Moradores descrevem o edifício “pronto para ser demolido”, as ameaças de virar supermercado ou estacionamento e a campanha que o salvou: as passeatas em torno da Catedral, as duas mil assinaturas reunidas em quinze dias e a ameaça de greve de fome no alto da fachada. O prefeito Sidney Beraldo, o engenheiro João Batista Merlin e a equipe relatam a compra em duas etapas, o tombamento de 1987 e a longa obra.</p>
            <p>São os bastidores do restauro que o filme registra com mais intimidade: a viagem ao Rio para “entender de teatro”, a disputa sobre a escavação do subsolo e a revelação do medalhão de Carlos Gomes — escondido sob camadas de tinta e trazido de volta à luz pelo restaurador César Roberto Olandim, sobre um andaime montado da noite para o dia. O reencontro de 2002, com filas que davam a volta no quarteirão e um telão na praça, fecha o ciclo. Ao reunir essas vozes, <em>Música &amp; Drama</em> funciona como uma fonte histórica viva: muitas dessas memórias não existem em nenhum documento escrito.</p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Estrutura de capítulos</h2>
          <p className="mt-2 font-sans text-sm text-ink/70 dark:text-cream/70">Oito capítulos percorrem a trajetória do Theatro, do fim do século XIX ao patrimônio vivo de hoje.</p>
          <ol className="mt-6 divide-y divide-gold/20 border-y border-gold/20">
            {CAPS.map((c, i) => (
              <li key={c} className="flex items-baseline gap-4 py-3.5">
                <span className="font-display text-lg font-medium text-curtain dark:text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 font-sans text-[0.97rem]">{c}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Momentos do filme</h2>
          <p className="mt-2 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">Pontos-chave do documentário — clique para abrir cada momento no YouTube.</p>
          <ol className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {momentos.map(([sec, name, tema]) => (
              <li key={sec} className="flex items-baseline gap-3 border-b border-gold/15 py-2.5">
                <a href={`https://www.youtube.com/watch?v=${YT}&t=${sec}s`} target="_blank" rel="noopener" title="Abrir o filme neste momento" className="shrink-0 font-display text-sm tabular-nums text-curtain hover:opacity-70 dark:text-gold">
                  {`${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`}
                </a>
                <a href={`https://www.youtube.com/watch?v=${YT}&t=${sec}s`} target="_blank" rel="noopener" className="font-sans text-[0.95rem] text-ink/85 hover:text-curtain dark:text-cream/85 dark:hover:text-gold">{name}</a>
                <Link href={tema} className="ml-auto shrink-0 self-center rounded-full border border-gold/30 px-2.5 py-0.5 font-sans text-[0.68rem] uppercase tracking-eyebrow text-ink/65 hover:border-curtain hover:text-curtain dark:text-cream/75 dark:hover:border-gold dark:hover:text-gold" title={`Ir para ${TEMA[tema]}`}>{TEMA[tema]}</Link>
              </li>
            ))}
          </ol>
        </section>

        {citados.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-3xl">Quem aparece no documentário</h2>
            <p className="mt-2 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">Pessoas citadas nos depoimentos — abra a página de cada uma ou pule direto para o minuto em que são mencionadas.</p>
            <ul className="mt-6 divide-y divide-gold/15 border-y border-gold/15">
              {citados.map(({ pessoa, t, s: sec }) => (
                <li key={pessoa.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3">
                  <Link href={`/pessoas/${pessoaSlug(pessoa)}`} className="font-display text-lg text-ink/90 hover:text-curtain dark:text-cream/90 dark:hover:text-gold">{pessoa.name}</Link>
                  <span className="font-sans text-[0.82rem] text-ink/55 dark:text-cream/55">{pessoa.role}</span>
                  <a href={`https://www.youtube.com/watch?v=${YT}&t=${sec}s`} target="_blank" rel="noopener" className="ml-auto shrink-0 font-display text-sm tabular-nums text-curtain hover:opacity-70 dark:text-gold" title="Abrir o filme neste momento">{t} ↗</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16">
          <h2 className="font-display text-3xl">Transcrição navegável</h2>
          <p className="mt-3 max-w-reading font-sans text-[0.97rem] leading-relaxed text-ink/80 dark:text-cream/80">
            Transcrição do documentário gerada a partir das legendas e revisada nos nomes próprios. Busque por palavra, nome ou tema — e clique no minuto para abrir o filme exatamente naquele ponto.
          </p>
          <div className="mt-7">
            <TranscricaoFilme segs={transcricao} youtubeId="e2stgoHtlAQ" />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl">Acessibilidade</h2>
          <p className="mt-2 max-w-reading font-sans text-sm text-ink/70 dark:text-cream/70">A transcrição navegável já está disponível acima; legendas e controles de reprodução vêm do player do YouTube.</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {ACESS_OK.map((a) => (
              <li key={a} className="flex items-center gap-2.5 font-sans text-[0.95rem] text-ink/80 dark:text-cream/80">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden /> {a}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-[0.82rem] uppercase tracking-eyebrow text-ink/55 dark:text-cream/55">Em preparação</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {ACESS_PREP.map((a) => (
              <li key={a} className="flex items-center gap-2.5 font-sans text-[0.95rem] text-ink/55 dark:text-cream/55">
                <span className="h-1.5 w-1.5 rotate-45 border border-ink/40 dark:border-cream/40" aria-hidden /> {a}
              </li>
            ))}
          </ul>
        </section>

        <Comentarios tipo="filme" titulo="Comentários sobre o filme" intro="O que este documentário despertou em você? Deixe sua impressão, corrija um detalhe ou complete uma história." placeholder="Escreva um comentário sobre o documentário…" vazio="Ainda não há comentários. Seja o primeiro a comentar o filme." />

        <FontesDaPagina fontes={page?.fontes ?? null} />
      </div>
    </article>
  );
}
