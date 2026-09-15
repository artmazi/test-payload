import type { Block } from 'payload'

export const HomeNewsBlock: Block = {
  slug: 'homeNews',
  labels: {
    singular: 'Home News',
    plural: 'Home News',
  },
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
      name: 'news',
      type: 'array',
      labels: {
        singular: 'News Item',
        plural: 'News Items',
      },
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
        { name: 'title', type: 'text' },
        { name: 'date', type: 'text' },
        { name: 'link', type: 'text' }
      ],
    },
  ],
}
