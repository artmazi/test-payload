import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const RichTextBlock = ({ content }: any) => {
  if (!content) return null
  return (
    <div className="prose max-w-none text-gray-800">
      <RichText data={content} />
    </div>
  )
}
