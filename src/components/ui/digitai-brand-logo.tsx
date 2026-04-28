"use client"

// SPEC v1.3 (DSG-14, 28/04/2026) — render outlined paths (sem dependência de fonte runtime)
// Pingo cyan replica EXATAMENTE o ponto natural do glifo "i" da DM Sans Bold.
// Adaptação landing: SEM next-themes (digitai-landing não tem dependency).
// Pages internas atuais são paleta fixa (warm dark) — theme prop default "dark".

import {
  DIGITAI_LOGO_VIEWBOX,
  DIGITAI_LOGO_WORDMARK_PATH,
  DIGITAI_LOGO_DOT_PATH,
  DIGITAI_LOGO_DOT_TRANSLATE_X,
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
        <path d={DIGITAI_LOGO_WORDMARK_PATH} fill={textColor} />
        <g transform={`translate(${DIGITAI_LOGO_DOT_TRANSLATE_X} 0)`} fill={dotColor}>
          <path d={DIGITAI_LOGO_DOT_PATH} />
        </g>
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
