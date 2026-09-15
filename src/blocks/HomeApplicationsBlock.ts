import type { Block } from 'payload'

export const HomeApplicationsBlock: Block = {
  slug: 'homeApplications',
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
      name: 'contentBg',
      type: 'textarea',
    },
    {
      name: 'button1Color',
      type: 'text',
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
      name: 'contentButtonLink',
      type: 'text',
    },
    {
      name: 'items2',
      type: 'text',
    },
    {
      name: 'contentTitle',
      type: 'textarea',
    },
    {
      name: 'contentText',
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
      name: 'button2Link',
      type: 'text',
    },
  ],
}
