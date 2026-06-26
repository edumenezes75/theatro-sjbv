import linhaDoTempo from '@/data/linha-do-tempo.json';
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
