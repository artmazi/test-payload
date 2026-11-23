import type { Block } from 'payload'
import { buttonsField } from '../fields/buttonsField'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  // Label only: the slug stays so saved pages keep matching this block
  labels: { singular: 'Hero', plural: 'Heroes' },
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
      label: 'Hero image',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Subtitle',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Description',
    },
    {
      ...buttonsField,
      label: 'Hero actions',
      hooks: {
        afterRead: [
          // Blocks saved before this array kept two fixed buttons (the hidden legacy fields below).
          // Show them as rows; the next save stores them here and clears the legacy fields.
          ({ value, siblingData }) => {
            if (value?.length) return value
            return [
              { title: siblingData?.button, url: siblingData?.buttonLink, style: 'primary' },
              { title: siblingData?.button2, url: siblingData?.buttonLink2, style: 'secondary' },
            ]
              .filter((b) => b.title)
              .map((b) => ({ ...b, type: 'custom' }))
          },
        ],
      },
    },
    // Legacy fixed buttons: kept in the schema only because the database adapter drops unknown keys on read,
    // which would hide them from the hook above. Cleared on save. shortcut: delete once every Home Hero has been re-saved.
    ...['button', 'buttonLink', 'button2', 'buttonLink2'].map((name) => ({
      name,
      type: 'text' as const,
      admin: { hidden: true },
      hooks: { beforeChange: [() => null] },
    })),
  ],
}
