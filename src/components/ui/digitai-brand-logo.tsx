"use client"

// CRD-ENG-FIX-RESIDUAL (28/04/2026) — DSG-10 NEW-2
// Adaptacao landing do componente em digitai-ai-agents-platform.
// Diferenca: SEM next-themes (digitai-landing nao tem dependency).
// Pages internas atuais sao paleta fixa (warm dark) — theme prop default "dark".

import {
  DIGITAI_LOGO_VIEWBOX,
  DIGITAI_LOGO_TEXT_Y,
  DIGITAI_LOGO_FONT_SIZE,
  DIGITAI_LOGO_LETTER_SPACING,
  DIGITAI_LOGO_DOT_CX,
  DIGITAI_LOGO_DOT_CY,
  DIGITAI_LOGO_DOT_R,
  DIGITAI_LOGO_TEXT_DARK,
  DIGITAI_LOGO_TEXT_LIGHT,
  DIGITAI_LOGO_DOT_DARK,
  DIGITAI_LOGO_DOT_LIGHT,
} from "./digitai-brand-tokens"

const SIZES = {
  sm: 20,
  md: 32,
  lg: 48,
} as const

interface DigitaiBrandLogoProps {
  size?: keyof typeof SIZES
  showTagline?: boolean
  theme?: "dark" | "light"
  className?: string
}

export function DigitaiBrandLogo({
  size = "md",
  showTagline = false,
  theme = "dark",
  className = "",
}: DigitaiBrandLogoProps) {
  const height = SIZES[size]
  const isDark = theme === "dark"

  const textColor = isDark ? DIGITAI_LOGO_TEXT_DARK : DIGITAI_LOGO_TEXT_LIGHT
  const dotColor = isDark ? DIGITAI_LOGO_DOT_DARK : DIGITAI_LOGO_DOT_LIGHT

  return (
    <div className={className}>
      <svg
        height={height}
        viewBox={DIGITAI_LOGO_VIEWBOX}
        aria-label="Digitai"
      >
        <text
          x="0"
          y={DIGITAI_LOGO_TEXT_Y}
          fontFamily="DM Sans, system-ui, sans-serif"
          fontWeight="700"
          fontSize={DIGITAI_LOGO_FONT_SIZE}
          letterSpacing={DIGITAI_LOGO_LETTER_SPACING}
          fill={textColor}
        >digita&#x0131;</text>
        <circle
          cx={DIGITAI_LOGO_DOT_CX}
          cy={DIGITAI_LOGO_DOT_CY}
          r={DIGITAI_LOGO_DOT_R}
          fill={dotColor}
        />
      </svg>
      {showTagline && (
        <p
          className="mt-6 text-[22px] font-bold tracking-wide text-[#A89C8C]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Sua equipe de IA, 24/7
        </p>
      )}
    </div>
  )
}
