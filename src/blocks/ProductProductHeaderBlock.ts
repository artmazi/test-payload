import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

export const ProductProductHeaderBlock: Block = {
  // Admin name only; the slug stays so stored pages keep working
  slug: 'productProductHeader',
  labels: { singular: 'Page Navigation', plural: 'Page Navigations' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/page-menu.webp',
  imageAltText: 'Pill-style menu linking related pages',
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
      name: 'menu',
      type: 'array',
      labels: { singular: 'Menu item', plural: 'Menu items' },
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      // Existing items keep their keys (name, link) and open as URL links
      fields: linkFields({ urlField: 'link' }),
    },
  ],
}
