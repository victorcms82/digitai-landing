# -*- coding: utf-8 -*-
# CRD-ENG-FIX-RESIDUAL — refator paleta warm dark + cyan SPEC v1.1
# DSG-10 NEW-1: 165 slate-* + 40 text-blue-* (4xx/5xx) → tokens canonicos
# Uso: python scripts/refactor-warm-dark.py
# Ordem CRITICA: longer-suffix patterns ANTES de bare patterns (replace_all literal)
import os, sys, re

# Substituicoes ordenadas (longer-variants primeiro, sempre)
SUBS = [
    # ---- slate-* com opacidade (longer-first) ----
    ("bg-slate-950/40",       "bg-[#141210]/40"),
    ("bg-slate-900/95",       "bg-[#1A1715]/95"),
    ("bg-slate-900/80",       "bg-[#1A1715]/80"),
    ("bg-slate-900/60",       "bg-[#1A1715]/60"),
    ("bg-slate-900/50",       "bg-[#1F1B17]/50"),
    ("bg-slate-900/30",       "bg-[#1A1715]/30"),
    ("bg-slate-800/50",       "bg-[#2A2420]/50"),
    ("border-slate-800/50",   "border-[#2A2420]/50"),
    ("border-slate-700/70",   "border-[#3A332D]/70"),

    # ---- slate-* bare bg/border ----
    ("bg-slate-950",          "bg-[#141210]"),
    ("bg-slate-900",          "bg-[#1A1715]"),
    ("bg-slate-800",          "bg-[#2A2420]"),
    ("bg-slate-700",          "bg-[#3A332D]"),
    ("bg-slate-500",          "bg-[#5C5147]"),
    ("border-slate-800",      "border-[#2A2420]"),
    ("border-slate-700",      "border-[#3A332D]"),

    # ---- gradient stops slate (from/via/to) ----
    ("from-slate-950",        "from-[#141210]"),
    ("from-slate-900",        "from-[#1A1715]"),
    ("via-slate-900",         "via-[#1A1715]"),
    ("to-slate-950",          "to-[#141210]"),
    ("to-slate-400",          "to-[#8A7D70]"),

    # ---- text-slate ----
    ("text-slate-100",        "text-[#F5E8D9]"),
    ("text-slate-200",        "text-[#E8DFD0]"),
    ("text-slate-300",        "text-[#A89C8C]"),
    ("text-slate-400",        "text-[#8A7D70]"),
    ("text-slate-500",        "text-[#7A6D60]"),
    ("text-slate-600",        "text-[#5C5147]"),

    # ---- slate prefixes (hover/active) ----
    ("hover:border-slate-700", "hover:border-[#3A332D]"),
    ("hover:border-slate-600", "hover:border-[#5C5147]"),
    ("hover:text-slate-400",   "hover:text-[#8A7D70]"),
    ("hover:text-slate-300",   "hover:text-[#A89C8C]"),
    ("active:text-slate-300",  "active:text-[#A89C8C]"),

    # ---- blue-* (apenas 300/400/500 viram cyan; 600+ stays como CTA) ----
    ("bg-blue-500/60",         "bg-[#06B6D4]/60"),
    ("bg-blue-500/10",         "bg-[#06B6D4]/10"),
    ("bg-blue-500",            "bg-[#06B6D4]"),
    ("border-blue-500/50",     "border-[#06B6D4]/50"),
    ("border-blue-500/30",     "border-[#06B6D4]/30"),
    ("focus:border-blue-500",  "focus:border-[#06B6D4]"),
    ("hover:border-blue-500/50","hover:border-[#06B6D4]/50"),
    ("hover:border-blue-500/40","hover:border-[#06B6D4]/40"),
    ("hover:border-blue-500",  "hover:border-[#06B6D4]"),
    ("text-blue-500",          "text-[#06B6D4]"),
    ("text-blue-400",          "text-[#22D3EE]"),
    ("text-blue-300",          "text-[#67E8F9]"),
    ("hover:text-blue-300",    "hover:text-[#67E8F9]"),
    ("active:text-blue-500",   "active:text-[#06B6D4]"),
]

# Substituicoes sao MONOTONICAS — ordem nao afeta end-state pois token-warm
# nao introduz sub-token slate/blue. Verificacao final via grep G1.

FILES = [
    "src/app/showcase/page.tsx",
    "src/app/demo/page.tsx",
    "src/app/tour/page.tsx",
    "src/app/privacidade/page.tsx",
    "src/app/offline/page.tsx",
    "src/components/install-fab.tsx",
]

total_changes = 0
for f in FILES:
    if not os.path.exists(f):
        print(f"SKIP (nao existe): {f}")
        continue
    with open(f, "r", encoding="utf-8") as fp:
        content = fp.read()
    original = content
    file_changes = 0
    for old, new in SUBS:
        n = content.count(old)
        if n > 0:
            content = content.replace(old, new)
            file_changes += n
    if content != original:
        with open(f, "w", encoding="utf-8", newline="") as fp:
            fp.write(content)
        print(f"OK {f}: {file_changes} substituicoes")
        total_changes += file_changes
    else:
        print(f"-- {f}: zero substituicoes")

print(f"TOTAL: {total_changes} substituicoes em {len(FILES)} arquivos")
