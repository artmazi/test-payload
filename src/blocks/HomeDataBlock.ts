import type { Block } from 'payload'

export const HomeDataBlock: Block = {
  slug: 'homeData',
  labels: {
    singular: 'Home Data',
    plural: 'Home Data',
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
    {
      name: 'items',
      type: 'array', fields: [{name:'title', type:'text'}, {name:'text', type:'text'}, {name:'leftText', type:'text'}, {name:'rightText', type:'text'}],
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'text',
      type: 'textarea',
    },
  ],
}
