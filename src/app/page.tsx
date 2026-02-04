"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Zap, Clock, TrendingUp, CheckCircle2, ArrowRight, Phone, Calendar, Brain, BarChart3 } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Inteligente",
    description: "Atendimento 24/7 que entende contexto e responde como um humano"
  },
  {
    icon: Zap,
    title: "Setup em 5 Minutos",
    description: "Configure seu agente de IA sem código, apenas com informações do seu negócio"
  },
  {
    icon: Clock,
    title: "Agendamento Automático",
    description: "Integração com Google Calendar para marcar consultas automaticamente"
  },
  {
    icon: TrendingUp,
    title: "Resultados Comprovados",
    description: "Aumento médio de 40% em conversões e 70% menos tempo em atendimento"
  }
]

const benefits = [
  { icon: Phone, text: "Responde instantaneamente, 24 horas por dia" },
  { icon: MessageSquare, text: "Entende áudios, imagens e documentos" },
  { icon: Brain, text: "Aprende sobre seu negócio com base de conhecimento" },
  { icon: Calendar, text: "Agenda consultas e envia lembretes automáticos" },
  { icon: Zap, text: "Follow-up inteligente para leads não convertidos" },
  { icon: BarChart3, text: "Dashboard com métricas e relatórios" }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-white">
            Digit<span className="text-blue-500">AI</span>
          </div>
          <Link href="/demo">
            <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 active:bg-blue-500/20">
              Testar Agora
            </Button>
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 sm:mb-6 inline-block rounded-full bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-blue-400">
              Atendimento com Inteligência Artificial
            </div>
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-white">
              Transforme seu WhatsApp em uma{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Máquina de Vendas
              </span>
            </h1>
            <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-xl text-slate-400 px-2">
              Agentes de IA que atendem, agendam e convertem seus clientes automaticamente.
              Ideal para clínicas, consultórios e pequenos negócios.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
              <Link href="/demo" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 text-base sm:text-lg hover:bg-blue-700 active:bg-blue-800 h-12 sm:h-11">
                  Criar Meu Agente Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-xs sm:text-sm text-slate-500">Sem cadastro necessário</p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-slate-800 bg-slate-900/50 py-6 sm:py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-400">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                <div className="text-xs sm:text-sm">Agentes Ativos</div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-slate-700" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">2M+</div>
                <div className="text-xs sm:text-sm">Mensagens/Mês</div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-slate-700" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">40%</div>
                <div className="text-xs sm:text-sm">Mais Conversões</div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-slate-700" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">4.9/5</div>
                <div className="text-xs sm:text-sm">Satisfação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Clickable Cards */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <h2 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl font-bold text-white">
            Por que escolher a DigitAI?
          </h2>
          <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link href="/demo" key={feature.title}>
                <div className="h-full rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 transition-all hover:border-blue-500/50 active:scale-[0.98] active:bg-slate-800/50 cursor-pointer">
                  <feature.icon className="mb-3 sm:mb-4 h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                  <h3 className="mb-2 text-base sm:text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Benefits - Clickable Items */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <Link href="/demo">
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 md:p-12 transition-all hover:border-blue-500/50 active:scale-[0.99] cursor-pointer">
              <h2 className="mb-6 sm:mb-8 text-center text-2xl sm:text-3xl font-bold text-white">
                Tudo que você precisa para automatizar seu atendimento
              </h2>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <benefit.icon className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-sm sm:text-base text-slate-300">{benefit.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 text-center">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 h-12 sm:h-11">
                  Testar Meu Agente Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Link>
        </section>

        {/* How it Works - Clickable */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <h2 className="mb-8 sm:mb-12 text-center text-2xl sm:text-3xl font-bold text-white">
            Como funciona
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
            {[
              { step: "1", title: "Descreva seu negócio", desc: "Preencha informações básicas como nome, serviços e horários" },
              { step: "2", title: "IA cria seu agente", desc: "Geramos um prompt otimizado automaticamente para seu nicho" },
              { step: "3", title: "Teste na hora", desc: "Converse com seu agente e veja a mágica acontecer" }
            ].map((item) => (
              <Link href="/demo" key={item.step}>
                <div className="text-center p-4 sm:p-6 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900/50 transition-all active:scale-[0.98] cursor-pointer">
                  <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-600 text-lg sm:text-xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm sm:text-base text-slate-400">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA - Clickable */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <Link href="/demo">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-6 sm:p-8 md:p-12 text-center transition-all hover:from-blue-500 hover:to-cyan-500 active:scale-[0.99] cursor-pointer">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Pronto para revolucionar seu atendimento?
              </h2>
              <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg text-blue-100">
                Crie seu agente de IA agora mesmo e veja como ele responde às perguntas dos seus clientes.
              </p>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-11 active:scale-[0.98]">
                Criar Agente Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-slate-500">
          <p>&copy; 2025 DigitAI - Evolute Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
