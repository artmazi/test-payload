import type { Block } from 'payload'

export const HomeSoftwareBlock: Block = {
  slug: 'homeSoftware',
  labels: {
    singular: 'Home Software',
    plural: 'Home Software',
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
      name: 'button1Color',
      type: 'text',
    },
    {
      name: 'contentButtonLink',
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
    },{name:'title', type:'text'}, {name:'text', type:'text'}, {name:'leftText', type:'text'}, {name:'rightText', type:'text'}],
    },
    {
      name: 'contentImg',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contentTitle',
      type: 'textarea',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'contentButton',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
