import type { Block } from 'payload'

export const ProductListBlock: Block = {
  slug: 'productList',
  fields: [
    {
      name: 'hidden',
      type: 'checkbox',
      label: 'Hide this block on the website',
      defaultValue: false,
      admin: {
        description: 'If checked, this block will not be rendered on the frontend.',
      },
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'items',
      type: 'text',
    },
    {
      name: 'video',
      type: 'text',
    },
  ],
}
