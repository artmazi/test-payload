import type { Block } from 'payload'

export const HomeDataBlock: Block = {
  slug: 'homeData',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-data.webp',
  imageAltText: 'Image with text and three data cards',
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
    { name: 'title', type: 'text' },
    { name: 'img', type: 'upload', relationTo: 'media' },
    { name: 'text', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'text', type: 'textarea' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'link', type: 'text', admin: { description: 'Site path (/de/…) or full URL.' } },
      ],
    },
  ],
}
