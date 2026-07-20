'use client';
import { useEffect, useState } from 'react';

// Ano sempre atual, calculado no navegador — não depende de rebuild do site.
export default function AnoAtual() {
  const [ano, setAno] = useState(() => new Date().getFullYear());
  useEffect(() => setAno(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{ano}</span>;
}
