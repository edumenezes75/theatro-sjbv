import { ImageResponse } from 'next/og';
import { getPageBySlug, getEditorialSlugs } from '@/lib/content';

export const alt = 'Theatro Municipal de São João da Boa Vista';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getEditorialSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const page = getPageBySlug('/' + params.slug);
  const title = page?.meta.title ?? 'Theatro Municipal';
  const eyebrow = page?.meta.eyebrow ?? '';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', background: '#14110E', color: '#F5EFE3',
          padding: '70px', fontFamily: 'serif',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 75% 8%, rgba(110,27,34,0.55), transparent 60%)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 4, height: 34, background: '#A9863F' }} />
          <div style={{ fontSize: 26, letterSpacing: 2, textTransform: 'uppercase', color: '#D8C089', fontFamily: 'sans-serif' }}>
            Theatro Municipal · São João da Boa Vista
          </div>
        </div>
        <div style={{ fontSize: 92, fontWeight: 600, lineHeight: 1.05, marginTop: 18, maxWidth: 980 }}>{title}</div>
        {eyebrow ? <div style={{ fontSize: 30, color: 'rgba(245,239,227,0.78)', marginTop: 18, maxWidth: 900 }}>{eyebrow}</div> : null}
      </div>
    ),
    { ...size },
  );
}
