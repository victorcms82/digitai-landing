"use client"

import { useState, useEffect } from "react"
import { X, Download, Share, Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInstallPWA, usePushNotifications } from "./pwa-provider"

// Detect iOS
function isIOS() {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream
}

// Detect if running as PWA
function isStandalone() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as unknown as { standalone?: boolean }).standalone === true
}

export function InstallBanner() {
  const { isInstallable, install } = useInstallPWA()
  const { permission, requestPermission } = usePushNotifications()
  const [dismissed, setDismissed] = useState(false)
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the banner before
    const wasDismissed = localStorage.getItem('install-banner-dismissed')
    if (wasDismissed) {
      setDismissed(true)
    }

    // Detect iOS
    setIsIOSDevice(isIOS())

    // Check if already installed
    setIsAlreadyInstalled(isStandalone())

    // Show notification prompt after 30 seconds if not installed
    const timer = setTimeout(() => {
      if (permission === 'default' && !isInstallable && !isIOS()) {
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

  // Don't show if already installed as PWA
  if (isAlreadyInstalled) {
    return null
  }

  // iOS-specific banner with instructions
  if (isIOSDevice && !dismissed) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <Download className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-medium text-white text-sm sm:text-base">Instalar DigitAI Demo</p>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                  Toque em <Share className="inline h-3.5 w-3.5 mx-0.5" /> <span className="font-medium">Compartilhar</span> e depois em <Plus className="inline h-3.5 w-3.5 mx-0.5" /> <span className="font-medium">Adicionar à Tela de Início</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-2 text-white/70 hover:text-white transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show install banner for Android/Chrome
  if (isInstallable && !dismissed) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-2xl">
          <div className="flex items-center gap-3 min-w-0">
            <Download className="h-6 w-6 text-white flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-white text-sm sm:text-base">Instalar DigitAI Demo</p>
              <p className="text-xs sm:text-sm text-emerald-100 truncate">Acesse mais rápido pela tela inicial</p>
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
            <Bell className="h-6 w-6 text-emerald-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-white text-sm sm:text-base">Ativar notificações?</p>
              <p className="text-xs sm:text-sm text-slate-400 truncate">Receba atualizações importantes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleEnableNotifications}
              size="sm"
              className="h-9 bg-emerald-600 hover:bg-emerald-700"
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
