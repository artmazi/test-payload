import type { ArrayField } from 'payload'
import { linkFields } from './linkFields'

// A list of link buttons (page or URL) with a primary / secondary style; rendered by components/LinkButtons
export const buttonsField: ArrayField = {
  name: 'buttons',
  type: 'array',
  labels: { singular: 'Button', plural: 'Buttons' },
  admin: { components: { RowLabel: '/src/components/admin/MenuRowLabel' } },
  fields: [
    ...linkFields({ nameField: 'title' }),
    {
      name: 'style',
      type: 'select',
      defaultValue: 'primary',
      required: true, // no empty choice in the select; every button has a style
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      admin: { width: '20%' },
    },
  ],
}
