import type { Block } from 'payload'

export const ProductWysiwygBlock: Block = {
  slug: 'productWysiwyg',
  fields: [
    {
      name: 'hideBlock',
      type: 'checkbox',
      label: 'Hide this block on the website',
      defaultValue: false,
      admin: {
        description: 'If checked, this block will not be rendered on the frontend.',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Document (title, numbered sections, table of contents)', value: 'document' },
      ],
      admin: {
        description: 'Document: a bold first line becomes the title and bold lines like "**1. Heading**" become sections.',
      },
    },
    {
      name: 'classNames',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
