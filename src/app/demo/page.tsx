"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Loader2, Sparkles, MessageSquare, User, Bot, Phone } from "lucide-react"

type BusinessType =
  | "dermatologia"
  | "psiquiatria"
  | "estetica"
  | "odontologia"
  | "clinica_geral"
  | "psicologia"
  | "nutricao"
  | "fisioterapia"
  | "advocacia"
  | "contabilidade"
  | "imobiliaria"
  | "restaurante"
  | "outro"

interface BusinessInfo {
  name: string
  type: BusinessType
  services: string
  hours: string
  differentials: string
  location: string
}

interface Message {
  role: "user" | "assistant"
  content: string
}

const businessTypeLabels: Record<BusinessType, string> = {
  dermatologia: "Dermatologia",
  psiquiatria: "Psiquiatria",
  estetica: "Estética",
  odontologia: "Odontologia",
  clinica_geral: "Clínica Geral",
  psicologia: "Psicologia",
  nutricao: "Nutrição",
  fisioterapia: "Fisioterapia",
  advocacia: "Advocacia",
  contabilidade: "Contabilidade",
  imobiliaria: "Imobiliária",
  restaurante: "Restaurante/Food",
  outro: "Outro"
}

const suggestionsByType: Record<BusinessType, string[]> = {
  dermatologia: ["Qual o valor da consulta?", "Vocês fazem botox?", "Tem horário essa semana?"],
  psiquiatria: ["Como funciona a primeira consulta?", "Atendem por convênio?", "Quanto tempo dura a sessão?"],
  estetica: ["Quais procedimentos vocês fazem?", "Tem promoção esse mês?", "Posso parcelar?"],
  odontologia: ["Fazem clareamento?", "Quanto custa uma limpeza?", "Atendem emergência?"],
  clinica_geral: ["Precisa de agendamento?", "Fazem exames no local?", "Qual o horário de funcionamento?"],
  psicologia: ["Como funciona a terapia online?", "Qual o valor da sessão?", "Atendem crianças?"],
  nutricao: ["Fazem dieta personalizada?", "Quanto custa o acompanhamento?", "Atendem online?"],
  fisioterapia: ["Tratam dor nas costas?", "Quantas sessões preciso?", "Tem RPG?"],
  advocacia: ["Fazem consulta inicial gratuita?", "Quanto custa uma ação trabalhista?", "Atendem empresas?"],
  contabilidade: ["Quanto custa abrir uma empresa?", "Fazem declaração de IR?", "Atendem MEI?"],
  imobiliaria: ["Tem apartamento de 2 quartos?", "Qual a taxa de corretagem?", "Vocês fazem avaliação?"],
  restaurante: ["Qual o horário de funcionamento?", "Tem delivery?", "Aceitam reserva?"],
  outro: ["Qual o horário de funcionamento?", "Como posso agendar?", "Quais formas de pagamento?"]
}

function generateSystemPrompt(info: BusinessInfo): string {
  const typeLabel = businessTypeLabels[info.type]

  return `Você é a assistente virtual da ${info.name}, uma ${typeLabel.toLowerCase()} localizada em ${info.location || "São Paulo"}.

## Sua Personalidade
- Seja cordial, profissional e empática
- Use linguagem acessível, evite jargões técnicos desnecessários
- Responda de forma concisa mas completa
- Sempre demonstre interesse genuíno em ajudar

## Informações do Negócio
- Nome: ${info.name}
- Segmento: ${typeLabel}
- Serviços oferecidos: ${info.services}
- Horário de funcionamento: ${info.hours}
- Diferenciais: ${info.differentials}

## Regras Importantes
1. Nunca invente informações que não foram fornecidas
2. Se não souber algo, diga que vai verificar com a equipe
3. Sempre tente direcionar para agendamento quando apropriado
4. Seja breve nas respostas (máximo 2-3 parágrafos)
5. Use emojis com moderação para tornar a conversa mais leve

## Objetivo Principal
Ajudar os clientes a entenderem os serviços e facilitar o agendamento de consultas/atendimentos.`
}

export default function DemoPage() {
  const [step, setStep] = useState<"setup" | "chat">("setup")
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "",
    type: "dermatologia",
    services: "",
    hours: "",
    differentials: "",
    location: ""
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleStartChat = () => {
    const prompt = generateSystemPrompt(businessInfo)
    setSystemPrompt(prompt)
    setMessages([{
      role: "assistant",
      content: `Olá! Seja bem-vindo(a) à ${businessInfo.name}! Como posso ajudar você hoje?`
    }])
    setStep("chat")
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          systemPrompt
        })
      })

      if (!response.ok) throw new Error("Erro na resposta")

      const data = await response.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Desculpe, tive um problema técnico. Pode tentar novamente?"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  if (step === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <header className="container mx-auto px-4 py-4 sm:py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white active:text-slate-300 p-2 -ml-2 rounded-lg">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Voltar</span>
          </Link>
        </header>

        <main className="container mx-auto px-4 py-4 sm:py-8 pb-8">
          <div className="mx-auto max-w-xl">
            <div className="mb-6 sm:mb-8 text-center">
              <div className="mx-auto mb-3 sm:mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-600">
                <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-white">Crie seu Agente de IA</h1>
              <p className="text-sm sm:text-base text-slate-400 px-4">
                Preencha as informações do seu negócio e veja a mágica acontecer
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm text-slate-300">Nome do Negócio *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Clínica Dra. Maria Silva"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="mt-1.5 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-sm text-slate-300">Tipo de Negócio *</Label>
                  <Select
                    value={businessInfo.type}
                    onValueChange={(value: BusinessType) => setBusinessInfo({ ...businessInfo, type: value })}
                  >
                    <SelectTrigger className="mt-1.5 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-700 bg-slate-800 max-h-[300px]">
                      {Object.entries(businessTypeLabels).map(([value, label]) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="text-white hover:bg-slate-700 focus:bg-slate-700 py-3 text-base"
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="services" className="text-sm text-slate-300">Principais Serviços *</Label>
                  <Input
                    id="services"
                    placeholder="Ex: Consultas, botox, preenchimento"
                    value={businessInfo.services}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, services: e.target.value })}
                    className="mt-1.5 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="hours" className="text-sm text-slate-300">Horário de Funcionamento</Label>
                  <Input
                    id="hours"
                    placeholder="Ex: Seg-Sex, 8h às 18h"
                    value={businessInfo.hours}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, hours: e.target.value })}
                    className="mt-1.5 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm text-slate-300">Localização</Label>
                  <Input
                    id="location"
                    placeholder="Ex: São Paulo - SP"
                    value={businessInfo.location}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, location: e.target.value })}
                    className="mt-1.5 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="differentials" className="text-sm text-slate-300">Diferenciais</Label>
                  <Input
                    id="differentials"
                    placeholder="Ex: 10 anos de experiência"
                    value={businessInfo.differentials}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, differentials: e.target.value })}
                    className="mt-1.5 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base placeholder:text-slate-500"
                  />
                </div>

                <Button
                  onClick={handleStartChat}
                  disabled={!businessInfo.name || !businessInfo.services}
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 h-12 text-base"
                  size="lg"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Criar e Testar Agente
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setStep("setup")}
              className="text-slate-400 hover:text-white active:text-slate-300 p-2 -ml-2 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="font-semibold text-white text-sm sm:text-base truncate">{businessInfo.name}</h1>
              <p className="text-xs sm:text-sm text-slate-400">Agente de IA - Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs sm:text-sm text-slate-400">Online</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-3 sm:px-4 py-4">
          <div className="mx-auto max-w-2xl space-y-3 sm:space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="rounded-2xl bg-slate-800 px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="border-t border-slate-800 bg-slate-900/50 px-3 sm:px-4 py-3">
          <div className="mx-auto max-w-2xl">
            <p className="mb-2 text-xs text-slate-500">Sugestões de perguntas:</p>
            <div className="flex flex-wrap gap-2">
              {suggestionsByType[businessInfo.type].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-xs sm:text-sm text-slate-300 transition-colors hover:border-blue-500 hover:text-white active:bg-slate-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 p-3 sm:p-4">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 h-11 sm:h-10 border-slate-700 bg-slate-800 text-white text-base placeholder:text-slate-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 h-11 sm:h-10 w-11 sm:w-10 p-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* CTA Banner - Clickable */}
      <div className="border-t border-slate-800 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-3 sm:p-4">
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Testei%20o%20demo%20do%20DigitAI%20e%20quero%20saber%20mais!"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex max-w-2xl items-center justify-between gap-3 p-2 -m-2 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
        >
          <div className="min-w-0">
            <p className="font-medium text-white text-sm sm:text-base">Gostou do resultado?</p>
            <p className="text-xs sm:text-sm text-slate-400 truncate">Tenha seu agente no WhatsApp real</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 active:bg-green-800 h-10 sm:h-9 text-sm flex-shrink-0">
            <Phone className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Quero Contratar</span>
            <span className="sm:hidden">Contratar</span>
          </Button>
        </a>
      </div>
    </div>
  )
}
