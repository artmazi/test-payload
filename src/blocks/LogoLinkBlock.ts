import type { Block } from 'payload'

// A small linked logo or badge (e.g. "Swiss Made Software +AI"), aligned with the Document layout's text column
export const LogoLinkBlock: Block = {
  slug: 'logoLink',
  labels: { singular: 'Logo Link', plural: 'Logo Links' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/logo-link.webp',
  imageAltText: 'Placeholder logo with an optional link',
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
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        { name: 'url', type: 'text', label: 'Link', admin: { description: 'Optional. External links open in a new tab.' } },
        { name: 'maxWidth', type: 'number', label: 'Max width (px)', defaultValue: 200, min: 40, max: 600 },
      ],
    },
  ],
}
