import type { MetadataRoute } from 'next';
const BASE = 'https://theatro-municipal-sjbv.vercel.app';
const ROUTES = ['', '/o-theatro', '/historia', '/arquitetura', '/restauracao', '/pessoas', '/memorias', '/documentario', '/acervo', '/linha-do-tempo', '/visite', '/fontes'];
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: BASE + r, lastModified: new Date(), changeFrequency: 'monthly', priority: r === '' ? 1 : 0.7 }));
}
