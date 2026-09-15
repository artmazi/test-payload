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
      name: 'classNames',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
