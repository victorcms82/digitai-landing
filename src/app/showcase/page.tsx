"use client"

import { useState, useRef, useEffect } from "react"
import {
  MessageSquare, Bot, Zap, Brain, BarChart3, Shield,
  Users, Building2, Stethoscope, Wrench, Scale, ShoppingCart,
  GraduationCap, Utensils, Home, Send, User, Loader2,
  ClipboardList, FileText, Calculator, Headphones, Package,
  Calendar, ChevronDown, Sparkles, ArrowRight, CheckCircle2
} from "lucide-react"

// ─── Showcase System Prompt (multi-function demo) ───
const SHOWCASE_PROMPT = `Você é a assistente virtual de demonstração da plataforma Digitai.

## Sua Identidade
- Nome: Sofia (assistente de demonstração)
- Você está demonstrando as capacidades da plataforma Digitai para um potencial cliente
- Seja impressionante, profissional e mostre o poder da plataforma

## O que você pode demonstrar
Você é capaz de simular TODAS as funções que um agente Digitai oferece:

1. **Atendimento Inteligente** — Responder dúvidas sobre qualquer tipo de negócio
2. **Coleta de Dados (Intake)** — Coletar informações estruturadas do cliente (anamnese, briefing, diagnóstico)
3. **Geração de Documentos** — Gerar fichas, relatórios, orçamentos formatados
4. **Orçamentos Automáticos** — Calcular e apresentar propostas de preço
5. **Suporte ao Cliente** — Abrir e acompanhar tickets de suporte
6. **Gestão de Pedidos** — Receber e processar pedidos

## Como se comportar
- Se alguém perguntar "o que você faz", mostre a amplitude de funções
- Se alguém simular ser um cliente de clínica, oficina, escritório, etc — entre no papel e demonstre como o agente atuaria
- Use exemplos concretos e realistas
- Seja concisa mas impressionante (máx 3-4 parágrafos)
- Use emojis com moderação
- Em português brasileiro
- NUNCA diga que é apenas uma simulação. Aja como um agente real demonstrando capacidades reais.

## Exemplos de interação
- "Como funciona?" → Explique as 6 funções com exemplos
- "Finge que é uma oficina" → Simule atendimento de oficina (orçamento de reparo, coleta de dados do veículo, agendamento de visita)
- "E pra um escritório?" → Simule atendimento corporativo (intake de solicitação, geração de relatório, suporte)
- "Quanto custa um orçamento?" → Simule geração de orçamento detalhado

## Objetivo
Deixar a pessoa impressionada com o que a IA pode fazer. Mostrar que NÃO é só chatbot de FAQ — é uma funcionária virtual completa.`

// ─── Types ───
interface Message {
  role: "user" | "assistant"
  content: string
}

// ─── Stats Data ───
const stats = [
  { value: "6", label: "Funções integradas", suffix: "" },
  { value: "11", label: "Nichos de mercado", suffix: "+" },
  { value: "90", label: "Tipos de agentes IA", suffix: "+" },
  { value: "24", label: "Disponibilidade", suffix: "/7" },
]

// ─── Capabilities Data ───
const capabilities = [
  {
    icon: MessageSquare,
    title: "Atendimento Inteligente",
    description: "Responde dúvidas, qualifica leads e encaminha com contexto. Entende áudio, imagem e PDF.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Calendar,
    title: "Agendamento Automático",
    description: "Verifica disponibilidade, marca horários e envia lembretes. Integração com Google Calendar.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: ClipboardList,
    title: "Coleta de Dados",
    description: "Anamnese, briefing, diagnóstico — coleta estruturada de informações em formulário conversacional.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: FileText,
    title: "Geração de Documentos",
    description: "Fichas, relatórios, contratos — gera documentos formatados a partir dos dados coletados.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Calculator,
    title: "Orçamentos Automáticos",
    description: "Calcula e apresenta propostas de preço personalizadas com base no que o cliente precisa.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Headphones,
    title: "Suporte & Tickets",
    description: "Abre chamados, categoriza problemas e acompanha resolução. Sem fila de espera.",
    color: "from-sky-500 to-blue-500",
  },
]

// ─── Niches Data ───
const niches = [
  { icon: Stethoscope, name: "Saúde", example: "Clínicas, consultórios, laboratórios" },
  { icon: Scale, name: "Jurídico", example: "Escritórios de advocacia" },
  { icon: Building2, name: "Corporativo", example: "RH, operações, administrativo" },
  { icon: Wrench, name: "Serviços", example: "Oficinas, assistências, manutenção" },
  { icon: ShoppingCart, name: "Varejo", example: "Lojas, e-commerce, atacado" },
  { icon: Utensils, name: "Food Service", example: "Restaurantes, delivery, buffets" },
  { icon: Home, name: "Imobiliário", example: "Imobiliárias, construtoras" },
  { icon: GraduationCap, name: "Educação", example: "Escolas, cursos, treinamentos" },
]

// ─── Chat Suggestions ───
const suggestions = [
  "O que você consegue fazer?",
  "Simula um atendimento de oficina",
  "Como funciona o orçamento automático?",
  "Mostra a coleta de dados",
]

// ─── Animated Counter Component ───
function AnimatedStat({ value, label, suffix }: { value: string; label: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const target = parseInt(value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 1500
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isVisible, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm sm:text-base text-slate-400">{label}</div>
    </div>
  )
}

// ─── Main Page ───
export default function ShowcasePage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! Sou a Sofia, assistente de demonstração da Digitai. Posso te mostrar tudo que um agente IA faz — atendimento, orçamentos, coleta de dados, documentos e muito mais. O que você quer ver? 😊" }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text || isLoading) return
    setInput("")
    setChatOpen(true)
    setMessages(prev => [...prev, { role: "user", content: text }])
    setIsLoading(true)

    try {
      const allMessages = [...messages, { role: "user" as const, content: text }]
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages,
          systemPrompt: SHOWCASE_PROMPT,
        }),
      })
      if (!response.ok) throw new Error("Erro")
      const data = await response.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Desculpe, tive um problema técnico. Tente novamente!" }])
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300">Plataforma de Agentes IA Multifunção</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              Sua equipe de IA
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              24/7
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
            Agentes de inteligência artificial que atendem, agendam, coletam dados,
            geram documentos e fazem orçamentos. Tudo pelo WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToChat}
              className="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              <MessageSquare className="h-5 w-5" />
              Testar agora
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-slate-600" />
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-20 sm:py-28 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CAPABILITIES ════════ */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Não é chatbot.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                É funcionário.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400 text-lg">
              Cada agente combina múltiplas funções em uma única conversa inteligente.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80"
              >
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${cap.color} p-3 mb-4`}>
                  <cap.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{cap.title}</h3>
                <p className="text-slate-400 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="py-20 sm:py-28 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Como funciona
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400 text-lg">
              Do zero ao agente funcionando em minutos, sem código.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 sm:gap-12">
              {[
                { step: "01", title: "Configure seu negócio", desc: "Informe seus serviços, horários, equipe e regras de atendimento. O sistema cria o agente sob medida." },
                { step: "02", title: "Conecte seus canais", desc: "WhatsApp (API oficial), webchat, Instagram, email — o agente responde em todos, com o mesmo contexto." },
                { step: "03", title: "Ative as funções", desc: "Agendamento, orçamento, coleta de dados, documentos, suporte, pedidos — ligue o que precisar." },
                { step: "04", title: "Acompanhe tudo", desc: "Painel completo com analytics, CRM, histórico de conversas, métricas de satisfação e custos." },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ NICHES ════════ */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Qualquer{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                negócio.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400 text-lg">
              A plataforma se adapta ao seu segmento. O agente entende o vocabulário,
              os processos e as regras do seu mercado.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {niches.map((niche) => (
              <div
                key={niche.name}
                className="group rounded-xl border border-slate-800 bg-slate-900/30 p-4 sm:p-5 text-center transition-all hover:border-slate-700 hover:bg-slate-900/60"
              >
                <niche.icon className="h-8 w-8 mx-auto mb-3 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <h3 className="font-semibold mb-1">{niche.name}</h3>
                <p className="text-xs text-slate-500">{niche.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DIFFERENTIALS ════════ */}
      <section className="py-20 sm:py-28 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Por que{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Digit<span className="text-cyan-400">AI</span>
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Brain, title: "IA de verdade", desc: "Não é fluxograma. O agente entende contexto, interpreta áudios, imagens e PDFs, e responde de forma natural." },
                { icon: Shield, title: "WhatsApp Oficial", desc: "API oficial da Meta (WABA). Sem risco de banimento, com selo verde e criptografia end-to-end." },
                { icon: Zap, title: "Multifunção", desc: "Um agente que faz o trabalho de vários: atende, agenda, orça, coleta dados, gera documentos e processa pedidos." },
                { icon: BarChart3, title: "Controle total", desc: "Painel admin com analytics, CRM integrado, métricas de satisfação, custos por conversa e histórico completo." },
                { icon: Users, title: "Multi-agente", desc: "Configure agentes diferentes para funções diferentes. Cada um com sua personalidade, regras e ferramentas." },
                { icon: Building2, title: "Escalável", desc: "De 1 a 100 agentes. Infra preparada para crescer junto com o seu negócio." },
              ].map((diff) => (
                <div key={diff.title} className="flex gap-4 p-4 rounded-xl hover:bg-slate-900/50 transition-colors">
                  <diff.icon className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{diff.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{diff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ LIVE CHAT DEMO ════════ */}
      <section ref={chatSectionRef} className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Teste{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                agora
              </span>
            </h2>
            <p className="mx-auto max-w-xl text-slate-400 text-lg">
              Converse com um agente Digitai e veja o que ele é capaz de fazer.
            </p>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur overflow-hidden shadow-2xl shadow-blue-500/5">
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Sofia — Agente Digitai</h3>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-slate-400">Online agora</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl bg-slate-800 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && !chatOpen && (
              <div className="border-t border-slate-800 px-4 py-3 bg-slate-900/50">
                <p className="text-xs text-slate-500 mb-2">Sugestões:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSendMessage(s)}
                      className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-blue-500/50 hover:text-white hover:bg-slate-800"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-slate-800 bg-slate-900 p-4">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage() }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 h-11 rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 active:scale-95"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* CTA below chat */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Isso é uma demonstração. O agente real funciona no WhatsApp, Instagram, webchat e email.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">
            Digit<span className="text-blue-500">AI</span>
          </div>
          <p className="text-slate-500 text-sm mb-2">
            Plataforma de agentes IA multifunção
          </p>
          <p className="text-slate-600 text-xs">
            Evolute Digital &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
