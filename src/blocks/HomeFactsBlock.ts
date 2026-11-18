import type { Block } from 'payload'

export const HomeFactsBlock: Block = {
  slug: 'homeFacts',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-facts.webp',
  imageAltText: 'Key figures and a facts mosaic',
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
    { name: 'title', type: 'text' },
    { name: 'subTitle', type: 'text' },
    { name: 'factsLeft', type: 'array', admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } }, fields: [{ name: 'value', type: 'text' }, { name: 'title', type: 'text' }] },
    { name: 'factsRight', type: 'array', admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } }, fields: [{ name: 'value', type: 'text' }, { name: 'title', type: 'text' }] },
    {
      name: 'factsMosaic',
      type: 'group',
      admin: { description: 'Tiles next to the blue box. Bold text makes the number large (e.g. 322 in bold, then t/Jahr).' },
      fields: [
        { name: 'fm1', type: 'group', fields: [{ name: 'title', type: 'text' }, { name: 'text', type: 'richText' }] },
        { name: 'fm2', type: 'group', fields: [{ name: 'text1', type: 'text' }, { name: 'text2', type: 'text' }, { name: 'text3', type: 'text' }] },
        { name: 'fm3', type: 'group', fields: [{ name: 'text1', type: 'text' }, { name: 'text2', type: 'text' }] },
        { name: 'fm4', type: 'group', fields: [{ name: 'text1', type: 'richText' }] },
        { name: 'fm5', type: 'group', fields: [{ name: 'text1', type: 'text' }, { name: 'text2', type: 'text' }] },
        { name: 'fm6', type: 'group', fields: [{ name: 'text1', type: 'text' }, { name: 'text2', type: 'richText' }, { name: 'text3', type: 'text' }] },
        { name: 'fm7', type: 'group', fields: [{ name: 'text1', type: 'text' }, { name: 'text2', type: 'text' }, { name: 'text3', type: 'text' }] },
        { name: 'fm8', type: 'group', fields: [{ name: 'text1', type: 'text' }, { name: 'text2', type: 'text' }, { name: 'text3', type: 'text' }] },
      ],
    },
  ],
}
