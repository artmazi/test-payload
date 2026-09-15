import type { Block } from 'payload'

export const HomeInfoBlock: Block = {
  slug: 'homeInfo',
  labels: {
    singular: 'Home Info',
    plural: 'Home Info',
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
      name: 'items',
      type: 'array',
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
        { name: 'text', type: 'text' }
      ]
    },
    {
      name: 'infoHero',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'oneRow',
      type: 'text',
    },
    {
      name: 'className',
      type: 'text',
    },
    {
      name: 'hideCheck',
      type: 'text',
    },
  ],
}
