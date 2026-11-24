// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { useFlare } from '@/hooks/useFlare'
import { cn } from '@/lib/cn'
import type { Link } from '@/types/config'

const linkButtonVariants = cva(
  'relative isolate flex min-h-[78px] w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left text-white transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
  {
    variants: {
      variant: {
        default: 'border-white/15 bg-slate-950/65 shadow-lg shadow-black/20 backdrop-blur-xl hover:border-white/35 hover:bg-slate-950/80',
        pill: 'border-white/15 bg-slate-950/65 shadow-lg shadow-black/20 backdrop-blur-xl hover:border-white/35 hover:bg-slate-950/80',
        outline: 'border-white/25 bg-slate-950/45 backdrop-blur-xl hover:border-white/50 hover:bg-slate-950/65',
        neon: 'border backdrop-blur-xl',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const platformStyles: Record<string, { color: string; glow: string; tile: string; label: string }> = {
  youtube: { color: '#ff4545', glow: 'rgba(255,69,69,0.28)', tile: 'bg-red-500/15 ring-red-400/30', label: 'YOUTUBE' },
  twitch: { color: '#b58aff', glow: 'rgba(145,70,255,0.32)', tile: 'bg-violet-500/20 ring-violet-300/35', label: 'TWITCH' },
  kick: { color: '#53e58b', glow: 'rgba(83,229,139,0.28)', tile: 'bg-emerald-400/15 ring-emerald-300/30', label: 'KICK' },
  tiktok: { color: '#63eaf0', glow: 'rgba(99,234,240,0.28)', tile: 'bg-cyan-400/15 ring-cyan-300/30', label: 'TIKTOK' },
  instagram: { color: '#ff83c8', glow: 'rgba(255,83,173,0.3)', tile: 'bg-fuchsia-400/15 ring-fuchsia-300/30', label: 'INSTAGRAM' },
  twitter: { color: '#ffffff', glow: 'rgba(255,255,255,0.34)', tile: 'bg-white/15 ring-white/45', label: 'X (TWITTER)' },
}

interface LinkButtonProps extends VariantProps<typeof linkButtonVariants> {
  link: Link
}

export const LinkButton = ({ link, variant }: LinkButtonProps) => {
  const triggerFlare = useFlare()
  const platform = platformStyles[link.title.toLowerCase().includes('youtube') ? 'youtube' : link.title.toLowerCase().includes('twitch') ? 'twitch' : link.title.toLowerCase().includes('kick') ? 'kick' : link.title.toLowerCase().includes('tiktok') ? 'tiktok' : link.title.toLowerCase().includes('instagram') ? 'instagram' : 'twitter']
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => triggerFlare(e.clientX, e.clientY)

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkButtonVariants({ variant }), 'hover:-translate-y-0.5')}
      style={{ '--platform-color': platform.color, '--platform-glow': platform.glow } as React.CSSProperties}
      onClick={handleClick}
      whileHover={{ scale: 1.018, y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      <span
        className="pointer-events-none absolute inset-y-2 left-0 w-1 rounded-r-full opacity-100 transition-all duration-300 group-hover:inset-y-1 group-hover:w-1.5"
        style={{ background: platform.color, boxShadow: `0 0 16px ${platform.glow}` }}
      />
      <span
        className={cn('relative grid size-12 shrink-0 place-items-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-110', platform.tile)}
      >
        {link.icon && <Icon icon={link.icon} size={23} className="shrink-0" />}
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="mb-0.5 block text-[10px] font-bold tracking-[0.2em] text-white/45">{platform.label}</span>
        <span className="block truncate text-base font-bold tracking-wide text-white">{link.title}</span>
        {link.description && (
          <span className="mt-0.5 block truncate text-xs font-medium text-white/65">{link.description}</span>
        )}
      </span>
      <span
        className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/55 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white"
        aria-hidden="true"
      >
        <ArrowUpRight size={18} />
      </span>
    </motion.a>
  )
}
