import type { Block } from 'payload'

export const HomeNewsBlock: Block = {
  slug: 'homeNews',
  labels: {
    singular: 'Home News',
    plural: 'Home News',
  },
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
  ],
}
