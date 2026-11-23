import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const HomeContentVersionsBlock: Block = {
  slug: 'homeContentVersions',
  labels: { singular: 'Content Versions', plural: 'Content Versions' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-content-versions.webp',
  imageAltText: 'Three dark content-version cards',
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
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      fields: [
        // Existing items keep their keys (title, link) and open as URL links
        ...linkFields({ nameField: 'title', urlField: 'link' }),
        { name: 'content', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
