import type { Block } from 'payload'

export const ProductIntegrationSliderBlock: Block = {
  slug: 'productIntegrationSlider',
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
      name: 'imageType',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'href',
      type: 'text',
    },
    {
      name: 'items',
      type: 'text',
    },
    {
      name: 'classNames',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'contact',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
