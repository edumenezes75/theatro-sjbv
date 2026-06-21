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
  ['/o-theatro', 0.6, 'yearly'],
  ['/fontes', 0.6, 'monthly'],
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
