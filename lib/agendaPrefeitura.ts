// Alimentação automática da Programação a partir da agenda oficial da Prefeitura
// (https://www.saojoao.sp.gov.br/eventos), mantendo apenas eventos cujo Local é o
// Theatro Municipal. Roda no servidor com ISR (revalidate) + cron diário.
//
// Filosofia: best-effort e à prova de falha. Qualquer erro (site fora do ar, mudança
// de layout, timeout) faz a função retornar [] silenciosamente — a página nunca quebra
// e simplesmente exibe o estado "agenda ainda não publicada". Só alimenta quando há.

import type { Evento } from './content';

const BASE = 'https://www.saojoao.sp.gov.br';
const VENUE = /theatro\s+municipal/i;
const REVALIDATE = 21600; // 6h, alinhado à página
const MESES_A_FRENTE = 3; // mês atual + próximos 3
const MESES_ATRAS = 3; // e os 3 meses anteriores (eventos recentes)
const MAX_DETALHES = 30; // teto de requisições de detalhe por atualização

async function getText(url: string): Promise<string | null> {
  try {
    const r = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { 'User-Agent': 'TheatroMunicipalSJBV/1.0 (+https://www.theatromunicipalsjbv.com.br)' },
    });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

function decode(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function toText(html: string): string {
  return decode(
    html
      .replace(/<\s*(br|\/p|\/div|\/h[1-6]|\/li|\/tr|\/td)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[ \t]+/g, ' '),
  )
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n');
}

function metaContent(html: string, prop: string): string | undefined {
  const re = new RegExp('<meta[^>]+(?:property|name)=["\']' + prop + '["\'][^>]*content=["\']([^"\']*)["\']', 'i');
  const m = html.match(re);
  return m ? decode(m[1]) : undefined;
}

function field(text: string, label: string): string | undefined {
  const m = text.match(new RegExp('^' + label + '\\s*:?\\s*(.+)$', 'im'));
  return m ? m[1].trim() : undefined;
}

type Card = { slug: string; y: number; mo: number; d: number; hh: number; mm: number };

function parseListing(html: string): Card[] {
  const out: Card[] = [];
  const seen = new Set<string>();
  const linkRe = /href=["']\/eventos\/([a-z0-9][a-z0-9-]*)["']/gi;
  const dateRe = /(\d{1,2})\/(\d{1,2})\/(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(html))) {
    const slug = m[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    dateRe.lastIndex = m.index;
    const dm = dateRe.exec(html);
    if (!dm) continue;
    const seg = html.slice(m.index, dm.index);
    const tm = seg.match(/(\d{1,2})h(\d{2})?/);
    out.push({ slug, d: +dm[1], mo: +dm[2], y: +dm[3], hh: tm ? +tm[1] : 20, mm: tm && tm[2] ? +tm[2] : 0 });
  }
  return out;
}

function iso(c: Card): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return c.y + '-' + p(c.mo) + '-' + p(c.d) + 'T' + p(c.hh) + ':' + p(c.mm) + ':00';
}

async function fetchDetalhe(slug: string, c: Card): Promise<Evento | null> {
  const url = BASE + '/eventos/' + slug;
  const html = await getText(url);
  if (!html) return null;
  const text = toText(html);
  const local = field(text, 'Local');
  if (!local || !VENUE.test(local)) return null; // só Theatro Municipal

  const rawTitle = metaContent(html, 'og:title') || '';
  const title = rawTitle.split(' - Prefeitura')[0].trim() || slug.replace(/-/g, ' ');
  const tipo = field(text, 'Tipo de Evento');
  const pago = /mediante compra de ingresso|venda de ingresso/i.test(text);
  const gratis = /entrada\s+franca|gratuit[ao]/i.test(text);
  const nota = pago ? 'Entrada mediante compra de ingresso.' : gratis ? 'Entrada gratuita.' : '';
  const html_ =
    (nota ? '<p>' + nota + '</p>' : '') +
    '<p><a href="' + url + '" target="_blank" rel="noopener">Detalhes e ingressos na Prefeitura ↗</a></p>';

  return {
    slug: 'pref-' + slug,
    title,
    date: iso(c),
    local: 'Theatro Municipal',
    categoria: tipo && !/calend[áa]rio de feriados/i.test(tipo) ? tipo : undefined,
    status: iso(c).slice(0, 10) >= new Date().toISOString().slice(0, 10) ? 'agendado' : 'realizado',
    exemplo: false,
    html: html_,
  };
}

export async function getEventosPrefeitura(): Promise<Evento[]> {
  try {
    const now = new Date();
    const hojeISO = now.toISOString().slice(0, 10);

    const cards: Card[] = [];
    for (let i = -MESES_ATRAS; i <= MESES_A_FRENTE; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const html = await getText(BASE + '/eventos?mes=' + (d.getMonth() + 1) + '&ano=' + d.getFullYear());
      if (html) cards.push(...parseListing(html));
    }

    // dedup por slug e prioriza os eventos mais próximos de hoje (passados recentes + próximos)
    const vistos = new Set<string>();
    const hojeMs = now.getTime();
    const candidatos = cards
      .filter((c) => (vistos.has(c.slug) ? false : (vistos.add(c.slug), true)))
      .sort((a, b) => Math.abs(new Date(iso(a)).getTime() - hojeMs) - Math.abs(new Date(iso(b)).getTime() - hojeMs))
      .slice(0, MAX_DETALHES);

    const resultados = await Promise.allSettled(candidatos.map((c) => fetchDetalhe(c.slug, c)));
    return resultados
      .filter((r): r is PromiseFulfilledResult<Evento | null> => r.status === 'fulfilled')
      .map((r) => r.value)
      .filter((e): e is Evento => e !== null);
  } catch {
    return [];
  }
}
