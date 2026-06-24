// Backend de mensagens (Supabase / PostgREST). Chave pública (anon) — protegida por RLS.
export const SUPA_URL = 'https://sktbzgdhptnyvatiygcz.supabase.co';
export const SUPA_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdGJ6Z2RocHRueXZhdGl5Z2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjIwNTQsImV4cCI6MjA5Mzg5ODA1NH0.M13FH-tjnvFjGOKnmnjjdsnLa8KgesSyzqsg_f6WOho';

const REST = `${SUPA_URL}/rest/v1/theatro_mensagens`;
const baseHeaders = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` };

export type Mensagem = { id: string; created_at: string; nome: string; texto: string };
export type TipoMensagem = 'memoria' | 'filme' | 'foto';

export async function listarMensagens(tipo: TipoMensagem, ref?: string | null): Promise<Mensagem[]> {
  const p = new URLSearchParams();
  p.set('select', 'id,created_at,nome,texto');
  p.set('tipo', `eq.${tipo}`);
  p.set('order', 'created_at.desc');
  if (tipo === 'foto' && ref) p.set('ref', `eq.${ref}`);
  else p.set('ref', 'is.null');
  const r = await fetch(`${REST}?${p.toString()}`, { headers: baseHeaders, cache: 'no-store' });
  if (!r.ok) throw new Error('Falha ao carregar');
  return r.json();
}

export async function enviarMensagem(m: {
  tipo: TipoMensagem; ref?: string | null; nome: string; email?: string; texto: string;
}): Promise<void> {
  const body = {
    tipo: m.tipo,
    ref: m.tipo === 'foto' ? (m.ref ?? null) : null,
    nome: m.nome.trim().slice(0, 80),
    email: (m.email || '').trim().slice(0, 160) || null,
    texto: m.texto.trim().slice(0, 4000),
    aprovado: false,
  };
  const r = await fetch(REST, {
    method: 'POST',
    headers: { ...baseHeaders, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('Falha ao enviar');
}
