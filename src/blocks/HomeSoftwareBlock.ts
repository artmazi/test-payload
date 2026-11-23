import type { Block } from 'payload'
import { buttonsField } from '../fields/buttonsField'
import { linkFields } from '../fields/linkFields'

export const HomeSoftwareBlock: Block = {
  slug: 'homeSoftware',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-software.webp',
  imageAltText: 'Gradient intro panel and software cards',
  labels: {
    singular: 'Software',
    plural: 'Software',
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
    { name: 'contentTitle', type: 'textarea' },
    { name: 'content', type: 'richText', admin: { description: 'Bold text is shown in orange.' } },
    { name: 'contentImg', type: 'upload', relationTo: 'media' },
    { ...buttonsField, label: 'Content buttons' },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      fields: [
        // Existing items keep their keys (title, link) and open as URL links
        ...linkFields({ nameField: 'title', urlField: 'link' }),
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
