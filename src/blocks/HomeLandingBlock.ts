import type { Block } from 'payload'

// Full-screen entry page from infra3dcom's screens/Home: hero and a category picker (logo, login/trial live in the Header)
export const HomeLandingBlock: Block = {
  slug: 'homeLanding',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-landing.webp',
  imageAltText: 'Full-screen hero with title, description and category picker',
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
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Defaults to /home-hero.webp when empty.' },
    },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'chooseCategory', type: 'text', label: 'Category picker label' },
    {
      name: 'categories',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'links',
      type: 'array',
      label: 'Bottom links',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
