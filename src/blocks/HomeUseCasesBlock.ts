import type { Block } from 'payload'

export const HomeUseCasesBlock: Block = {
  slug: 'homeUseCases',
  labels: { singular: 'Use Cases', plural: 'Use Cases' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-use-cases.webp',
  imageAltText: 'Carousel of linked use-case cards',
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
        { name: 'text', type: 'text' },
        { name: 'background', type: 'upload', relationTo: 'media', admin: { description: 'Shown on hover.' } },
        { name: 'link', type: 'text', admin: { description: 'Site path (/de/…) or full URL.' } },
      ],
    },
    { name: 'slidesPerView', type: 'number', label: 'Cards per view (desktop)', defaultValue: 3, min: 1, max: 4 },
  ],
}
