# VISÃO DO ARTISTA — Documento de Revisão de Cenas
**SAERIX Portfolio · Sérgio Alexandre**
*Última atualização: Jun 2026*

---

> Este documento mapeia cada cena do portfólio em ordem de scroll — o que está na tela, o que está escrito, como se move. Serve como referência para revisões de imagem, copy e visão artística.

---

## ESTRUTURA DO SITE

O site tem **dois caminhos** a partir de uma tela de entrada única:

```
lxndr-portifolio.vercel.app/[locale]/
                 │
                 ├── /dev    → Portfólio Engenheiro de Software
                 └── /lxndr  → LXNDR · Artista Eletrônico
```

Idiomas suportados: `en` (inglês) e `pt-BR` (português do Brasil).  
A troca é feita via botão **EN/PT** no canto superior direito.

---

---

# ⬡ ENTRADA — PORTAL

**Rota:** `/[locale]/`  
**Componente:** `PortalPage`  
**Arquivo:** `components/portal/portal-page.tsx`

### Conceito
Tela de escolha de identidade. O visitante chega antes de qualquer conteúdo e decide qual caminho quer entrar: o engenheiro ou o artista. É a afirmação de que as duas identidades coexistem, mas são universos distintos.

### Visual
- Fundo preto total com textura de grain e grade geométrica sutil
- Duas linhas verticais decorativas translúcidas (em 20% e 80% da largura)
- Header mínimo: logo **"SA."** à esquerda + botão de idioma à direita

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título principal (H1) | **SÉRGIO ALEXANDRE** | **SÉRGIO ALEXANDRE** |
| Subtítulo | CHOOSE YOUR PATH | ESCOLHA SEU CAMINHO |
| Card 01 — label | SOFTWARE ENGINEER | ENGENHEIRO DE SOFTWARE |
| Card 01 — sub | Full-stack · Next.js · TypeScript | Full-stack · Next.js · TypeScript |
| Card 01 — CTA | ENTER | ENTRAR |
| Card 02 — label | LXNDR | LXNDR |
| Card 02 — sub | Techno · Psytrance · Sonic Ritual | Techno · Psytrance · Ritual Sônico |
| Card 02 — CTA | ENTER | ENTRAR |
| Rodapé da tela | RAW SIGNAL / TRANSMISSION | SINAL BRUTO / TRANSMISSÃO |

### Cards
- **Card DEV** — borda superior **roxa** (`#7C3AED`), ícone de 4 quadrados à direita. Ao hover: título fica roxo claro + linha se expande.
- **Card LXNDR** — borda superior **magenta** (`var(--lxndr-pink)`), ícone de triângulo + círculo. Ao hover: título fica magenta + linha se expande.

### Animação (GSAP)
1. Título entra de baixo com fade (0.9s)
2. Subtítulo "choose your path" entra logo depois (0.7s)
3. Ruído de rodapé aparece (0.6s)
4. Card DEV entra da esquerda (`x: -60 → 0`, 0.8s)
5. Card LXNDR entra da direita (`x: 60 → 0`, 0.8s), com sobreposição de 0.6s

---

---

# ◈ CAMINHO 01 — PORTFÓLIO DO ENGENHEIRO

**Rota:** `/[locale]/dev`  
**Arquivo:** `app/[locale]/dev/page.tsx`

### Elementos Globais
- **Barra de progresso de scroll** no topo (fina, preta/branca, marca as seções: intro, manifesto, proof, origin, journey, skills, vision, blog, connect)
- **Cursor magnético personalizado** — cursor nativo escondido no desktop, substituído por um ponto que é atraído por elementos interativos
- **MatrixZone** — wrapper que renderiza chuva de Matrix animada no fundo durante as seções Proof → Skills

---

## CENA 01 — NAV

**Componente:** `PortfolioNav`  
**Arquivo:** `components/portfolio/nav.tsx`

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Logo | LXNDR | LXNDR |
| Link 1 | ABOUT | SOBRE |
| Link 2 | PROJECTS | PROJETOS |
| Link 3 | ESSAYS | ENSAIOS |
| Link 4 | LABORATORY | LABORATÓRIO |
| Link 5 | CONTACT | CONTATO |

### Visual
- Barra fixa no topo, fundo transparente que fica sólido ao scrollar
- Fonte Bebas Neue, uppercase, espaçamento largo
- Botão de idioma + botão de tema (sol/lua) à direita

---

## CENA 02 — INTRO / HERO

**Componente:** `PortfolioIntro`  
**Arquivo:** `components/portfolio/intro.tsx`  
**Seção de scroll:** `data-section="intro"`

### Conceito
A primeira impressão. O nome domina a tela. Não há foto — só tipografia, peso, e a afirmação de identidade. O nome está duas vezes: uma preenchida, uma contornada (outline), criando profundidade e tensão gráfica.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Nome linha 1 (filled) | **SÉRGIO** | **SÉRGIO** |
| Nome linha 2 (outline) | **ALEXANDRE** | **ALEXANDRE** |
| Título / role | SOFTWARE ENGINEER | SOFTWARE ENGINEER |
| Localização | LONDRINA, BR | LONDRINA, BR |
| Tagline | I build the tools I wish existed — music, systems, and experiments. | Faço as ferramentas que eu gostaria que existissem — música, sistemas, experimentos. |
| CTA principal | See My Work | Ver Meu Trabalho |
| CTA secundário | Download CV | Baixar CV |
| Scroll hint | Scroll to explore | Role para explorar |
| Âncora do manifesto | I am not a programmer. I am a creator. | Eu não sou um programador. Eu sou um criador. |
| Sub do manifesto | I build what I wished existed. | Eu construo o que eu queria que existisse. |

### Stats visíveis
```
3+ YEARS   ·   20K+ LINES   ·   15+ PROJECTS   ·   99% UPTIME
```
*(valores aproximados baseados no screenshot)*

### Visual
- Fundo preto, tipografia Bebas Neue
- "SÉRGIO" em branco sólido — grande, agressivo
- "ALEXANDRE" em outline (text-stroke) — mesma escala, mas vazado
- O nome "LXNDR" aparece como elemento fantasma/decorativo em outline no lado direito, ultrapassando os limites da tela
- CTA principal em **laranja** (`#ff6600`) — cor Evangelion
- CTA secundário em outline branco
- Blobs abstratos no fundo + grain texture

### Animação (GSAP)
- Reveal character-by-character do nome (`SplitTextReveal`)
- Elementos entram em sequência: nome → role → tagline → CTAs → stats
- Scroll indicator pulsa suavemente
- Parallax sutil no fundo ao scrollar

---

## CENA 03 — MANIFESTO

**Componente:** `Manifesto`  
**Arquivo:** `components/portfolio/manifesto.tsx`  
**Seção de scroll:** `data-section="manifesto"`

### Conceito
Declaração de princípios. Não uma bio — um manifesto. Quatro linhas curtas que definem a mentalidade de quem constrói ferramentas por necessidade, não por currículo.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título | **THE MANIFESTO_** | **O MANIFESTO_** |
| Linha 1 | I don't use technology. I shape it. | Não uso tecnologia. Eu a moldo. |
| Linha 2 | If the tool doesn't serve me, I make another. | Se a ferramenta não me serve, eu crio outra. |
| Linha 3 | Frustration becomes code. Code becomes system. | O incômodo vira código. Código vira sistema. |
| Linha 4 | It's not about lines. It's about how I think. | Não é sobre linhas. É sobre como eu penso. |
| Fechamento | **I build what I wished existed.** | **Eu construo o que eu gostaria que existisse.** |

### Visual
- Seção com muito espaço negativo
- Fonte grande, linhas tratadas como declarações isoladas
- `_` no final do título é assinatura visual recorrente em todo o portfólio

### Animação (GSAP — `ScrollTextReveal`)
- Seção **pinada** no scroll: a página para enquanto as linhas aparecem uma por uma
- Reveal palavra por palavra, sincronizado com o progresso do scroll
- Linha de SVG se desenha à medida que o texto avança
- Fechamento aparece por último com peso visual maior

---

## CENA 04 — THE PROOF

**Componente:** `PortfolioProof`  
**Arquivo:** `components/portfolio/proof.tsx`  
**Seção de scroll:** `data-section="proof"`  
**Background:** MatrixZone ativo (chuva de Matrix no fundo)

### Conceito
Projetos como prova de conceito. Cada projeto tem uma origem pessoal — nasce de um incômodo, de querer algo que não existia do jeito certo. O número de card reforça a ordem cronológica/lógica.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título da seção | **THE PROOF_** | **A PROVA_** |

**Cards de projetos:**

| # | Título | Tagline (EN) | Tech |
|---|---|---|---|
| 01 | **MATRIX RAIN** | The terminal matrix effects I found online were neat but never quite mine. I rewrote it. | PYTHON · CURSES · TERMINAL · KATAKANA |
| 02 | **LIGHTSYNC** | I wanted my room's lights to match my screen. Nothing did it the way I wanted. So I built LightSync. | HARDWARE · SOFTWARE · AUTOMATION |
| 03 | **THINKFLOW** | I built the assistant I wished existed — a personal flow manager and thinking tool. | FASTAPI · REACT · TYPESCRIPT |
| 04 | **COMO-ELES-VOTARAM** | I wanted to know how politicians voted, simply and clearly — so I made a transparency tool. | T3 STACK · NEXT.JS · PRISMA · TRPC |
| 05 | **UNION AUDIO** | Where my music and engineering meet — products I help build while composing on the side. | NEXT.JS 16 · REACT 19 · TURBOREPO · TAILWIND |
| 06 | **BARBER APP** | Led the product from scratch — architecting the platform while building the team and features. | NEXT.JS 16 · PRISMA · NEXTAUTH · N8N |

**Taglines PT-BR:**
- 01: As implementações que eu via não me serviam. Fiz a minha: Python + curses, Katakana, degradês e temas.
- 02: Queria que a luz do meu quarto acompanhasse a cor do monitor. Não existia do jeito que eu queria. Fiz o LightSync.
- 03: Construí o assistente que eu queria ter — um gerenciador de fluxo pessoal e ferramenta de pensamento.
- 04: Queria saber como os políticos votavam, de forma simples e direta — então construí essa ferramenta de transparência.
- 05: Onde música e engenharia se encontram — produtos que construo enquanto componho nas horas vagas.
- 06: Liderei o produto do zero — arquitetando a plataforma enquanto construía a equipe e os recursos.

### Visual
- Cards em grid (2 colunas no desktop, 1 no mobile)
- Fundo: Matrix rain animada (caracteres Katakana caindo em verde/preto)
- Número do projeto em tipografia monospaced, menor
- Tech chips como tags em uppercase

### Animação (GSAP)
- Cards entram com tilt 3D ao scroll
- Hover: card inclina em 3D seguindo o mouse (`3D card tilt`)
- Tech chips têm delay escalonado

---

## CENA 05 — THE ORIGIN

**Componente:** `PortfolioOrigin`  
**Arquivo:** `components/portfolio/origin.tsx`  
**Seção de scroll:** `data-section="origin"`  
**Background:** MatrixZone ativo

### Conceito
A origem da mentalidade. Não uma lista de habilidades — três cards que representam estados mentais: a pergunta, a obsessão, a evolução. Mais filosofia do que currículo.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título | **THE ORIGIN_** | **A ORIGEM_** |
| Card 1 — título | THE QUESTION | A PERGUNTA |
| Card 1 — quote | "Why does this work the way it does? And can I make it work my way?" | "Por que isso funciona desse jeito? E será que eu consigo fazer funcionar do meu jeito?" |
| Card 2 — título | THE OBSESSION | A OBSESSÃO |
| Card 2 — quote | "If the tool doesn't fit me, I build another." | "Se a ferramenta não me serve, eu faço outra." |
| Card 3 — título | THE EVOLUTION | A EVOLUÇÃO |
| Card 3 — desc | From curiosity to craft. Every tool I build was born from frustration. | Da curiosidade ao ofício. Cada ferramenta que construo nasceu de um incômodo. |

**Badges informativos:**
| Badge | EN | PT-BR |
|---|---|---|
| Educação | EDUCATION · Systems Analysis & Development · UTFPR — Graduating 2026 | FORMAÇÃO · Análise e Desenvolvimento de Sistemas · UTFPR — Formatura 2026 |
| Inglês | ENGLISH · C2 Full Proficiency · EF SET 72/100 | INGLÊS · C2 Proficiência Completa · EF SET 72/100 |
| Experiência | EXPERIENCE · 3+ Years · Agile & Monorepo | EXPERIÊNCIA · 3+ Anos · Ágil & Monorepo |

### Visual
- Cards com borda espessa, sombra offset (estilo brutalist)
- Aspas das quotes em tipografia grande como elemento decorativo
- Badges abaixo com layout compacto, monospaced

### Animação (GSAP)
- Cards entram com parallax de profundidades diferentes
- Scroll: cards sobem de posições ligeiramente escalonadas

---

## CENA 06 — THE JOURNEY

**Componente:** `PortfolioJourney`  
**Arquivo:** `components/portfolio/journey.tsx`  
**Seção de scroll:** `data-section="journey"`  
**Background:** MatrixZone ativo

### Conceito
A trajetória resumida em milestones com métricas. Não é um CV — é uma linha do tempo de crescimento com números que provam escala.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título | **THE JOURNEY_** | **A JORNADA_** |

**Milestones:**
| # | Role (EN) | Role (PT-BR) | Métrica | Label (EN) | Label (PT-BR) |
|---|---|---|---|---|---|
| 1 | Development Intern | Estagiário de Desenvolvimento | **4** | DEVS LED | DEVS LIDERADOS |
| 2 | Ops & Support Trainee | Trainee Ops & Suporte | **10** | MONTHS SOLID | MESES FIRME |
| 3 | Software Dev Intern | Estagiário de Software | **100+** | COMPONENTS | COMPONENTES |
| 4 | Software Engineer | Engenheiro de Software | **2** | PRODUCTS LED | PRODUTOS LIDERADOS |

| Conclusão (EN) | Conclusão (PT-BR) |
|---|---|
| The best way to learn is to build something that didn't exist before. | A melhor forma de aprender é construir algo que não existia. |

### Visual
- Cards em linha horizontal ou grid 2x2
- Métrica em tipografia enorme (Bebas Neue)
- Linha de progresso conectando os cards, desenhada ao scroll

### Animação (GSAP)
- Linha de progresso cresce ao scrollar
- Cards entram alternadamente da esquerda e direita
- Números das métricas contam de 0 até o valor final

---

## CENA 07 — THE STACK

**Componente:** `PortfolioSkills`  
**Arquivo:** `components/portfolio/skills.tsx`  
**Seção de scroll:** `data-section="skills"`  
**Background:** MatrixZone ativo

### Conceito
Não uma tabela de tecnologias — um mapa organizado por contexto de uso. O que uso todo dia, como construo sistemas, como garanto qualidade.

### O que está escrito

| Grupo | EN | PT-BR |
|---|---|---|
| Título | **THE STACK_** | **A STACK_** |
| Grupo 1 | CORE — WHAT I USE DAILY | CORE — O QUE USO DIARIAMENTE |
| Grupo 2 | ARCHITECTURE — HOW I BUILD SYSTEMS | ARQUITETURA — COMO CONSTRUO SISTEMAS |
| Grupo 3 | TESTING — HOW I ENSURE QUALITY | TESTES — COMO GARANTO QUALIDADE |
| Grupo 4 | ALSO PROFICIENT | TAMBÉM PROFICIENTE EM |

*Tecnologias específicas de cada grupo residem no código do componente (não nos arquivos de tradução).*

### Visual
- Cards de tecnologia com ícones + nome
- Separação visual clara entre os grupos
- Hover: card sobe com sombra

### Animação (GSAP)
- Cards entram escalonados ao scroll
- Hover: lift suave com sombra offset

---

## CENA 08 — THE VISION

**Componente:** `PortfolioVision`  
**Arquivo:** `components/portfolio/vision.tsx`  
**Seção de scroll:** `data-section="vision"`

### Conceito
O que ele busca no próximo passo. Uma declaração de intenção — não uma lista de requisitos, mas uma voz com posição clara sobre o tipo de trabalho e ambiente que faz sentido.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título | **THE VISION_** | **A VISÃO_** |
| Quote principal | I don't just write code that works. I think about why it works — and whether it could work my way. | Não escrevo só código que funciona. Penso em por que funciona — e se poderia funcionar do meu jeito. |
| Sub-título | WHAT I'M LOOKING FOR | O QUE ESTOU BUSCANDO |
| Item 1 | A place that sees more than a developer closing tickets — I want room to think, build, and leave my fingerprint on the product. | Quero estar num lugar que enxergue quem eu sou de verdade — não só alguém que fecha ticket, mas alguém que pensa produto e constrói solução. |
| Item 2 | Problems that bother me enough to make me chase the root of them until they turn into systems. | Procuro problemas que me irritem o bastante para eu ir até o fundo e transformar isso em sistema. |
| Item 3 | Work that feels alive: products I can shape for real, not just keep warm until the next sprint. | Quero trabalho em que eu possa mexer de verdade no rumo da coisa, não só cumprir etapa e passar para a próxima. |

### Visual
- Quote em tipografia grande, quase como uma frase de efeito de poster
- 3 cards de "o que busco" com ícone ou número de referência
- Seção mais "limpa", com mais espaço branco que as anteriores
- `GlitchText` no título

### Animação (GSAP)
- Quote entra com parallax
- Título com efeito glitch
- Cards dos itens entram em stagger

---

## CENA 09 — BLOG SHOWCASE

**Componente:** `PortfolioBlogShowcase`  
**Arquivo:** `components/portfolio/blog-showcase.tsx`  
**Seção de scroll:** `data-section="blog"`

### Conceito
Teaser dos escritos. Mostra os 2 posts mais recentes de ensaios e convida para a seção completa.

### Posts publicados (Essays)
1. **GSAP: Mastering Web Animations** — sobre animações avançadas com GSAP
2. **React Hooks: A Deep Dive** — sobre hooks avançados em React
3. **I Built My Own Matrix Rain Because cmatrix Wasn't Good Enough** — o projeto Matrix Rain
4. **TypeScript: Advanced Type Patterns** — padrões avançados de tipos

*Os 2 mais recentes aparecem como cards nesta seção.*

### O que está escrito
- Subtítulo da seção: **THOUGHTS, IDEAS & RESEARCH** / **PENSAMENTOS, IDEIAS & PESQUISAS**
- Cada card: título do post, tempo de leitura, data, tags
- CTA: **VIEW ALL POSTS** / **VER TODOS OS POSTS**

### Animação (GSAP)
- Cards revelam em stagger ao entrar na viewport

---

## CENA 10 — CONNECT

**Componente:** `PortfolioConnect`  
**Arquivo:** `components/portfolio/connect.tsx`  
**Seção de scroll:** `data-section="connect"`

### Conceito
CTA final. Uma declaração de posição — não um formulário frio, mas uma frase que diz exatamente o que ele quer construir. Os dados de contato são diretos, sem fricção.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título / CTA | LET'S BUILD\nSOMETHING\nWORTH BUILDING. | VAMOS CRIAR\nALGO QUE\nVALE A PENA. |
| Label localização | LOCATION | LOCALIZAÇÃO |
| Valor localização | LONDRINA, PR — BRASIL | LONDRINA, PR — BRASIL |
| Label inglês | ENGLISH | INGLÊS |
| Valor inglês | C2 PROFICIENCY (EF SET 72/100) | C2 PROFICIÊNCIA (EF SET 72/100) |
| Label disponibilidade | AVAILABILITY | DISPONIBILIDADE |
| Valor disponibilidade | OPEN TO OPPORTUNITIES | ABERTO A OPORTUNIDADES |

**Links de contato (cards):**
- Email: `sergioalexandre0716@gmail.com`
- LinkedIn: `linkedin.com/in/serg-alexandre`
- GitHub
- Telefone: `+55 43 98873-2020`

### Visual
- Fundo escuro, tipografia enorme para o CTA
- Quebras de linha no texto criam hierarquia visual ("três linhas como um pôster")
- Cards de contato com layout compacto, borda espessa brutalist
- Tiles informativos (localização, idioma, disponibilidade)

### Animação (GSAP)
- CTA entra com split reveal (letras de cima e de baixo)
- Título com efeito glitch no hover
- Cards de contato em parallax ao scroll
- Tiles entram em stagger

---

## CENA 11 — FOOTER

**Componente:** `PortfolioFooter`  
**Arquivo:** `components/portfolio/footer.tsx`

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Nome | SÉRGIO ALEXANDRE | SÉRGIO ALEXANDRE |
| Role | SOFTWARE ENGINEER | ENGENHEIRO DE SOFTWARE |
| GitHub | GITHUB → | GITHUB → |
| LinkedIn | LINKEDIN → | LINKEDIN → |
| Email | EMAIL → | EMAIL → |
| Telefone | PHONE → | TELEFONE → |
| Copyright | ALL RIGHTS RESERVED | TODOS OS DIREITOS RESERVADOS |
| Assinatura | BUILT MY WAY ❤️ | FEITO DO MEU JEITO ❤️ |

### Visual
- Fundo branco (contraste com o restante do portfólio)
- Nome e role em Bebas Neue, grande e sólido
- Links sociais em linha com seta →
- "BUILT MY WAY ❤️" como assinatura pessoal — linha mais humana no final de um portfólio técnico

---

---

# ◈ CAMINHO 02 — LXNDR

**Rota:** `/[locale]/lxndr`  
**Arquivo:** `app/[locale]/lxndr/page.tsx`  
**Meta:** "LXNDR is a Paraná-based electronic artist moving through techno, psytrance, industrial tension and sonic ritual."

### Linguagem visual global do LXNDR
- Fundo preto absoluto (`#0a0a0a`)
- Tipografia: Bebas Neue para display, monospaced para labels técnicos
- Cor de acento: **magenta neon** (`var(--lxndr-pink)`)
- Acento secundário: **ciano elétrico**
- Elementos decorativos: linhas finas, marcadores de crosshair, quadrados wireframe, waveforms
- Estética: dashboard de estúdio analógico + manifesto punk + brutalismo gráfico
- Textura: grain overlay + grid sutil

---

## CENA 01 — LXNDR NAV

**Componente:** `LxndrNav`  
**Arquivo:** `components/lxndr/lxndr-nav.tsx`

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Link 1 | OUVIR |
| Link 2 | LANÇAMENTOS |
| Link 3 | BOOKING |
| Link voltar | ← PORTAL |

### Visual
- Barra fixa no topo, fundo preto com borda inferior translúcida
- Logo: pequeno marcador com linha magenta + wordmark LXNDR
- Navegação minimalista, tipografia monospaced uppercase

---

## CENA 02 — LXNDR HERO

**Componente:** `LxndrHero`  
**Arquivo:** `components/lxndr/lxndr-hero.tsx`

### Conceito
A declaração de identidade do artista. Nome enorme, sem decoração. A composição é toda tensão e contraste: tipografia brutalista contra o vácuo do fundo preto. Os CTAs são diretos — ouvir, seguir, booking.

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Nome principal | **LXNDR** |
| Role | DJ / Produtor / Artista eletrônico |
| Gêneros | Techno · Psytrance · Industrial · Ritual sônico |
| Tagline | Música física, psíquica e filosófica. Raw signal from Paraná. |
| Sinal lateral (vertical) | transmission started / Paraná / BR |
| Label de canto | RAW SIGNAL / PARANÁ BR |
| CTA 1 | Ouvir no SoundCloud |
| CTA 2 | Seguir no Instagram |
| CTA 3 | Booking / Collab |
| Scroll | SCROLL / ROLAR |

### Visual
- "LXNDR" ocupa quase toda a tela — tipografia como monumento
- Linha fina magenta abaixo do nome
- "DJ / PRODUTOR / ARTISTA ELETRÔNICO" em tracking largo
- Gêneros em cinza, separados por bullets
- Tagline em corpo menor, quase sussurrada após o grito do nome
- Texto vertical "TRANSMISSION STARTED / PARANÁ / BR" na borda direita
- Elemento geométrico: quadrado wireframe no canto inferior esquerdo
- CTA SoundCloud: botão magenta sólido com ícone
- CTA Instagram: botão outline escuro com ícone
- Pequeno badge circular com "N" no canto inferior esquerdo (marca de estúdio)

### Animação (GSAP)
- Nome revela com split character (letras de baixo para cima)
- Linha magenta se desenha da esquerda para direita
- Role e gêneros entram em stagger após o nome
- Tagline aparece com fade
- CTAs entram por último
- Parallax sutil no scroll

---

## CENA 03 — MANIFESTO LXNDR

**Componente:** `LxndrManifesto`  
**Arquivo:** `components/lxndr/lxndr-manifesto.tsx`

### Conceito
A filosofia sonora em forma de poster de estúdio. A composição simula um painel de controle analógico: "CAPTAR. DISTORCER. ORGANIZAR. PROPAGAR." como se fossem etapas de um mixer. O caos vira frequência.

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Eyebrow | raw signal / manifesto |
| Frequência | FREQ. 174HZ |
| Linha 1 | **CAOS, CORPO,** |
| Linha 2 | **RUÍDO E TENSÃO** |
| Linha 3 | VIRAM |
| Linha 4 (destaque magenta) | **FREQUÊNCIA.** |
| Corpo | Interferência entra como sinal bruto. O corpo processa. A pista devolve matéria sônica — física, psíquica e ritual. |
| Card lateral — título | FX MATRIX |
| Card lateral — status | ARMED |
| Card lateral — texto | Interferência é matéria. Ganho vira pressão. Ruído vira forma. Forma vira ritual. |

**Quatro painéis de processo:**
| # | Label técnico | Palavra | Sub-label |
|---|---|---|---|
| 01 | INPUT GAIN | **CAPTAR.** | +12DB |
| 02 | NOISE SHAPE | **DISTORCER.** | DRIVE |
| 03 | SIGNAL ROUTE | **ORGANIZAR.** | SYNC |
| 04 | MAIN OUT | **PROPAGAR.** | SEND |

*"DISTORCER." usa ciano como cor de destaque; as demais usam branco.*

**Elementos de UI de estúdio:**
- `DB LEVEL` com medidor de barras (magenta)
- Barras de VU meter decorativas
- Marcadores de módulos em grid

### Visual
- Composição toda em black / white / magenta / cyan
- "FREQUÊNCIA." em magenta enorme — a palavra mais pesada visualmente
- Card lateral imita display de rack de efeitos
- Quatro painéis abaixo com estética de módulos Eurorack
- Medidor de DB na parte inferior esquerda
- Linha fina magenta vertical no lado esquerdo da hero area
- Grid técnico + grain

### Animação (GSAP)
- Linhas do manifesto entram uma por uma, de baixo para cima
- "FREQUÊNCIA." entra por último, com mais peso
- Painéis de processo entram em stagger
- Medidor de DB anima

---

## CENA 04 — O SOM

**Componente:** `LxndrSound`  
**Arquivo:** `components/lxndr/lxndr-sound.tsx`

### Conceito
Descrição da identidade sonora — não um biog técnico, mas uma caracterização do estado que a música cria. Quatro pilares de como o som é construído.

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Título | **O SOM** |
| Introdução | O som do LXNDR parte da pista, mas não se limita a ela. É construído com pressão, repetição, ruído e camadas atmosféricas, buscando um estado entre corpo, transe e interferência. |
| Pilar 1 | Ritmos rápidos |
| Pilar 2 | Atmosferas densas |
| Pilar 3 | Tensão progressiva |
| Pilar 4 | Texturas instáveis |
| Tags | BODY / TRANCE / PRESSURE / EXPANSION |
| Tags (PT-BR) | CORPO / TRANSE / PRESSÃO / EXPANSÃO |

### Visual
- 4 blocos em grid ou coluna, cada um com um pilar
- Tags horizontais em monospaced uppercase com separador `/`
- Layout austero, tipografia em contraste com o fundo

---

## CENA 05 — LANÇAMENTOS

**Componente:** `LxndrReleases`  
**Arquivo:** `components/lxndr/lxndr-releases.tsx`

### Conceito
Os trabalhos publicados. Cada release com identidade própria — título, artistas, label, gênero, BPM, descrição e um texto de liner notes que vai além dos metadados.

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Título da seção | **LANÇAMENTOS** |
| CTA | Ouvir no SoundCloud |
| Embed slot | Espaço para embed SoundCloud |

**Track 1 — Flow With Me**
| Campo | Valor |
|---|---|
| Título | **Flow With Me** |
| Artistas | Bunn1, LXNDR |
| Label | raw signal |
| Gênero | Techno |
| BPM | 140 |
| Descrição curta | Flow With Me é uma peça de techno para corpos em estado de interferência. |
| Liner notes | O som não tenta explicar. Ele atravessa. Camadas, pulsos e ruídos se acumulam como dados corrompidos até virarem organismo: uma máquina sensorial onde o caos não é erro — é matéria-prima. |

**Track 2 — Track 000**
| Campo | Valor |
|---|---|
| Título | **Track 000** |
| Artistas | LXNDR |
| Label | hello world as LXNDR |
| Gênero | Experimental |
| BPM | — |
| Descrição curta | O primeiro sinal bruto do projeto. |
| Liner notes | Ainda nascendo. Ainda pulsando. |

### Visual
- Cards de release com metadata estruturada (label, gênero, BPM)
- Área de embed SoundCloud
- "Track 000" tem tratamento especial como "hello world" do projeto — quase um marco zero

---

## CENA 06 — MUNDO VISUAL

**Componente:** `LxndrVisualWorld`  
**Arquivo:** `components/lxndr/lxndr-visual-world.tsx`

### Conceito
O sistema de identidade visual descrito como linguagem. O que o olho deve sentir antes de escutar.

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Título | **MUNDO VISUAL** |
| Introdução | O sistema visual do LXNDR nasce do contraste: escuridão industrial, cor sintética, tipografia fraturada, geometria ritual, ruído e fragmentos técnicos. |

**Elementos visuais listados:**
1. Matéria preta
2. Interferência neon
3. Geometria ritual
4. Waveforms como símbolos
5. Ruído como textura
6. Corpo fragmentado

### Visual
- Lista dos elementos com tratamento gráfico — cada item como um bloco
- Possivelmente com exemplos visuais ou padrões de fundo associados

---

## CENA 07 — A CENA

**Componente:** `LxndrScene`  
**Arquivo:** `components/lxndr/lxndr-scene.tsx`

### Conceito
A localização e o contexto geográfico-cultural. LXNDR não nasce no vácuo — nasce da cena eletrônica do Paraná, entre Londrina e Ponta Grossa, conectado à AEON Audio.

### O que está escrito

| Elemento | EN/PT-BR |
|---|---|
| Título | **A CENA** |
| Origem | Paraná, Brasil |
| Entre | Entre Londrina e Ponta Grossa. |
| Contexto | Entre Londrina e Ponta Grossa, LXNDR nasce do contato com a cena eletrônica regional, da vivência com a AEON Audio e das conexões que começam a se formar ao redor da pista, do estúdio e da criação coletiva. |
| Sinal | Um sinal bruto do sul. |

### Visual
- Mapa ou composição tipográfica referenciando o Paraná
- "Um sinal bruto do sul." como frase de encerramento da cena — curta, poderosa

---

## CENA 08 — BOOKING / CONTATO

**Componente:** `LxndrBooking`  
**Arquivo:** `components/lxndr/lxndr-booking.tsx`

### Conceito
Não um formulário — uma declaração de abertura. "Sinal aberto para pista, estúdio e criação coletiva." O booking é tratado como transmissão, não como transação.

### O que está escrito

| Elemento | EN | PT-BR |
|---|---|---|
| Título | **TRANSMIT.** | **TRANSMITIR.** |
| Sub | Para bookings, collabs, sets, releases e trocas de sinal. | Para bookings, collabs, sets, releases e trocas de sinal. |
| Alt | Sinal aberto para pista, estúdio e criação coletiva. | Sinal aberto para pista, estúdio e criação coletiva. |
| Link 1 | Instagram | Instagram |
| Link 2 | SoundCloud | SoundCloud |
| Link 3 | Email | Email |

### Visual
- "TRANSMIT." como headline de seção — uma instrução, não um convite
- Links diretos: Instagram, SoundCloud, Email
- Composição com linguagem de transmissão de rádio/sinal

---

---

# REFERÊNCIAS DE DESIGN

## Paleta — Portfólio Dev

| Variável | Valor | Uso |
|---|---|---|
| `--background` (dark) | `#000000` | Fundo principal |
| `--foreground` (dark) | `#ffffff` | Texto principal |
| `--color-accent-purple` | `#7C3AED` | Acento único, elementos interativos |
| `--color-accent-purple-light` | `#A78BFA` | Hover states |
| `--neon-blue` | `#00ffff` | Acento Evangelion ciano |
| `--neon-orange` | `#ff6600` | Acento Evangelion laranja (CTA principal) |
| `--neon-purple` | `#9900ff` | Acento Evangelion roxo |

## Paleta — LXNDR

| Variável | Uso |
|---|---|
| `--lxndr-black` (`#0a0a0a`) | Fundo |
| `--lxndr-pink` (magenta neon) | Acento principal |
| Ciano elétrico | Acento secundário (DISTORCER) |
| `--lxndr-steel` (cinza) | Texto secundário |

## Fontes

| Fonte | Variável CSS | Uso |
|---|---|---|
| **Bebas Neue** | `font-bebas` | Display / headings / nomes |
| **Geist** | `font-sans` | Corpo de texto |
| **Geist Mono** | `font-mono` | Labels técnicos, tags, metadata |
| **Inter Tight** | `font-space` | Alt sans |

## Assinatura do design
- `border-radius: 0` — zero arredondamento em tudo
- Sombras: offset rígido sem blur (`8px 8px 0 #000`)
- Grain texture overlay em todas as seções escuras
- Cursor magnético personalizado no desktop
- `_` no final dos títulos de seção (THE PROOF_, THE VISION_)
- Seções se alternam entre fundo preto e fundo branco

---

---

# NOTAS PARA REVISÃO

## Pontos de atenção — Copy

1. **"LXNDR" como logo do portfólio dev** — o nav do portfólio dev usa "LXNDR" como logo, mas o site inteiro chama-se portfólio de Sérgio Alexandre. Pode gerar confusão sobre qual identidade pertence ao nav.

2. **Tagline do hero dev** — "creator · musician · builder of tools" como role pode ser surpreendente para visitantes esperando "Full-Stack Software Engineer". É uma escolha intencional de posicionamento, mas vale avaliar se serve para o contexto profissional.

3. **Track 000 — "hello world as LXNDR"** — label ultra-pessoal. Tem charme, mas vale confirmar se é a forma que o artista quer apresentar seu primeiro trabalho.

4. **"BUILT MY WAY ❤️"** no footer — a única linha informal/emocional de todo o portfólio dev. Contraste bonito com o restante brutalista.

5. **Curto de Paraná** — a frase "Um sinal bruto do sul." fecha A CENA com muita força. É o momento mais lírico da página LXNDR.

## Seções existentes fora da homepage

Existem componentes criados mas servidos em rotas separadas:

| Rota | O que mostra |
|---|---|
| `/sobre` | `PortfolioAbout` — bio longa em 4 parágrafos + "EVOLUTION" + stack + educação |
| `/projetos` | `PortfolioProjects` — versão expandida dos projetos com descrições longas |
| `/contato` | `PortfolioContact` — versão standalone do contato |
| `/blog` | Blog com busca, filtros por tag, ordenação |
| `/ensaios` | Essays com busca, filtros, ordenação |
| `/laboratorio` | Laboratory — experimentos e automações |

---

*Documento gerado a partir da leitura direta do código-fonte, arquivos de tradução e screenshots.*  
*Para atualizações, editar os arquivos `messages/en.json` e `messages/pt-BR.json`.*
