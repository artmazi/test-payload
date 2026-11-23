import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const HomeDataBlock: Block = {
  slug: 'homeData',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-data.webp',
  imageAltText: 'Image with text and three data cards',
  labels: {
    singular: 'Data',
    plural: 'Data',
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
    { name: 'img', type: 'upload', relationTo: 'media', label: 'Image' },
    { name: 'text', type: 'textarea', label: 'Content' },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      fields: [
        // Existing items keep their keys (title, link) and open as URL links
        ...linkFields({ nameField: 'title', urlField: 'link' }),
        { name: 'text', type: 'textarea', label: 'Description' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
