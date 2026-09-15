import type { Block } from 'payload'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
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
      name: 'button2',
      type: 'text',
    },
    {
      name: 'button',
      type: 'text',
    },
    {
      name: 'buttonLink2',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'buttonLink',
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
  ],
}
