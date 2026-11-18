"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { payloadEditable, VisualEditing } from '@payload-inline-visual-editor/react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export const LivePreviewWrapper = ({ initialPage }: { initialPage: any }) => {
  // The preview iframe is served by the same app as the admin, so its own origin is the Payload server
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  const { data } = useLivePreview({
    serverURL,
    depth: 2,
    initialData: initialPage,
  })

  return (
    <div {...payloadEditable.scope({ collection: 'pages', id: initialPage.id })}>
      <VisualEditing serverURL={serverURL} />
      <RenderBlocks pageId={initialPage.id} blocks={data?.content || []} />
    </div>
  )
}
