// Robô de notícias do Theatro: lê o feed RSS oficial da Prefeitura (fonte mantida e
// estruturada, diferente da agenda /eventos que está abandonada), filtra as notícias
// que citam o Theatro e devolve as mais recentes. À prova de falha: erro => [].
// Roda no servidor com ISR (revalidate) + cron diário.

const FEED = 'https://ecrie20.com.br/saojoao.sp.gov.br/feed.xml';
const REVALIDATE = 21600; // 6h

export type NoticiaTheatro = { title: string; link: string; date: string; img?: string };

const NAMED: Record<string, string> = {
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú',
  atilde: 'ã', otilde: 'õ', Atilde: 'Ã', Otilde: 'Õ',
  acirc: 'â', ecirc: 'ê', ocirc: 'ô', Acirc: 'Â', Ecirc: 'Ê', Ocirc: 'Ô',
  agrave: 'à', Agrave: 'À', ccedil: 'ç', Ccedil: 'Ç',
  ordm: 'º', ordf: 'ª', deg: '°', nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>',
};

function decode(s: string): string {
  if (!s) return '';
  // duas passadas: o feed às vezes vem com entidades duplamente codificadas (&amp;atilde;)
  for (let i = 0; i < 2; i++) {
    s = s
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
      .replace(/&([A-Za-z]+);/g, (m, name) => (name in NAMED ? NAMED[name] : m));
  }
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp('<' + name + '>([\\s\\S]*?)<\\/' + name + '>'));
  return m ? m[1] : '';
}

export async function getNoticiasTheatro(): Promise<NoticiaTheatro[]> {
  try {
    const r = await fetch(FEED, {
      next: { revalidate: REVALIDATE },
      headers: { 'User-Agent': 'TheatroMunicipalSJBV/1.0 (+https://www.theatromunicipalsjbv.com.br)' },
    });
    if (!r.ok) return [];
    const xml = await r.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
    const seen = new Set<string>();
    const out: NoticiaTheatro[] = [];
    for (const it of items) {
      if (!/theatro/i.test(it)) continue; // cita o Theatro
      const title = decode(tag(it, 'title'));
      const link = tag(it, 'link').trim();
      const pub = tag(it, 'pubDate').trim();
      const imgM = it.match(/<media:content[^>]*url="([^"]+)"/);
      if (!title || !link || seen.has(link)) continue;
      seen.add(link);
      const d = pub ? new Date(pub) : null;
      out.push({ title, link, date: d && !isNaN(d.getTime()) ? d.toISOString() : '', img: imgM ? imgM[1] : undefined });
    }
    return out.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
  } catch {
    return [];
  }
}
