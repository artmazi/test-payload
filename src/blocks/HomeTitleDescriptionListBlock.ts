import type { Block } from 'payload'

export const HomeTitleDescriptionListBlock: Block = {
  slug: 'homeTitleDescriptionList',
  labels: { singular: 'Title Description List', plural: 'Title Description List' },
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
      name: 'list',
      type: 'text',
    },
  ],
}
