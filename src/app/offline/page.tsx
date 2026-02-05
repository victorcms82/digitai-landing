"use client"

import { WifiOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
          <WifiOff className="h-10 w-10 text-slate-400" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-white">
          Sem conexão
        </h1>

        <p className="mb-6 text-slate-400">
          Parece que você está offline. Verifique sua conexão com a internet e tente novamente.
        </p>

        <Button
          onClick={handleRetry}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>

        <div className="mt-8 p-4 rounded-lg bg-slate-800/50 text-left">
          <p className="text-sm text-slate-400 mb-2">Enquanto isso, você pode:</p>
          <ul className="text-sm text-slate-500 space-y-1">
            <li>• Verificar se o Wi-Fi está ligado</li>
            <li>• Verificar se os dados móveis estão ativos</li>
            <li>• Tentar se aproximar do roteador</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
