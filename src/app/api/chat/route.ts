import { NextRequest, NextResponse } from "next/server"

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json() as {
      messages: Message[]
      systemPrompt: string
    }

    if (!messages || !systemPrompt) {
      return NextResponse.json(
        { error: "Messages and systemPrompt are required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    // Convert messages to Gemini format
    const contents = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }))

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 }
      )
    }

    const data = await response.json()

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "Desculpe, não consegui gerar uma resposta."

    return NextResponse.json({ message: generatedText })

  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
