"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { payloadEditable, VisualEditing } from '@payload-inline-visual-editor/react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const LivePreviewWrapper = ({ initialPage }: { initialPage: any }) => {
  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
    initialData: initialPage,
  })

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return (
    <div {...payloadEditable.scope({ collection: 'pages', id: initialPage.id })}>
      <VisualEditing serverURL={serverURL} />
      <RenderBlocks pageId={initialPage.id} blocks={data?.content || []} />
    </div>
  )
}
