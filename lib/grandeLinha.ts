// A Grande Linha: a espinha única da história do Theatro.
// Junta os eventos datados (linha-do-tempo.json) com o recheio curado por era
// (grande-linha.json): fotos do acervo, vozes do filme/livro, dossiês e pessoas.
// A regra do projeto vale aqui: nenhuma foto usada na linha repete outra página.

import def from '@/data/grande-linha.json';
import { eventos, pessoaById, pessoaSlug, fotoById, type Evento, type Foto, type Pessoa } from '@/lib/data';

export type VozEra = { quote: string; autor: string; papel: string; segundo?: number; pos: number };
export type DossieEra = { slug: string; titulo: string; desc: string };
export type FotoEra = { foto: Foto; pos: number };
export type PessoaEra = { slug: string; name: string; role: string };

export type Era = {
  id: string;
  capitulo: number;
  anos: string;
  rail: string;
  titulo: string;
  abre: string;
  capAnchor: string;
  eventos: Evento[];
  fotos: FotoEra[];
  vozes: VozEra[];
  dossies: DossieEra[];
  pessoas: PessoaEra[];
};

type EraDef = {
  id: string; capitulo: number; anos: string; rail: string; titulo: string; abre: string;
  capAnchor: string; erasLinha: string[]; eventosIds?: string[]; excluirEventosIds?: string[];
  fotos: { id: string; pos: number }[]; vozes: VozEra[]; dossies: DossieEra[]; pessoas: string[];
};

export function getGrandeLinha(): Era[] {
  const defs = (def as { eras: EraDef[] }).eras;
  return defs.map((d) => {
    const evs = eventos.filter((e) => {
      if (d.eventosIds?.includes(e.id)) return true;
      if (d.excluirEventosIds?.includes(e.id)) return false;
      return d.erasLinha.includes(e.era);
    });
    const fotos = d.fotos
      .map((f) => ({ foto: fotoById(f.id), pos: f.pos }))
      .filter((f): f is FotoEra => !!f.foto);
    const pessoas = d.pessoas
      .map((id) => pessoaById(id))
      .filter((p): p is Pessoa => !!p)
      .map((p) => ({ slug: pessoaSlug(p), name: p.name, role: p.role }));
    return { ...d, eventos: evs, fotos, pessoas };
  });
}

// Intercala eventos e recheio numa sequência única, ordenada pela posição `pos`
// (o índice do evento após o qual cada peça entra). Assim o baile dos anos 1930
// aparece entre os eventos dos anos 1930, e a voz sobre 1946 perto de 1946.
// Os episódios NÃO entram aqui: eram 13 cartões dourados repetindo o mesmo
// rótulo. Agora saem como uma lista única no fim da era, montada em EraBloco.
export type Passo =
  | { tipo: 'evento'; evento: Evento }
  | { tipo: 'foto'; foto: Foto }
  | { tipo: 'voz'; voz: VozEra };

export function passosDaEra(era: Era): Passo[] {
  const out: Passo[] = [];
  const inserir = (apos: number): Passo[] => {
    const r: Passo[] = [];
    for (const f of era.fotos) if (f.pos === apos) r.push({ tipo: 'foto', foto: f.foto });
    for (const v of era.vozes) if (v.pos === apos) r.push({ tipo: 'voz', voz: v });
    return r;
  };
  out.push(...inserir(0));
  era.eventos.forEach((e, i) => {
    out.push({ tipo: 'evento', evento: e });
    out.push(...inserir(i + 1));
  });
  // recheio com pos além do nº de eventos entra no fim
  const n = era.eventos.length;
  for (const f of era.fotos) if (f.pos > n) out.push({ tipo: 'foto', foto: f.foto });
  for (const v of era.vozes) if (v.pos > n) out.push({ tipo: 'voz', voz: v });
  return out;
}
