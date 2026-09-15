import type { Block } from 'payload'

export const ProductTextWithPictureBlock: Block = {
  slug: 'productTextWithPicture',
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
      name: 'type',
      type: 'text',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'picture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
