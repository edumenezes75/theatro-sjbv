import type { MetadataRoute } from 'next';
const BASE = 'https://www.theatromunicipalsjbv.com.br';
const ROUTES = ['', '/o-theatro', '/historia', '/arquitetura', '/restauracao', '/pessoas', '/memorias', '/documentario', '/acervo', '/linha-do-tempo', '/visite', '/fontes'];
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: BASE + r, lastModified: new Date(), changeFrequency: 'monthly', priority: r === '' ? 1 : 0.7 }));
}
