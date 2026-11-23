'use client'
import { useRowLabel } from '@payloadcms/ui'

// Menu rows: the typed name, else the URL, else "Page link" (the relationship value is only an id here)
export default function MenuRowLabel() {
  const { data, rowNumber = 0 } = useRowLabel<{ name?: string; title?: string; label?: string; url?: string; type?: string; page?: unknown }>()
  const text = data?.name || data?.title || data?.label || (data?.type === 'page' ? (data?.page ? 'Page link (uses page title)' : '') : data?.url)
  return <span>{text || `Item ${String(rowNumber + 1).padStart(2, '0')}`}</span>
}
