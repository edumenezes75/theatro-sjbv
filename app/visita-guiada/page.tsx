import type { Metadata } from 'next';
import Link from 'next/link';
import ChapterHero from '@/components/ChapterHero';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  alternates: { canonical: '/visita-guiada' },
  title: 'Visita guiada',
  description: 'Caminhos para conhecer o Theatro Municipal de São João da Boa Vista conforme o seu tempo e o seu interesse — em 3 minutos, em 10 minutos, pelo edifício, pela preservação, pela pesquisa ou para visitar.',
  openGraph: { title: 'Visita guiada — Theatro Municipal SJBV', description: 'Roteiros para conhecer o Theatro Municipal de São João da Boa Vista no seu tempo: em 3 ou 10 minutos, pelo edifício, pela preservação ou pela pesquisa.', type: 'website', images: ['https://www.theatromunicipalsjbv.com.br/fotos/hr-fachada-02.jpg'] },
};

const PATHS: { tag: string; title: string; steps: { label: string; href: string }[] }[] = [
  { tag: 'Tenho 3 minutos', title: 'Uma visão geral, rápida', steps: [
    { label: 'Resumo da história', href: '/historia' },
    { label: 'As datas principais', href: '/linha-do-tempo' },
    { label: 'Imagens essenciais', href: '/acervo' },
  ] },
  { tag: 'Tenho 10 minutos', title: 'A história, com mais fôlego', steps: [
    { label: 'A trajetória completa', href: '/historia' },
    { label: 'A restauração', href: '/restauracao' },
    { label: 'O acervo selecionado', href: '/acervo' },
  ] },
  { tag: 'Quero entender o prédio', title: 'Arquitetura e espaço', steps: [
    { label: 'Arquitetura e sala em ferradura', href: '/arquitetura' },
    { label: 'Ornamentos e palco no acervo', href: '/acervo' },
    { label: 'Antes e depois do restauro', href: '/restauracao' },
  ] },
  { tag: 'Quero entender a preservação', title: 'A luta que salvou o Theatro', steps: [
    { label: 'A restauração e a mobilização', href: '/restauracao' },
    { label: 'As pessoas envolvidas', href: '/pessoas' },
    { label: 'O documentário Música & Drama', href: '/documentario' },
    { label: 'Fontes e critérios', href: '/fontes' },
  ] },
  { tag: 'Quero pesquisar', title: 'Para quem estuda o Theatro', steps: [
    { label: 'Fontes e critérios de pesquisa', href: '/fontes' },
    { label: 'O acervo de imagens', href: '/acervo' },
    { label: 'Pessoas da história', href: '/pessoas' },
    { label: 'Linha do tempo datada', href: '/linha-do-tempo' },
  ] },
  { tag: 'Quero visitar', title: 'Informações práticas', steps: [
    { label: 'Como chegar e horários', href: '/visite' },
    { label: 'Programação', href: '/programacao' },
  ] },
];

export default function VisitaGuiadaPage() {
  return (
    <article>
      <ChapterHero
        eyebrow="Por onde começar"
        title="Visita guiada"
        image="/fotos/hr-sala-36.jpg"
        alt="A sala em ferradura do Theatro Municipal de São João da Boa Vista."
      />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="mb-12 max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          Não há uma ordem certa para conhecer o Theatro. Escolha um caminho conforme o seu tempo e o seu interesse — e siga os links na sequência sugerida.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {PATHS.map((p, i) => (
            <Reveal key={p.tag} delay={i * 70}>
              <section className="card-lift flex h-full flex-col rounded-sm border border-ink/10 p-7 hover:border-gold/50 dark:border-cream/10">
                <span className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{p.tag}</span>
                <h2 className="mt-2 font-display text-2xl leading-tight">{p.title}</h2>
                <ol className="mt-5 space-y-2.5">
                  {p.steps.map((s, j) => (
                    <li key={s.href} className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-curtain dark:text-gold">{String(j + 1).padStart(2, '0')}</span>
                      <Link href={s.href} className="font-sans text-[0.97rem] text-ink/80 underline decoration-gold/40 underline-offset-4 hover:text-curtain hover:decoration-curtain dark:text-cream/80 dark:hover:text-gold">
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
