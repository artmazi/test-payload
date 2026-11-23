import type { Block } from 'payload'
import { linkFields } from '../fields/linkFields'

// Full-screen entry page from infra3dcom's screens/Home: hero and a category picker (logo, login/trial live in the Header)
export const HomeLandingBlock: Block = {
  slug: 'homeLanding',
  labels: { singular: 'Landing', plural: 'Landing' },
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
      label: 'Background image',
      relationTo: 'media',
      admin: { description: 'Defaults to /home-hero.webp when empty.' },
    },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'chooseCategory', type: 'text', label: 'Category picker label' },
    {
      name: 'categories',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      // Any page, not one category's; the label keeps its `title` key so existing rows load unchanged
      fields: linkFields({ nameField: 'title' }),
    },
    {
      name: 'links',
      type: 'array',
      label: 'Footer links',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      // Same shape as categories, so existing rows (title + url) load as URL links
      fields: linkFields({ nameField: 'title' }),
    },
  ],
}
