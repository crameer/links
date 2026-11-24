// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useFlare } from '@/hooks/useFlare'
import { cn } from '@/lib/cn'
import type { Link } from '@/types/config'

const linkButtonVariants = cva(
  'relative isolate flex min-h-[72px] sm:min-h-[78px] w-full items-center gap-3 sm:gap-4 overflow-hidden rounded-2xl border px-3 sm:px-4 py-3 sm:py-3.5 text-left text-white transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
  {
    variants: {
      variant: {
        default: 'shadow-lg shadow-black/20 backdrop-blur-2xl hover:-translate-y-0.5',
        pill: 'shadow-lg shadow-black/20 backdrop-blur-2xl hover:-translate-y-0.5',
        outline: 'backdrop-blur-2xl hover:-translate-y-0.5',
        neon: 'backdrop-blur-2xl hover:-translate-y-0.5',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

const platformStyles: Record<string, { color: string; glow: string; tile: string; label: string }> = {
  youtube: { color: '#ff4545', glow: 'rgba(255,69,69,0.30)', tile: 'bg-red-500/10 ring-red-400/25', label: 'YOUTUBE' },
  twitch: { color: '#b58aff', glow: 'rgba(145,70,255,0.30)', tile: 'bg-violet-500/10 ring-violet-300/25', label: 'TWITCH' },
  kick: { color: '#53e58b', glow: 'rgba(83,229,139,0.28)', tile: 'bg-emerald-400/10 ring-emerald-300/25', label: 'KICK' },
  tiktok: { color: '#63eaf0', glow: 'rgba(99,234,240,0.28)', tile: 'bg-cyan-400/10 ring-cyan-300/25', label: 'TIKTOK' },
  instagram: { color: '#ff83c8', glow: 'rgba(255,83,173,0.30)', tile: 'bg-fuchsia-400/10 ring-fuchsia-300/25', label: 'INSTAGRAM' },
  twitter: { color: '#ffffff', glow: 'rgba(255,255,255,0.28)', tile: 'bg-white/10 ring-white/30', label: 'X (TWITTER)' },
}

interface LinkButtonProps extends VariantProps<typeof linkButtonVariants> {
  link: Link
}

export const LinkButton = ({ link, variant }: LinkButtonProps) => {
  const triggerFlare = useFlare()
  const title = link.title.toLowerCase()
  const platformKey = title.includes('youtube') ? 'youtube'
    : title.includes('twitch') ? 'twitch'
      : title.includes('kick') ? 'kick'
        : title.includes('tiktok') ? 'tiktok'
          : title.includes('instagram') ? 'instagram'
            : 'twitter'
  // platformKey always resolves to one of the six declared keys; assert the exhaustive lookup for strict indexed-access TypeScript.
  const platform = platformStyles[platformKey]!
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => triggerFlare(e.clientX, e.clientY)

  const iconUrl = `https://cdn.simpleicons.org/${platformKey === 'twitter' ? 'X' : platformKey === 'youtube' ? 'YouTube' : platformKey === 'tiktok' ? 'TikTok' : platformKey === 'instagram' ? 'Instagram' : platformKey === 'twitch' ? 'Twitch' : 'Kick'}/${platformKey === 'youtube' ? 'FF0033' : platformKey === 'twitch' ? '9146FF' : platformKey === 'kick' ? '53FC18' : platformKey === 'instagram' ? 'E4405F' : 'FFFFFF'}`

  const iconFilter = platformKey === 'tiktok'
    ? 'drop-shadow(-1px 0 2px rgba(37,244,238,.65)) drop-shadow(1px 0 2px rgba(254,44,85,.55))'
    : `drop-shadow(0 0 2px ${platform.color}) drop-shadow(0 0 4px ${platform.glow})`

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkButtonVariants({ variant }), 'hover:-translate-y-0.5')}
      style={{
        backgroundColor: 'rgba(8, 5, 22, 0.015)',
        backdropFilter: 'blur(1.5px) saturate(108%)',
        WebkitBackdropFilter: 'blur(1.5px) saturate(108%)',
        borderColor: `${platform.color}cc`,
        boxShadow: `0 0 4px ${platform.glow}, 0 0 9px ${platform.glow}, inset 0 0 3px rgba(255,255,255,0.035)`,
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.018, y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      <span
        className="pointer-events-none absolute inset-y-2 left-0 w-1 rounded-r-full opacity-100 transition-all duration-300 group-hover:inset-y-1 group-hover:w-1.5"
        style={{ background: platform.color, boxShadow: `0 0 7px ${platform.glow}` }}
      />
      <span
        className={cn('relative grid size-10 sm:size-12 shrink-0 place-items-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-105', platform.tile)}
        style={{ backgroundColor: `${platform.color}12`, boxShadow: `0 0 5px ${platform.glow}`, borderColor: `${platform.color}66` }}
      >
        <img
          src={iconUrl}
          alt=""
          width={30}
          height={30}
          loading="lazy"
          className="relative z-10 size-[26px] sm:size-[30px] shrink-0 object-contain"
          style={{ filter: iconFilter }}
          aria-hidden="true"
        />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="mb-0.5 block text-[10px] font-bold tracking-[0.2em]" style={{ color: platform.color, textShadow: `0 0 6px ${platform.glow}` }}>{platform.label}</span>
        <span className="block truncate text-base font-bold tracking-wide text-white">{link.title}</span>
        {(platformKey === 'tiktok' || link.description) && (
          <span className="mt-0.5 block line-clamp-2 sm:truncate text-xs font-medium text-white/75">
            {platformKey === 'tiktok'
              ? 'Clips, coches y directos'
              : link.description}
          </span>
        )}
      </span>
      <span
        className="relative flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/15 group-hover:text-white"
        aria-hidden="true"
      >
        <ArrowUpRight size={18} />
      </span>
    </motion.a>
  )
}
