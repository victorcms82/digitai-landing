import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  Dumbbell,
  FileText,
  Globe,
  Home,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Scale,
  ShoppingBag,
  Stethoscope,
  Users,
  Utensils,
} from "lucide-react"
import { DigitaiBrandLogo } from "@/components/ui/digitai-brand-logo"

export const metadata: Metadata = {
  title: "Tour do Sistema | Digitai",
  description:
    "Conheça o Digitai por dentro: funcionários de IA que atendem pelo WhatsApp, site, email e Instagram — com um painel onde o dono acompanha tudo em tempo real.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tour do Sistema | Digitai",
    description:
      "Funcionários de IA pro seu negócio — atendem, agendam, geram documentos, fazem orçamentos. Tudo num lugar só.",
    type: "website",
  },
}

const niches = [
  { icon: Stethoscope, label: "Clínica" },
  { icon: Scale, label: "Escritório" },
  { icon: Utensils, label: "Restaurante" },
  { icon: Home, label: "Imobiliária" },
  { icon: Briefcase, label: "Consultório" },
  { icon: ShoppingBag, label: "Loja" },
  { icon: Dumbbell, label: "Academia" },
  { icon: Users, label: "Seu negócio" },
]

const channels = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    desc: "Onde seu cliente já está. O agente conversa, atende, agenda e envia documentos.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Globe,
    label: "Chat no site",
    desc: "Um balão que aparece no canto da sua página. Atende quem entrou curioso.",
    color: "from-[#06B6D4] to-[#22D3EE]",
  },
  {
    icon: Mail,
    label: "Email",
    desc: "Chegou email? O agente lê, entende e responde — ou monta uma proposta.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Instagram,
    label: "Instagram",
    desc: "Direct e comentário viraram atendimento. Sem deixar ninguém sem resposta.",
    color: "from-pink-500 to-rose-500",
  },
]

const adminScreens = [
  {
    icon: BarChart3,
    title: "Dashboard",
    desc: "Gráficos de atendimentos, conversões, horários de pico. O pulso do negócio num relance.",
    mockLines: ["Atendimentos hoje", "Conversões da semana", "Tempo médio de resposta"],
  },
  {
    icon: MessageSquare,
    title: "CRM com conversas",
    desc: "Todas as conversas do WhatsApp, site, email e Instagram num lugar só. Com contato, histórico e status.",
    mockLines: ["Maria Silva — agendou limpeza", "João Costa — pediu orçamento", "Ana Lima — dúvida sobre horário"],
  },
  {
    icon: Calendar,
    title: "Agenda",
    desc: "Todos os agendamentos que o agente marcou, já sincronizados. Sem planilha, sem retrabalho.",
    mockLines: ["09:00 — Consulta", "10:30 — Procedimento", "14:00 — Retorno"],
  },
  {
    icon: FileText,
    title: "Relatórios",
    desc: "Quantos clientes novos, quanto foi faturado, quais serviços mais pediram. Tudo pronto pra exportar.",
    mockLines: ["Faturamento do mês", "Top serviços", "Clientes recorrentes"],
  },
]

export default function TourPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141210] via-[#1A1715] to-[#141210]">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <DigitaiBrandLogo size="md" theme="dark" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#22D3EE] hover:text-[#67E8F9] active:text-[#06B6D4] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </nav>
      </header>

      <main className="pb-16">
        {/* Seção 1 — Hero */}
        <section className="container mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-block rounded-full bg-[#06B6D4]/10 px-3 py-1.5 text-xs sm:text-sm text-[#22D3EE]">
              Tour do sistema
            </div>
            <h1 className="mb-5 sm:mb-6 text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              Funcionários de IA{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent">
                pro seu negócio.
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-xl text-[#A89C8C] leading-relaxed">
              Trabalham 24 horas por dia, todos os dias. Atendem, agendam, geram documentos,
              fazem orçamentos, relatórios, recebem pedidos, tiram dúvidas — tudo pelo
              WhatsApp, site, email ou Instagram.
            </p>
          </div>
        </section>

        {/* Seção 2 — Qualquer tipo de empresa */}
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl sm:text-4xl font-bold text-white leading-tight">
              Funciona pra qualquer tipo de empresa.
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-[#8A7D70]">
              Clínica, escritório, restaurante, imobiliária, consultório, loja, academia… Se
              tem clientes e operação, o Digitai serve.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {niches.map((niche) => (
                <div
                  key={niche.label}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#2A2420] bg-[#1F1B17]/50 p-4 sm:p-5 transition-colors hover:border-[#06B6D4]/40"
                >
                  <niche.icon className="h-7 w-7 sm:h-8 sm:w-8 text-[#22D3EE]" />
                  <span className="text-sm sm:text-base text-[#E8DFD0] font-medium">
                    {niche.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 3 — Conhece o negócio */}
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#2A2420] bg-gradient-to-br from-[#1A1715] to-[#141210] p-6 sm:p-10 md:p-14">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06B6D4]/10">
                  <Brain className="h-5 w-5 text-[#22D3EE]" />
                </div>
                <span className="text-xs sm:text-sm uppercase tracking-wider text-[#22D3EE] font-semibold">
                  Inteligência treinada no seu negócio
                </span>
              </div>
              <h2 className="mb-5 text-2xl sm:text-4xl font-bold text-white leading-tight">
                Conhece o seu negócio de verdade.
              </h2>
              <p className="text-base sm:text-lg text-[#A89C8C] leading-relaxed">
                O agente aprende seus serviços, preços, protocolos, catálogo. Não dá resposta
                genérica — responde como um funcionário treinado, que sabe como a casa
                funciona.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Sabe exatamente o que você vende e quanto custa",
                  "Segue o seu jeito de atender, não um roteiro genérico",
                  "Aprende regras da casa: horários, exceções, condições",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#A89C8C]">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Seção 4 — Multicanal */}
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl sm:text-4xl font-bold text-white leading-tight">
              Seus clientes escolhem onde falar.
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-[#8A7D70]">
              WhatsApp, chat no site, email, Instagram. O agente é o mesmo, atende em todos
              — com o mesmo tom e o mesmo conhecimento.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex items-start gap-4 rounded-xl border border-[#2A2420] bg-[#1F1B17]/50 p-5 sm:p-6 text-left transition-colors hover:border-[#06B6D4]/40"
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${channel.color}`}
                  >
                    <channel.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base sm:text-lg font-semibold text-white">
                      {channel.label}
                    </h3>
                    <p className="text-sm sm:text-base text-[#8A7D70] leading-relaxed">
                      {channel.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 5 — Painel do dono */}
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="mb-4 text-2xl sm:text-4xl font-bold text-white leading-tight">
                Tudo na sua mão.
              </h2>
              <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#8A7D70]">
                Um painel com gráficos, conversas, agenda e relatórios. O dono acompanha tudo
                em tempo real — do celular ou do computador.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {adminScreens.map((screen) => (
                <div
                  key={screen.title}
                  className="overflow-hidden rounded-2xl border border-[#2A2420] bg-[#1A1715]/60 shadow-lg shadow-blue-500/5"
                >
                  {/* Fake window bar */}
                  <div className="flex items-center gap-2 border-b border-[#2A2420] bg-[#1A1715] px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="ml-2 text-xs text-[#7A6D60]">
                      admin.digitai.app · {screen.title}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#06B6D4]/10">
                        <screen.icon className="h-5 w-5 text-[#22D3EE]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {screen.title}
                      </h3>
                    </div>
                    <p className="mb-4 text-sm sm:text-base text-[#A89C8C] leading-relaxed">
                      {screen.desc}
                    </p>

                    {/* Mock data rows */}
                    <div className="space-y-2">
                      {screen.mockLines.map((line) => (
                        <div
                          key={line}
                          className="flex items-center justify-between rounded-lg border border-dashed border-[#3A332D]/70 bg-[#141210]/40 px-3 py-2.5"
                        >
                          <span className="text-xs sm:text-sm text-[#8A7D70]">{line}</span>
                          <div className="flex gap-1">
                            <span className="h-1.5 w-6 rounded-full bg-[#3A332D]" />
                            <span className="h-1.5 w-3 rounded-full bg-[#06B6D4]/60" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-[#7A6D60]">
              Visualização ilustrativa do painel. Os dados são gerados em tempo real
              conforme os agentes atendem seus clientes.
            </p>
          </div>
        </section>

        {/* Seção 6 — CTA */}
        <section className="container mx-auto px-4 py-10 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-6 sm:p-10 md:p-12 text-center shadow-xl shadow-blue-500/20">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-4xl font-bold text-white leading-tight">
                Teste agora.
              </h2>
              <p className="mx-auto mb-7 max-w-xl text-base sm:text-lg text-blue-50">
                Converse com uma das nossas funcionárias de IA e veja como funciona na
                prática. Elas atendem pelo WhatsApp, como se fossem de um negócio real.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                <a
                  href={`https://wa.me/5521971527140?text=${encodeURIComponent(
                    "Olá Tami, vi o tour do Digitai e quero testar o atendimento!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm sm:text-base font-semibold text-blue-700 transition-all hover:bg-blue-50 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Falar com Tami (estética)
                </a>
                <a
                  href={`https://wa.me/15558354441?text=${encodeURIComponent(
                    "Olá Sofia, vi o tour do Digitai e quero testar o atendimento!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-900/40 px-6 py-3 text-sm sm:text-base font-semibold text-white ring-1 ring-white/30 transition-all hover:bg-blue-900/60 active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  Falar com Sofia (jurídico)
                </a>
              </div>
              <div className="mt-6">
                <Link
                  href="/showcase"
                  className="inline-flex items-center gap-2 text-sm text-blue-50/90 hover:text-white transition-colors"
                >
                  Ou converse pelo chat aqui mesmo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2A2420] py-6 sm:py-8 pb-20">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-[#7A6D60] space-y-2">
          <p>&copy; 2026 Digitai — Evolute Digital. Todos os direitos reservados.</p>
          <p>
            <Link
              href="/privacidade"
              className="text-[#7A6D60] hover:text-[#A89C8C] transition-colors"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
