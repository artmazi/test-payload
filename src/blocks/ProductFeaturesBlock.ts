import type { Block } from 'payload'

export const ProductFeaturesBlock: Block = {
  slug: 'productFeatures',
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
      name: 'center',
      type: 'text',
    },
    {
      name: 'itemsBgSize',
      type: 'text',
    },
  ],
}
