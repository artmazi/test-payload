'use client'
import { useRowLabel } from '@payloadcms/ui'

// "Generate oder Access" instead of "Row 01"
export default function ProductPairRowLabel() {
  const { data, rowNumber = 0 } = useRowLabel<{ left?: { label?: string }; right?: { label?: string }; vs?: string }>()
  const parts = [data?.left?.label, data?.right?.label].filter(Boolean)
  return <span>{parts.length ? parts.join(` ${data?.vs || '·'} `) : `Pair ${String(rowNumber + 1).padStart(2, '0')}`}</span>
}
