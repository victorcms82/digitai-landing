"use client"

import { useState, useEffect } from "react"
import { Download, X, Share, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInstallPWA } from "./pwa-provider"

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

export function InstallFab() {
  const { isInstallable, install } = useInstallPWA()
  const [showFab, setShowFab] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false)

  useEffect(() => {
    setIsIOSDevice(isIOS())
    setIsAlreadyInstalled(isStandalone())

    // Show FAB if banner was dismissed
    const wasDismissed = localStorage.getItem('install-banner-dismissed')
    if (wasDismissed) {
      setShowFab(true)
    }

    // Listen for banner dismiss
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'install-banner-dismissed' && e.newValue === 'true') {
        setShowFab(true)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleInstall = async () => {
    const installed = await install()
    if (installed) {
      setShowFab(false)
    }
  }

  // Don't show if already installed or banner not dismissed
  if (isAlreadyInstalled || !showFab) {
    return null
  }

  // iOS tooltip
  if (isIOSDevice && showTooltip) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setShowTooltip(false)}
        />

        {/* Tooltip */}
        <div className="fixed bottom-20 right-4 z-50 w-72 rounded-lg bg-slate-800 border border-slate-700 p-4 shadow-xl animate-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="font-medium text-white text-sm mb-3">Como instalar no iPhone:</p>
          <ol className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">1.</span>
              <span>Toque em <Share className="inline h-3.5 w-3.5 mx-0.5" /> <strong>Compartilhar</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">2.</span>
              <span>Toque em <Plus className="inline h-3.5 w-3.5 mx-0.5" /> <strong>Adicionar à Tela de Início</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-emerald-400">3.</span>
              <span>Toque em <strong>Adicionar</strong></span>
            </li>
          </ol>
        </div>

        {/* FAB */}
        <button
          onClick={() => setShowTooltip(false)}
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
        >
          <Download className="h-6 w-6" />
        </button>
      </>
    )
  }

  return (
    <button
      onClick={isIOSDevice ? () => setShowTooltip(true) : handleInstall}
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors animate-in slide-in-from-bottom-4 duration-300"
      title="Instalar App"
    >
      <Download className="h-6 w-6" />
    </button>
  )
}
