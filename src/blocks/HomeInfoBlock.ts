import type { Block } from 'payload'

export const HomeInfoBlock: Block = {
  slug: 'homeInfo',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-info.png',
  imageAltText: 'Dark band with a checklist of benefits',
  labels: {
    singular: 'Home Info',
    plural: 'Home Info',
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
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'title',
      type: 'text',
    },
    { name: 'oneColumn', type: 'checkbox', label: 'Product-page style (one column, narrower)', defaultValue: false },
    {
      name: 'items',
      type: 'array',
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      fields: [
        { name: 'text', type: 'text' }
      ]
    },
  ],
}
