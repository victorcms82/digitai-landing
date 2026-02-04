"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Loader2, Sparkles, MessageSquare, User, Bot } from "lucide-react"

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
  }

  if (step === "setup") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <header className="container mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-white">Crie seu Agente de IA</h1>
              <p className="text-slate-400">
                Preencha as informações do seu negócio e veja a mágica acontecer
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">Nome do Negócio *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Clínica Dra. Maria Silva"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                    className="mt-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="type" className="text-slate-300">Tipo de Negócio *</Label>
                  <Select
                    value={businessInfo.type}
                    onValueChange={(value: BusinessType) => setBusinessInfo({ ...businessInfo, type: value })}
                  >
                    <SelectTrigger className="mt-1 border-slate-700 bg-slate-800 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-700 bg-slate-800">
                      {Object.entries(businessTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value} className="text-white hover:bg-slate-700">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="services" className="text-slate-300">Principais Serviços *</Label>
                  <Input
                    id="services"
                    placeholder="Ex: Consultas, botox, preenchimento, peeling"
                    value={businessInfo.services}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, services: e.target.value })}
                    className="mt-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="hours" className="text-slate-300">Horário de Funcionamento</Label>
                  <Input
                    id="hours"
                    placeholder="Ex: Segunda a sexta, 8h às 18h"
                    value={businessInfo.hours}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, hours: e.target.value })}
                    className="mt-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-slate-300">Localização</Label>
                  <Input
                    id="location"
                    placeholder="Ex: São Paulo - SP"
                    value={businessInfo.location}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, location: e.target.value })}
                    className="mt-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <Label htmlFor="differentials" className="text-slate-300">Diferenciais</Label>
                  <Input
                    id="differentials"
                    placeholder="Ex: 10 anos de experiência, equipamentos modernos"
                    value={businessInfo.differentials}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, differentials: e.target.value })}
                    className="mt-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                </div>

                <Button
                  onClick={handleStartChat}
                  disabled={!businessInfo.name || !businessInfo.services}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
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
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep("setup")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-semibold text-white">{businessInfo.name}</h1>
              <p className="text-sm text-slate-400">Agente de IA - Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-slate-400">Online</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-100"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-700">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="rounded-2xl bg-slate-800 px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="border-t border-slate-800 bg-slate-900/50 px-4 py-3">
          <div className="mx-auto max-w-2xl">
            <p className="mb-2 text-xs text-slate-500">Sugestões de perguntas:</p>
            <div className="flex flex-wrap gap-2">
              {suggestionsByType[businessInfo.type].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-blue-500 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-slate-800 bg-slate-900/80 p-4 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="border-t border-slate-800 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div>
            <p className="font-medium text-white">Gostou do resultado?</p>
            <p className="text-sm text-slate-400">Tenha seu agente funcionando no WhatsApp real</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Quero Contratar
          </Button>
        </div>
      </div>
    </div>
  )
}
