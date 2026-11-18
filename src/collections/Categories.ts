import { revalidatePath } from 'next/cache'
import type { CollectionConfig, Field } from 'payload'
import { categoryIcons } from '../components/admin/categoryIcons'

// A menu link points at a page of this category (its URL follows the page slug) or at a typed URL
const linkFields = (nameWidth: string): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'type',
        type: 'radio',
        defaultValue: 'custom', // items saved before page links existed are plain URLs
        options: [
          { label: 'Page', value: 'page' },
          { label: 'URL', value: 'custom' },
        ],
        admin: { width: '20%', layout: 'horizontal' },
      },
      {
        name: 'page',
        type: 'relationship',
        relationTo: 'pages',
        required: true,
        // Only pages of the category being edited (`id`); on a new category there are none yet
        filterOptions: ({ id }) => (id ? { category: { equals: id } } : false),
        admin: { width: '40%', condition: (_, sibling) => sibling?.type === 'page' },
      },
      {
        name: 'url',
        type: 'text',
        required: true,
        admin: {
          width: '40%',
          condition: (_, sibling) => sibling?.type !== 'page',
          description: 'Site path without locale (e.g. /verwaltungen/platform) or a full URL.',
        },
      },
      {
        name: 'name',
        type: 'text',
        admin: { width: nameWidth, description: 'Leave empty to use the page title.' },
        validate: (value: string | null | undefined, { siblingData }: { siblingData: any }) =>
          value || siblingData?.type === 'page' ? true : 'Required for URL links',
      },
    ],
  },
]

// One category per site variant; pages belong to exactly one and live under /<locale>/<category>/...
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'title', components: { views: { list: { Component: '/src/components/admin/CategoryCards' } } } },
  access: { read: () => true },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        // Scripts run outside Next, where revalidatePath throws
        if (!context.disableRevalidate) revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'layers',
      options: Object.entries(categoryIcons).map(([value, { label }]) => ({ label, value })),
      admin: { description: 'Shown on the category card in the admin.', components: { Field: '/src/components/admin/IconPickerField' } },
    },
    {
      // The header shows the menu of the category in the current URL
      name: 'menu',
      type: 'array',
      label: 'Header menu',
      localized: true,
      labels: { singular: 'Menu item', plural: 'Menu items' },
      admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
      fields: [
        ...linkFields('40%'),
        { name: 'newTab', type: 'checkbox', label: 'Open in new tab' },
        {
          name: 'subMenus',
          type: 'array',
          label: 'Sub-items (dropdown)',
          labels: { singular: 'Sub-item', plural: 'Sub-items' },
          admin: { initCollapsed: true, components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
          fields: linkFields('40%'),
        },
      ],
    },
  ],
}
