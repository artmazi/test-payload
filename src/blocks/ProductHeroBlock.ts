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
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Background image' },
    { name: 'video', type: 'text', label: 'Background video URL', admin: { description: 'Optional. Plays muted on a loop over the image.' } },
    { name: 'title', type: 'text' },
    { name: 'subTitle', type: 'textarea' },
  ],
}
