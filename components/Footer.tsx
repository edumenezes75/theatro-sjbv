import Link from 'next/link';
import AnoAtual from './AnoAtual';
import Mark from './Mark';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/25 bg-ink text-cream dark:bg-black">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <Mark className="text-gold" size={36} />
        <p className="mt-5 max-w-2xl font-display text-2xl italic leading-snug text-cream">
          Um edifício construído pela cidade, transformado por seus usos, salvo pela mobilização popular e mantido vivo pela cultura.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-sans text-[0.72rem] uppercase tracking-eyebrow text-gold">Visite</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Praça da Catedral, 22 — Centro<br />São João da Boa Vista — SP
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              WhatsApp (19) 99719-5719<br />(19) 3636-4872 · (19) 3636-4953
            </p>
          </div>
          <div>
            <h3 className="font-sans text-[0.72rem] uppercase tracking-eyebrow text-gold">Navegação</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[['/o-theatro','O Theatro'],['/historia','História'],['/arquitetura','Arquitetura'],['/restauracao','Restauro'],['/pessoas','Pessoas'],['/programacao','Programação'],['/visite','Visite']].map(([h,l]) => (
                <li key={h}><Link href={h} className="text-cream/80 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-[0.72rem] uppercase tracking-eyebrow text-gold">Acervo & filme</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[['/acervo','Acervo de imagens'],['/documentario','Documentário Música & Drama'],['/linha-do-tempo','Linha do tempo'],['/memorias','Curiosidades'],['/livro-de-memorias','Livro de Memórias'],['/visita-guiada','Visita guiada'],['/fontes','Pesquisa e fontes'],['/sobre','Sobre o projeto']].map(([h,l]) => (
                <li key={h}><Link href={h} className="text-cream/80 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-cream/15 pt-6 text-[0.7rem] leading-relaxed text-cream/75">
          <p className="max-w-2xl text-cream/70">
            Projeto independente de memória e divulgação histórica. <strong className="font-medium text-cream/90">Este não é o site oficial do Theatro Municipal nem da Prefeitura de São João da Boa Vista.</strong> Para programação, bilheteria e informações oficiais, consulte os{' '}
            <a href="https://saojoao.sp.gov.br/cultura/equipamentos-culturais/theatro-municipal" target="_blank" rel="noopener" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">canais da Prefeitura</a>.
          </p>
          <p className="mt-3">© <AnoAtual /> · Conteúdo histórico baseado em fontes citadas na página de <a href="/fontes" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">Pesquisa e fontes</a>. História, arte e memória de São João da Boa Vista.</p>
        </div>
      </div>
    </footer>
  );
}
