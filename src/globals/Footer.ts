import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'

// Site footer from infra3dcom's components/Footer (company block, map, legal links, socials)
export const Footer: GlobalConfig = {
  slug: 'footer',
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
    {
      type: 'row',
      fields: [
        { name: 'companyName', type: 'text', admin: { width: '50%' } },
        { name: 'copyrights', type: 'text', label: 'Copyright line', admin: { width: '50%' } },
      ],
    },
    { name: 'companyAddress', type: 'textarea', admin: { description: 'One line per address line.' } },
    {
      type: 'row',
      fields: [
        { name: 'companyPhone', type: 'text', admin: { width: '50%' } },
        { name: 'companyEmail', type: 'email', admin: { width: '50%' } },
      ],
    },
    {
      name: 'links',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'url', type: 'text', required: true, admin: { width: '50%', description: 'Site path without locale, e.g. /impressum' } },
          ],
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: ['linkedin', 'twitter', 'instagram', 'facebook', 'youtube'].map((v) => ({ label: v.charAt(0).toUpperCase() + v.slice(1), value: v })),
              admin: { width: '30%' },
            },
            { name: 'url', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
      ],
    },
  ],
}
