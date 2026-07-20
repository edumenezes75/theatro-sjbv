'use client';
import { useState } from 'react';

type Setor = { id: string; nome: string; desc: string };
const SETORES: Setor[] = [
  { id: 'palco', nome: 'Palco', desc: 'O palco elevado e a caixa cênica, onde acontecem os espetáculos.' },
  { id: 'fosso', nome: 'Fosso da orquestra', desc: 'O fosso da orquestra, à frente e abaixo do palco, recuperado no restauro.' },
  { id: 'plateia', nome: 'Plateia', desc: 'A plateia, no nível principal, em frente ao palco.' },
  { id: 'frisas', nome: 'Frisas', desc: 'As frisas, no primeiro nível da curva, mais próximas do palco.' },
  { id: 'camarotes', nome: 'Camarotes', desc: 'Os camarotes, no segundo nível da ferradura.' },
  { id: 'galeria', nome: 'Galeria', desc: 'A galeria, no nível mais alto — historicamente o setor mais popular.' },
];

export default function FerraduraDiagrama() {
  const [act, setAct] = useState('plateia');
  const cur = SETORES.find((s) => s.id === act)!;
  const fill = (id: string) => (act === id ? 'rgba(169,134,63,0.55)' : 'rgba(169,134,63,0.16)');
  const props = (id: string) => ({
    onMouseEnter: () => setAct(id), onFocus: () => setAct(id), onClick: () => setAct(id),
    tabIndex: 0, role: 'button', 'aria-label': SETORES.find((s) => s.id === id)!.nome,
    style: { fill: fill(id), cursor: 'pointer', transition: 'fill .2s' }, stroke: 'currentColor', strokeWidth: 1.2,
  });
  return (
    <section className="mt-16 border-t border-gold/25 pt-12">
      <h2 className="font-display text-3xl">A sala em corte</h2>
      <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
        Passe o mouse (ou toque) nos setores para entender a curva em ferradura — do palco e do fosso à plateia, frisas, camarotes e galeria.
      </p>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <svg viewBox="0 0 440 300" className="w-full text-ink dark:text-cream" role="img" aria-label="Corte esquemático da sala em ferradura">
          {/* piso e teto */}
          <path d="M20 250 H420" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d="M40 40 H400" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          {/* palco */}
          <rect x="40" y="120" width="90" height="130" {...props('palco')} />
          {/* fosso */}
          <path d="M130 250 V210 H165 V250 Z" {...props('fosso')} />
          {/* plateia (piso inclinado) */}
          <path d="M165 250 L320 250 L320 198 Z" {...props('plateia')} />
          {/* frisas */}
          <rect x="320" y="206" width="78" height="20" rx="2" {...props('frisas')} />
          {/* camarotes */}
          <rect x="320" y="170" width="84" height="22" rx="2" {...props('camarotes')} />
          {/* galeria */}
          <rect x="320" y="132" width="90" height="24" rx="2" {...props('galeria')} />
          {/* rótulos */}
          <g className="font-sans" fill="currentColor" fontSize="11" opacity="0.85">
            <text x="85" y="115" textAnchor="middle">Palco</text>
            <text x="240" y="245" textAnchor="middle">Plateia</text>
            <text x="362" y="220" textAnchor="middle">Frisas</text>
            <text x="362" y="184" textAnchor="middle">Camarotes</text>
            <text x="365" y="148" textAnchor="middle">Galeria</text>
          </g>
        </svg>
        <div className="rounded-sm border border-gold/25 bg-cream p-6 dark:bg-nightsoft">
          <p className="font-sans text-[0.68rem] uppercase tracking-eyebrow text-curtain dark:text-gold">{cur.nome}</p>
          <p className="mt-2 font-read text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">{cur.desc}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {SETORES.map((s) => (
              <button key={s.id} onClick={() => setAct(s.id)} className={`rounded-full border px-2.5 py-1 font-sans text-[0.7rem] transition-colors ${act === s.id ? 'border-curtain bg-curtain text-cream dark:border-gold dark:bg-gold dark:text-ink' : 'border-ink/15 text-ink/70 hover:border-curtain dark:border-cream/15 dark:text-cream/70'}`}>{s.nome}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
