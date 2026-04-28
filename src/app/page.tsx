"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InstallBanner } from "@/components/install-banner"
import { SofiaChatMockup } from "@/components/sofia-chat-mockup"
import { Calendar, FileText, MessageSquare, Users } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "~90 Tipos de Funcionários",
    description: "Do atendimento ao agendamento, qualificação, orçamento, chamados e contratos",
  },
  {
    icon: MessageSquare,
    title: "5 Canais Integrados",
    description: "WhatsApp, Instagram, e-mail, webchat e telefone — tudo no mesmo lugar",
  },
  {
    icon: Calendar,
    title: "Setup sem Código",
    description: "Configure seu funcionário de IA apenas com informações do seu negócio",
  },
  {
    icon: FileText,
    title: "Resultados Reais",
    description: "Funcionários de IA que trabalham 24/7 atendendo, agendando e convertendo",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-digitai-deep">
      {/* ═══ Header / Nav ═══ */}
      <header className="mx-auto max-w-[1400px] px-6 sm:px-16">
        <nav className="flex items-center justify-between py-7">
          {/* Logo: monogram v2-mid + wordmark (DSG-4 pixel-perfect) */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 100 100" className="rounded-[7px]">
              <rect width="100" height="100" rx="22" fill="#F5E8D9" />
              <text
                x="50"
                y="74"
                fontFamily="'DM Sans', sans-serif"
                fontWeight="700"
                fontSize="70"
                letterSpacing="-0.05em"
                fill="#141210"
                textAnchor="middle"
              >
                d
              </text>
              <circle cx="68" cy="18" r="5.5" fill="#06B6D4" />
            </svg>
            <svg height="22" viewBox="0 0 68 32" aria-label="Digitai">
              <text
                x="0"
                y="24"
                fontFamily="'DM Sans', sans-serif"
                fontWeight="700"
                fontSize="24"
                letterSpacing="-0.05em"
                fill="#F5E8D9"
              >
                digitaı
              </text>
              <circle cx="64.2" cy="8.28" r="1.6" fill="#06B6D4" />
            </svg>
          </Link>

          {/* Nav links — hidden on mobile */}
          <div className="hidden items-center gap-9 md:flex">
            <a href="#features" className="text-sm font-medium text-digitai-warm transition-colors hover:text-digitai-cream">
              Funcionários
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-digitai-warm transition-colors hover:text-digitai-cream">
              Como funciona
            </a>
          </div>

          {/* Nav CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/tour">
              <Button
                variant="outline"
                size="sm"
                className="border-digitai-border text-digitai-cream hover:border-digitai-border-hover hover:bg-digitai-card"
              >
                Tour
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="sm"
                className="border-none bg-digitai-cyan font-semibold text-[#0a0a0a] shadow-[0_0_0_1px_rgba(6,182,212,0.4),0_4px_16px_rgba(6,182,212,0.15)] hover:bg-digitai-cyan-glow"
              >
                Conhecer Digitai
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ═══ Hero ═══ */}
        <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 py-16 sm:px-16 sm:py-20 lg:py-24">
          {/* Background: grid + cyan radial glow */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(42,36,32,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,36,32,0.3) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                maskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -right-[20%] -top-[20%] h-[800px] w-[800px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          {/* Hero grid: text left · chat right */}
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            {/* Text content */}
            <div>
              {/* Eyebrow */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-digitai-cyan/30 bg-digitai-cyan/15 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-digitai-cyan">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-digitai-cyan"
                  style={{ boxShadow: "0 0 8px #06B6D4" }}
                />
                Plataforma de funcionários de IA
              </div>

              {/* Headline — Opção E */}
              <h1 className="mb-6 text-4xl font-bold leading-[1.02] tracking-tight text-digitai-cream sm:text-5xl lg:text-[64px]">
                Funcionários de IA{" "}
                <br className="hidden sm:block" />
                <span className="text-digitai-cyan">pra quem trabalha.</span>
              </h1>

              {/* Subtitle */}
              <p className="mb-9 max-w-[520px] text-lg leading-relaxed text-digitai-warm">
                Do advogado solo à clínica com 50 funcionários. Mais de 90 tipos
                de funcionários prontos pra atender, agendar, qualificar, gerar
                orçamento, abrir chamado, redigir contrato. Em WhatsApp,
                Instagram, e-mail, chat.
              </p>

              {/* CTAs */}
              <div className="mb-12 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
                <Link href="/demo">
                  <Button className="h-auto border-none bg-digitai-cyan px-7 py-3.5 text-[15px] font-semibold text-[#0a0a0a] shadow-[0_0_0_1px_rgba(6,182,212,0.4),0_4px_16px_rgba(6,182,212,0.15)] hover:bg-digitai-cyan-glow">
                    Conhecer Digitai →
                  </Button>
                </Link>
                <Link href="/tour">
                  <Button
                    variant="outline"
                    className="h-auto border-digitai-border px-6 py-3.5 text-[15px] text-digitai-warm hover:border-digitai-border-hover hover:bg-digitai-card"
                  >
                    Ver em ação
                  </Button>
                </Link>
              </div>

              {/* Proof stats */}
              <div className="flex flex-wrap items-center gap-8 border-t border-digitai-border pt-8">
                <div>
                  <div className="text-[22px] font-semibold tracking-tight text-digitai-cream">
                    <span className="text-digitai-cyan">~90</span> tipos
                  </div>
                  <div className="text-xs text-digitai-muted">
                    de funcionários de IA
                  </div>
                </div>
                <div className="h-8 w-px bg-digitai-border" />
                <div>
                  <div className="text-[22px] font-semibold tracking-tight text-digitai-cream">
                    5 canais
                  </div>
                  <div className="text-xs text-digitai-muted">
                    integrados nativamente
                  </div>
                </div>
                <div className="hidden h-8 w-px bg-digitai-border sm:block" />
                <div className="hidden sm:block">
                  <p className="max-w-[280px] text-[13px] italic leading-relaxed text-digitai-warm">
                    &ldquo;A Sofia atende no WhatsApp igual uma humana faria — o
                    cliente nem percebe.&rdquo;
                    <span className="mt-1.5 block font-mono text-[11px] not-italic text-digitai-muted">
                      — Bella Estética · Unidade Barra
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Chat mockup — hidden on mobile */}
            <div className="hidden lg:block">
              <SofiaChatMockup />
            </div>
          </div>
        </section>

        {/* ═══ Social proof logos ═══ */}
        <section className="mx-auto max-w-[1400px] px-6 pb-20 sm:px-16">
          <div className="mb-6 text-center font-mono text-[11px] uppercase tracking-widest text-digitai-muted">
            Já em uso por clínicas, salões, escritórios e comércio
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 sm:gap-14">
            {[
              "Bella Estética",
              "Castro & Associados",
              "EstúdioPelle",
              "Clínica Vita",
              "Advocacia Lima",
              "Salão Rosa",
            ].map((name) => (
              <span
                key={name}
                className="text-base font-semibold tracking-tight text-digitai-warm sm:text-lg"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* ═══ Features ═══ */}
        <section
          id="features"
          className="mx-auto max-w-[1400px] px-6 py-16 sm:px-16 sm:py-20"
        >
          <h2 className="mb-12 text-center text-2xl font-bold text-digitai-cream sm:text-3xl">
            Por que escolher a Digitai?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {features.map((feature) => (
              <Link href="/demo" key={feature.title}>
                <div className="group h-full cursor-pointer rounded-xl border border-digitai-border bg-digitai-surface p-5 transition-all hover:border-digitai-cyan/30 hover:bg-digitai-card sm:p-6">
                  <feature.icon className="mb-3 h-8 w-8 text-digitai-cyan sm:mb-4 sm:h-10 sm:w-10" />
                  <h3 className="mb-2 text-base font-semibold text-digitai-cream sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-digitai-warm">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ How it works ═══ */}
        <section
          id="how-it-works"
          className="mx-auto max-w-[1400px] px-6 py-16 sm:px-16 sm:py-20"
        >
          <h2 className="mb-12 text-center text-2xl font-bold text-digitai-cream sm:text-3xl">
            Como funciona
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Descreva seu negócio",
                desc: "Preencha informações como nome, serviços e horários",
              },
              {
                step: "2",
                title: "IA configura pra você",
                desc: "Geramos um funcionário de IA otimizado pro seu nicho",
              },
              {
                step: "3",
                title: "Comece a usar",
                desc: "Seu funcionário de IA atende em minutos, 24/7",
              },
            ].map((item) => (
              <Link href="/demo" key={item.step}>
                <div className="cursor-pointer rounded-xl border border-transparent p-6 text-center transition-all hover:border-digitai-border hover:bg-digitai-surface">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-digitai-cyan text-xl font-bold text-[#0a0a0a]">
                    {item.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-digitai-cream">
                    {item.title}
                  </h3>
                  <p className="text-sm text-digitai-warm">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ CTA final ═══ */}
        <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-16 sm:py-20">
          <Link href="/demo">
            <div
              className="cursor-pointer rounded-2xl p-8 text-center transition-all md:p-12"
              style={{
                background: "linear-gradient(135deg, #0891B2, #06B6D4)",
              }}
            >
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Pronto pra ter funcionários de IA?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/85">
                Crie seu funcionário de IA agora e veja como ele atende, agenda e
                converte seus clientes.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="h-12 border-none bg-white text-lg font-semibold text-[#0a0a0a] hover:bg-gray-100"
              >
                Conhecer Digitai →
              </Button>
            </div>
          </Link>
        </section>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-digitai-border py-8 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 text-center text-sm text-digitai-muted sm:px-16">
          <p>&copy; 2026 Digitai — Evolute Digital. Todos os direitos reservados.</p>
        </div>
      </footer>

      <InstallBanner />
    </div>
  )
}
