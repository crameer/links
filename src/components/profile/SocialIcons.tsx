// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import {
  AtSign,
  Bird,
  BookOpen,
  Briefcase,
  Camera,
  CirclePlay,
  Code2,
  Coffee,
  Gamepad,
  Globe,
  Heart,
  Layers,
  Mail,
  MessageCircle,
  MessageSquare,
  Music,
  Palette,
  Rocket,
  Send,
  Users,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/cn'
import type { SocialLink, SocialPlatform } from '@/types/config'

// Brand icons reliably available from icons.germondai.com
const PROVIDER_SLUGS: Partial<Record<SocialPlatform, string>> = {
  github: 'github',
  twitter: 'twitter',
  instagram: 'instagram',
  youtube: 'youtube',
  linkedin: 'linkedin',
  tiktok: 'tiktok',
  twitch: 'twitch',
  discord: 'discord',
  spotify: 'spotify',
  facebook: 'facebook',
  reddit: 'reddit',
  telegram: 'telegram',
  medium: 'medium',
  dribbble: 'dribbble',
  behance: 'behance',
  steam: 'steam',
  bluesky: 'bluesky',
}

// Lucide fallbacks for platforms not in the provider
const FALLBACK_ICONS: Record<SocialPlatform, React.ReactNode> = {
  github: <MessageCircle size={18} />,
  twitter: <Bird size={18} />,
  bluesky: <Bird size={18} />,
  threads: <AtSign size={18} />,
  instagram: <Camera size={18} />,
  facebook: <Users size={18} />,
  youtube: <CirclePlay size={18} />,
  tiktok: <Music size={18} />,
  twitch: <CirclePlay size={18} />,
  linkedin: <Briefcase size={18} />,
  discord: <MessageCircle size={18} />,
  telegram: <Send size={18} />,
  whatsapp: <MessageSquare size={18} />,
  reddit: <MessageCircle size={18} />,
  spotify: <Music size={18} />,
  patreon: <Heart size={18} />,
  kofi: <Coffee size={18} />,
  producthunt: <Rocket size={18} />,
  dribbble: <Palette size={18} />,
  behance: <Layers size={18} />,
  devto: <Code2 size={18} />,
  hashnode: <Code2 size={18} />,
  medium: <BookOpen size={18} />,
  steam: <Gamepad size={18} />,
  website: <Globe size={18} />,
  email: <Mail size={18} />,
}

const LABELS: Record<SocialPlatform, string> = {
  github: 'GitHub',
  twitter: 'Twitter / X',
  bluesky: 'Bluesky',
  threads: 'Threads',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  twitch: 'Twitch',
  linkedin: 'LinkedIn',
  discord: 'Discord',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  reddit: 'Reddit',
  spotify: 'Spotify',
  patreon: 'Patreon',
  kofi: 'Ko-fi',
  producthunt: 'Product Hunt',
  dribbble: 'Dribbble',
  behance: 'Behance',
  devto: 'DEV.to',
  hashnode: 'Hashnode',
  medium: 'Medium',
  steam: 'Steam',
  website: 'Website',
  email: 'Email',
}

const BRAND_ICONS: Partial<Record<SocialPlatform, { slug: string; color: string; glow: string }>> = {
  youtube: { slug: 'YouTube', color: 'FF0033', glow: 'drop-shadow(0 0 4px rgba(255,0,51,.8)) drop-shadow(0 0 8px rgba(255,0,51,.45))' },
  twitch: { slug: 'Twitch', color: '9146FF', glow: 'drop-shadow(0 0 4px rgba(145,70,255,.85)) drop-shadow(0 0 8px rgba(145,70,255,.45))' },
  tiktok: { slug: 'TikTok', color: 'FFFFFF', glow: 'drop-shadow(-2px 0 3px rgba(37,244,238,.95)) drop-shadow(2px 0 3px rgba(254,44,85,.95)) drop-shadow(0 0 7px rgba(255,255,255,.45))' },
  instagram: { slug: 'Instagram', color: 'FF4FA3', glow: 'drop-shadow(0 0 4px rgba(255,79,163,.85)) drop-shadow(0 0 8px rgba(255,138,0,.45))' },
  twitter: { slug: 'X', color: 'FFFFFF', glow: 'drop-shadow(0 0 4px rgba(255,255,255,.85)) drop-shadow(0 0 8px rgba(255,255,255,.4))' },
}

const SocialIcon = ({ platform }: { platform: SocialPlatform }) => {
  const brand = BRAND_ICONS[platform]
  if (brand) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color}`}
        alt=""
        width={18}
        height={18}
        loading="lazy"
        aria-hidden="true"
        className="size-[18px] object-contain transition-transform duration-200 group-hover:scale-110"
        style={{ filter: brand.glow }}
      />
    )
  }
  const slug = PROVIDER_SLUGS[platform]
  return slug ? <Icon icon={`icon:${slug}:mono:fff`} size={18} /> : FALLBACK_ICONS[platform]
}

export const SocialIcons = ({ socials }: { socials: SocialLink[] }) => {
  if (!socials.length) return null
  return (
    <TooltipProvider>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {socials.map(({ platform, url }) => (
          <Tooltip key={`${platform}:${url}`}>
            <TooltipTrigger asChild>
              <a
                href={url}
                target={platform === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={cn(
                  'group opacity-80 hover:opacity-100 transition-all duration-200',
                  'hover:scale-110',
                )}
                aria-label={LABELS[platform]}
              >
                <SocialIcon platform={platform} />
              </a>
            </TooltipTrigger>
            <TooltipContent>{LABELS[platform]}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
