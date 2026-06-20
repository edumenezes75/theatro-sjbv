import Link from 'next/link';
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
              {[['/o-theatro','O Theatro'],['/historia','História'],['/arquitetura','Arquitetura'],['/restauracao','Restauro'],['/pessoas','Pessoas'],['/linha-do-tempo','Linha do tempo']].map(([h,l]) => (
                <li key={h}><Link href={h} className="text-cream/80 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-[0.72rem] uppercase tracking-eyebrow text-gold">Acervo & filme</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {[['/documentario','Documentário Música & Drama'],['/acervo','Acervo de imagens'],['/memorias','Memórias e curiosidades'],['/fontes','Pesquisa e fontes']].map(([h,l]) => (
                <li key={h}><Link href={h} className="text-cream/80 hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-cream/15 pt-6 text-[0.7rem] leading-relaxed text-cream/65">
          <p>Fontes editoriais: <em>Theatro Municipal, 100 anos</em> (2014) e o documentário <em>Música &amp; Drama — A História do Theatro Municipal de São João da Boa Vista</em>, de Eduardo Menezes.</p>
          <p className="mt-2">© {new Date().getFullYear()} Theatro Municipal de São João da Boa Vista. História, arte e memória.</p>
        </div>
      </div>
    </footer>
  );
}
