"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const LivePreviewWrapper = ({ initialPage }: { initialPage: any }) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
    initialData: initialPage,
  })

  return <RenderBlocks blocks={data?.content || []} />
}
