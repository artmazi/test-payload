import type { Block, Field } from 'payload'
import { linkFields } from '../fields/linkFields'

// Shared by both card rows. Existing items keep their keys (title, link) and open as URL links.
const itemFields: Field[] = [
  ...linkFields({ nameField: 'title', nameLabel: 'Name', urlField: 'link' }),
  { name: 'text', type: 'text', label: 'Description' },
  {
    type: 'row',
    fields: [
      { name: 'leftText', type: 'text', label: 'Tag', admin: { description: 'e.g. Street' } },
      { name: 'rightText', type: 'text', label: 'Highlighted tag', admin: { description: 'e.g. Neu' } },
    ],
  },
  { name: 'icon', type: 'upload', relationTo: 'media' },
]

export const HomeApplicationsBlock: Block = {
  slug: 'homeApplications',
  labels: { singular: 'Applications', plural: 'Applications' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-applications.webp',
  imageAltText: 'Application cards with tags and a banner',
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
    { name: 'text', type: 'textarea', label: 'Description' },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      fields: itemFields,
    },
    {
      name: 'items2',
      type: 'array',
      label: 'Items (second row)',
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      fields: itemFields,
    },
    { name: 'contentTitle', type: 'textarea' },
    { name: 'contentText', type: 'textarea' },
    { name: 'contentBg', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'contentButton', type: 'text' },
        { name: 'contentButtonLink', type: 'text' },
        { name: 'button1Color', type: 'select', options: ['primary', 'secondary', 'orange'], defaultValue: 'primary' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'button2', type: 'text' },
        { name: 'button2Link', type: 'text' },
      ],
    },
  ],
}
