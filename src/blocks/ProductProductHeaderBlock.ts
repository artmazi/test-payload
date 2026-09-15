import type { Block } from 'payload'

export const ProductProductHeaderBlock: Block = {
  slug: 'productProductHeader',
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
      name: 'menu',
      type: 'text',
    },
    {
      name: 'sections',
      type: 'text',
    },
    {
      name: 'button',
      type: 'text',
    },
  ],
}
