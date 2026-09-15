import type { Block } from 'payload'

export const ProductTextWithMapBlock: Block = {
  slug: 'productTextWithMap',
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
      name: 'bigMap',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
