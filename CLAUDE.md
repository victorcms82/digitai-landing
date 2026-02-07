# CLAUDE.md — Digitai Landing

Este arquivo fornece orientações para o Claude Code ao trabalhar neste repositório.

## Data e Hora Local

**IMPORTANTE:** Sempre verifique a data e hora local do usuário antes de trabalhar:
```bash
date
```
Isso ajuda a contextualizar commits, changelogs e documentação com datas corretas.

## Visão Geral

Landing page e demo interativo para captura de leads da Digitai.

**URL Produção:** https://demo.digitai.app

## Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Deploy:** Vercel
- **PWA:** Instalável, funciona offline

## Estrutura

```
digitai-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── demo/page.tsx     # Demo interativo com chat IA
│   │   └── offline/page.tsx  # Página offline PWA
│   └── components/           # Componentes React
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service Worker
│   └── icons/                # Ícones PWA (verde #059669)
└── scripts/
    └── generate-icons.js     # Gerador de ícones
```

## Comandos

```bash
npm run dev      # Desenvolvimento (localhost:3000)
npm run build    # Build produção
npm run start    # Servidor produção
npm run lint     # ESLint
```

## PWA

- **Cor tema:** Verde (#059669)
- **Ícones:** Gerados via `scripts/generate-icons.js`
- **Offline:** Service Worker com cache de assets
- **Instalável:** Banner + InstallFab component

## Variáveis de Ambiente

```env
GOOGLE_GENERATIVE_AI_API_KEY=   # API do Gemini para demo
```

## Relação com Outros Projetos

| Projeto | Relação |
|---------|---------|
| `saas-multi-tenant` | Sistema principal (produto) |
| `projects-hub` | Gerenciador central |
| **Este (digitai-landing)** | Landing/demo para prospects |

## Convenções

- Commits em português ou inglês
- Usar Tailwind para estilos
- Componentes em `src/components/`
- Manter PWA funcionando (testar offline)

## Deploy

Push para `main` → Deploy automático na Vercel

## REGRAS DE PERMISSÕES (.claude/settings.local.json)

O arquivo .claude/settings.local.json já contém wildcards genéricos como `Bash(git *)`, `Bash(npm *)`, etc. que cobrem TODOS os comandos desses prefixos.

**REGRAS OBRIGATÓRIAS:**
1. NUNCA adicione entradas específicas no settings.local.json — os wildcards já cobrem tudo
2. Se um comando começa com um prefixo já permitido, apenas EXECUTE
3. NUNCA salve comandos longos como permissão
