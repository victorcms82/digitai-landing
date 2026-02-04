"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Zap, Clock, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react"

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
  "Responde instantaneamente, 24 horas por dia",
  "Entende áudios, imagens e documentos",
  "Aprende sobre seu negócio com base de conhecimento",
  "Agenda consultas e envia lembretes automáticos",
  "Follow-up inteligente para leads não convertidos",
  "Dashboard com métricas e relatórios"
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            Digit<span className="text-blue-500">AI</span>
          </div>
          <Link href="/demo">
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
              Testar Agora
            </Button>
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-block rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              Atendimento com Inteligência Artificial
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Transforme seu WhatsApp em uma{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Máquina de Vendas
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-400">
              Agentes de IA que atendem, agendam e convertem seus clientes automaticamente.
              Ideal para clínicas, consultórios e pequenos negócios.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo">
                <Button size="lg" className="bg-blue-600 text-lg hover:bg-blue-700">
                  Criar Meu Agente Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-slate-500">Sem cadastro necessário</p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-y border-slate-800 bg-slate-900/50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm">Agentes Ativos</div>
              </div>
              <div className="hidden h-8 w-px bg-slate-700 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2M+</div>
                <div className="text-sm">Mensagens/Mês</div>
              </div>
              <div className="hidden h-8 w-px bg-slate-700 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">40%</div>
                <div className="text-sm">Mais Conversões</div>
              </div>
              <div className="hidden h-8 w-px bg-slate-700 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9/5</div>
                <div className="text-sm">Satisfação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Por que escolher a DigitAI?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-blue-500/50"
              >
                <feature.icon className="mb-4 h-10 w-10 text-blue-500" />
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12">
            <h2 className="mb-8 text-center text-3xl font-bold text-white">
              Tudo que você precisa para automatizar seu atendimento
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/demo">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Testar Meu Agente Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Como funciona
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Descreva seu negócio", desc: "Preencha informações básicas como nome, serviços e horários" },
              { step: "2", title: "IA cria seu agente", desc: "Geramos um prompt otimizado automaticamente para seu nicho" },
              { step: "3", title: "Teste na hora", desc: "Converse com seu agente e veja a mágica acontecer" }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Pronto para revolucionar seu atendimento?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
              Crie seu agente de IA agora mesmo e veja como ele responde às perguntas dos seus clientes.
            </p>
            <Link href="/demo">
              <Button size="lg" variant="secondary" className="text-lg">
                Criar Agente Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>&copy; 2025 DigitAI - Evolute Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
