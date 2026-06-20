'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { Imagem } from '@/lib/data';
import { IconClose } from './Icons';

export default function Galeria({ imagens }: { imagens: Imagem[] }) {
  const [open, setOpen] = useState<Imagem | null>(null);
  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {imagens.map((img) => (
          <button key={img.file} onClick={() => setOpen(img)} className="group block w-full overflow-hidden rounded-sm text-left">
            <span className="relative block">
              <Image src={`/media/${img.file}`} alt={img.alt} width={600} height={420} className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width:640px) 100vw, 33vw" />
            </span>
            <span className="mt-1.5 block font-sans text-xs text-ink/70 dark:text-cream/70">{img.alt} <span className="italic">— {img.source}, p. {img.page}.</span></span>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/90 p-5" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.alt}>
          <button onClick={() => setOpen(null)} aria-label="Fechar" className="absolute right-5 top-5 text-cream/80 hover:text-gold"><IconClose size={26} /></button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={`/media/${open.file}`} alt={open.alt} width={1400} height={1000} className="max-h-[78vh] w-auto rounded-sm object-contain" />
            <figcaption className="mt-3 font-sans text-sm text-cream/80">
              {open.alt}<br />
              <span className="text-cream/60">Procedência: {open.source}, p. {open.page}. {open.rights_note}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
