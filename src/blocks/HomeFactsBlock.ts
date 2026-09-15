import type { Block } from 'payload'

export const HomeFactsBlock: Block = {
  slug: 'homeFacts',
  labels: {
    singular: 'Home Facts',
    plural: 'Home Facts',
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
    { name: 'subTitle', type: 'text' },
    { name: 'factsLeft',
      type: 'array',
      fields: [{name:'title', type:'text'}, {name:'text', type:'text'}] },
    { name: 'title', type: 'text' },
    { name: 'factsRight',
      type: 'array',
      fields: [{name:'title', type:'text'}, {name:'text', type:'text'}] },
    {
      name: 'factsMosaic',
      type: 'group',
      fields: [
        { name: 'fm1', type: 'group', fields: [{name:'title', type:'text'}, {name:'text', type:'text'}] },
        { name: 'fm2', type: 'group', fields: [{name:'title', type:'text'}, {name:'text', type:'text'}] },
        { name: 'fm3', type: 'group', fields: [{name:'title', type:'text'}, {name:'text', type:'text'}] },
        { name: 'fm4', type: 'group', fields: [{name:'title', type:'text'}, {name:'text', type:'text'}] },
        { name: 'fm5', type: 'group', fields: [{name:'text1', type:'text'}, {name:'text2', type:'text'}, {name:'text3', type:'text'}] },
        { name: 'fm6', type: 'group', fields: [{name:'text1', type:'text'}, {name:'text2', type:'text'}, {name:'text3', type:'text'}] },
        { name: 'fm7', type: 'group', fields: [{name:'text1', type:'text'}, {name:'text2', type:'text'}, {name:'text3', type:'text'}] },
        { name: 'fm8', type: 'group', fields: [{name:'text1', type:'text'}, {name:'text2', type:'text'}, {name:'text3', type:'text'}] },
      ]
    },
  ],
}
