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

// Cookie helpers (SPEC v1.1 §2.5 — dismiss persistente 90 dias)
const DISMISS_COOKIE = 'digitai-install-dismissed'
const DISMISS_MAX_AGE = 7776000 // 90 dias em segundos

function setDismissCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${DISMISS_COOKIE}=1; max-age=${DISMISS_MAX_AGE}; path=/; SameSite=Lax`
}

function hasDismissCookie() {
  if (typeof document === 'undefined') return false
  return document.cookie.split('; ').some(c => c.startsWith(`${DISMISS_COOKIE}=1`))
}

export function InstallBanner() {
  const { isInstallable, install } = useInstallPWA()
  const { permission, requestPermission } = usePushNotifications()
  const [dismissed, setDismissed] = useState(false)
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false)

  useEffect(() => {
    // Check dismiss persistido em cookie (SPEC v1.1 §2.5)
    if (hasDismissCookie()) {
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
    setDismissCookie()
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

  // iOS-specific banner — paleta warm dark (SPEC v1.1 §2.5)
  if (isIOSDevice && !dismissed) {
    return (
      <div
        role="banner"
        aria-label="Instalar demo Digitai como app"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-digitai-border bg-digitai-card shadow-lg animate-in slide-in-from-bottom duration-300"
      >
        <div className="container mx-auto max-w-2xl px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <Download className="h-5 w-5 text-digitai-cyan flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-medium text-digitai-cream text-sm sm:text-base">Instalar demo Digitai</p>
                <p className="text-xs sm:text-sm text-digitai-warm mt-1">
                  Toque em <Share className="inline h-3.5 w-3.5 mx-0.5" /> <span className="font-medium">Compartilhar</span> e depois em <Plus className="inline h-3.5 w-3.5 mx-0.5" /> <span className="font-medium">Adicionar à Tela de Início</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="self-end p-2 text-digitai-muted hover:text-digitai-cream transition-colors flex-shrink-0 sm:self-start"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Android/Chrome banner — paleta warm dark + cyan CTA (SPEC v1.1 §2.5)
  if (isInstallable && !dismissed) {
    return (
      <div
        role="banner"
        aria-label="Instalar demo Digitai como app"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-digitai-border bg-digitai-card shadow-lg animate-in slide-in-from-bottom duration-300"
      >
        <div className="container mx-auto max-w-2xl px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Download className="h-5 w-5 text-digitai-cyan flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-digitai-cream text-sm sm:text-base">Instalar demo Digitai</p>
                <p className="text-xs sm:text-sm text-digitai-warm">Acesse mais rápido pela tela inicial</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 flex-shrink-0">
              <Button
                onClick={handleInstall}
                size="sm"
                className="h-9 border-none bg-digitai-cyan font-semibold text-[#0a0a0a] hover:bg-digitai-cyan-glow"
              >
                Instalar
              </Button>
              <button
                onClick={handleDismiss}
                className="p-2 text-digitai-muted hover:text-digitai-cream transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Notification prompt — paleta warm dark (mantém consistência SPEC v1.1)
  if (showNotificationPrompt && permission === 'default') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-digitai-border bg-digitai-card shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto flex items-center justify-between gap-4 max-w-2xl px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 min-w-0">
            <Bell className="h-5 w-5 text-digitai-cyan flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-digitai-cream text-sm sm:text-base">Ativar notificações?</p>
              <p className="text-xs sm:text-sm text-digitai-warm truncate">Receba atualizações importantes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={handleEnableNotifications}
              size="sm"
              className="h-9 border-none bg-digitai-cyan font-semibold text-[#0a0a0a] hover:bg-digitai-cyan-glow"
            >
              Ativar
            </Button>
            <button
              onClick={() => setShowNotificationPrompt(false)}
              className="p-2 text-digitai-muted hover:text-digitai-cream transition-colors"
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
