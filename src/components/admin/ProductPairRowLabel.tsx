'use client'
import { useRowLabel } from '@payloadcms/ui'

// "Generate oder Access" instead of "Row 01"
export default function ProductPairRowLabel() {
  type Side = { label?: string; type?: string; page?: unknown }
  const { data, rowNumber = 0 } = useRowLabel<{ left?: Side; right?: Side; vs?: string }>()
  // A page link without its own label uses the page title on the site; only the id is known here
  const name = (s?: Side) => s?.label || (s?.type === 'page' && s.page ? 'Page link' : '')
  const parts = [name(data?.left), name(data?.right)].filter(Boolean)
  return <span>{parts.length ? parts.join(` ${data?.vs || '·'} `) : `Pair ${String(rowNumber + 1).padStart(2, '0')}`}</span>
}
