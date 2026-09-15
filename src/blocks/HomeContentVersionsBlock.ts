import type { Block } from 'payload'

export const HomeContentVersionsBlock: Block = {
  slug: 'homeContentVersions',
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
      name: 'items',
      type: 'array', fields: [
    {
      name: 'hidden',
      type: 'checkbox',
      label: 'Hide this block on the website',
      defaultValue: false,
      admin: {
        description: 'If checked, this block will not be rendered on the frontend.',
      },
    },{name:'title', type:'text'}, {name:'content', type:'text'}, {name:'leftText', type:'text'}, {name:'rightText', type:'text'}],
    },
  ],
}
