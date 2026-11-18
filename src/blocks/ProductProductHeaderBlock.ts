import type { Block } from 'payload'

export const ProductProductHeaderBlock: Block = {
  // Admin name only; the slug stays so stored pages keep working
  slug: 'productProductHeader',
  labels: { singular: 'Page Menu', plural: 'Page Menus' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/page-menu.png',
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
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
    {
      name: 'sections',
      type: 'text',
    },
    {
      name: 'button',
      type: 'text',
    },
  ],
}
