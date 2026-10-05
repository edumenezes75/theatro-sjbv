import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Acionada pelo Vercel Cron (ver vercel.json). Mantém a home atualizada
// mesmo sem novos commits.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePath('/');
  return NextResponse.json({ ok: true, revalidated: ['/'], at: new Date().toISOString() });
}
