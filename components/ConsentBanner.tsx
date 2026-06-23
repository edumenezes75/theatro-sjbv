'use client';
import { useEffect, useState } from 'react';

const GA = 'G-0YHHEHSFKE';
function loadGA() {
  if (document.getElementById('ga4-src')) return;
  const s = document.createElement('script');
  s.id = 'ga4-src'; s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
  document.head.appendChild(s);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', GA, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let c: string | null = null;
    try { c = localStorage.getItem('theatro-consent'); } catch { c = null; }
    if (c === 'granted') loadGA();
    else if (c !== 'denied') setShow(true);
  }, []);
  const decide = (ok: boolean) => {
    try { localStorage.setItem('theatro-consent', ok ? 'granted' : 'denied'); } catch { /* ignore */ }
    if (ok) loadGA();
    setShow(false);
  };
  if (!show) return null;
  return (
    <div role="dialog" aria-label="Aviso de privacidade" className="fixed inset-x-0 bottom-0 z-[90] border-t border-gold/30 bg-cream/97 backdrop-blur-md dark:bg-night/97">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl font-sans text-[0.82rem] leading-relaxed text-ink/80 dark:text-cream/80">
          Usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorá-lo. Nenhum dado é usado para publicidade.{' '}
          <a href="/fontes" className="underline decoration-gold/40 underline-offset-2 hover:text-curtain dark:hover:text-gold">Saiba mais</a>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => decide(false)} className="rounded-full border border-ink/20 px-4 py-2 font-sans text-xs text-ink/70 transition-colors hover:border-curtain hover:text-curtain dark:border-cream/20 dark:text-cream/70 dark:hover:text-gold">Recusar</button>
          <button onClick={() => decide(true)} className="rounded-full bg-curtain px-5 py-2 font-sans text-xs font-medium text-cream transition-transform hover:scale-[1.03] dark:bg-gold dark:text-ink">Aceitar</button>
        </div>
      </div>
    </div>
  );
}
