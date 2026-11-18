import type { Block } from 'payload'

export const HomeSoftwareBlock: Block = {
  slug: 'homeSoftware',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-software.png',
  imageAltText: 'Gradient intro panel and software cards',
  labels: {
    singular: 'Home Software',
    plural: 'Home Software',
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
    { name: 'title', type: 'text' },
    { name: 'contentTitle', type: 'textarea' },
    { name: 'content', type: 'textarea', admin: { description: '**bold** is shown in orange; line breaks are kept.' } },
    { name: 'contentImg', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'contentButton', type: 'text' },
        { name: 'contentButtonLink', type: 'text' },
        { name: 'button1Color', type: 'select', options: ['primary', 'secondary', 'orange'], defaultValue: 'primary' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'link', type: 'text', admin: { description: 'Site path (/de/…) or full URL.' } },
      ],
    },
  ],
}
