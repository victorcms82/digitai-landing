"use client"

import { useState, useEffect } from "react"
import { X, Download, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInstallPWA, usePushNotifications } from "./pwa-provider"

export function InstallBanner() {
  const { isInstallable, install } = useInstallPWA()
  const { permission, requestPermission } = usePushNotifications()
  const [dismissed, setDismissed] = useState(false)
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the banner before
    const wasDismissed = localStorage.getItem('install-banner-dismissed')
    if (wasDismissed) {
      setDismissed(true)
    }

    // Show notification prompt after 30 seconds if not installed
    const timer = setTimeout(() => {
      if (permission === 'default' && !isInstallable) {
        setShowNotificationPrompt(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [permission, isInstallable])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('install-banner-dismissed', 'true')
  }

  const handleInstall = async () => {
    const installed = await install()
    if (installed) {
      setDismissed(true)
    }
  }

  const handleEnableNotifications = async () => {
    await requestPermission()
    setShowNotificationPrompt(false)
  }

  // Show install banner
  if (isInstallable && !dismissed) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-2xl">
          <div className="flex items-center gap-3 min-w-0">
            <Download className="h-6 w-6 text-white flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-white text-sm sm:text-base">Instalar DigitAI</p>
              <p className="text-xs sm:text-sm text-blue-100 truncate">Acesse mais rápido pela tela inicial</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleInstall}
              size="sm"
              variant="secondary"
              className="h-9"
            >
              Instalar
            </Button>
            <button
              onClick={handleDismiss}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show notification prompt
  if (showNotificationPrompt && permission === 'default') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-800 border-t border-slate-700 shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-2xl">
          <div className="flex items-center gap-3 min-w-0">
            <Bell className="h-6 w-6 text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-white text-sm sm:text-base">Ativar notificações?</p>
              <p className="text-xs sm:text-sm text-slate-400 truncate">Receba atualizações importantes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleEnableNotifications}
              size="sm"
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              Ativar
            </Button>
            <button
              onClick={() => setShowNotificationPrompt(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
