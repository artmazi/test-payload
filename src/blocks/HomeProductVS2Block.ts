import type { Block } from 'payload'

export const HomeProductVS2Block: Block = {
  slug: 'homeProductVS2',
  labels: { singular: 'Product VS2', plural: 'Product VS2' },
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
      name: 'title',
      type: 'text',
    },
    {
      name: 'items',
      type: 'text',
    },
    {
      name: 'className',
      type: 'text',
    },
  ],
}
