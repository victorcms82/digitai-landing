"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  MessageSquare, Bot, Zap, Brain, BarChart3, Shield,
  Users, Building2, Stethoscope, Wrench, Scale, ShoppingCart,
  GraduationCap, Utensils, Home, Send, User, Loader2,
  ClipboardList, FileText, Calculator, Headphones, Package,
  Calendar, ChevronDown, Sparkles, ArrowRight, CheckCircle2,
  Briefcase, Truck, HardHat, Heart, DollarSign, ChevronUp,
  Mail, Phone, Globe, Instagram, Paperclip, X, ExternalLink
} from "lucide-react"

// ─── Agent Prompts ───
const TAMI_PROMPT = `Você é a Tami, funcionária de IA da clínica Bella Estética.

## Sua Identidade
- Nome: Tami
- Cargo: Recepcionista e assistente virtual da Bella Estética
- Você cuida de todo o atendimento da clínica: agendamentos, anamnese, orçamentos e fichas de pacientes
- Tom: acolhedor, profissional e empático. Trate cada pessoa como paciente, não como "usuário"

## O que você faz
1. **Agendamento** — Verifica disponibilidade, sugere horários e marca procedimentos (limpeza de pele, botox, preenchimento, peeling, drenagem, massagem)
2. **Anamnese** — Coleta dados de saúde do paciente antes do procedimento (alergias, medicações, histórico, gestação)
3. **Orçamento** — Monta orçamento personalizado com os procedimentos que a paciente precisa
4. **Ficha do paciente** — Gera ficha completa com dados pessoais + anamnese + procedimentos anteriores
5. **Suporte** — Tira dúvidas sobre pós-procedimento, cuidados, contraindicações

## Como se comportar
- Sempre cumprimente com o nome da clínica
- Use termos da estética (procedimento, sessão, protocolo, área tratada)
- Pergunte sobre alergias/contraindicações antes de sugerir procedimento
- Sugira combinações de tratamento quando fizer sentido
- Seja concisa (máx 3-4 parágrafos)
- Use emojis com moderação (✨💆‍♀️📋)
- Em português brasileiro
- NUNCA diga que é simulação. Aja como recepcionista real

## Profissionais da clínica
- Dra. Marina — Dermatologista (botox, preenchimento, peeling)
- Camila — Esteticista (limpeza de pele, drenagem, massagem)
- Paula — Nutricionista (protocolo detox, emagrecimento)

## Horários
Segunda a sexta: 8h às 19h | Sábado: 8h às 13h`

const SOFIA_JURIDICO_PROMPT = `Você é a Sofia, funcionária de IA do escritório Castro & Associados Advocacia.

## Sua Identidade
- Nome: Sofia
- Cargo: Assistente jurídica virtual do escritório Castro & Associados
- Você faz o primeiro atendimento, coleta dados do caso, agenda consultas e gera documentos
- Tom: profissional, objetivo e confiável. Use linguagem acessível, sem juridiquês desnecessário

## O que você faz
1. **Intake do caso** — Coleta dados estruturados: tipo de demanda, partes envolvidas, documentos disponíveis, prazos, urgência
2. **Geração de documentos** — Gera petições iniciais, contratos, notificações extrajudiciais, pareceres e procurações a partir dos dados coletados
3. **Agendamento** — Marca consultas presenciais ou por videoconferência com os advogados
4. **Orçamento de honorários** — Calcula e apresenta proposta de honorários com base no tipo de causa e complexidade
5. **Suporte** — Acompanhamento de processos, prazos e andamentos

## Como se comportar
- Sempre pergunte o tipo de demanda antes de qualquer coisa (trabalhista, cível, contratual, família, empresarial)
- Colete os fatos relevantes de forma organizada
- Se for urgente (liminar, prazo), sinalize e priorize
- Explique os próximos passos de forma clara
- Seja concisa (máx 3-4 parágrafos)
- Use emojis com moderação (⚖️📋📄)
- Em português brasileiro
- NUNCA diga que é simulação. Aja como assistente jurídica real

## Áreas de atuação
- Dra. Ana Castro — Direito Trabalhista e Previdenciário
- Dr. Ricardo Mendes — Direito Civil e Contratos
- Dra. Juliana Reis — Direito de Família e Sucessões
- Dr. Pedro Almeida — Direito Empresarial

## Horários
Segunda a sexta: 9h às 18h | Sábados mediante agendamento prévio`

// ─── Types ───
interface Message {
  role: "user" | "assistant"
  content: string
}

// ─── Stats Data ───
const stats = [
  { value: "6", label: "Funções integradas", suffix: "" },
  { value: "11", label: "Nichos de mercado", suffix: "+" },
  { value: "64", label: "Tipos de funcionários IA", suffix: "+" },
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

// ─── Agent Definitions ───
interface AgentDef {
  id: string
  name: string
  niche: string
  color: string
  prompt: string
  welcomeMessage: string
  emailAddress: string
  waNumber: string
  emailPlaceholders: {
    name: string
    email: string
    subject: string
    body: string
  }
}

const agents: AgentDef[] = [
  {
    id: "tami",
    name: "Tami",
    niche: "Estética",
    color: "from-pink-500 to-rose-500",
    prompt: TAMI_PROMPT,
    welcomeMessage: "Olá! Eu sou a Tami, da Bella Estética. ✨\n\nCuido de todo o atendimento da clínica: agendo procedimentos, faço anamnese, monto orçamentos e gero fichas de pacientes — tudo aqui na conversa.\n\nComo posso te ajudar hoje?",
    emailAddress: "tami@reply.digitai.app",
    waNumber: "5521971527140",
    emailPlaceholders: {
      name: "Maria Silva",
      email: "maria@email.com",
      subject: "Agendamento de limpeza de pele",
      body: "Olá, gostaria de saber os horários disponíveis para uma limpeza de pele...",
    },
  },
  {
    id: "sofia",
    name: "Sofia",
    niche: "Jurídico",
    color: "from-blue-500 to-indigo-500",
    prompt: SOFIA_JURIDICO_PROMPT,
    welcomeMessage: "Olá! Eu sou a Sofia, do escritório Castro & Associados. ⚖️\n\nFaço o primeiro atendimento jurídico: coleto os dados do seu caso, agendo consultas com nossos advogados, gero documentos e monto propostas de honorários.\n\nQual a sua demanda?",
    emailAddress: "sofia@reply.digitai.app",
    waNumber: "15558354441",
    emailPlaceholders: {
      name: "Carlos Oliveira",
      email: "carlos@email.com",
      subject: "Consulta trabalhista",
      body: "Olá, preciso de orientação sobre uma rescisão contratual. Podem me ajudar?",
    },
  }
]

// ─── Niches Data with Employees ───
interface NicheEmployee {
  name: string
  desc: string
}

interface NicheData {
  icon: typeof Stethoscope
  name: string
  example: string
  employees: NicheEmployee[]
}

const niches: NicheData[] = [
  {
    icon: Stethoscope, name: "Saúde & Estética", example: "Clínicas, consultórios, salões, academias",
    employees: [
      { name: "Esteticista", desc: "Anamnese, ficha, agendamento e orçamento de tratamentos" },
      { name: "Dermatologista", desc: "Consulta, anamnese, receita gerada e retorno agendado" },
      { name: "Dentista", desc: "Triagem, orçamento de procedimento e agendamento" },
      { name: "Médico Geral", desc: "Pré-consulta, anamnese e encaminhamento" },
      { name: "Fisioterapeuta", desc: "Avaliação, plano de sessões e relatório de evolução" },
      { name: "Psicólogo", desc: "Triagem, agendamento e ficha de acompanhamento" },
      { name: "Nutricionista", desc: "Anamnese alimentar, plano e relatório de progresso" },
      { name: "Personal Trainer", desc: "Avaliação física, treino e acompanhamento" },
      { name: "Veterinário", desc: "Ficha do pet, vacinação e agendamento" },
      { name: "Cabeleireiro", desc: "Agendamento e orçamento de serviços" },
    ]
  },
  {
    icon: Scale, name: "Jurídico", example: "Escritórios de advocacia, cartórios, compliance",
    employees: [
      { name: "Advogado Contratualista", desc: "Dados do caso, contrato gerado e honorários" },
      { name: "Advogado Trabalhista", desc: "Coleta de dados, petição e notificação" },
      { name: "Tabelião", desc: "Agendamento, coleta e documentação cartorial" },
      { name: "Analista de Compliance", desc: "Coleta, relatório e suporte regulatório" },
      { name: "DPO / LGPD", desc: "Coleta de incidentes, relatório e suporte" },
      { name: "Analista de Contratos", desc: "Revisão, geração e relatório de contratos" },
    ]
  },
  {
    icon: DollarSign, name: "Contabilidade", example: "Escritórios contábeis, consultorias financeiras",
    employees: [
      { name: "Contador", desc: "Dados fiscais, declarações e relatório mensal" },
      { name: "Despachante", desc: "Dados do veículo, documentação e orçamento" },
      { name: "Analista Financeiro", desc: "Coleta de dados e relatório financeiro" },
      { name: "Consultor Financeiro", desc: "Diagnóstico, plano financeiro e acompanhamento" },
      { name: "Analista Fiscal", desc: "Coleta tributária, documentos e relatório" },
    ]
  },
  {
    icon: Utensils, name: "Food Service", example: "Restaurantes, pizzarias, confeitarias, delivery",
    employees: [
      { name: "Chef / Cozinheiro", desc: "Pedidos pelo WhatsApp e relatório de vendas" },
      { name: "Pizzaiolo", desc: "Cardápio interativo, pedido e suporte entrega" },
      { name: "Confeiteiro", desc: "Encomenda personalizada, ficha e orçamento" },
      { name: "Farmacêutico", desc: "Receita, manipulação e orçamento" },
    ]
  },
  {
    icon: ShoppingCart, name: "Varejo", example: "Lojas, e-commerce, marketplaces",
    employees: [
      { name: "Vendedor", desc: "Qualificação, orçamento personalizado e pedido" },
      { name: "SAC / Ouvidoria", desc: "Reclamação, ticket e relatório de tendências" },
      { name: "Customer Success", desc: "Acompanhamento, ficha e relatório de saúde" },
      { name: "Pós-venda", desc: "Follow-up, pesquisa de satisfação e relatório" },
    ]
  },
  {
    icon: HardHat, name: "Construção & Serviços", example: "Arquitetos, engenheiros, mecânicos, técnicos",
    employees: [
      { name: "Arquiteto", desc: "Briefing, memorial descritivo e orçamento de projeto" },
      { name: "Engenheiro Civil", desc: "Visita técnica, laudo/ART e orçamento" },
      { name: "Mecânico", desc: "Diagnóstico do veículo, orçamento e agendamento" },
      { name: "Eletricista", desc: "Chamado, orçamento e agendamento de visita" },
      { name: "Técnico TI", desc: "Abertura de chamado, diagnóstico e orçamento" },
    ]
  },
  {
    icon: Home, name: "Imobiliário", example: "Imobiliárias, corretoras de seguros",
    employees: [
      { name: "Corretor de Imóveis", desc: "Qualifica lead, agenda visita e proposta" },
      { name: "Corretor de Seguros", desc: "Perfil do segurado, apólice e cotação" },
      { name: "Corretor Plano de Saúde", desc: "Perfil, cotação e documentação" },
      { name: "Consultor de Imigração", desc: "Intake, documentação e agendamento" },
    ]
  },
  {
    icon: GraduationCap, name: "Educação", example: "Professores, coaches, consultores, agências",
    employees: [
      { name: "Professor / Tutor", desc: "Avaliação, material gerado e relatório de progresso" },
      { name: "Coach / Mentor", desc: "Intake, plano de ação e acompanhamento" },
      { name: "Consultor de Negócios", desc: "Diagnóstico, proposta e relatório" },
      { name: "Agência de Marketing", desc: "Briefing, proposta e relatório de campanha" },
    ]
  },
  {
    icon: Briefcase, name: "Comercial", example: "SDRs, key accounts, analistas, licitações",
    employees: [
      { name: "SDR / Pré-vendas", desc: "Qualificação do lead e agendamento com closer" },
      { name: "Key Account Manager", desc: "Health check, plano de ação e renovação" },
      { name: "Analista Comercial", desc: "Coleta, proposta comercial e relatório" },
      { name: "Analista de Licitações", desc: "Documentação, proposta e relatório" },
    ]
  },
  {
    icon: Users, name: "RH & Pessoas", example: "Recrutamento, DP, treinamento",
    employees: [
      { name: "Recrutador", desc: "Triagem CV, agendamento de entrevista e funil" },
      { name: "Analista de DP", desc: "Solicitação, holerite/férias e relatório de folha" },
      { name: "Analista de Treinamento", desc: "Inscrição, material e relatório de presença" },
      { name: "BP de RH", desc: "Atendimento, coleta e relatório gerencial" },
    ]
  },
  {
    icon: Truck, name: "Operações", example: "Compras, estoque, facilities, TI, projetos",
    employees: [
      { name: "Comprador", desc: "Requisição, cotação de fornecedor e pedido" },
      { name: "Facilities", desc: "Chamado, orçamento e agendamento de manutenção" },
      { name: "Secretária Executiva", desc: "Agenda, documentos e relatórios" },
      { name: "Helpdesk N1", desc: "Abertura de ticket, diagnóstico e encaminhamento" },
      { name: "Gerente de Projetos", desc: "Status, coleta de dados e relatório de progresso" },
    ]
  },
]

// ─── Chat Suggestions per Agent ───
const suggestionsMap: Record<string, string[]> = {
  tami: [
    "Quero agendar uma limpeza de pele",
    "Quanto custa botox?",
    "Preciso fazer uma anamnese",
    "Quais procedimentos vocês fazem?",
  ],
  sofia: [
    "Preciso de um contrato de prestação de serviços",
    "Quero agendar uma consulta trabalhista",
    "Quanto custa uma ação de divórcio?",
    "Recebi uma notificação, o que faço?",
  ],
}

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
  const [activeAgent, setActiveAgent] = useState<AgentDef>(agents[0])
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: agents[0].welcomeMessage }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [expandedNiche, setExpandedNiche] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatSectionRef = useRef<HTMLDivElement>(null)

  // Email demo state
  const [demoMode, setDemoMode] = useState<"chat" | "email">("chat")
  const [emailForm, setEmailForm] = useState({ name: "", email: "", subject: "", body: "" })
  const [emailAttachment, setEmailAttachment] = useState<File | null>(null)
  const [emailSending, setEmailSending] = useState(false)
  const [emailResponse, setEmailResponse] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailForm.email || !emailForm.body || emailSending) return
    setEmailSending(true)
    setEmailResponse(null)
    setEmailSent(true)

    try {
      const response = await fetch("/api/email-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: emailForm.email,
          senderName: emailForm.name || emailForm.email.split("@")[0],
          subject: emailForm.subject || "Contato via Showcase",
          body: emailForm.body,
          agentId: activeAgent.id,
          agentEmail: activeAgent.emailAddress,
          agentName: activeAgent.name,
          hasAttachment: !!emailAttachment,
          attachmentName: emailAttachment?.name,
        }),
      })
      const data = await response.json()
      if (data.agentResponse) {
        setEmailResponse(data.agentResponse)
      } else {
        setEmailResponse("Erro ao processar email. Tente novamente.")
      }
    } catch {
      setEmailResponse("Erro de conexão. Tente novamente.")
    } finally {
      setEmailSending(false)
    }
  }

  const resetEmailDemo = () => {
    setEmailForm({ name: "", email: "", subject: "", body: "" })
    setEmailAttachment(null)
    setEmailResponse(null)
    setEmailSent(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const switchAgent = (agent: AgentDef) => {
    if (agent.id === activeAgent.id) return
    setActiveAgent(agent)
    setMessages([{ role: "assistant", content: agent.welcomeMessage }])
    setChatOpen(false)
    setInput("")
    // Reset email demo ao trocar de agente
    resetEmailDemo()
  }

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
          systemPrompt: activeAgent.prompt,
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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <Image
            src="/logo-dark-accent.svg"
            alt="Digitai"
            width={180}
            height={48}
            className="mx-auto mb-8"
            priority
          />

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-8">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-300">Plataforma de Agentes IA Multifunção</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              Seus funcionários de IA
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
            <a
              href="/tour"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-900/80 active:scale-95"
            >
              Ver tour do sistema
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-slate-600" />
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-12 sm:py-16 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CAPABILITIES ════════ */}
      <section className="py-12 sm:py-16 relative">
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
      <section className="py-12 sm:py-16 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Simples de{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                começar.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400 text-lg">
              Você cuida do seu negócio. A gente cuida da tecnologia.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 sm:gap-12">
              {[
                { step: "01", title: "Conte sobre o seu negócio", desc: "Em uma conversa rápida, entendemos seus serviços, equipe, horários e regras. Nenhum conhecimento técnico necessário." },
                { step: "02", title: "Nós montamos tudo", desc: "Criamos seu agente personalizado, conectamos ao WhatsApp oficial (com selo verde), configuramos as funções e integrações que você precisa." },
                { step: "03", title: "Seu funcionário de IA começa a trabalhar", desc: "O agente passa a atender seus clientes 24/7 — agende, orce, colete dados e gere documentos. Você acompanha tudo pelo painel." },
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

      {/* ════════ NICHES (Accordion) ════════ */}
      <section className="py-12 sm:py-16 relative">
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
              A plataforma se adapta ao seu segmento. Toque num nicho e veja
              os funcionários de IA disponíveis.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {niches.map((niche) => {
              const isOpen = expandedNiche === niche.name
              return (
                <div key={niche.name} className={`${isOpen ? "col-span-2 sm:col-span-3 lg:col-span-4" : ""}`}>
                  <button
                    onClick={() => setExpandedNiche(isOpen ? null : niche.name)}
                    className={`w-full rounded-xl border p-4 sm:p-5 text-center transition-all ${
                      isOpen
                        ? "border-blue-500/50 bg-slate-900/80"
                        : "border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <niche.icon className={`h-8 w-8 mx-auto mb-3 transition-colors ${isOpen ? "text-blue-400" : "text-slate-400"}`} />
                    <h3 className="font-semibold mb-1">{niche.name}</h3>
                    <p className="text-xs text-slate-500">{niche.example}</p>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 mx-auto mt-2 text-blue-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mx-auto mt-2 text-slate-600" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-in fade-in duration-200">
                      {niche.employees.map((emp) => (
                        <div
                          key={emp.name}
                          className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3"
                        >
                          <Bot className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm text-white">{emp.name}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{emp.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════ CHANNELS ════════ */}
      <section className="py-12 sm:py-16 border-t border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Todos os{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                canais.
              </span>
              {" "}Uma conversa.
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400 text-lg">
              O mesmo agente responde em todos os canais, com o mesmo contexto e inteligência.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Phone, name: "WhatsApp", desc: "API oficial da Meta (WABA). Selo verde, criptografia, sem risco de banimento.", color: "from-green-500 to-emerald-500", badge: "Principal" },
              { icon: Globe, name: "Webchat", desc: "Widget no seu site. Instalação com 1 linha de código. Funciona em qualquer página.", color: "from-blue-500 to-cyan-500", badge: null },
              { icon: Instagram, name: "Instagram", desc: "DMs do Instagram processadas pelo agente. Mesma inteligência, canal diferente.", color: "from-pink-500 to-purple-500", badge: null },
              { icon: Mail, name: "Email", desc: "Recebe e responde emails automaticamente. Threading completo, como uma pessoa real.", color: "from-orange-500 to-amber-500", badge: "Novo" },
            ].map((channel) => (
              <div
                key={channel.name}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80 text-center"
              >
                {channel.badge && (
                  <span className={`absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    channel.badge === "Novo" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"
                  }`}>
                    {channel.badge}
                  </span>
                )}
                <div className={`inline-flex rounded-xl bg-gradient-to-br ${channel.color} p-3 mb-4`}>
                  <channel.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{channel.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{channel.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              O cliente pode começar pelo WhatsApp e continuar por email — o agente mantém todo o contexto.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ DIFFERENTIALS ════════ */}
      <section className="py-12 sm:py-16 border-t border-slate-800/50">
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
                { icon: Zap, title: "Multifunção", desc: "Cada funcionário faz o trabalho de vários: atende, agenda, orça, coleta dados, gera documentos e processa pedidos." },
                { icon: BarChart3, title: "Controle total", desc: "Painel admin com analytics, CRM integrado, métricas de satisfação, custos por conversa e histórico completo." },
                { icon: Users, title: "Equipe completa", desc: "Tenha funcionários diferentes para cada setor do seu negócio. RH, jurídico, atendimento, comercial — cada um com suas regras e personalidade." },
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

      {/* ════════ LIVE DEMO ════════ */}
      <section ref={chatSectionRef} className="py-12 sm:py-16 relative">
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
              Dois canais diferentes, mesma inteligência. Converse por chat ou envie um email.
            </p>
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setDemoMode("chat")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                demoMode === "chat"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              Chat ao vivo
            </button>
            <button
              onClick={() => setDemoMode("email")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                demoMode === "email"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                  : "border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
              <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-1.5 py-0 text-[10px] font-bold text-orange-300 uppercase">Novo</span>
            </button>
          </div>

          {/* ─── CHAT DEMO ─── */}
          {demoMode === "chat" && (
            <>
              {/* Agent Toggle */}
              <div className="flex justify-center gap-3 mb-6">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => switchAgent(agent)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                      activeAgent.id === agent.id
                        ? `bg-gradient-to-r ${agent.color} text-white shadow-lg`
                        : "border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    <Bot className="h-4 w-4" />
                    {agent.name} — {agent.niche}
                  </button>
                ))}
              </div>

              {/* Fictional companies disclaimer */}
              <p className="text-center text-xs text-slate-500 mb-4 max-w-lg mx-auto">
                Bella Estética e Castro & Associados são empresas fictícias criadas para demonstração.
                A IA que responde é a mesma tecnologia usada em produção.
              </p>

              {/* WhatsApp button */}
              <div className="flex justify-center mb-6">
                <a
                  href={`https://wa.me/${activeAgent.waNumber}?text=${encodeURIComponent(`Olá ${activeAgent.name}, quero testar o atendimento!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Testar {activeAgent.name} no WhatsApp
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>

              <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur overflow-hidden shadow-2xl shadow-blue-500/5">
                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${activeAgent.color}`}>
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{activeAgent.name} — {activeAgent.niche}</h3>
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
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${activeAgent.color}`}>
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
                      {(suggestionsMap[activeAgent.id] || []).map((s) => (
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
            </>
          )}

          {/* ─── EMAIL DEMO ─── */}
          {demoMode === "email" && (
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur overflow-hidden shadow-2xl shadow-orange-500/5">
              {/* Email Header */}
              <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Demo por Email</h3>
                  <p className="text-xs text-slate-400">Envie um email para a {activeAgent.name} e veja a resposta do agente real</p>
                </div>
              </div>

              {!emailSent ? (
                /* Email Form */
                <form onSubmit={handleEmailSubmit} className="p-5 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Seu nome</label>
                      <input
                        type="text"
                        value={emailForm.name}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={activeAgent.emailPlaceholders.name}
                        className="w-full h-10 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Seu email <span className="text-orange-400">*</span></label>
                      <input
                        type="email"
                        required
                        value={emailForm.email}
                        onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder={activeAgent.emailPlaceholders.email}
                        className="w-full h-10 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Assunto</label>
                    <input
                      type="text"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder={activeAgent.emailPlaceholders.subject}
                      className="w-full h-10 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Mensagem <span className="text-orange-400">*</span></label>
                    <textarea
                      required
                      rows={4}
                      value={emailForm.body}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, body: e.target.value }))}
                      placeholder={activeAgent.emailPlaceholders.body}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Attachment field */}
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Anexo</label>
                    <div className="relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={(e) => setEmailAttachment(e.target.files?.[0] || null)}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.csv,.txt"
                      />
                      {emailAttachment ? (
                        <div className="flex items-center gap-2 h-10 rounded-lg border border-slate-700 bg-slate-800 px-3">
                          <Paperclip className="h-4 w-4 text-orange-400 shrink-0" />
                          <span className="text-sm text-white truncate flex-1">{emailAttachment.name}</span>
                          <span className="text-xs text-slate-500 shrink-0">{(emailAttachment.size / 1024).toFixed(0)} KB</span>
                          <button
                            type="button"
                            onClick={() => { setEmailAttachment(null); if (fileInputRef.current) fileInputRef.current.value = "" }}
                            className="text-slate-500 hover:text-white transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 h-10 w-full rounded-lg border border-dashed border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-500 hover:border-orange-500/50 hover:text-slate-400 transition-colors"
                        >
                          <Paperclip className="h-4 w-4" />
                          Anexar arquivo (opcional)
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-slate-500">
                      Para: <span className="text-orange-400">{activeAgent.emailAddress}</span>
                    </p>
                    <button
                      type="submit"
                      disabled={emailSending || !emailForm.email || !emailForm.body}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-40 active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      Enviar email
                    </button>
                  </div>
                </form>
              ) : (
                /* Email Sent + Response */
                <div className="p-5 space-y-4">
                  {/* Sent email preview */}
                  <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Email enviado</span>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <p><span className="text-slate-500">De:</span> {emailForm.name || emailForm.email} &lt;{emailForm.email}&gt;</p>
                      <p><span className="text-slate-500">Para:</span> {activeAgent.emailAddress}</p>
                      {emailForm.subject && <p><span className="text-slate-500">Assunto:</span> {emailForm.subject}</p>}
                      {emailAttachment && (
                        <p className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3 text-orange-400" />
                          <span className="text-slate-500">Anexo:</span> {emailAttachment.name}
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-300 whitespace-pre-wrap">{emailForm.body}</p>
                  </div>

                  {/* Agent response */}
                  {emailSending ? (
                    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5 text-center">
                      <Loader2 className="h-6 w-6 text-orange-400 animate-spin mx-auto mb-3" />
                      <p className="text-sm text-slate-300 font-medium">O agente está processando seu email...</p>
                      <p className="text-xs text-slate-500 mt-1">Isso usa o pipeline real — pode levar até 60 segundos</p>
                    </div>
                  ) : emailResponse && (
                    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500">
                          <Bot className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-white">{activeAgent.name} respondeu</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{emailResponse}</p>
                    </div>
                  )}

                  {/* Reset button */}
                  {!emailSending && (
                    <div className="text-center pt-2">
                      <button
                        onClick={resetEmailDemo}
                        className="text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-4"
                      >
                        Enviar outro email
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CTA below demo */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              {demoMode === "chat"
                ? "Estes são agentes de demonstração. Os agentes reais funcionam no WhatsApp, Instagram, webchat e email — com os dados reais do seu negócio."
                : "Este email é processado pelo pipeline real da Digitai — o mesmo que atende clientes em produção."
              }
            </p>
          </div>
        </div>
      </section>

      {/* ════════ INTEREST FORM / LEAD CAPTURE ════════ */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Quer um{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                funcionário de IA
              </span>
              {" "}para o seu negócio?
            </h2>
            <p className="text-slate-400 text-lg">
              Preencha seus dados e fale direto com a gente pelo WhatsApp.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const nome = (form.elements.namedItem("lead_nome") as HTMLInputElement).value
              const empresa = (form.elements.namedItem("lead_empresa") as HTMLInputElement).value
              const nicho = (form.elements.namedItem("lead_nicho") as HTMLSelectElement).value
              const msg = `Olá! Vim pela Showcase da Digitai.\n\nNome: ${nome}\nEmpresa: ${empresa}\nSegmento: ${nicho}\n\nGostaria de saber mais sobre os agentes de IA.`
              window.open(`https://wa.me/5521999501444?text=${encodeURIComponent(msg)}`, "_blank")
            }}
            className="max-w-md mx-auto space-y-4"
          >
            <div>
              <input
                name="lead_nome"
                type="text"
                required
                placeholder="Seu nome"
                className="w-full h-12 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <input
                name="lead_empresa"
                type="text"
                required
                placeholder="Nome da empresa"
                className="w-full h-12 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <select
                name="lead_nicho"
                required
                defaultValue=""
                className="w-full h-12 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-sm text-white outline-none focus:border-blue-500 transition-colors appearance-none"
              >
                <option value="" disabled className="text-slate-500">Segmento do negócio</option>
                {niches.map((n) => (
                  <option key={n.name} value={n.name} className="bg-slate-900">{n.name}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-green-600 text-white font-semibold text-sm transition-all hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Falar pelo WhatsApp
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </button>
            <p className="text-center text-xs text-slate-600">
              Sem compromisso. Respondemos em até 24h.
            </p>
          </form>
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
