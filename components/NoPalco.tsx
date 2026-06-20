const NOMES = [
  { ano: '1914', nome: 'Companhia Santos Silva', obra: 'Inaugura o Theatro com a peça Uma Causa Célebre.' },
  { ano: '1930', nome: 'Villa-Lobos', obra: 'O conjunto do maestro em concerto, com Souza Lima ao piano.' },
  { ano: '1932', nome: 'Branca de Neve', obra: 'A opereta do Padre Nicolau Miranda, composta na cidade.' },
  { ano: '1946', nome: 'Guiomar Novaes', obra: 'A pianista sanjoanense em recital para seus conterrâneos.' },
  { ano: '1952', nome: 'Procópio Ferreira', obra: 'O grande ator em Deus lhe Pague e Esta Mulher é Minha.' },
  { ano: '1968', nome: 'Roberto Carlos', obra: 'O jovem ídolo da Jovem Guarda sobe ao palco.' },
  { ano: '1982', nome: 'Dercy Gonçalves', obra: 'A comediante e Agnaldo Rayol nos últimos shows antes das obras.' },
  { ano: '2002', nome: '25ª Semana Guiomar Novaes', obra: 'A reabertura da sala restaurada, em noite de gala.' },
  { ano: '2025', nome: 'Renato Teixeira', obra: 'Abre a 48ª Semana Guiomar Novaes no Theatro.' },
];

export default function NoPalco() {
  return (
    <section className="mt-14">
      <div className="flex items-center gap-3">
        <span className="h-6 w-px bg-curtain dark:bg-gold" />
        <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">No palco</p>
      </div>
      <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">Grandes nomes que pisaram aqui</h2>
      <p className="mt-3 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">
        Mais de um século de companhias, mestres e ídolos. Um recorte dos nomes que fizeram deste palco um ponto de encontro da cidade com a arte.
      </p>
      <ol className="mt-8 grid gap-px overflow-hidden rounded-sm border border-gold/25 bg-gold/20 sm:grid-cols-2 lg:grid-cols-3">
        {NOMES.map((n) => (
          <li key={n.ano + n.nome} className="group bg-cream p-6 transition-colors hover:bg-gold/5 dark:bg-night dark:hover:bg-cream/[0.04]">
            <span className="font-display text-2xl italic text-curtain dark:text-gold">{n.ano}</span>
            <h3 className="mt-1 font-display text-xl leading-tight">{n.nome}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{n.obra}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-sans text-xs italic text-ink/65 dark:text-cream/65">
        Fontes: <em>Theatro Municipal, 100 anos</em> (2014); Prefeitura de São João da Boa Vista (2025). Veja cada registro datado na linha do tempo abaixo.
      </p>
    </section>
  );
}
