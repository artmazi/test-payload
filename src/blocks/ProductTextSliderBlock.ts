import type { Block } from 'payload'

export const ProductTextSliderBlock: Block = {
  slug: 'productTextSlider',
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
      name: 'heroText',
      type: 'textarea',
    },
    {
      name: 'hero',
      type: 'text',
    },
    {
      name: 'background',
      type: 'text',
    },
  ],
}
