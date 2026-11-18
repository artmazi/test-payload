import type { Block } from 'payload'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-hero.webp',
  imageAltText: 'Hero with title, text, two buttons and an image',
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
      name: 'heroImg',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'button',
          type: 'text',
          label: 'Button 1 Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button 1 Link',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'button2',
          type: 'text',
          label: 'Button 2 Text',
        },
        {
          name: 'buttonLink2',
          type: 'text',
          label: 'Button 2 Link',
        },
      ],
    },
  ],
}
