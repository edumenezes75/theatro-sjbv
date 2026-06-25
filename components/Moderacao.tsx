'use client';
import { useEffect, useState, useCallback } from 'react';
import { SUPA_URL, SUPA_KEY } from '@/lib/mensagens';

type Msg = { id: string; created_at: string; tipo: string; ref: string | null; nome: string; email: string | null; texto: string; aprovado: boolean };
const FN = `${SUPA_URL}/functions/v1/moderar`;
const tipoLabel = (m: Msg) => m.tipo === 'memoria' ? 'Livro de memórias' : m.tipo === 'filme' ? 'Documentário' : `Foto ${m.ref ?? ''}`;
const dt = (s: string) => { try { return new Date(s).toLocaleString('pt-BR'); } catch { return ''; } };

export default function Moderacao() {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [estado, setEstado] = useState<'idle' | 'carregando' | 'erro'>('idle');
  const [erro, setErro] = useState('');

  const chamar = useCallback(async (action: string, pass: string, id?: string) => {
    const r = await fetch(FN, {
      method: 'POST',
      headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, password: pass, id }),
    });
    if (r.status === 401) throw new Error('Senha incorreta.');
    if (!r.ok) throw new Error('Falha na operação.');
    return r.json();
  }, []);

  const carregar = useCallback(async (pass: string) => {
    setEstado('carregando'); setErro('');
    try {
      const d = await chamar('list', pass);
      setMsgs(d.mensagens || []); setAutenticado(true); setEstado('idle');
      try { localStorage.setItem('mod_pass', pass); } catch {}
    } catch (e: any) { setErro(e.message); setEstado('erro'); setAutenticado(false); }
  }, [chamar]);

  useEffect(() => { try { const p = localStorage.getItem('mod_pass'); if (p) { setSenha(p); carregar(p); } } catch {} }, [carregar]);

  async function acao(action: string, id: string) {
    try { await chamar(action, senha, id); await carregar(senha); } catch (e: any) { setErro(e.message); }
  }

  if (!autenticado) {
    return (
      <div className="mx-auto max-w-md px-5 py-24">
        <h1 className="font-display text-3xl">Moderação</h1>
        <p className="mt-2 font-sans text-sm text-ink/70 dark:text-cream/70">Digite a senha para revisar as mensagens enviadas pelo público.</p>
        <form onSubmit={(e) => { e.preventDefault(); carregar(senha); }} className="mt-6 flex gap-2">
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="flex-1 rounded-sm border border-ink/15 bg-cream/60 px-3 py-2 font-sans text-sm dark:border-cream/15 dark:bg-night/40 dark:text-cream" />
          <button className="rounded-full bg-curtain px-5 py-2 font-sans text-sm font-medium text-cream dark:bg-gold dark:text-ink">Entrar</button>
        </form>
        {estado === 'erro' && <p className="mt-3 font-sans text-sm text-curtain dark:text-gold">{erro}</p>}
      </div>
    );
  }

  const pend = msgs.filter((m) => !m.aprovado);
  const apr = msgs.filter((m) => m.aprovado);
  const Card = (m: Msg, acoes: React.ReactNode) => (
    <article key={m.id} className="rounded-sm border border-ink/12 p-4 dark:border-cream/12">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/65 dark:text-cream/75">
        <span className="rounded-full bg-gold/15 px-2 py-0.5 font-sans uppercase tracking-eyebrow text-curtain dark:text-gold">{tipoLabel(m)}</span>
        <span>{dt(m.created_at)}</span>
        {m.email && <span>· {m.email}</span>}
      </div>
      <p className="mt-2 font-display text-lg text-ink/90 dark:text-cream/90">{m.nome}</p>
      <p className="mt-1 whitespace-pre-line font-read text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">{m.texto}</p>
      <div className="mt-3 flex gap-2">{acoes}</div>
    </article>
  );
  const btn = 'rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-colors';

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Moderação</h1>
        <button onClick={() => carregar(senha)} className="font-sans text-sm text-curtain underline decoration-gold/40 dark:text-gold">Atualizar</button>
      </div>
      {erro && <p className="mt-2 font-sans text-sm text-curtain dark:text-gold">{erro}</p>}

      <h2 className="mt-8 font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Pendentes ({pend.length})</h2>
      <div className="mt-3 space-y-3">
        {pend.length === 0 && <p className="font-sans text-sm italic text-ink/50 dark:text-cream/50">Nada na fila. 🎉</p>}
        {pend.map((m) => Card(m, <>
          <button onClick={() => acao('approve', m.id)} className={`${btn} bg-green-700 text-white hover:bg-green-800`}>Aprovar</button>
          <button onClick={() => { if (confirm('Excluir esta mensagem?')) acao('delete', m.id); }} className={`${btn} border border-ink/20 text-ink/70 hover:border-curtain hover:text-curtain dark:border-cream/20 dark:text-cream/70`}>Excluir</button>
        </>))}
      </div>

      <h2 className="mt-12 font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Publicadas ({apr.length})</h2>
      <div className="mt-3 space-y-3">
        {apr.map((m) => Card(m, <>
          <button onClick={() => acao('hide', m.id)} className={`${btn} border border-ink/20 text-ink/70 hover:border-curtain hover:text-curtain dark:border-cream/20 dark:text-cream/70`}>Ocultar</button>
          <button onClick={() => { if (confirm('Excluir esta mensagem?')) acao('delete', m.id); }} className={`${btn} border border-ink/20 text-ink/70 hover:border-curtain hover:text-curtain dark:border-cream/20 dark:text-cream/70`}>Excluir</button>
        </>))}
      </div>
    </div>
  );
}
