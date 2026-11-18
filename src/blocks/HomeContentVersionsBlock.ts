import type { Block } from 'payload'

export const HomeContentVersionsBlock: Block = {
  slug: 'homeContentVersions',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-content-versions.png',
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
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'content', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'link', type: 'text', admin: { description: 'Site path (/de/…) or full URL.' } },
      ],
    },
  ],
}
