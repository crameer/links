// SPDX-License-Identifier: AGPL-3.0-or-later
// Craameer - personal links page

import type { LinksConfig } from './src/types/config'

const config: LinksConfig = {
  profile: {
    name: 'Craameer',
    username: 'craameer',
    bio: 'Gaming • Coches • JDM • Racing',
    avatar: 'https://raw.githubusercontent.com/crameer/links/dev/public/fantasmita.png',
  },

  socials: [
    { platform: 'youtube', url: 'https://www.youtube.com/@Craameer' },
    { platform: 'twitch', url: 'https://www.twitch.tv/craameer' },
    { platform: 'tiktok', url: 'https://www.tiktok.com/@craameer' },
    { platform: 'instagram', url: 'https://www.instagram.com/craameer/' },
    { platform: 'twitter', url: 'https://x.com/Cr4meer' },
  ],

  links: [
    {
      title: 'YouTube',
      url: 'https://www.youtube.com/@Craameer',
      icon: 'icon:youtube:mono:fff',
      description: 'Directos, vídeos y los mejores momentos',
      style: 'neon',
    },
    {
      title: 'Twitch',
      url: 'https://www.twitch.tv/craameer',
      icon: 'icon:twitch:mono:fff',
      description: 'Sígueme para ver mis directos',
      style: 'neon',
    },
    {
      title: 'Kick',
      url: 'https://kick.com/craameer',
      icon: '🎮',
      description: 'Sígueme para ver mis directos',
      style: 'neon',
    },
    {
      title: 'TikTok',
      url: 'https://www.tiktok.com/@craameer',
      icon: 'icon:tiktok:mono:fff',
      description: 'También hacemos directos aquí',
      style: 'neon',
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/craameer/',
      icon: 'icon:instagram:mono:fff',
      description: 'Contenido y novedades',
      style: 'neon',
    },
    {
      title: 'X (Twitter)',
      url: 'https://x.com/Cr4meer',
      icon: 'icon:x:mono:fff',
      description: 'Novedades y avisos',
      style: 'neon',
    },
  ],

  appearance: {
    theme: 'aurora',
    font: 'Space_Grotesk',
    background: {
      type: 'image',
      src: '/craameer-background.png',
      overlayOpacity: 0.32,
      fit: 'cover',
    },
    accentColor: '#9B6DFF',
    linkStyle: 'neon',
    glassOpacity: 0.12,
    blur: 22,
    avatarGlow: true,
    backgroundAnimation: true,
  },

  effects: {
    beams: true,
    particles: true,
    lensFlares: true,
    noiseTexture: true,
  },

  seo: {
    title: 'Craameer | Redes y directos',
    description: 'Encuentra todos los canales y redes de Craameer: gaming, coches, JDM y directos.',
    twitterHandle: '@Cr4meer',
    keywords: ['Craameer', 'gaming', 'coches', 'JDM', 'racing', 'YouTube', 'Twitch', 'Kick'],
    locale: 'es_ES',
  },
}

export default config
