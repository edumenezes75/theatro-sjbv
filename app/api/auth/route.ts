import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) return new NextResponse('OAUTH_GITHUB_CLIENT_ID não configurado', { status: 500 });
  const redirectUri = `${req.nextUrl.origin}/api/callback`;
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'repo');
  const state = crypto.randomUUID();
  url.searchParams.set('state', state);
  const res = NextResponse.redirect(url.toString());
  res.cookies.set('decap_oauth_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/api/callback', maxAge: 600 });
  return res;
}
