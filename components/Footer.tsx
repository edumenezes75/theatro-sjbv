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
            <h3 className="font-sans text-xs uppercase tracking-eyebrow text-gold">Visite</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Praça da Catedral, 22 — Centro<br />São João da Boa Vista — SP
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              WhatsApp (19) 99719-5719<br />(19) 3636-4872 · (19) 3636-4953
            </p>
          </div>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-eyebrow text-gold">Comece por aqui</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[['/historia','A história do Theatro'],['/linha-do-tempo','Linha do tempo'],['/acervo','Fotos'],['/documentario','Documentário'],['/pessoas','Pessoas'],['/memorias','Curiosidades'],['/visite','Visite']].map(([h,l]) => (
                <li key={h}><Link href={h} className="text-cream/80 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-xs uppercase tracking-eyebrow text-gold">Para ir mais fundo</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[['/arquitetura','Arquitetura'],['/restauracao','Restauro'],['/episodios','Episódios'],['/repertorio','O que passou pelo palco'],['/#livro','O livro do centenário'],['/fontes','Pesquisa e fontes'],['/sobre','Sobre o projeto']].map(([h,l]) => (
                <li key={h}><Link href={h} className="text-cream/80 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-4 border-t border-cream/15 pt-6">
          <p className="font-sans text-xs uppercase tracking-eyebrow text-gold">Contato do projeto</p>
          <a
            href="https://wa.me/5519983016060"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com Edu Menezes, autor do projeto, pelo WhatsApp"
            title="Falar com o autor do projeto pelo WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream/85 transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" />
              <path d="M9.2 8.6c-.5 1.6.3 3.3 1.8 4.7 1.5 1.400 3.100 2.100 4.600 1.500" />
            </svg>
          </a>
        </div>
        <div className="mt-6 text-sm leading-relaxed text-cream/75">
          <p className="max-w-2xl text-cream/70">
            Projeto independente de memória e divulgação histórica. <strong className="font-medium text-cream/90">Este não é o site oficial do Theatro Municipal nem da Prefeitura de São João da Boa Vista.</strong> Para programação, bilheteria e informações oficiais, consulte os{' '}
            <a href="https://saojoao.sp.gov.br/cultura/equipamentos-culturais/theatro-municipal" target="_blank" rel="noopener noreferrer" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">canais da Prefeitura</a>.
          </p>
          <p className="mt-3">© <AnoAtual /> · Conteúdo histórico baseado em fontes citadas na página de <a href="/fontes" className="underline decoration-gold/40 underline-offset-2 hover:text-gold">Pesquisa e fontes</a>. História, arte e memória de São João da Boa Vista.</p>
        </div>
      </div>
    </footer>
  );
}
