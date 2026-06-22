import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type PageMeta = {
  slug: string;
  title: string;
  eyebrow?: string;
  seo_title?: string;
  seo_description?: string;
  hero_image?: string;
  hero_alt?: string;
  status?: string;
  last_verified?: string;
};

export type Page = {
  meta: PageMeta;
  html: string;
  fontes: string | null;
};

marked.setOptions({ gfm: true, breaks: false });

function normalizeSlug(raw: string): string {
  if (!raw || raw === '/') return '/';
  return '/' + raw.replace(/^\/+|\/+$/g, '');
}

function fixImagePaths(md: string): string {
  return md.replace(/\.\.\/media\//g, '/media/').replace(/\(\.\//g, '(/');
}

function extractFontes(md: string): { body: string; fontes: string | null } {
  const re = /<!--\s*Fontes[^>]*?-->/gis;
  const matches = md.match(re);
  let fontes: string | null = null;
  if (matches && matches.length) {
    fontes = matches
      .map((m) => m.replace(/<!--\s*/, '').replace(/\s*-->/, '').replace(/^Fontes[^:]*:\s*/i, ''))
      .join(' ');
  }
  const body = md.replace(/<!--[\s\S]*?-->/g, '');
  return { body, fontes };
}

function readFiles(): { file: string; raw: string }[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ file: f, raw: fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8') }));
}

export function getAllPages(): Page[] {
  return readFiles().map(({ raw }) => {
    const { data, content } = matter(raw);
    const { body, fontes } = extractFontes(content);
    let html = marked.parse(fixImagePaths(body)) as string;
    html = html.replace(/<img /g, '<img loading="lazy" decoding="async" ');
    // converte sintaxe {#id} ao fim de titulos em atributo id real (marked nao faz isso)
    html = html.replace(/<(h[1-6])([^>]*)>([\s\S]*?)\s*\{#([\w-]+)\}\s*<\/\1>/g, '<$1$2 id="$4">$3</$1>');
    html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
    const meta = { ...(data as PageMeta), slug: normalizeSlug((data as PageMeta).slug) };
    return { meta, html, fontes };
  });
}

export function getPageBySlug(slug: string): Page | undefined {
  return getAllPages().find((p) => p.meta.slug === slug);
}

// slugs rendered by the generic editorial route (custom pages excluded)
const CUSTOM = new Set(['/', '/pessoas', '/linha-do-tempo', '/documentario', '/acervo']);

export function getEditorialSlugs(): string[] {
  return getAllPages()
    .map((p) => p.meta.slug)
    .filter((s) => !CUSTOM.has(s))
    .map((s) => s.replace(/^\//, ''));
}

export type Evento = {
  slug: string; title: string; date: string; local?: string; categoria?: string;
  ingresso?: string; status?: string; destaque?: boolean; exemplo?: boolean; html: string;
};

export function getEventos(): Evento[] {
  const dir = path.join(process.cwd(), 'content', 'eventos');
  if (!fs.existsSync(dir)) return [];
  const evs = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
    const { data, content } = matter(raw);
    const html = marked.parse(content.trim()) as string;
    return { slug: f.replace(/\.md$/, ''), html, ...(data as Omit<Evento, 'slug' | 'html'>) };
  });
  return evs.sort((a, b) => (a.date < b.date ? 1 : -1));
}
