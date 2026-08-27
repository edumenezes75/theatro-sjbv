'use client';
import { useState } from 'react';
import type { Curiosidade } from '@/lib/data';
import SeloEvidencia from './SeloEvidencia';

const ORDEM = [
  'Fundação e inauguração',
  'Grandes nomes, grandes noites',
  'A casa de muitos usos',
  'O tempo do cinema',
  'Ameaça, restauro e mistérios',
];

const LEGENDA: Record<string, string> = {
  'Fundação e inauguração': 'De como uma cidade decidiu erguer o seu monumento — e a noite em que ele abriu as portas.',
  'Grandes nomes, grandes noites': 'Os artistas, os pianos e as plateias que passaram pelo palco.',
  'A casa de muitos usos': 'Rádio, rinque, redação de jornal: o edifício foi muito além do espetáculo.',
  'O tempo do cinema': 'As décadas em que o Theatro virou cinema — e os causos da plateia.',
  'Ameaça, restauro e mistérios': 'O fechamento, a luta para salvá-lo, a obra e o que ainda não se explica.',
};

function Card({ c }: { c: Curiosidade }) {
  return (
    <article className="card-lift flex flex-col rounded-sm border border-ink/10 p-6 hover:border-gold/50 dark:border-cream/10">
      <div className="flex items-center justify-between gap-2">
        <span className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Você sabia?</span>
        <SeloEvidencia status={c.type} />
      </div>
      <h3 className="mt-3 font-display text-lg font-medium leading-tight">{c.title}</h3>
      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-ink/80 dark:text-cream/80">{c.text}</p>
      
    </article>
  );
}

export default function Curiosidades({ itens, agrupar = true }: { itens: Curiosidade[]; agrupar?: boolean }) {
  // A página mostra três cartões por tema; o resto fica a um clique.
  // Cinquenta "Você sabia?" em fila dobravam o tamanho da página e ninguém
  // chegava ao fim — quem quer o baú inteiro pede.
  const POR_TEMA = 3;
  const [tudo, setTudo] = useState(false);
  const temTemas = agrupar && itens.some((c) => c.tema);
  if (!temTemas) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {itens.map((c) => <Card key={c.id} c={c} />)}
      </div>
    );
  }
  const temas = ORDEM.filter((t) => itens.some((c) => c.tema === t));
  const extras = Array.from(new Set(itens.map((c) => c.tema).filter((t): t is string => !!t && !ORDEM.includes(t))));
  const escondidas = tudo ? 0 : itens.filter((c) => c.tema).length - [...temas, ...extras].reduce((n, t) => n + Math.min(POR_TEMA, itens.filter((c) => c.tema === t).length), 0);
  return (
    <div className="space-y-14">
      {[...temas, ...extras].map((tema) => {
        const grupo = itens.filter((c) => c.tema === tema);
        // Todos os cartões vão para o HTML (buscadores e a busca do site
        // continuam enxergando os 50); os excedentes ficam ocultos no CSS até
        // o clique. `contents` preserva a grade.
        return (
          <section key={tema} aria-label={tema}>
            <div className="mb-6 border-l-2 border-gold/60 pl-4">
              <h3 className="font-display text-2xl leading-tight text-ink dark:text-cream">{tema}</h3>
              {LEGENDA[tema] && <p className="mt-1 max-w-reading font-sans text-sm italic text-ink/65 dark:text-cream/65">{LEGENDA[tema]}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {grupo.map((c, i) => (
                <div key={c.id} className={!tudo && i >= POR_TEMA ? 'hidden' : 'contents'}>
                  <Card c={c} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
      {escondidas > 0 && (
        <div className="border-t border-gold/25 pt-8 text-center">
          <button
            type="button"
            onClick={() => setTudo(true)}
            className="rounded-full border border-curtain/40 px-7 py-3 font-sans text-sm font-medium text-curtain transition-colors hover:bg-curtain hover:text-cream dark:border-gold/40 dark:text-gold dark:hover:bg-gold dark:hover:text-ink"
          >
            Ver mais {escondidas} curiosidades
          </button>
        </div>
      )}
    </div>
  );
}
