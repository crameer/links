// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ResolvedConfig } from '@/lib/config'
import { Avatar } from './Avatar'
import { LinkButton } from './LinkButton'
import { SocialIcons } from './SocialIcons'

export const ProfileCard = ({ config }: { config: ResolvedConfig }) => {
  const { profile, socials = [], links, appearance } = config
  const variant = appearance.linkStyle

  return (
    <motion.div
      className={cn(
        'relative z-10 w-full max-w-md mx-auto px-3 py-2 sm:px-4 sm:py-8',
        'flex flex-col items-center gap-2.5 sm:gap-6',
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex flex-col items-center gap-1.5 sm:gap-3 text-center">
        <div className="origin-center scale-[0.72] -my-3 sm:my-0 sm:scale-100">
          <Avatar
            {...(profile.avatar !== undefined ? { src: profile.avatar } : {})}
            name={profile.name}
            glow={appearance.avatarGlow}
            size={96}
          />
        </div>
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h1
              className="text-xl sm:text-2xl font-black tracking-wide"
              style={{
                color: '#080d08',
                WebkitTextStroke: '1.1px #9cff45',
                paintOrder: 'stroke fill',
                textShadow: '0 1px 0 rgba(0,0,0,.95), 0 0 4px rgba(126,255,45,.8), 0 0 11px rgba(126,255,45,.48)',
              }}
            >
              {profile.name}
            </h1>
            {profile.verified && (
              <BadgeCheck
                size={20}
                className="text-[var(--accent)] shrink-0"
                aria-label="Verified"
              />
            )}
          </div>
          {profile.username && (
            <p
              className="text-xs sm:text-sm mt-0.5 font-black tracking-wide"
              style={{
                color: '#080d08',
                WebkitTextStroke: '0.9px #9cff45',
                paintOrder: 'stroke fill',
                textShadow: '0 1px 0 rgba(0,0,0,.95), 0 0 4px rgba(126,255,45,.72), 0 0 9px rgba(126,255,45,.4)',
              }}
            >
              @{profile.username}
            </p>
          )}
          {profile.bio && (
            <p
              className="text-xs sm:text-sm mt-1 sm:mt-2 max-w-xs leading-snug sm:leading-relaxed font-black tracking-wide"
              style={{
                color: '#080d08',
                WebkitTextStroke: '0.85px #9cff45',
                paintOrder: 'stroke fill',
                textShadow: '0 1px 0 rgba(0,0,0,.95), 0 0 4px rgba(126,255,45,.75), 0 0 9px rgba(126,255,45,.42)',
              }}
            >
              {profile.bio}
            </p>
          )}
        </div>
        {socials.length > 0 && (
          <div className="origin-center scale-90 -my-1 sm:my-0 sm:scale-100">
            <SocialIcons socials={socials} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 sm:gap-3 w-full">
        {links.map((link, index) => (
          <motion.div
            key={link.url}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
          >
            <LinkButton link={link} variant={link.style ?? variant} />
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] sm:text-xs text-white/20 select-none mt-0.5 sm:mt-1">
        Made by{' '}
        <a
          href="https://github.com/germondai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-white/60 underline underline-offset-2 decoration-white/20 transition-colors"
        >
          @germondai
        </a>
      </p>
    </motion.div>
  )
}
