import { revalidatePath } from 'next/cache'
import type { CollectionConfig, FilterOptions } from 'payload'
import { linkFields } from '../fields/linkFields'
import { categoryIcons } from '../components/admin/categoryIcons'

// Menus only offer pages of the category being edited (`id`); on a new category there are none yet
const categoryPages: FilterOptions = ({ id }) => (id ? { category: { equals: id } } : false)

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
        ...linkFields({ filterOptions: categoryPages }),
        { name: 'newTab', type: 'checkbox', label: 'Open in new tab' },
        {
          name: 'subMenus',
          type: 'array',
          label: 'Sub-items (dropdown)',
          labels: { singular: 'Sub-item', plural: 'Sub-items' },
          admin: { initCollapsed: true, components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
          fields: linkFields({ filterOptions: categoryPages }),
        },
      ],
    },
  ],
}
