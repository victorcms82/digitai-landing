import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigitAI - Agentes de IA para WhatsApp",
  description: "Transforme seu atendimento no WhatsApp com agentes de inteligência artificial. Automatize respostas, agendamentos e conversões 24/7.",
  keywords: ["whatsapp", "inteligência artificial", "atendimento automático", "chatbot", "agendamento"],
  openGraph: {
    title: "DigitAI - Agentes de IA para WhatsApp",
    description: "Transforme seu atendimento no WhatsApp com agentes de inteligência artificial.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
