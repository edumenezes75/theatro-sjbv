// Nomes das páginas e a ordem de leitura do site. Um lugar só: o fecho de
// todas as páginas ("Próxima página") sai daqui.
export const LABELS: Record<string, string> = {
  '/historia': 'História', '/arquitetura': 'Arquitetura',
  '/restauracao': 'Restauro', '/pessoas': 'Pessoas', '/acervo': 'Acervo',
  '/documentario': 'Documentário', '/linha-do-tempo': 'Linha do tempo',
  '/visite': 'Visite', '/fontes': 'Fontes', '/memorias': 'Curiosidades do Theatro', '/sobre': 'Sobre o projeto', '/visita-guiada': 'Visita guiada', '/luta-contra-a-demolicao': 'A luta contra a demolição', '/companhia-teatral-sanjoanense': 'Quem pagou o Theatro', '/o-politeama': 'Theatro ou politeama?', '/episodios': 'Episódios', '/a-fachada-que-fala': 'A fachada que fala', '/o-medalhao-de-carlos-gomes': 'O medalhão de Carlos Gomes', '/guiomar-novaes-e-o-theatro': 'Guiomar Novaes e o Theatro', '/o-tempo-do-cinetheatro': 'O tempo do CineTheatro', '/as-mulheres-do-theatro': 'As mulheres do Theatro', '/a-noite-de-inauguracao': 'A noite de inauguração', '/os-outros-inquilinos': 'Os outros inquilinos', '/a-cidade-financia-seu-restauro': 'A cidade financia seu restauro', '/a-opereta-branca-de-neve': 'A opereta Branca de Neve',
  '/repertorio': 'O que passou pelo palco',
};

export const JOURNEY = ['/historia', '/linha-do-tempo', '/arquitetura', '/restauracao', '/pessoas', '/acervo', '/repertorio', '/documentario', '/memorias', '/visite'];

export function proximaPagina(href: string): string | null {
  const i = JOURNEY.indexOf(href);
  return i >= 0 && i < JOURNEY.length - 1 ? JOURNEY[i + 1] : null;
}
