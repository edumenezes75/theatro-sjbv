'use client';
import { useEffect, useState } from 'react';
import { listarMensagens, enviarMensagem, type Mensagem, type TipoMensagem } from '@/lib/mensagens';

const dtfmt = (s: string) => {
  try { return new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }); }
  catch { return ''; }
};

export default function Comentarios({
  tipo, refId, titulo, intro, placeholder, vazio,
}: {
  tipo: TipoMensagem;
  refId?: string;
  titulo?: string;
  intro?: string;
  placeholder?: string;
  vazio?: string;
}) {
  const [msgs, setMsgs] = useState<Mensagem[] | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [hp, setHp] = useState('');
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'erro'>('idle');
  const [erroMsg, setErroMsg] = useState('');

  useEffect(() => { listarMensagens(tipo, refId).then(setMsgs).catch(() => setMsgs([])); }, [tipo, refId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hp) return; // armadilha anti-robô
    if (nome.trim().length < 2) { setEstado('erro'); setErroMsg('Diga seu nome.'); return; }
    if (texto.trim().length < 2) { setEstado('erro'); setErroMsg('Escreva sua mensagem.'); return; }
    try {
      const last = Number(localStorage.getItem('msg_last') || 0);
      if (Date.now() - last < 20000) { setEstado('erro'); setErroMsg('Aguarde alguns segundos antes de enviar de novo.'); return; }
    } catch {}
    setEstado('enviando');
    try {
      await enviarMensagem({ tipo, ref: refId, nome, email, texto });
      try { localStorage.setItem('msg_last', String(Date.now())); } catch {}
      setEstado('ok'); setNome(''); setEmail(''); setTexto('');
    } catch { setEstado('erro'); setErroMsg('Não foi possível enviar agora. Tente novamente.'); }
  }

  const input = 'w-full rounded-sm border border-ink/15 bg-cream/60 px-3 py-2 font-sans text-sm text-ink outline-none transition-colors focus:border-curtain dark:border-cream/15 dark:bg-night/40 dark:text-cream dark:focus:border-gold';

  return (
    <section className="mt-12 border-t border-gold/25 pt-8">
      <div className="flex items-center gap-3">
        <span className="h-6 w-px bg-curtain dark:bg-gold" />
        <p className="font-sans text-xs uppercase tracking-eyebrow text-curtain dark:text-gold">Memórias do público</p>
      </div>
      <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{titulo || 'Deixe sua memória'}</h2>
      {intro && <p className="mt-2 max-w-reading font-sans text-sm leading-relaxed text-ink/70 dark:text-cream/70">{intro}</p>}

      {estado === 'ok' ? (
        <div className="mt-6 rounded-sm border border-gold/40 bg-gold/10 px-4 py-4 font-sans text-sm text-ink/85 dark:text-cream/85">
          Obrigado! Sua mensagem foi enviada e aparecerá aqui após uma breve revisão. 🌟
          <button onClick={() => setEstado('idle')} className="ml-2 underline decoration-gold/50 underline-offset-2">Escrever outra</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-3" noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className={input} type="text" placeholder="Seu nome" value={nome} maxLength={80} onChange={(e) => setNome(e.target.value)} aria-label="Seu nome" required />
            <input className={input} type="email" placeholder="E-mail (opcional, não aparece no site)" value={email} maxLength={160} onChange={(e) => setEmail(e.target.value)} aria-label="E-mail (opcional)" />
          </div>
          <textarea className={`${input} min-h-[110px] resize-y`} placeholder={placeholder || 'Escreva sua memória, lembrança ou comentário…'} value={texto} maxLength={4000} onChange={(e) => setTexto(e.target.value)} aria-label="Sua mensagem" required />
          <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden />
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={estado === 'enviando'} className="rounded-full bg-curtain px-5 py-2 font-sans text-sm font-medium text-cream transition-transform hover:scale-[1.03] disabled:opacity-60 dark:bg-gold dark:text-ink">
              {estado === 'enviando' ? 'Enviando…' : 'Enviar'}
            </button>
            <span className="font-sans text-xs text-ink/50 dark:text-cream/50">As mensagens passam por revisão antes de aparecer.</span>
          </div>
          {estado === 'erro' && <p className="font-sans text-sm text-curtain dark:text-gold">{erroMsg}</p>}
        </form>
      )}

      <div className="mt-8 space-y-4">
        {msgs === null && <p className="font-sans text-sm text-ink/50 dark:text-cream/50">Carregando…</p>}
        {msgs !== null && msgs.length === 0 && (
          <p className="font-sans text-sm italic text-ink/65 dark:text-cream/75">{vazio || 'Seja o primeiro a deixar uma memória.'}</p>
        )}
        {msgs?.map((m) => (
          <article key={m.id} className="rounded-sm border border-ink/10 bg-ink/[0.02] px-4 py-3 dark:border-cream/10 dark:bg-cream/[0.03]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-base text-ink/90 dark:text-cream/90">{m.nome}</span>
              <span className="font-sans text-[0.7rem] uppercase tracking-eyebrow text-ink/45 dark:text-cream/45">{dtfmt(m.created_at)}</span>
            </div>
            <p className="mt-1.5 whitespace-pre-line font-read text-[1.02rem] leading-relaxed text-ink/85 dark:text-cream/85">{m.texto}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
