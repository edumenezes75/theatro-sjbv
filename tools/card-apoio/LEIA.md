# Card de apoio da campanha

O terceiro card de todo carrossel da campanha ("3 apoio.jpg") sai daqui.
É um só arquivo por formato, repetido em todos os posts — mudou um crédito,
regera os dois e substitui.

- `card.html` — a arte. Lê fontes, `assinaturas.png` e os logos de apoio de
  `public/evento/`. O padrão de fundo é o `pattern-tint.png` daqui (o
  `pattern.png` do site tem as linhas em branco, que somem sobre o creme).
- `gerar.mjs` — renderiza os dois formatos com Playwright.

Para trocar ou acrescentar um apoiador, mexa só no bloco `.apoios` do
`card.html`. Logo de fundo claro; se vier só em negativo, recolore o
wordmark pelo canal alfa e sangre a cor nos pixels transparentes, senão
o `mix-blend-mode: multiply` deixa um caixote atrás da marca.

Onde os arquivos gerados entram:
- `public/evento/publicar/img/apoio_feed.jpg` e `apoio_story.jpg`
- miniaturas em `public/evento/publicar/th/` (360x450 e 360x640)
- `campanha.zip` — 70 cópias, 41 no tamanho feed e 29 no story
- a legenda "Apoio: ..." em `public/evento/publicar/index.html`
