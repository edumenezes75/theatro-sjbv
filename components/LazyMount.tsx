'use client';
import { useEffect, useRef, useState } from 'react';

export default function LazyMount({ children, minHeight = 700 }: { children: React.ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return; }
    const io = new IntersectionObserver(
      (es) => { if (es.some((e) => e.isIntersecting)) { setShow(true); io.disconnect(); } },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    const t = window.setTimeout(() => setShow(true), 3500); // fail-safe: nunca fica vazio
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
  return <div ref={ref} style={show ? undefined : { minHeight }}>{show ? children : null}</div>;
}
