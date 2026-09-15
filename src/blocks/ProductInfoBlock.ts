import type { Block } from 'payload'

export const ProductInfoBlock: Block = {
  slug: 'productInfo',
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
      name: 'sub_title',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'button2',
      type: 'text',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'button1',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'button1Link',
      type: 'text',
    },
    {
      name: 'button2Link',
      type: 'text',
    },
  ],
}
