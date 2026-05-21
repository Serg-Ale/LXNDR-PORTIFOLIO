# Portfolio Refactor — Do Zero

## TL;DR

> **Quick Summary**: Reescrever completamente os textos do portfólio (en + pt-BR) e evoluir a identidade visual para refletir autenticamente quem Sérgio é: criador, artista, músico, usuário Linux/Vim, TDAH com pensamento ramificado — não o dev corporativo cheio de métricas que o portfólio atual mostra.
>
> **Deliverables**:
> - `messages/en.json` completamente reescrito (sem métricas corporativas)
> - `messages/pt-BR.json` completamente reescrito (voz autêntica em português)
> - Nova seção `Manifesto` criada (componente + conteúdo)
> - Seção `Projects` reestruturada com origin stories de cada projeto
> - Seção `About` reescrita com a filosofia criador/músico/Linux
> - Estrutura de seções em `page.tsx` atualizada (nova ordem)
> - Paleta purple aplicada via CSS variables / Tailwind config
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: Task 1 (audit) → Task 3 (hero) → Task 6 (manifesto) → Task 8 (page.tsx reorder) → Task 9 (palette) → F1-F4

---

## Context

### Original Request
Sérgio quer fazer o portfólio do zero — o tom atual é muito "vendas" e não reflete quem ele é. Quer algo que mostre como ele pensa, não que prove que ele sabe programar. Ele é criador, artista, músico, usuário Linux/Vim, tem TDAH e pensamento ramificado.

### Interview Summary

**Identidade central**:
- "Não sou um programador. Sou um criador."
- Constrói ferramentas quando as existentes o frustram (Matrix Rain, LightSync, ThinkFlow)
- Músico/compositor nato do improviso — TDAH, pensamento arborizado
- Usuário Linux, shortcuts Vim, tudo pelo teclado — filosofia de autonomia e customização
- "Eu sou um mago que domina a tecnologia"

**O que está errado com o portfólio atual**:
- Métricas corporativas: "99.8% uptime", "19K+ lines of code", "20K+ LINES"
- CTA vendedor: "READY TO SHIP YOUR NEXT PRODUCTION SYSTEM?"
- Tom de CV disfarçado de site
- Nada disso representa quem Sérgio é de verdade

**Decisões do interview**:
- Objetivo: Emprego + expressão pessoal autêntica. Empresas veem o Sérgio real.
- Linha do hero: "Eu não sou um programador. Eu sou um criador." (âncora). EN: "I am not a programmer. I am a creator."
- Ordem das seções: Hero → Manifesto → Projects → About → Experience → Blog → Contact
- Visual: Evoluir brutalismo → artista-dev. Paleta: preto + roxo.
- Sem foto — arte abstrata/generativa (asset a ser definido/gerado)
- Blog mantido
- Tom: direto, primeira pessoa, como Sérgio fala

**Projetos com origin stories**:
1. **Matrix Rain** — "A implementação padrão não me agradou, fui lá e fiz a minha." Python/curses, Katakana, 8-shade gradients, 7 temas + rainbow. GitHub: Serg-Ale/matrix-rain
2. **LightSync** — "Queria sincronizar a luz do quarto com a cor do monitor. Estava lá, estava feito." Sem repo público ainda — sem URL, só descrição.
3. **Un1Audio / Union Audio** — Onde trabalha. Mas Sérgio também é músico/compositor. Dupla identidade: dev e artista.
4. **ThinkFlow** — "Construí pra mim mesmo." AI assistant pessoal (FastAPI + React + TS). GitHub: lxndrbukin/ThinkFlow
5. **Barber App (SaaS)** — Lidera o desenvolvimento na Union Tech. Next.js 16 + Prisma + NextAuth + n8n.
6. **Como-Eles-Votaram** — App de transparência de votação. T3 Stack.

### Research Findings
- `messages/en.json` e `messages/pt-BR.json` são 430 linhas cada — toda troca de texto passa por aqui
- Stats em `hero.stats` e potencialmente hardcoded em `intro.tsx` — precisa auditar
- `skills.tsx` tem tech stacks hardcoded (não no JSON)
- `contact.tsx` tem email/phone/LinkedIn hardcoded (não no JSON)
- `connect.tsx` tem o CTA corporativo — é diferente de `contact.tsx`
- Purple já existe parcialmente na paleta atual (Evangelion-inspired) — é evolução, não redesign do zero
- `certifications.tsx` e `impact.tsx` existem mas sua situação na nova ordem não foi decidida
- Fontes atuais (Bebas Neue, Space Grotesk, Geist) são adequadas — não mudam

### Metis Review
**Gaps identificados e resolvidos**:
- Stats hardcoded em `intro.tsx` além do JSON: tarefa de auditoria explícita antes de qualquer edição
- `certifications.tsx` sem lugar na nova ordem: comentado/removido de `page.tsx` (conteúdo preservado)
- `impact.tsx` potencialmente código morto: verificar referências antes de tocar em `page.tsx`
- Bilingual drift (en/pt-BR desincronizando): regra de commit — ambos os arquivos sempre no mesmo commit
- LightSync sem URL: aceitar campo de URL null no schema de projetos
- Metadados de SEO no JSON: atualizar junto com hero
- OG images estáticas em `public/`: verificar se existem e se referenciam tagline antiga
- `connect.tsx` vs `contact.tsx`: CTA está em `connect.tsx` — verificado

---

## Work Objectives

### Core Objective
Transformar o portfólio de um CV corporativo cheio de métricas em uma expressão autêntica de quem Sérgio é: um criador que molda tecnologia, não apenas a usa.

### Concrete Deliverables
- `messages/en.json` completamente reescrito (0 métricas corporativas)
- `messages/pt-BR.json` completamente reescrito (voz autêntica, não auto-tradução)
- `components/portfolio/manifesto.tsx` — novo componente (conteúdo + animação básica GSAP)
- `components/portfolio/proof.tsx` (ou novo `projects.tsx`) — reestruturado com origin stories
- `app/[locale]/page.tsx` — nova ordem de seções
- `tailwind.config.js` + `globals.css` — tokens purple aplicados, CSS variables atualizadas
- About/Origin/Journey: conteúdo reescrito com narrativa criador/músico/Linux

### Definition of Done
- [ ] `grep -r "uptime\|UPTIME\|19K\|20K\|LINES OF CODE\|99%" messages/` retorna 0 matches
- [ ] `pnpm build` sem erros
- [ ] `pnpm tsc --noEmit` sem erros novos
- [ ] `pnpm lint` sem erros novos
- [ ] `/en` e `/pt-BR` renderizam sem texto `[missing]` (next-intl fallback)
- [ ] Hero exibe a linha âncora em ambas as línguas
- [ ] CTA de contato não contém mais "SHIP YOUR NEXT PRODUCTION SYSTEM"
- [ ] Seção Manifesto visível e com conteúdo real

### Must Have
- Linha âncora "Eu não sou um programador. Eu sou um criador." (pt-BR) / "I am not a programmer. I am a creator." (en) no Hero
- Origin stories para cada projeto (o que irritou Sérgio → o que ele fez)
- Remoção total de todas as métricas de vaidade (uptime, linhas de código, %)
- Seção Manifesto nova: como Sérgio pensa, não o que ele sabe
- Bilingual parity: en.json e pt-BR.json sempre sincronizados
- Palette purple aplicada ao menos no Hero e Manifesto
- Sobre mim com a filosofia: Linux, Vim, TDAH, músico, criador

### Must NOT Have (Guardrails)
- NENHUMA métrica de vaidade (linhas de código, % de uptime, número de testes)
- NENHUM texto inventado — todo conteúdo deriva das palavras do Sérgio ou de origem aprovada
- NENHUMA auto-tradução para pt-BR — cada string portuguesa deve soar como Sérgio escreve
- NENHUM texto placeholder/Lorem ipsum em estado commitado
- NENHUM novo pacote npm
- NENHUMA migração de projetos de JSON para MDX neste sprint
- NENHUMA divisão dos arquivos de tradução em namespaces
- NENHUMA mudança nas famílias de fontes
- NENHUM sistema generativo de partículas / WebGL (só palette evolution)
- NENHUMA modificação na lógica dos componentes — só conteúdo (JSON) e estilo (CSS vars / Tailwind classes)
- NÃO tocar em `components/blog/`, `lib/blog/`, `content/`

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — Toda verificação é executada pelo agente.

### Test Decision
- **Infrastructure exists**: NO (nenhum framework de teste configurado)
- **Automated tests**: None (sem unit tests neste sprint)
- **Agent-Executed QA**: SEMPRE — cada task tem cenários concretos

### QA Policy
- **Frontend/UI**: Playwright para verificar renderização, conteúdo, navegação bilíngue
- **CLI/Search**: Bash (grep/pnpm) para verificar ausência de métricas, build, TypeScript
- Evidence salva em `.sisyphus/evidence/task-{N}-{slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Audit + Foundation — pode começar imediatamente):
├── Task 1: Auditoria completa — mapa de tudo que precisa mudar [quick]
├── Task 2: Verificar certifications.tsx, impact.tsx, connect.tsx vs contact.tsx [quick]

Wave 2 (Conteúdo — após Wave 1, máximo paralelo):
├── Task 3: Reescrever hero content (en + pt-BR) + SEO metadata [unspecified-high]
├── Task 4: Reescrever projects section com origin stories (en + pt-BR) [unspecified-high]
├── Task 5: Reescrever about/origin/journey content (en + pt-BR) [unspecified-high]
├── Task 6: Criar manifesto.tsx + conteúdo manifesto (en + pt-BR) [visual-engineering]

Wave 3 (Integração + Estrutura — após Wave 2):
├── Task 7: Reescrever experience/contact/footer content (en + pt-BR) [unspecified-high]
├── Task 8: Reestruturar page.tsx (nova ordem de seções) [unspecified-high]
├── Task 9: Evolução visual — tokens purple + CSS variables [visual-engineering]

Wave FINAL (após TODAS as tasks — 4 reviews em paralelo):
├── Task F1: Auditoria de compliance com plano (oracle)
├── Task F2: Revisão de qualidade de código (unspecified-high)
├── Task F3: QA real em browser — ambas as línguas (unspecified-high + playwright)
├── Task F4: Verificação de scope fidelity (deep)
→ Apresentar resultados → Aguardar aprovação explícita do user
```

### Dependency Matrix

| Task | Depende de | Bloqueia |
|------|-----------|---------|
| 1 | — | 3, 4, 5, 6, 7, 8 |
| 2 | — | 8 |
| 3 | 1 | 8 |
| 4 | 1 | 8 |
| 5 | 1 | 8 |
| 6 | 1 | 8 |
| 7 | 1 | 8 |
| 8 | 2, 3, 4, 5, 6, 7 | F1-F4 |
| 9 | 1 | F1-F4 |
| F1-F4 | 8, 9 | — |

### Agent Dispatch Summary
- **Wave 1**: 2 tasks → T1 `quick`, T2 `quick`
- **Wave 2**: 4 tasks → T3 `unspecified-high`, T4 `unspecified-high`, T5 `unspecified-high`, T6 `visual-engineering`
- **Wave 3**: 3 tasks → T7 `unspecified-high`, T8 `unspecified-high`, T9 `visual-engineering`
- **FINAL**: 4 reviews → F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high` + `playwright`, F4 `deep`

---

## TODOs

- [x] 1. Auditoria Completa — Mapa de Tudo que Precisa Mudar

  **What to do**:
  - Ler `messages/en.json` inteiro e mapear: quais chaves têm métricas corporativas (uptime, linhas de código, %), quais textos têm tom "vendas", quais seções estão na nova estrutura e quais serão removidas/renomeadas
  - Executar `grep -n "uptime\|UPTIME\|19K\|20K\|LINES\|99%\|SHIP\|production systems" messages/en.json messages/pt-BR.json` — registrar todos os matches com número de linha
  - Auditar `components/portfolio/intro.tsx`: verificar se há stats hardcoded no JSX além do JSON. Usar `ast_grep_search` para encontrar strings como "99%", "19K", "20K" em todos os componentes
  - Verificar se `public/` contém OG images estáticas (`og-image.*`, `social.*`) que referenciam a tagline antiga
  - Verificar se `messages/pt-BR.json` tem exatamente as mesmas chaves que `messages/en.json` (diff de keys) — registrar qualquer divergência
  - Salvar relatório completo em `.sisyphus/evidence/task-1-audit.md`

  **Must NOT do**:
  - NÃO editar nenhum arquivo nesta task — só leitura e mapeamento
  - NÃO corrigir nada ainda

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Task de leitura/auditoria sem lógica complexa — grep, read, report
  - **Skills**: nenhuma necessária

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Task 2)
  - **Parallel Group**: Wave 1 (com Task 2)
  - **Blocks**: Tasks 3, 4, 5, 6, 7, 8
  - **Blocked By**: None

  **References**:
  - `messages/en.json` — arquivo completo a auditar
  - `messages/pt-BR.json` — arquivo completo a auditar
  - `components/portfolio/intro.tsx` — checar stats hardcoded
  - `components/portfolio/connect.tsx` — checar CTA
  - `public/` — checar OG images

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY)**:
  ```
  Scenario: Relatório de auditoria gerado
    Tool: Bash
    Steps:
      1. Verificar que .sisyphus/evidence/task-1-audit.md existe
      2. cat .sisyphus/evidence/task-1-audit.md | grep -c "CORPORATE METRIC\|REMOVE\|CHANGE"
    Expected Result: Arquivo existe com pelo menos 5 itens identificados
    Evidence: .sisyphus/evidence/task-1-audit.md

  Scenario: Nenhum arquivo foi modificado nesta task
    Tool: Bash
    Steps:
      1. git diff --name-only
    Expected Result: Somente .sisyphus/evidence/task-1-audit.md no diff (ou nenhum arquivo de código)
    Evidence: Output do git diff
  ```

  **Commit**: YES
  - Message: `chore(audit): map all content requiring change`
  - Files: `.sisyphus/evidence/task-1-audit.md`
  - Pre-commit: nenhum

- [x] 2. Verificar Estrutura de Componentes de Seção

  **What to do**:
  - Usar `lsp_find_references` em `certifications.tsx` e `impact.tsx` para verificar se estão sendo importados em `page.tsx` ou em qualquer outro lugar
  - Ler `components/portfolio/connect.tsx` e `components/portfolio/contact.tsx` — documentar: qual deles contém o CTA "READY TO SHIP", qual contém informações de contato hardcoded
  - Ler `app/[locale]/page.tsx` — documentar a ordem atual de seções e quais componentes são importados
  - Verificar se `components/portfolio/skills.tsx` tem tech stacks hardcoded (não no JSON)
  - Salvar relatório em `.sisyphus/evidence/task-2-components.md` com: lista de componentes ativos, componentes mortos/não usados, hardcoded data locations

  **Must NOT do**:
  - NÃO editar nenhum arquivo
  - NÃO remover imports ainda

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: nenhuma

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Task 1)
  - **Parallel Group**: Wave 1 (com Task 1)
  - **Blocks**: Task 8
  - **Blocked By**: None

  **References**:
  - `app/[locale]/page.tsx` — ordem atual de seções
  - `components/portfolio/` — todos os componentes
  - `components/portfolio/connect.tsx` — CTA
  - `components/portfolio/contact.tsx` — contato hardcoded
  - `components/portfolio/skills.tsx` — tech stacks hardcoded

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Relatório de componentes gerado
    Tool: Bash
    Steps:
      1. cat .sisyphus/evidence/task-2-components.md
    Expected Result: Arquivo existe e documenta: certifications (ativo/morto), impact (ativo/morto), connect vs contact (qual tem o CTA), hardcoded data locations
    Evidence: .sisyphus/evidence/task-2-components.md
  ```

  **Commit**: YES
  - Message: `chore(audit): verify section components structure`
  - Files: `.sisyphus/evidence/task-2-components.md`

- [x] 3. Reescrever Hero Content (en + pt-BR) + SEO Metadata

  **What to do**:
  - Ler o relatório de auditoria em `.sisyphus/evidence/task-1-audit.md` para saber quais chaves do hero precisam mudar
  - Reescrever `messages/en.json` — seção `hero`:
    - `hero.title`: manter "SOFTWARE\nENGINEER" ou trocar por algo mais alinhado ("CREATOR\nBUILDER"?) — decidir com base no contexto
    - `hero.tagline`: **remover** "I build production systems that scale — 19K+ lines of code..." → novo: algo derivado de "I am not a programmer. I am a creator." — direto, como ele fala
    - `hero.manifesto`: reescrever completamente — sem métricas, com a identidade real
    - `hero.stats`: **remover completamente** as 4 stats (years/loc/tests/uptime) — elas enojam o Sérgio
    - `hero.scrollDown`: pode manter ou adaptar
    - `hero.ctaSeeWork` / `hero.ctaDownloadCV`: revisar tom
  - Reescrever as mesmas chaves em `messages/pt-BR.json` — voz em português como Sérgio fala, NÃO auto-tradução literal
  - Verificar se há chave `metadata` no JSON com title/description de SEO — se sim, atualizar para refletir a nova identidade
  - Se `intro.tsx` tiver stats hardcoded (identificado na Task 1), removê-los do componente também

  **Conteúdo de referência** (palavras do Sérgio para inspirar os textos):
  - "Eu não sou um programador. Eu sou um criador." (pt-BR anchor) / "I am not a programmer. I am a creator." (en)
  - "Se a ferramenta não me serve, eu crio outra."
  - "Eu construo o que eu gostaria que existisse."
  - "Eu não aceito o padrão. Eu reescrevo ele."
  - "Tudo que me limita vira projeto."
  - "Incomodo vira código. Código vira sistema."
  - Músico compositor. TDAH. Pensamento arborizado. Linux. Vim. Tudo pelo teclado.

  **Must NOT do**:
  - NÃO incluir nenhuma métrica numérica (% de uptime, linhas de código, número de projetos)
  - NÃO usar "production systems", "scale", "ship" com tom corporativo
  - NÃO usar auto-tradução para pt-BR — cada string deve soar autêntica em português
  - NÃO apagar chaves de accessibility (`accessibility.*`) — só conteúdo de hero

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requer sensibilidade narrativa + conhecimento técnico do JSON/i18n. Tom precisa capturar a identidade do Sérgio.
  - **Skills**: nenhuma específica

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Tasks 4, 5, 6)
  - **Parallel Group**: Wave 2 (com Tasks 4, 5, 6)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `.sisyphus/evidence/task-1-audit.md` — lista de chaves a mudar
  - `messages/en.json:17-47` — seção hero atual (para ver estrutura e o que remover)
  - `messages/pt-BR.json` — versão PT atual (estrutura espelho)
  - `components/portfolio/intro.tsx` — verificar se stats estão hardcoded (Task 1 identificará)
  - **Identidade do Sérgio**: draft em `.sisyphus/drafts/portfolio-refactor.md` — seção "Identidade Central"

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Métricas removidas do hero
    Tool: Bash
    Steps:
      1. grep -n "uptime\|UPTIME\|19K\|20K\|LINES\|99%" messages/en.json messages/pt-BR.json | grep "hero"
    Expected Result: 0 matches — nenhuma métrica na seção hero de ambos os arquivos
    Evidence: .sisyphus/evidence/task-3-hero-grep.txt

  Scenario: Linha âncora presente em ambas as línguas
    Tool: Bash
    Steps:
      1. grep -i "criador\|creator" messages/pt-BR.json messages/en.json
    Expected Result: Pelo menos 1 match em cada arquivo
    Evidence: .sisyphus/evidence/task-3-anchor-grep.txt

  Scenario: Build passa após mudança no hero
    Tool: Bash
    Steps:
      1. pnpm build
    Expected Result: exit code 0, sem erros de i18n ou TypeScript
    Evidence: .sisyphus/evidence/task-3-build.txt

  Scenario: Hero renderiza em ambas as línguas (Playwright)
    Tool: Playwright
    Preconditions: pnpm dev rodando em localhost:3000
    Steps:
      1. Navegar para http://localhost:3000/en
      2. Verificar que seção hero não tem texto "[missing]"
      3. Verificar que hero não contém texto "19K" ou "99%"
      4. Screenshot da seção hero em EN
      5. Navegar para http://localhost:3000/pt-BR
      6. Verificar que hero contém texto "criador" (a linha âncora)
      7. Screenshot da seção hero em PT-BR
    Expected Result: Ambas as línguas renderizam corretamente sem texto corporativo
    Evidence: .sisyphus/evidence/task-3-hero-en.png, .sisyphus/evidence/task-3-hero-ptbr.png
  ```

  **Commit**: YES
  - Message: `content(hero): rewrite hero + SEO metadata (en + pt-BR)`
  - Files: `messages/en.json`, `messages/pt-BR.json`, `components/portfolio/intro.tsx` (se necessário)
  - Pre-commit: `grep -c "uptime\|19K\|20K" messages/en.json` → deve retornar 0 no contexto hero

- [x] 4. Reescrever Seção Projects com Origin Stories (en + pt-BR)

  **What to do**:
  - Reescrever `messages/en.json` — seção `projects.list` e `proof.projects`:
    - Cada projeto precisa ter: título, **origin story** ("o que me incomodou" → "o que eu fiz"), tech stack, URL (quando disponível)
    - Remover completamente o campo `metrics` de cada projeto — não queremos números
    - Substituir os projetos de "Test Automation Suite" e "N8N Workflow Automation" por projetos mais pessoais/identitários
  - Reescrever as mesmas chaves em `messages/pt-BR.json`
  - Projetos obrigatórios e seus textos de origem:
    - **Matrix Rain**: "A implementação que eu conhecia não me satisfazia. Fiz a minha." — Python, curses, Katakana, 8 tons de verde, 7 temas + rainbow. URL: https://github.com/Serg-Ale/matrix-rain
    - **LightSync**: "Queria que a luz do meu quarto tivesse a mesma cor do monitor. Não existia. Fiz." — Sem URL (sem repo público ainda) — campo url: null
    - **ThinkFlow**: "Construí o assistente que eu queria ter." — FastAPI, React, TypeScript. URL: https://github.com/lxndrbukin/ThinkFlow
    - **Como-Eles-Votaram**: "Queria saber como os políticos votavam. De forma simples." — T3 Stack. URL: https://github.com/Serg-Ale/Como-Eles-Votaram
    - **Union Audio / Un1Audio**: "Sou músico e dev — aqui os dois se encontram." — Next.js 16, React 19, Turborepo. URL: https://www.unionaudio.com.br
    - **Barber App**: "Liderando do zero — arquitetando enquanto construo." — Next.js 16, Prisma, NextAuth, n8n. URL: null (SaaS privado)

  **Must NOT do**:
  - NÃO incluir métricas (linhas de código, % de pass rate, número de componentes)
  - NÃO listar "Test Automation Suite" como projeto independente — é parte do trabalho no Union Audio
  - NÃO listar "N8N Workflow Automation" como projeto independente
  - NÃO inventar detalhes técnicos que Sérgio não confirmou
  - NÃO usar URL null quebrando o componente — verificar como `proof.tsx` lida com URL ausente

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Precisa capturar a narrativa de origem de cada projeto com autenticidade, além de ajustar a estrutura JSON corretamente
  - **Skills**: nenhuma

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Tasks 3, 5, 6)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `.sisyphus/evidence/task-1-audit.md` — estrutura atual dos projetos
  - `messages/en.json:338-381` — seção `projects.list` atual
  - `messages/en.json:119-149` — seção `proof.projects` atual (cards na homepage)
  - `components/portfolio/proof.tsx` — verificar se espera campo `url`, se lida com null, se tem campo `metrics`
  - `.sisyphus/drafts/portfolio-refactor.md` — seção "Projetos com origin stories"

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Nenhuma métrica nos projetos
    Tool: Bash
    Steps:
      1. grep -n "LINES OF CODE\|COMPONENTS\|TESTS\|PASS RATE\|metrics" messages/en.json | grep -A2 -B2 "proof\|projects"
    Expected Result: 0 matches para campos de métricas em seções de projetos
    Evidence: .sisyphus/evidence/task-4-metrics-grep.txt

  Scenario: Todos os 6 projetos presentes com origin stories
    Tool: Bash
    Steps:
      1. grep -i "matrix rain\|lightsync\|thinkflow\|como-eles\|union audio\|barber" messages/en.json | wc -l
    Expected Result: Pelo menos 6 matches (um por projeto)
    Evidence: .sisyphus/evidence/task-4-projects-grep.txt

  Scenario: LightSync sem URL não quebra a página
    Tool: Playwright
    Preconditions: pnpm dev rodando
    Steps:
      1. Navegar para http://localhost:3000/en
      2. Scrollar até a seção de projetos
      3. Verificar que LightSync aparece sem link quebrado
      4. Screenshot da seção projects
    Expected Result: LightSync renderiza sem erro 404 ou link quebrado
    Evidence: .sisyphus/evidence/task-4-projects-en.png
  ```

  **Commit**: YES
  - Message: `content(projects): rewrite projects with origin stories (en + pt-BR)`
  - Files: `messages/en.json`, `messages/pt-BR.json`

- [x] 5. Reescrever About / Origin / Journey Content (en + pt-BR)

  **What to do**:
  - Reescrever `messages/en.json` — seções `about`, `origin`, `journey`, `timeline`:
    - `about.paragraph1-4`: substituir narrativa corporativa pela filosofia criador/músico/Linux. Incluir: TDAH e pensamento ramificado, Linux/Vim como extensão da filosofia de autonomia, música e composição, "mago que domina a tecnologia"
    - `about.evolutionWord`: manter "EVOLUTION" ou trocar para algo mais alinhado?
    - `about.evolutionQuote`: reescrever — remover tom corporativo
    - `origin.card1`, `origin.card2`, `origin.card3`: reescrever com origem autêntica, não "making it right" genérico
    - `journey.conclusion`: reescrever — sem tom motivacional vazio
    - `timeline.milestones[*].description`: reescrever descrições com voz real, menos bullet points corporativos
    - Verificar se seção `skills` tem chaves de label que precisam ser atualizadas
  - Reescrever as mesmas chaves em `messages/pt-BR.json`

  **Conteúdo de referência** (filosofia do Sérgio):
  - "Usuário Linux justamente para poder customizar tudo"
  - "Tenho meus atalhos, meus shortcuts baseados em Vim"
  - "Consigo fazer praticamente tudo pelo teclado de comandos"
  - "Eu sou um mago que domina a tecnologia"
  - "Diferente dos outros devs que só estão usando as ferramentas — eu tenho esse senso crítico"
  - "Eu entrei na área de tecnologia para poder mudar, criar, inventar fora da caixa"
  - "Sou músico, compositor, sou do improviso"
  - "TDAH — pensamento muito arborizado"
  - "Quando focado, consigo fazer trabalho grandioso"

  **Must NOT do**:
  - NÃO usar frases motivacionais genéricas ("making a real impact", "growing as a person")
  - NÃO incluir métricas nas descrições (99.8% uptime nos highlights do TCS pode virar descrição qualitativa)
  - NÃO usar auto-tradução para pt-BR

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requer tom narrativo autêntico, sensibilidade à voz do Sérgio, e edição de múltiplas seções JSON
  - **Skills**: nenhuma

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Tasks 3, 4, 6)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `messages/en.json:161-178` — seção `about` atual
  - `messages/en.json:48-76` — seção `origin` atual
  - `messages/en.json:78-103` — seção `journey` atual
  - `messages/en.json:219-278` — seção `timeline` atual
  - `.sisyphus/drafts/portfolio-refactor.md` — seção "Identidade Central" com citações do Sérgio

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Linguagem corporativa removida do about
    Tool: Bash
    Steps:
      1. grep -in "make a real impact\|grow as a person\|agile environments\|monorepo" messages/en.json | grep "about"
    Expected Result: 0 matches de clichês corporativos
    Evidence: .sisyphus/evidence/task-5-about-grep.txt

  Scenario: Identidade criador presente no about
    Tool: Bash
    Steps:
      1. grep -in "creator\|linux\|vim\|musician\|music\|criador" messages/en.json messages/pt-BR.json | grep "about"
    Expected Result: Pelo menos 2 matches — elementos da identidade real
    Evidence: .sisyphus/evidence/task-5-identity-grep.txt

  Scenario: About renderiza em ambas as línguas
    Tool: Playwright
    Preconditions: pnpm dev rodando
    Steps:
      1. Navegar para http://localhost:3000/en/about (ou scroll para seção about)
      2. Verificar que não há texto "[missing]"
      3. Screenshot
      4. Repetir para /pt-BR
    Expected Result: Ambas as línguas renderizam corretamente
    Evidence: .sisyphus/evidence/task-5-about-en.png, .sisyphus/evidence/task-5-about-ptbr.png
  ```

  **Commit**: YES
  - Message: `content(about): rewrite about/origin/journey sections (en + pt-BR)`
  - Files: `messages/en.json`, `messages/pt-BR.json`

- [x] 6. Criar Seção Manifesto — Componente + Elemento GSAP Generativo + Conteúdo (en + pt-BR)

  **What to do**:
  - Criar `components/portfolio/manifesto.tsx`:
    - Client component (`"use client"`)
    - Layout: tipografia pesada, frases curtas, uma por linha ou em blocos visuais — como um manifesto impresso
    - **Elemento generativo com GSAP (substituindo a foto)**: criar um `<canvas>` ou `<svg>` animado com GSAP que funcione como arte abstrata:
      - Opção concreta: linhas/traços que se desenham à medida que o usuário scrolla, formando uma forma geométrica orgânica (rede de nós, ou linhas convergindo). Usar `gsap.to()` com `strokeDashoffset` em SVG paths, acionado por `ScrollTrigger`
      - A forma NÃO deve ser reconhecível como pessoa/avatar — é abstrato, como uma assinatura ou circuito
      - Deve respeitar `prefers-reduced-motion`: se o usuário prefere sem movimento, renderizar a forma estática já desenhada
      - Usar apenas GSAP (já instalado) — zero novos pacotes
    - **Animação de texto**: ScrollTrigger stagger para revelar as frases uma a uma conforme scroll
    - **Pattern de cleanup**: `gsap.context().revert()` — obrigatório, seguir `intro.tsx`
    - Cores: usar `var(--color-accent-purple)` para o elemento generativo e destaques de texto (a variável será criada na Task 9; usar fallback `#7C3AED` se não existir ainda)
    - Exportação: `export function Manifesto()`
  - Adicionar chaves `manifesto.*` em `messages/en.json`:
    - `manifesto.title`: "THE MANIFESTO_" ou similar
    - `manifesto.lines`: array de frases curtas e agressivas que capturam a filosofia
    - `manifesto.closing`: frase final de impacto
  - Adicionar as mesmas chaves em `messages/pt-BR.json`

  **Conteúdo sugerido para manifesto** (baseado nas palavras do Sérgio):
  - "I don't use technology. I shape it." / "Não uso tecnologia. Eu a moldo."
  - "If the tool doesn't serve me, I build another." / "Se a ferramenta não me serve, eu crio outra."
  - "I build what I wished existed." / "Eu construo o que eu gostaria que existisse."
  - "Frustration becomes code. Code becomes system." / "Incomodo vira código. Código vira sistema."
  - "It's not about lines of code. It's about how I think." / "Não é sobre linhas de código. É sobre como eu penso."
  - "Linux. Everything by keyboard. Everything my way." / "Linux. Tudo pelo teclado. Tudo do meu jeito."

  **Must NOT do**:
  - NÃO importar novos pacotes além dos já existentes (gsap, react, next-intl)
  - NÃO usar WebGL, Three.js, canvas 2D complexo — apenas GSAP + SVG
  - NÃO adicionar o componente ao `page.tsx` nesta task — isso é Task 8
  - NÃO usar `as any` ou `@ts-ignore`
  - SEMPRE fazer cleanup com `gsap.context().revert()`
  - NÃO escrever frases corporativas ou genéricas
  - NÃO usar figura humana ou avatar reconhecível no elemento generativo

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Criação de componente React com GSAP animation e tipografia expressiva — território de UI/UX e engenharia visual
  - **Skills**: nenhuma específica (GSAP já configurado no projeto)

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Tasks 3, 4, 5)
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 8
  - **Blocked By**: Task 1

  **References**:
  - `components/portfolio/intro.tsx` — **padrão de GSAP animation + ScrollTrigger + cleanup**
  - `components/portfolio/vision.tsx` — possível estrutura similar (seção de texto impactante)
  - `components/shared/glitch-text.tsx` — efeitos de texto disponíveis se quiser usar
  - `components/shared/scroll-text-reveal.tsx` — padrão de reveal de texto
  - `messages/en.json` — estrutura de chaves existentes para seguir o padrão
  - `.sisyphus/drafts/portfolio-refactor.md` — citações do Sérgio para conteúdo

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Componente compila sem erros de TypeScript
    Tool: Bash
    Steps:
      1. pnpm tsc --noEmit
    Expected Result: exit code 0, sem erros em manifesto.tsx
    Evidence: .sisyphus/evidence/task-6-tsc.txt

  Scenario: Chaves de manifesto existem em ambas as línguas
    Tool: Bash
    Steps:
      1. grep -c "manifesto" messages/en.json messages/pt-BR.json
    Expected Result: Mesmo número de matches em ambos os arquivos
    Evidence: .sisyphus/evidence/task-6-keys-grep.txt

  Scenario: Sem conteúdo corporativo nas frases do manifesto
    Tool: Bash
    Steps:
      1. grep -i "scale\|production\|uptime\|deliver\|ship" messages/en.json | grep "manifesto"
    Expected Result: 0 matches
    Evidence: .sisyphus/evidence/task-6-content-grep.txt
  ```

  **Commit**: YES
  - Message: `feat(manifesto): add manifesto component + content (en + pt-BR)`
  - Files: `components/portfolio/manifesto.tsx`, `messages/en.json`, `messages/pt-BR.json`
  - Pre-commit: `pnpm tsc --noEmit`

- [x] 7. Reescrever Experience / Contact / Footer Content (en + pt-BR)

  **What to do**:
  - Reescrever `messages/en.json` — seções `experience`, `contact`, `footer`, `vision`:
    - `experience.jobs[*].highlights`: trocar bullet points corporativos por frases que mostram impacto real sem métricas de vaidade. Ex: "Mantive 99.8% availability" → "Mantive Carrefour logistics rodando quando mais importava"
    - `contact.callToAction`: **destruir** "READY TO SHIP YOUR NEXT PRODUCTION SYSTEM?" → novo CTA alinhado com a identidade ("Vamos criar algo que valha a pena?" / "Let's build something worth building.")
    - `vision.quote`: reescrever sem o tom genérico de "scale gracefully"
    - `vision.lookingFor`: reescrever — sem "teams that value craftsmanship", sem clichês. Ser direto sobre o que Sérgio quer de verdade
    - `footer.madeWith`: pode manter ou personalizar
  - Reescrever as mesmas chaves em `messages/pt-BR.json`
  - Verificar se `connect.tsx` lê o CTA do JSON ou tem texto hardcoded — se hardcoded, atualizar o componente também

  **Must NOT do**:
  - NÃO usar métricas em highlights de experience
  - NÃO usar "scale gracefully", "empower the people", "craftsmanship over shortcuts" — são clichês
  - NÃO inventar experiências que Sérgio não teve

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: nenhuma

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Task 8, Task 9)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:
  - `messages/en.json:280-401` — seções experience, contact, footer, vision
  - `components/portfolio/connect.tsx` — verificar se CTA é hardcoded ou JSON
  - `.sisyphus/evidence/task-2-components.md` — resultado da auditoria de componentes

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: CTA corporativo removido
    Tool: Bash
    Steps:
      1. grep -i "READY TO SHIP\|PRODUCTION SYSTEM\|NEXT PRODUCTION" messages/en.json messages/pt-BR.json
    Expected Result: 0 matches
    Evidence: .sisyphus/evidence/task-7-cta-grep.txt

  Scenario: CTA de contato renderiza corretamente
    Tool: Playwright
    Preconditions: pnpm dev rodando
    Steps:
      1. Navegar para http://localhost:3000/en
      2. Scrollar para o fim da página (seção contact/connect)
      3. Verificar que texto "READY TO SHIP" não aparece
      4. Verificar que o novo CTA renderiza
      5. Screenshot
    Expected Result: Novo CTA visível, sem texto corporativo
    Evidence: .sisyphus/evidence/task-7-cta-en.png
  ```

  **Commit**: YES
  - Message: `content(experience): rewrite experience/contact/footer (en + pt-BR)`
  - Files: `messages/en.json`, `messages/pt-BR.json`, `components/portfolio/connect.tsx` (se necessário)

- [x] 8. Reestruturar page.tsx — Nova Ordem de Seções

  **What to do**:
  - Ler `.sisyphus/evidence/task-2-components.md` para ter o mapa completo de componentes ativos/mortos
  - Editar `app/[locale]/page.tsx`:
    - Nova ordem: `<Intro>` → `<Manifesto>` → `<Projects/Proof>` → `<About/Origin>` → `<Experience/Timeline>` → `<Blog>` → `<Connect>`
    - Adicionar import de `Manifesto` (`import { Manifesto } from "@/components/portfolio/manifesto"`)
    - `certifications.tsx`: se não está na nova ordem, **comentar o import e uso** com nota `{/* certifications: removed from new structure — content preserved in component */}` — NÃO deletar o arquivo
    - `impact.tsx`: se for código morto (verificado na Task 2), comentar o import com a mesma nota
    - `skills.tsx`: decidir se continua na nova ordem ou é integrado em outra seção (ex: no About). Manter se não houver conflito com a nova narrativa
    - Adicionar `data-section` attributes em cada seção para facilitar QA: `<section data-section="hero">`, `<section data-section="manifesto">`, etc.
  - Se algum componente não existe ainda (ex: `<Journey>` virar `<Experience>`), verificar o nome correto antes de renomear imports

  **Must NOT do**:
  - NÃO deletar arquivos de componente — só comentar imports
  - NÃO refatorar a lógica interna dos componentes nesta task
  - NÃO alterar nada em `app/[locale]/layout.tsx`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Edição cirúrgica de page.tsx com risco de quebrar imports — requer cuidado técnico
  - **Skills**: nenhuma

  **Parallelization**:
  - **Can Run In Parallel**: NÃO — depende de TODAS as tasks de Wave 2
  - **Parallel Group**: Wave 3 (pode paralelizar com Tasks 7 e 9 desde que não dependam de page.tsx)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 2, 3, 4, 5, 6

  **References**:
  - `app/[locale]/page.tsx` — arquivo a editar
  - `.sisyphus/evidence/task-2-components.md` — mapa de componentes
  - `components/portfolio/manifesto.tsx` — novo componente a importar (criado na Task 6)
  - AGENTS.md — convenção de imports `@/components/portfolio/...`

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Build passa após reestruturação
    Tool: Bash
    Steps:
      1. pnpm build
      2. pnpm tsc --noEmit
    Expected Result: exit code 0 em ambos
    Evidence: .sisyphus/evidence/task-8-build.txt

  Scenario: Ordem das seções correta (Playwright)
    Tool: Playwright
    Preconditions: pnpm dev rodando
    Steps:
      1. Navegar para http://localhost:3000/en
      2. Executar: document.querySelectorAll('[data-section]').length > 0
      3. Verificar que [data-section="manifesto"] aparece antes de [data-section="projects"] no DOM
      4. Screenshot da página completa
    Expected Result: Seções na ordem: hero → manifesto → projects → about → experience → blog → contact
    Evidence: .sisyphus/evidence/task-8-order-en.png

  Scenario: Nenhum texto [missing] visível
    Tool: Playwright
    Preconditions: pnpm dev rodando
    Steps:
      1. Navegar para http://localhost:3000/en
      2. Verificar que o texto "[missing:" não aparece em nenhum lugar
      3. Navegar para http://localhost:3000/pt-BR
      4. Verificar que o texto "[missing:" não aparece
    Expected Result: 0 ocorrências de "[missing:" em ambas as línguas
    Evidence: .sisyphus/evidence/task-8-missing-check.png
  ```

  **Commit**: YES
  - Message: `refactor(page): restructure section order in page.tsx`
  - Files: `app/[locale]/page.tsx`
  - Pre-commit: `pnpm tsc --noEmit && pnpm build`

- [x] 9. Evolução Visual — Tokens Purple + CSS Variables

  **What to do**:
  - Ler `tailwind.config.js` e `app/[locale]/globals.css` para entender o sistema de tokens atual
  - Adicionar tokens purple **aditivamemte** ao `tailwind.config.js`:
    - `colors.purple.DEFAULT`: tom principal purple (#7C3AED ou similar — escuro e intenso)
    - `colors.purple.light`: versão mais clara para hover/glow
    - `colors.purple.dark`: versão mais escura para backgrounds sutis
  - Adicionar/atualizar CSS custom properties em `globals.css`:
    - `--color-accent-purple`: valor do purple principal
    - `--color-accent-purple-glow`: versão com alpha para glow effects
    - Atualizar `--color-accent` (acento principal do tema) para apontar para o purple
  - Aplicar o purple nos componentes chave — só classe, sem lógica:
    - Hero (`intro.tsx`): aplicar purple no destaque/highlight do título
    - Manifesto (`manifesto.tsx`): aplicar purple nas frases de destaque
    - Nav (`nav.tsx`): verificar se o logo/acento usa o acento principal — se sim, já pega automaticamente
  - NÃO mudar tons de texto (branco/preto) nem backgrounds — só os acentos

  **Must NOT do**:
  - NÃO remover tokens existentes (só adicionar novos)
  - NÃO mudar famílias de fontes
  - NÃO migrar para Tailwind v4 `@theme` syntax
  - NÃO adicionar `box-shadow` ou `text-shadow` complexos sem testar mobile
  - NÃO criar novos keyframes de animação nesta task

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Mudanças de design system — tokens, CSS variables, aplicação visual
  - **Skills**: nenhuma

  **Parallelization**:
  - **Can Run In Parallel**: YES (com Tasks 7 e 8)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1-F4
  - **Blocked By**: Task 1

  **References**:
  - `tailwind.config.js` — sistema de tokens atual (ler completamente antes de editar)
  - `app/[locale]/globals.css` — CSS custom properties atuais
  - `components/portfolio/intro.tsx` — onde aplicar purple no hero
  - `components/portfolio/manifesto.tsx` — onde aplicar purple (criado na Task 6)
  - AGENTS.md — "Custom utilities: `text-brutalist`, `shadow-brutalist`"

  **Acceptance Criteria**:

  **QA Scenarios**:
  ```
  Scenario: Build passa com novos tokens
    Tool: Bash
    Steps:
      1. pnpm build
    Expected Result: exit code 0
    Evidence: .sisyphus/evidence/task-9-build.txt

  Scenario: Purple visível no hero
    Tool: Playwright
    Preconditions: pnpm dev rodando
    Steps:
      1. Navegar para http://localhost:3000/en
      2. Screenshot da seção hero
      3. Verificar visualmente que há elemento com cor purple/violeta
    Expected Result: Screenshot mostra acento visual purple
    Evidence: .sisyphus/evidence/task-9-purple-hero.png

  Scenario: Tokens existentes não foram removidos
    Tool: Bash
    Steps:
      1. grep -c "brutalist\|shadow-brutalist\|text-brutalist" tailwind.config.js app/[locale]/globals.css
    Expected Result: Count >= valor original (tokens não foram removidos)
    Evidence: .sisyphus/evidence/task-9-tokens-check.txt
  ```

  **Commit**: YES
  - Message: `design(palette): apply purple tokens to CSS variables + Tailwind config`
  - Files: `tailwind.config.js`, `app/[locale]/globals.css`, `components/portfolio/intro.tsx`, `components/portfolio/manifesto.tsx`
  - Pre-commit: `pnpm build`

---

## Final Verification Wave (MANDATORY — após TODAS as tasks de implementação)

> 4 agentes de review em PARALELO. TODOS devem APROVAR. Apresentar resultados consolidados ao user e aguardar aprovação explícita antes de concluir.

- [x] F1. **Auditoria de Compliance** — `oracle`
  Ler o plano completo. Para cada "Must Have": verificar que o conteúdo existe nos arquivos JSON e/ou componente (`grep`, `Read`). Para cada "Must NOT Have": executar `grep -r "uptime\|19K\|20K\|LINES OF CODE\|99%\|READY TO SHIP" messages/` — rejeitar se houver match. Verificar que `certifications.tsx` não está importado em `page.tsx`. Verificar que arquivos de evidence existem em `.sisyphus/evidence/`.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Revisão de Qualidade de Código** — `unspecified-high`
  Executar `pnpm build`, `pnpm tsc --noEmit`, `pnpm lint`. Revisar `manifesto.tsx` para: `as any`, `@ts-ignore`, console.log em produção, imports não usados. Verificar que GSAP usa `gsap.context().revert()` para cleanup. Verificar que `"use client"` está presente onde necessário.
  Output: `Build [PASS/FAIL] | TSC [PASS/FAIL] | Lint [PASS/FAIL] | VERDICT`

- [x] F3. **QA Real em Browser** — `unspecified-high` + skill `playwright`
  Estado limpo. Navegar para `/en` e `/pt-BR`. Para cada seção: verificar que conteúdo renderiza, não há texto `[missing]`, não há métricas corporativas visíveis. Testar language switcher: de `/en` para `/pt-BR` e voltando. Verificar hero anchor line em ambas línguas. Salvar screenshots em `.sisyphus/evidence/final-qa/`.
  Output: `EN [PASS/FAIL] | PT-BR [PASS/FAIL] | Language Switch [PASS/FAIL] | VERDICT`

- [x] F4. **Scope Fidelity** — `deep`
  Para cada task: ler "What to do", ler diff (`git log --oneline`, `git diff HEAD~N`). Verificar que nada além do JSON e componentes autorizados foi modificado. Verificar que `components/blog/`, `lib/blog/`, `content/` não foram tocados. Verificar que nenhum novo pacote foi adicionado ao `package.json`.
  Output: `Tasks [N/N compliant] | No-touch zones [CLEAN/issues] | VERDICT`

---

## Commit Strategy

```
commit 1: chore(audit): map all content requiring change
commit 2: chore(audit): verify section components structure
commit 3: content(hero): rewrite hero + SEO metadata (en + pt-BR)
commit 4: content(projects): rewrite projects with origin stories (en + pt-BR)
commit 5: content(about): rewrite about/origin/journey sections (en + pt-BR)
commit 6: feat(manifesto): add manifesto component + content (en + pt-BR)
commit 7: content(experience): rewrite experience/contact/footer (en + pt-BR)
commit 8: refactor(page): restructure section order in page.tsx
commit 9: design(palette): apply purple tokens to CSS variables + Tailwind config
```

---

## Success Criteria

### Verification Commands
```bash
# Sem métricas corporativas
grep -r "uptime\|UPTIME\|19K\|20K\|LINES OF CODE\|99%" messages/
# Expected: 0 matches

# Build sem erros
pnpm build
# Expected: exit code 0

# TypeScript sem erros novos
pnpm tsc --noEmit
# Expected: exit code 0

# Lint limpo
pnpm lint
# Expected: exit code 0

# Linha âncora presente em ambas as línguas
grep -i "criador\|creator" messages/pt-BR.json messages/en.json
# Expected: match em ambos os arquivos

# CTA corporativo removido
grep -i "READY TO SHIP\|PRODUCTION SYSTEM" messages/en.json messages/pt-BR.json
# Expected: 0 matches
```

### Final Checklist
- [ ] Todos os "Must Have" presentes e verificados
- [ ] Todos os "Must NOT Have" ausentes (grep clean)
- [ ] Build, TypeScript e Lint passando
- [ ] Ambas as línguas renderizando sem `[missing]`
- [ ] Seção Manifesto visível com conteúdo real
- [ ] Origin stories em todos os 6 projetos
