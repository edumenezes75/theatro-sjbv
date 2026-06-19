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
  related: string[]; status: string; bio?: string; source?: string; born?: string;
};
export type Curiosidade = { id: string; title: string; text: string; type: string; source: string };
export type Imagem = { file: string; alt: string; source: string; page: number; rights_note: string };

export const eventos = linhaDoTempo as Evento[];
export const pessoasList = pessoas as Pessoa[];
export const curiosidadesList = curiosidades as Curiosidade[];
export const imagensList = imagens as Imagem[];

import fotos from '@/data/fotos.json';
export type Foto = { id: string; file: string; category: string; categoryLabel: string; w: number; h: number; alt: string; credit: string };
export const fotosList = fotos as Foto[];
export const fotosByCategory = (cat: string) => fotosList.filter((f) => f.category === cat);

import antesDepois from '@/data/antes-depois.json';
export type ParAntesDepois = { id: string; title: string; caption: string; antes: string; depois: string; w: number; h: number; credit: string };
export const antesDepoisList = antesDepois as ParAntesDepois[];
