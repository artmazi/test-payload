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
  images: {
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
