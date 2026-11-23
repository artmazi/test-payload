import type { Block } from 'payload'

export const HomeFrameBlock: Block = {
  slug: 'homeFrame',
  labels: { singular: 'Video', plural: 'Videos' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/video-frame.webp',
  imageAltText: 'Embedded video player with optional title',
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
    {
      name: 'iframe',
      type: 'text',
    },
  ],
}
