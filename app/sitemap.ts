import type { MetadataRoute } from 'next';
import { pessoasList, pessoaSlug, fotosList } from '@/lib/data';

const BASE = 'https://www.theatromunicipalsjbv.com.br';

// [rota, prioridade, frequência]
const ROUTES: [string, number, MetadataRoute.Sitemap[number]['changeFrequency']][] = [
  ['', 1.0, 'weekly'],
  ['/historia', 0.9, 'monthly'],
  ['/arquitetura', 0.8, 'monthly'],
  ['/restauracao', 0.8, 'monthly'],
  ['/acervo', 0.8, 'monthly'],
  ['/pessoas', 0.7, 'monthly'],
  ['/documentario', 0.7, 'monthly'],
  ['/linha-do-tempo', 0.7, 'monthly'],
  ['/visita-guiada', 0.7, 'yearly'],
  ['/programacao', 0.7, 'weekly'],
  ['/visite', 0.7, 'yearly'],
  ['/memorias', 0.6, 'monthly'],
  ['/livro-de-memorias', 0.6, 'weekly'],
  ['/o-theatro', 0.6, 'yearly'],
  ['/fontes', 0.6, 'monthly'],
  ['/sobre', 0.5, 'yearly'],
  ['/luta-contra-a-demolicao', 0.7, 'yearly'],
  ['/episodios', 0.6, 'monthly'],
  ['/companhia-teatral-sanjoanense', 0.7, 'yearly'],
  ['/o-politeama', 0.7, 'yearly'],
  ['/a-fachada-que-fala', 0.7, 'yearly'],
  ['/o-medalhao-de-carlos-gomes', 0.7, 'yearly'],
  ['/guiomar-novaes-e-o-theatro', 0.7, 'yearly'],
  ['/o-tempo-do-cinetheatro', 0.7, 'yearly'],
  ['/as-mulheres-do-theatro', 0.7, 'yearly'],
  ['/a-noite-de-inauguracao', 0.7, 'yearly'],
  ['/os-outros-inquilinos', 0.7, 'yearly'],
  ['/a-cidade-financia-seu-restauro', 0.7, 'yearly'],
  ['/a-opereta-branca-de-neve', 0.7, 'yearly'],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixas = ROUTES.map(([r, priority, changeFrequency]) => ({
    url: BASE + r,
    lastModified: now,
    changeFrequency,
    priority,
  }));
  const pessoas = pessoasList.map((p) => ({
    url: `${BASE}/pessoas/${pessoaSlug(p)}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));
  const acervo = fotosList.map((f) => ({
    url: `${BASE}/acervo/${f.id}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));
  return [...fixas, ...pessoas, ...acervo];
}
