import type { Block } from 'payload'

export const HomeApplicationsBlock: Block = {
  slug: 'homeApplications',
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
    { name: 'text', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'text', type: 'text' },
        {
          type: 'row',
          fields: [
            { name: 'leftText', type: 'text', label: 'Left tag', admin: { description: 'e.g. Street' } },
            { name: 'rightText', type: 'text', label: 'Right tag', admin: { description: 'e.g. Neu' } },
          ],
        },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'link', type: 'text', admin: { description: 'Site path (/de/…) or full URL.' } },
      ],
    },
    {
      name: 'items2',
      type: 'array',
      label: 'Items (second row)',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'text', type: 'text' },
        {
          type: 'row',
          fields: [
            { name: 'leftText', type: 'text', label: 'Left tag', admin: { description: 'e.g. Street' } },
            { name: 'rightText', type: 'text', label: 'Right tag', admin: { description: 'e.g. Neu' } },
          ],
        },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'link', type: 'text', admin: { description: 'Site path (/de/…) or full URL.' } },
      ],
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
