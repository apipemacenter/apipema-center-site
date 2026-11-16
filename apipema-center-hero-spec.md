# Apipema Center --- Especificação da Hero Section

## 1. Objetivo

Implementar a navegação principal e a hero section da página inicial do
**Apipema Center**, em versão desktop-first, com adaptação completa para
tablet e mobile.

A direção visual deve transmitir a experiência de um centro comercial
contemporâneo, acolhedor e sofisticado, tomando como referência a
clareza de navegação e a apresentação institucional de shoppings como
Shopping Itaigara e Shopping Paseo --- sem reproduzir diretamente seus
layouts.

A interface deve respeitar a identidade visual do Apipema Center, tendo
como cor principal o verde **`#96BE3D`**, com base clara, tipografia
elegante, bastante respiro e fotografia arquitetônica como elemento de
destaque.

## 2. Stack definida

-   **Astro** --- estrutura da página, componentes e build estático.
-   **SCSS (Sass)** --- estilos organizados por componentes, tokens e
    breakpoints.
-   **GSAP** --- animações de entrada e microinterações.
-   **TypeScript** --- tipagem para scripts e componentes interativos.
-   **Lucide** --- ícones consistentes em SVG (ou SVGs próprios quando
    necessário).
-   **CSS Grid e Flexbox** --- composição e responsividade.
-   **Google Fonts ou fonte local** --- preferencialmente uma sans-serif
    geométrica e contemporânea, com boa legibilidade.

Evitar adicionar bibliotecas de UI ou animação pesadas sem necessidade.
A interface deve continuar funcional mesmo se o JavaScript ou as
animações não forem executados.

## 3. Direção visual

### Paleta

  -------------------------------------------------------------------------
  Token                   Cor                       Aplicação
  ----------------------- ------------------------- -----------------------
  `--color-brand`         `#96BE3D`                 CTAs, destaques e
                                                    elementos ativos

  `--color-brand-dark`    `#789C2C`                 Hover e estados de
                                                    maior contraste

  `--color-ink`           `#252321`                 Títulos, navegação e
                                                    textos

  `--color-muted`         `#6F706B`                 Textos auxiliares

  `--color-surface`       `#F7F6F0`                 Fundo principal

  `--color-white`         `#FFFFFF`                 Navegação e superfícies
                                                    claras

  `--color-line`          `rgba(37, 35, 33, .16)`   Divisores e bordas
                                                    sutis
  -------------------------------------------------------------------------

O verde deve funcionar como acento e não como preenchimento dominante de
toda a página. Priorizar fundos off-white, transparências discretas e
contraste confortável.

### Linguagem visual

-   Clean, orgânica e premium, sem excesso de ornamentos.
-   Cantos arredondados moderados, especialmente na navegação e nos
    botões.
-   Sombras suaves e pouco perceptíveis.
-   Formas curvas verdes podem aparecer nas extremidades inferiores e
    laterais da composição, sem competir com o conteúdo.
-   Fotografia ampla de um interior comercial claro, com vegetação,
    circulação e vitrines.
-   Evitar gradientes saturados, excesso de glassmorphism, ícones
    decorativos em excesso e aparência genérica de template.

## 4. Estrutura da seção

A seção deve ocupar aproximadamente a primeira dobra da página em
desktop, considerando uma viewport de referência de **1440 × 900 px**. A
composição pode crescer verticalmente conforme o conteúdo e a altura da
tela.

``` text
HomePage
└── HeroSection
    ├── SiteHeader
    │   ├── BrandLogo
    │   ├── MainNavigation
    │   ├── SearchTrigger
    │   └── DirectionsButton
    ├── HeroBackground / HeroImage
    ├── HeroContent
    │   ├── HeroTitle
    │   ├── HeroDescription
    │   └── PrimaryCTA
    ├── Amenities
    │   ├── StoresItem
    │   ├── FoodCourtItem
    │   └── ParkingItem
    └── DecorativeShapes
```

### 4.1 Navegação principal

Criar uma barra horizontal flutuante, com fundo branco levemente
translúcido, bordas arredondadas e alinhamento centralizado.

**Elementos, da esquerda para a direita:**

1.  Logotipo oficial do Apipema Center.
2.  Links de navegação:
    -   Início
    -   Lojas
    -   Serviços
    -   O Center
    -   Contato
3.  Ícone de busca.
4.  Botão contornado "Como chegar", com ícone de localização.

**Comportamento e estilo:**

-   Altura aproximada entre 82 e 96 px em desktop.
-   Largura limitada por um container central, com margens laterais
    generosas.
-   O item ativo deve usar o verde da marca e um sublinhado fino.
-   Links com espaçamento amplo e estados de hover discretos.
-   Botão "Como chegar" com borda verde, formato pill e fundo
    transparente; no hover, pode receber preenchimento verde e texto
    branco.
-   A busca deve ser um botão acessível, não apenas um ícone visual.
-   Em desktop, a navegação permanece em uma única linha.
-   Em telas menores, substituir os links por um menu compacto com botão
    de menu e painel acessível.

A navegação pode assumir comportamento sticky após a primeira dobra,
desde que a transição seja sutil e não provoque mudança brusca de
layout.

### 4.2 Hero visual

Usar uma fotografia horizontal de alta qualidade de um ambiente
comercial contemporâneo. A imagem deve ocupar principalmente a metade
direita da composição, podendo se estender pelo fundo da seção.

**Tratamento da imagem:**

-   `object-fit: cover`.
-   Ponto focal preferencial no centro-direita, preservando a
    arquitetura e a vegetação.
-   Aplicar uma máscara ou gradiente claro na região esquerda para
    garantir a leitura do texto.
-   Não aplicar desfoque excessivo nem escurecer toda a fotografia.
-   Usar uma imagem otimizada em AVIF ou WebP, com fallback adequado.

A fotografia deve ser tratada como conteúdo visual principal, e não como
um pequeno card.

### 4.3 Conteúdo textual

O bloco textual fica à esquerda, com largura controlada para manter a
hierarquia.

**Título principal:**

> Tudo o que você precisa,\
> em um só lugar.

A primeira linha deve usar peso regular ou médio, em tom escuro. A
segunda linha deve receber peso mais forte e o verde `#96BE3D`.

**Texto de apoio:**

> O Apipema Center é o seu ponto de encontro em Ondina, com lojas,
> serviços e conveniência para o seu dia a dia.

Manter largura confortável, entre 440 e 520 px em desktop, com
entrelinha generosa.

**CTA principal:**

> Venha nos visitar

Botão verde preenchido, texto branco, formato arredondado e seta
discreta à direita. O botão deve ter estados de hover, foco e active.

**Importante:** não incluir a chamada "COMPRAS • SERVIÇOS • BEM-ESTAR"
acima do título. Esse elemento foi removido da direção aprovada.

### 4.4 Faixa de conveniências

Na parte inferior esquerda da hero, exibir três informações em linha,
separadas por divisores verticais finos:

-   **Lojas variadas** --- ícone de sacola.
-   **Praça de alimentação** --- ícone de prato/cúpula.
-   **Estacionamento conveniente** --- ícone de carro.

Os ícones devem ser lineares, monocromáticos e visualmente consistentes.
Cada item deve combinar ícone e texto em uma composição horizontal.

Em telas estreitas, permitir quebra em duas linhas ou transformar os
itens em uma grade compacta, sem comprimir a tipografia.

## 5. Layout e responsividade

### Desktop --- a partir de 1200 px

-   Navegação flutuante centralizada no topo.
-   Hero com texto à esquerda e fotografia predominante à direita.
-   Título em escala grande, com largura controlada.
-   Conveniências alinhadas na base esquerda.
-   Formas curvas verdes discretas nos cantos inferiores.

### Tablet --- 768 px a 1199 px

-   Reduzir espaçamentos e escala tipográfica.
-   Manter o conceito de texto sobre área clara e imagem ao fundo/lado.
-   Ajustar a navegação para menos itens visíveis ou menu compacto,
    conforme a largura real.
-   Evitar sobreposição entre título, CTA e imagem.

### Mobile --- até 767 px

-   Header compacto com logo e botão de menu.
-   Menu expandido com links em coluna, foco visível e fechamento por
    teclado.
-   Hero preferencialmente empilhada: texto primeiro e imagem abaixo, ou
    imagem como fundo com overlay suficiente para legibilidade.
-   Título com tamanho fluido usando `clamp()`.
-   CTA com área de toque mínima de 44 × 44 px.
-   Conveniências em grade de uma ou duas colunas.
-   Remover ou simplificar formas decorativas que prejudiquem a leitura.

Não reduzir simplesmente a versão desktop até caber no celular:
reorganizar a hierarquia para cada breakpoint.

## 6. Animações e microinterações (GSAP)

As animações devem reforçar a entrada visual sem atrasar o acesso ao
conteúdo.

### Sequência inicial sugerida

1.  Header: fade-in com deslocamento vertical curto.
2.  Título: entrada suave por linha, com `y` entre 18 e 28 px.
3.  Texto de apoio: fade-in com pequeno atraso.
4.  CTA: fade-in e deslocamento sutil.
5.  Itens de conveniência: entrada em sequência com stagger curto.
6.  Imagem: revelação com scale muito discreto ou fade-in.

**Parâmetros de referência:**

-   Duração entre 0.45 s e 0.85 s.
-   Easing `power2.out` ou `power3.out`.
-   Stagger entre 0.08 s e 0.12 s.
-   Evitar parallax intenso, movimentos contínuos e animações que causem
    distração.

### Acessibilidade de movimento

Respeitar `prefers-reduced-motion: reduce`. Nesse caso, remover
deslocamentos e transições não essenciais. O conteúdo deve estar visível
mesmo se o GSAP falhar ou estiver desativado.

## 7. Organização sugerida do projeto

``` text
src/
├── components/
│   ├── Header/
│   │   ├── Header.astro
│   │   └── Header.scss
│   ├── Hero/
│   │   ├── Hero.astro
│   │   ├── Hero.scss
│   │   └── hero-animations.ts
│   ├── Amenities/
│   │   ├── Amenities.astro
│   │   └── Amenities.scss
│   └── Icon/
│       └── Icon.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── scripts/
│   └── navigation.ts
└── styles/
    ├── abstracts/
    │   ├── _variables.scss
    │   ├── _mixins.scss
    │   └── _breakpoints.scss
    ├── base/
    │   ├── _reset.scss
    │   └── _global.scss
    └── main.scss

public/
├── images/
│   ├── apipema-hero.avif
│   └── apipema-hero.webp
└── brand/
    └── apipema-center-logo.svg
```

A estrutura pode ser ajustada conforme o projeto existente. Evitar criar
componentes excessivamente pequenos sem ganho real de reutilização.

## 8. Tokens e padrões de implementação

Centralizar cores, espaçamentos, raios, sombras e breakpoints em
variáveis SCSS.

Exemplo inicial:

``` scss
:root {
  --color-brand: #96BE3D;
  --color-brand-dark: #789C2C;
  --color-ink: #252321;
  --color-muted: #6F706B;
  --color-surface: #F7F6F0;
  --color-white: #FFFFFF;

  --content-width: 1440px;
  --page-gutter: clamp(1.25rem, 5vw, 5rem);

  --radius-nav: 999px;
  --radius-button: 999px;

  --shadow-nav: 0 10px 35px rgba(37, 35, 33, 0.08);
}
```

Usar `clamp()` para tipografia e espaçamentos fluidos. Definir um
container consistente para alinhar header, conteúdo e elementos
inferiores.

## 9. Acessibilidade e qualidade

-   Usar landmarks semânticos: `header`, `nav`, `main` e `section`.
-   Garantir hierarquia correta de títulos, com apenas um `h1`
    principal.
-   Todo botão e link deve ter nome acessível.
-   Ícones decorativos devem usar `aria-hidden="true"`.
-   A busca e o menu mobile devem funcionar por teclado.
-   Incluir estados `:focus-visible` perceptíveis.
-   Verificar contraste entre verde, branco e texto.
-   Adicionar `alt` descritivo à imagem quando ela transmitir
    informação; usar `alt=""` se for puramente decorativa.
-   Evitar CLS reservando dimensões para imagens e elementos visuais.
-   Otimizar fontes, imagens e scripts.
-   Carregar GSAP apenas onde necessário e evitar animações que
    bloqueiem a renderização.

## 10. Critérios de aceite

-   [ ] A identidade do Apipema Center e o verde `#96BE3D` estão
    preservados.
-   [ ] A navegação contém logo, links, busca e "Como chegar".
-   [ ] O texto principal corresponde à redação aprovada.
-   [ ] A chamada "COMPRAS • SERVIÇOS • BEM-ESTAR" não aparece.
-   [ ] A fotografia tem presença forte e não compromete a leitura.
-   [ ] Os três itens de conveniência estão presentes.
-   [ ] A composição funciona em desktop, tablet e mobile.
-   [ ] O menu mobile é acessível por teclado.
-   [ ] As animações respeitam `prefers-reduced-motion`.
-   [ ] A página permanece utilizável sem JavaScript.
-   [ ] Não há rolagem horizontal indesejada, sobreposição ou saltos de
    layout.

## 11. Observações finais

A referência visual aprovada deve orientar proporções, hierarquia e
atmosfera, mas a implementação precisa ser construída com HTML semântico
e CSS real --- não como uma imagem única de fundo.

Usar o logotipo oficial fornecido pelo projeto, sem redesenhá-lo ou
distorcer suas proporções. A fotografia de referência pode ser
substituída por uma imagem real do Apipema Center quando disponível; não
apresentar uma imagem ilustrativa como se fosse uma fotografia
documental do empreendimento.

O resultado esperado é uma primeira dobra institucional, sofisticada e
acolhedora, com navegação clara e uma mensagem imediata: o Apipema
Center reúne conveniência, serviços e experiências em Ondina.
