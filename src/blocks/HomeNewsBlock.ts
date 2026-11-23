import type { Block } from 'payload'

export const HomeNewsBlock: Block = {
  slug: 'homeNews',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-news.webp',
  imageAltText: 'Grid of news cards from the inovitas feed',
  labels: {
    singular: 'News',
    plural: 'News',
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
      name: 'title',
      type: 'text',
    },
  ],
}
