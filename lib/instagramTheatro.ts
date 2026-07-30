// Últimas publicações do Instagram do Theatro (@theatro_municipal_sjbv), via API Graph da Meta.
// À prova de falha: sem token/erro => []. Requer variáveis de ambiente (na Vercel):
//   IG_USER_ID — id da conta Instagram Business/Creator
//   IG_TOKEN   — token de acesso de longa duração, do app da Meta
// A conta precisa ser Business/Creator ligada a uma Página do Facebook. Tokens de longa
// duração vivem ~60 dias; um System User dá token sem expiração. Roda no servidor com ISR.

const REVALIDATE = 3600; // 1h
const GRAPH = 'https://graph.facebook.com/v21.0';

export type PostInstagram = {
  id: string;
  caption: string;
  titulo: string; // primeira linha da legenda (costuma trazer o nome do evento)
  permalink: string;
  image?: string;
  date: string;
  isVideo: boolean;
};

export async function getInstagramTheatro(): Promise<PostInstagram[]> {
  const token = process.env.IG_TOKEN;
  const user = process.env.IG_USER_ID;
  if (!token || !user) return [];
  try {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `${GRAPH}/${user}/media?fields=${fields}&limit=6&access_token=${token}`;
    const r = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!r.ok) return [];
    const j = await r.json();
    const data = Array.isArray(j?.data) ? j.data : [];
    return data
      .map((m: any): PostInstagram => {
        const isVideo = m.media_type === 'VIDEO';
        const caption = String(m.caption || '').trim();
        const titulo = caption.split('\n')[0].slice(0, 120).trim();
        return {
          id: String(m.id),
          caption,
          titulo,
          permalink: String(m.permalink || 'https://www.instagram.com/theatro_municipal_sjbv/'),
          image: isVideo ? m.thumbnail_url : m.media_url,
          date: String(m.timestamp || ''),
          isVideo,
        };
      })
      .filter((p) => p.permalink);
  } catch {
    return [];
  }
}
