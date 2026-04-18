/**
 * SofiaChatMockup — conversa mock Sofia × Bella Estética (DSG-4 mockup 13)
 * Componente puramente visual, sem interação.
 */
export function SofiaChatMockup() {
  return (
    <div className="relative" style={{ perspective: "1200px" }}>
      <div
        className="overflow-hidden rounded-2xl border border-digitai-border"
        style={{
          background: "var(--color-digitai-surface)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.08), 0 0 40px rgba(6,182,212,0.04)",
          transform: "rotateY(-3deg) rotateX(2deg)",
        }}
      >
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-digitai-border bg-digitai-card px-5 py-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
            S
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-digitai-cream">
              Sofia
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "#86EFAC",
                  boxShadow: "0 0 8px rgba(134,239,172,0.5)",
                }}
              />
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-digitai-muted">
              Atendente · Bella Estética
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
            style={{
              background: "rgba(37,211,102,0.1)",
              borderColor: "rgba(37,211,102,0.25)",
              color: "#25D366",
            }}
          >
            WhatsApp
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-3 p-5" style={{ minHeight: "340px" }}>
          {/* User: pergunta */}
          <div className="flex max-w-[80%] flex-col items-end gap-1 self-end">
            <div className="rounded-xl rounded-br-sm bg-digitai-cyan px-3.5 py-2.5 text-[13.5px] text-[#0a0a0a]">
              Oi, queria agendar limpeza de pele pra semana que vem
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-digitai-muted">
              14:32 <span className="text-digitai-cyan">✓✓</span>
            </div>
          </div>

          {/* Bot: horários */}
          <div className="flex max-w-[80%] flex-col items-start gap-1 self-start">
            <div className="rounded-xl rounded-bl-sm border border-digitai-border bg-digitai-card px-3.5 py-2.5 text-[13.5px] text-digitai-cream">
              Oi! 👋 Claro, posso ajudar. Temos esses horários disponíveis:
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
                <li>
                  <strong className="text-digitai-cyan">Terça 22/04</strong> —
                  14h / 16h
                </li>
                <li>
                  <strong className="text-digitai-cyan">Quinta 24/04</strong> —
                  10h / 15h
                </li>
                <li>
                  <strong className="text-digitai-cyan">Sexta 25/04</strong> —
                  11h / 17h
                </li>
              </ul>
              Algum desses funciona?
            </div>
            <div className="font-mono text-[10px] text-digitai-muted">
              14:32
            </div>
          </div>

          {/* User: confirma */}
          <div className="flex max-w-[80%] flex-col items-end gap-1 self-end">
            <div className="rounded-xl rounded-br-sm bg-digitai-cyan px-3.5 py-2.5 text-[13.5px] text-[#0a0a0a]">
              Quinta 15h perfeito
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-digitai-muted">
              14:33 <span className="text-digitai-cyan">✓✓</span>
            </div>
          </div>

          {/* Bot: tool chip + confirmação */}
          <div className="flex max-w-[80%] flex-col items-start gap-1 self-start">
            <div
              className="inline-flex items-center gap-1.5 rounded-md border border-digitai-cyan/30 bg-digitai-cyan/15 px-2 py-0.5 font-mono text-[10px] text-digitai-cyan"
            >
              ⚡ book_appointment
            </div>
            <div className="rounded-xl rounded-bl-sm border border-digitai-border bg-digitai-card px-3.5 py-2.5 text-[13.5px] text-digitai-cream">
              Agendado!{" "}
              <strong className="text-digitai-cyan">
                Quinta 24/04 às 15h
              </strong>
              , limpeza de pele com a{" "}
              <strong className="text-digitai-cyan">Dra. Ana</strong> na unidade
              Barra. Mando lembrete um dia antes. Precisa de mais alguma coisa?
            </div>
            <div className="font-mono text-[10px] text-digitai-muted">
              14:33
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex items-center gap-2 self-start rounded-xl rounded-bl-sm border border-digitai-border bg-digitai-card px-3.5 py-2 text-xs text-digitai-muted">
            <span>Maria está digitando</span>
            <span className="flex gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-digitai-cyan opacity-50" />
              <span className="h-1.5 w-1.5 rounded-full bg-digitai-cyan opacity-50" />
              <span className="h-1.5 w-1.5 rounded-full bg-digitai-cyan opacity-50" />
            </span>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2.5 border-t border-digitai-border bg-digitai-card px-4 py-3">
          <input
            className="flex-1 border-none bg-transparent text-sm text-digitai-warm outline-none placeholder:text-digitai-muted"
            placeholder="Digite uma mensagem..."
            readOnly
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A7D70" strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#06B6D4">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
