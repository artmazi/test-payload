import type { Metadata } from 'next'
import NotFoundContent from '@/components/NotFoundContent'

export const metadata: Metadata = { title: '404 – infra3D' }

// Rendered inside the locale layout (header, footer) whenever a page calls notFound()
export default function NotFound() {
  return <NotFoundContent />
}
