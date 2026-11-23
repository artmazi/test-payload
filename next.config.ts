import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // turbopack: {
  //   root: path.resolve(dirname),
  // },
  async redirects() {
    // Any path without a locale prefix gets the default one: /verwaltungen/platform -> /de/verwaltungen/platform.
    // Skips the locales themselves, admin / API / Next internals, and files (anything with a dot, e.g. /logo.svg).
    return [
      { source: '/', destination: '/de', permanent: false },
      { source: '/:path((?!(?:de|en|fr|it|admin|api|_next|preview)(?:/|$))(?!.*\\.).+)', destination: '/de/:path', permanent: false },
    ]
  },
  images: {
    // Every image snaps to the closest allowed quality, so this one value replaces the default 75 everywhere
    qualities: [90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'inovitas.ch',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.inovitas.ch',
        port: '',
      },
    ],
  },
}

export default withPayload(nextConfig)
