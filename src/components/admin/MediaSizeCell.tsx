'use client'
import type { DefaultCellComponentProps } from 'payload'
import { formatBytes } from '@/helpers/formatBytes'

// "Size" column in the media list: file size plus pixel dimensions for images
export default function MediaSizeCell({ rowData }: DefaultCellComponentProps) {
  const { filesize, width, height } = (rowData || {}) as { filesize?: number; width?: number; height?: number }
  return (
    <span style={{ whiteSpace: 'nowrap' }}>
      {formatBytes(filesize)}
      {width && height ? <span style={{ opacity: 0.6 }}> · {width}×{height}</span> : null}
    </span>
  )
}
