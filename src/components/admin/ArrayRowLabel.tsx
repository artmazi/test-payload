'use client'

import { useRowLabel } from '@payloadcms/ui'

// Admin label for array rows: shows the row's own text ("Phone: Tel. +41 …") instead of "Button 01"
export default function ArrayRowLabel() {
  const { data, rowNumber = 0 } = useRowLabel<{ label?: string; name?: string; title?: string; type?: string }>()
  const text = data?.label || data?.name || data?.title
  const kind = data?.type ? `${data.type.charAt(0).toUpperCase()}${data.type.slice(1)}: ` : ''
  return <span>{text ? `${kind}${text}` : kind ? kind.slice(0, -2) : `Row ${String(rowNumber + 1).padStart(2, '0')}`}</span>
}
