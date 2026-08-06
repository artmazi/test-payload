import React from 'react'
import { HeadingBlock } from './HeadingBlock'
import { RichTextBlock } from './RichTextBlock'
import { ImageBlock } from './ImageBlock'
import { CallToActionBlock } from './CallToActionBlock'

export const RenderBlocks = ({ blocks }: { blocks: any[] }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'heading':
            return <HeadingBlock key={i} {...block} />
          case 'richText':
            return <RichTextBlock key={i} {...block} />
          case 'image':
            return <ImageBlock key={i} {...block} />
          case 'callToAction':
            return <CallToActionBlock key={i} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
