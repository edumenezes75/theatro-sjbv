import type { Metadata } from 'next';
import ChapterHero from '@/components/ChapterHero';
import Comentarios from '@/components/Comentarios';

export const metadata: Metadata = {
  alternates: { canonical: '/livro-de-memorias' },
  title: 'Livro de Memórias',
  description: 'Deixe sua memória do Theatro Municipal de São João da Boa Vista — uma sessão de cinema, um baile, uma noite no palco. O livro de memórias vivo da cidade.',
};

export default function LivroDeMemoriasPage() {
  return (
    <article>
      <ChapterHero
        eyebrow="A cidade escreve sua própria história"
        title="Livro de Memórias"
        image="/fotos/hr2-sala-05.jpg"
        alt="A sala em ferradura do Theatro Municipal, com os camarotes e as poltronas vermelhas."
      />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <p className="max-w-reading font-read text-lg leading-relaxed text-ink/85 dark:text-cream/85">
          O Theatro é feito também de lembranças. A primeira sessão de cinema, um baile de Carnaval, uma estreia, um nome no palco, a emoção de entrar pela primeira vez. Se você viveu o Theatro — ou ouviu histórias de quem viveu —, deixe aqui o seu registro. Aos poucos, estas páginas se tornam a memória viva da cidade.
        </p>
        <Comentarios
          tipo="memoria"
          titulo="Escreva a sua memória"
          intro="Conte uma lembrança ligada ao Theatro: o que aconteceu, quando, com quem. Toda memória é bem-vinda."
          placeholder="Era uma noite de…"
          vazio="Ainda não há memórias publicadas. Seja a primeira pessoa a escrever no livro."
        />
      </div>
    </article>
  );
}
