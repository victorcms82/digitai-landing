import { NextRequest, NextResponse } from "next/server"

const N8N_WEBHOOK_URL = "https://n8n.evolutedigital.com.br/webhook/email-inbound"
const SUPABASE_URL = "https://vnlfgnfaortdvmraoapq.supabase.co"
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || ""

export async function POST(request: NextRequest) {
  try {
    const { senderEmail, senderName, subject, body } = await request.json() as {
      senderEmail: string
      senderName: string
      subject: string
      body: string
    }

    if (!senderEmail || !body) {
      return NextResponse.json(
        { error: "Email e mensagem são obrigatórios" },
        { status: 400 }
      )
    }

    // Generate unique message ID for this demo interaction
    const messageId = `<demo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@showcase.digitai.app>`

    // Send to n8n pipeline (real email processing)
    const n8nPayload = {
      sender_email: senderEmail,
      sender_name: senderName || senderEmail.split("@")[0],
      to_email: "sofia@reply.digitai.app",
      subject: subject || "Demo Showcase",
      body,
      message_id: messageId,
      in_reply_to: "",
      references: [],
      timestamp: new Date().toISOString(),
      has_attachments: false,
    }

    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(n8nPayload),
    })

    if (!webhookResponse.ok) {
      console.error("n8n webhook error:", await webhookResponse.text())
      return NextResponse.json(
        { error: "Erro ao processar email" },
        { status: 500 }
      )
    }

    // Poll for agent response (max 60s, check every 3s)
    const maxAttempts = 20
    const pollInterval = 3000

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval))

      // Query conversation_memory for assistant response
      const queryResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/rpc/get_email_demo_response`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            p_sender_email: senderEmail,
            p_message_id: messageId,
          }),
        }
      )

      if (queryResponse.ok) {
        const data = await queryResponse.json()
        if (data && data.length > 0 && data[0].response_content) {
          return NextResponse.json({
            success: true,
            agentResponse: data[0].response_content,
            agentName: "Sofia",
          })
        }
      }
    }

    // Timeout — agent didn't respond in time
    return NextResponse.json({
      success: true,
      agentResponse: "O agente recebeu seu email e está processando. Em um cenário real, a resposta chegaria diretamente na sua caixa de entrada.",
      agentName: "Sofia",
      timeout: true,
    })

  } catch (error) {
    console.error("Email demo API error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
