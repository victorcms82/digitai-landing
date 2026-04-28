import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidade — Digitai",
  description:
    "Política de Privacidade da Evolute Digital. Saiba como a Digitai coleta, utiliza e protege os dados pessoais tratados pelos nossos agentes de inteligência artificial, em conformidade com a LGPD.",
  robots: { index: true, follow: true },
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
            Digit<span className="text-blue-500">AI</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 active:text-blue-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        <div className="mb-8 sm:mb-12">
          <div className="mb-4 inline-block rounded-full bg-blue-500/10 px-3 py-1.5 text-xs sm:text-sm text-blue-400">
            Transparência e proteção de dados
          </div>
          <h1 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-sm text-slate-500">
            Última atualização: 11 de abril de 2026
          </p>
        </div>

        <div className="space-y-10 text-base sm:text-lg text-slate-300 leading-relaxed">
          {/* Introdução */}
          <section>
            <p>
              A Evolute Digital valoriza a privacidade e a proteção dos dados
              pessoais dos seus usuários. Esta Política de Privacidade descreve
              como coletamos, utilizamos, armazenamos e protegemos as
              informações obtidas durante a interação com os agentes de
              inteligência artificial da plataforma Digitai.
            </p>
            <p className="mt-4">
              Ao utilizar nossos serviços, você concorda com as práticas
              descritas neste documento, elaborado em conformidade com a Lei
              Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          {/* 1. Controladora */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              1. Controladora dos dados
            </h2>
            <p>
              Os dados pessoais tratados pelos agentes da Digitai são
              controlados por:
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6">
              <p className="font-semibold text-white">Evolute Digital</p>
              <p className="mt-2 text-sm sm:text-base text-slate-400">
                Contato:{" "}
                <a
                  href="mailto:contato@evolutedigital.com.br"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  contato@evolutedigital.com.br
                </a>
              </p>
            </div>
          </section>

          {/* 2. Dados coletados */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              2. Dados coletados
            </h2>
            <p>
              Durante a interação com nossos agentes de IA (Tami, Sofia e
              demais agentes atuais ou futuros da plataforma), podemos coletar
              as seguintes informações pessoais:
            </p>
            <ul className="mt-4 space-y-2 pl-5 list-disc marker:text-blue-500">
              <li>Nome completo</li>
              <li>Número de telefone (WhatsApp)</li>
              <li>Endereço de e-mail</li>
              <li>
                Preferências de atendimento e informações fornecidas
                voluntariamente durante a conversa
              </li>
              <li>
                Mensagens de texto, áudios, imagens e documentos enviados ao
                agente durante o atendimento
              </li>
            </ul>
            <p className="mt-4">
              Esses dados são coletados exclusivamente quando você nos envia
              mensagens por meio dos canais em que nossos agentes estão
              disponíveis, como WhatsApp e webchat.
            </p>
          </section>

          {/* 3. Finalidade */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              3. Finalidade do tratamento
            </h2>
            <p>
              Os dados coletados são utilizados para as seguintes finalidades:
            </p>
            <ul className="mt-4 space-y-2 pl-5 list-disc marker:text-blue-500">
              <li>Atendimento demonstrativo por meio da plataforma Digitai</li>
              <li>Agendamento de serviços, consultas e reuniões</li>
              <li>Envio de documentos, propostas e orçamentos</li>
              <li>Suporte ao cliente e acompanhamento pós-atendimento</li>
              <li>
                Melhoria contínua da qualidade das respostas dos agentes de IA
              </li>
            </ul>
          </section>

          {/* 4. Base legal */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              4. Base legal
            </h2>
            <p>
              O tratamento dos seus dados pessoais se fundamenta nas seguintes
              bases legais previstas na LGPD:
            </p>
            <ul className="mt-4 space-y-3 pl-5 list-disc marker:text-blue-500">
              <li>
                <span className="font-semibold text-white">
                  Consentimento do titular
                </span>{" "}
                — Art. 7º, inciso I da LGPD, manifestado ao iniciar a conversa
                com o agente.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Execução de contrato
                </span>{" "}
                — Art. 7º, inciso V, quando o tratamento é necessário para a
                prestação do serviço solicitado pelo titular.
              </li>
            </ul>
          </section>

          {/* 5. Direitos */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              5. Direitos do titular
            </h2>
            <p>
              De acordo com o Art. 18 da LGPD, você tem os seguintes direitos
              sobre os seus dados pessoais:
            </p>
            <ul className="mt-4 space-y-3 pl-5 list-disc marker:text-blue-500">
              <li>
                <span className="font-semibold text-white">Acesso</span> —
                confirmar a existência e acessar os dados que tratamos a seu
                respeito.
              </li>
              <li>
                <span className="font-semibold text-white">Correção</span> —
                corrigir dados incompletos, inexatos ou desatualizados.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Anonimização, bloqueio ou eliminação
                </span>{" "}
                — de dados desnecessários, excessivos ou tratados em
                desconformidade com a LGPD.
              </li>
              <li>
                <span className="font-semibold text-white">Portabilidade</span>{" "}
                — solicitar a transferência dos dados a outro fornecedor de
                serviço.
              </li>
              <li>
                <span className="font-semibold text-white">Eliminação</span> —
                solicitar a eliminação dos dados tratados com base no
                consentimento.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Revogação do consentimento
                </span>{" "}
                — a qualquer momento, mediante manifestação expressa.
              </li>
              <li>
                <span className="font-semibold text-white">Informação</span> —
                sobre com quem seus dados são compartilhados e a possibilidade
                de não fornecer consentimento.
              </li>
            </ul>
          </section>

          {/* 6. Como exercer direitos */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              6. Como exercer seus direitos
            </h2>
            <p>
              Para exercer qualquer um dos direitos listados acima, envie uma
              solicitação para o e-mail abaixo:
            </p>
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <a
                  href="mailto:contato@evolutedigital.com.br"
                  className="text-blue-400 hover:text-blue-300 underline font-semibold break-all"
                >
                  contato@evolutedigital.com.br
                </a>
                <p className="mt-2 text-sm text-slate-400">
                  Responderemos a todas as solicitações no prazo máximo de 15
                  (quinze) dias úteis, contados a partir do recebimento.
                </p>
              </div>
            </div>
          </section>

          {/* 7. Agentes de IA */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              7. Agentes de inteligência artificial
            </h2>
            <p>
              Os agentes Tami, Sofia e demais agentes disponíveis na plataforma
              são{" "}
              <span className="font-semibold text-white">
                funcionárias de IA demonstrativas da Evolute Digital
              </span>
              . Isso significa que você está interagindo com um modelo de
              inteligência artificial, e não com um ser humano.
            </p>
            <p className="mt-4">
              Para gerar as respostas dos agentes, utilizamos modelos de IA
              fornecidos por parceiros como Google Gemini e OpenAI. Os dados
              das conversas podem ser processados por esses modelos
              exclusivamente com o propósito de gerar respostas adequadas à
              solicitação do titular.
            </p>
            <p className="mt-4">
              <span className="font-semibold text-white">
                Não compartilhamos seus dados com terceiros para fins
                comerciais, publicitários ou de marketing.
              </span>{" "}
              Seus dados nunca são vendidos ou cedidos a anunciantes.
            </p>
          </section>

          {/* 8. Retenção e segurança */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              8. Retenção e segurança
            </h2>
            <p>
              Seus dados são armazenados em infraestrutura segura (Supabase),
              com criptografia em repouso e em trânsito, controles de acesso
              restritos e políticas de segurança alinhadas com boas práticas do
              setor.
            </p>
            <p className="mt-4">
              As informações são retidas enquanto forem necessárias para as
              finalidades descritas nesta política ou enquanto houver
              obrigação legal de retenção. Os dados são eliminados mediante
              solicitação do titular, por meio do e-mail informado na seção 6.
            </p>
          </section>

          {/* 9. Alterações */}
          <section>
            <h2 className="mb-4 text-xl sm:text-2xl font-semibold text-white">
              9. Alterações nesta política
            </h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente
              para refletir mudanças em nossos serviços, na legislação
              aplicável ou em boas práticas de mercado. A data da última
              atualização será sempre informada no topo desta página.
              Recomendamos que você revise este documento regularmente.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 active:text-blue-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 sm:py-8 mt-8 pb-20">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-slate-500">
          <p>&copy; 2026 Digitai — Evolute Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
