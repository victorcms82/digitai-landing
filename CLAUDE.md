# CLAUDE.md — Digitai Landing

Este arquivo fornece orientações para o Claude Code ao trabalhar neste repositório.

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
│   └── icons/                # Ícones PWA — warm dark (#141210), monograma Digitai v2-mid (SPEC v1.1 §2.4)
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

- **Cor tema:** Warm dark (#141210) — paleta SPEC v1.1 DSG-7
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
| `digitai-ai-agents-platform` | Plataforma de agentes IA (produto) |
| `projects-hub` | Gerenciador central |
| **Este (digitai-landing)** | Landing/demo para prospects |

## Convenções

- Commits em português ou inglês
- Usar Tailwind para estilos
- Componentes em `src/components/`
- Manter PWA funcionando (testar offline)

## Deploy

Push para `main` → Deploy automático na Vercel

