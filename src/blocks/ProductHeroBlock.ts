import type { Block } from 'payload'

// Full-width banner from infra3dcom's ProductPageSections/Hero: background image (or looping video) with a darkened title overlay
export const ProductHeroBlock: Block = {
  slug: 'productHero',
  labels: { singular: 'Page Hero', plural: 'Page Heroes' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/page-hero.webp',
  imageAltText: 'Wide photo banner with a centered white title',
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
    { name: 'subTitle', type: 'textarea', label: 'Description' },
    {
      name: 'background',
      type: 'radio',
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: { layout: 'horizontal' },
      // Heroes saved before this toggle: a video URL meant the video was shown
      hooks: { afterRead: [({ value, siblingData }) => value ?? (siblingData?.video ? 'video' : 'image')] },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      admin: { condition: (_, sibling) => sibling?.background !== 'video' },
    },
    {
      name: 'video',
      type: 'text',
      label: 'Background video URL',
      admin: { condition: (_, sibling) => sibling?.background === 'video', description: 'Plays muted on a loop.' },
    },
  ],
}
