import linhaDoTempo from '@/data/linha-do-tempo.json';
import transcricaoDoc from '@/data/transcricao.json';
import pessoas from '@/data/pessoas.json';
import curiosidades from '@/data/curiosidades.json';
import imagens from '@/data/imagens.json';

export type Evento = {
  id: string; date: string; display: string; title: string; summary: string;
  era: string; tags: string[]; status: string; sources: string[];
};
export type Pessoa = {
  id: string; name: string; category: string; role: string; summary: string;
  related: string[]; status: string; bio?: string; source?: string; born?: string; image?: string; imageAlt?: string; vozFilme?: { quote: string; t: string; s: number };
};
export type Curiosidade = { id: string; title: string; text: string; type: string; source: string; filme?: { s: number; t: string }; tema?: string };
export type Imagem = { file: string; alt: string; source: string; page: number; rights_note: string };

export const eventos = linhaDoTempo as Evento[];
export const pessoasList = (pessoas as { items: Pessoa[] }).items;
const _pslug = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const pessoaSlug = (p: Pessoa) => _pslug(p.name);
export const pessoaBySlug = (slug: string) => pessoasList.find((p) => _pslug(p.name) === slug);
export const pessoaById = (id: string) => pessoasList.find((p) => p.id === id);
export const curiosidadesList = (curiosidades as { items: Curiosidade[] }).items;
export const imagensList = imagens as Imagem[];

import fotos from '@/data/fotos.json';
export type Foto = { id: string; file: string; category: string; categoryLabel: string; w: number; h: number; alt: string; credit: string; epoca?: string; rank?: number; cor?: boolean; tone?: number };
export const fotosList = fotos as Foto[];
export const fotoById = (id: string) => fotosList.find((f) => f.id === id);
export const fotoTitulo = (alt: string) => { const t = alt.split('—')[0].trim(); return t.length > 75 ? t.slice(0, 72).trim() + '…' : t; };
export const fotosByCategory = (cat: string) => fotosList.filter((f) => f.category === cat);

import antesDepois from '@/data/antes-depois.json';
export type ParAntesDepois = { id: string; title: string; caption: string; antes: string; depois: string; w: number; h: number; credit: string };
export const antesDepoisList = antesDepois as ParAntesDepois[];

import vozes from '@/data/vozes.json';
export type Voz = { quote: string; author: string; role: string; source: string };
export const vozesList = (vozes as { items: Voz[] }).items;

// --- Rede: conexoes de uma pessoa com o acervo e a linha do tempo ---
// Casamento conservador por NOME citado nas legendas (curadas) e nos eventos.
const _norm = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ');

function _chavesNome(nome: string): string[] {
  const ks = new Set<string>();
  ks.add(_norm(nome));
  const apelidos = nome.match(/[“”"'’]([^“”"'’]+)[“”"'’]/g) || [];
  apelidos.forEach((a) => ks.add(_norm(a)));
  return Array.from(ks).filter((k) => k.length >= 6);
}

export function conexoesPessoa(nome: string): { fotos: Foto[]; eventos: Evento[] } {
  const ks = _chavesNome(nome);
  if (!ks.length) return { fotos: [], eventos: [] };
  const fotosM = fotosList.filter((f) => {
    const blob = _norm(`${f.alt || ''}`);
    return ks.some((k) => blob.includes(k));
  });
  const eventosM = eventos.filter((e) => {
    const blob = _norm(`${e.title || ''} ${e.summary || ''}`);
    return ks.some((k) => blob.includes(k));
  });
  return { fotos: fotosM, eventos: eventosM };
}

export function pessoasNoTexto(texto: string): Pessoa[] {
  const blob = _norm(texto || '');
  if (!blob) return [];
  return pessoasList.filter((p) => _chavesNome(p.name).some((k) => blob.includes(k)));
}

type _SegDoc = { s: string; t: string; text: string };
const _segsDoc = transcricaoDoc as _SegDoc[];

// Primeira menção de uma pessoa na transcrição do documentário (ou null).
export function pessoaNoDocumentario(nome: string): { t: string; s: number } | null {
  const ks = _chavesNome(nome);
  if (!ks.length) return null;
  const hit = _segsDoc.find((seg) => { const b = _norm(seg.text); return ks.some((k) => b.includes(k)); });
  return hit ? { t: hit.t, s: Number(hit.s) } : null;
}

// Todas as pessoas citadas no documentário, com a primeira menção, em ordem de tempo.
export function pessoasNoDocumentario(): { pessoa: Pessoa; t: string; s: number }[] {
  const out: { pessoa: Pessoa; t: string; s: number }[] = [];
  for (const p of pessoasList) {
    const m = pessoaNoDocumentario(p.name);
    if (m) out.push({ pessoa: p, t: m.t, s: m.s });
  }
  return out.sort((a, b) => a.s - b.s);
}

// Índice leve (nome + slug) para vincular pessoas em legendas/lightbox sem carregar todo o JSON.
export const pessoasIndexMin: { slug: string; name: string }[] = pessoasList.map((p) => ({ slug: pessoaSlug(p), name: p.name }));
