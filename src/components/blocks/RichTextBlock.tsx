"use client";

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { DocumentLayout } from './ProductWysiwyg'
import { lexicalToMarkdown } from '@/helpers/lexicalToMarkdown'

export const RichTextBlock = ({ content, layout, blockIndex }: any) => {
  if (!content) return null
  // Same look as productWysiwyg's Document layout: reuse it on the serialized content
  if (layout === 'document') return <DocumentLayout data={{ content: lexicalToMarkdown(content), blockIndex }} />
  return (
    <div className="prose max-w-none text-gray-800">
      <RichText data={content} />
    </div>
  )
}
