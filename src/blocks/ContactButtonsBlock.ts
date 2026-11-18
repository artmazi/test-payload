import type { Block } from 'payload'

// Call-to-action buttons (phone / email / link), as at the end of infra3dcom's integration-slider sections
export const ContactButtonsBlock: Block = {
  slug: 'contactButtons',
  labels: { singular: 'Contact Buttons', plural: 'Contact Buttons' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/contact-buttons.webp',
  imageAltText: 'Card with phone and email buttons',
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
      name: 'centered',
      type: 'checkbox',
      label: 'Center on page',
      defaultValue: false,
      admin: { description: 'Leave off on legal pages, where the card lines up with the text next to the table of contents.' },
    },
    { name: 'text', type: 'textarea', admin: { description: 'Optional line above the buttons.' } },
    {
      name: 'buttons',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Button', plural: 'Buttons' },
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'phone',
              options: [
                { label: 'Phone', value: 'phone' },
                { label: 'Email', value: 'email' },
                { label: 'Link', value: 'link' },
              ],
              admin: { width: '20%' },
            },
            { name: 'label', type: 'text', required: true, admin: { width: '40%', description: 'Text on the button.' } },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { width: '40%', description: 'Phone number, email address, or URL / site path (e.g. /de/impressum).' },
              validate: (value: string | null | undefined, { siblingData }: { siblingData: any }) => {
                const v = (value || '').trim()
                if (!v) return 'Required'
                if (siblingData?.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address'
                if (siblingData?.type === 'phone' && !/^\+?[\d\s()/.-]{6,}$/.test(v)) return 'Enter a phone number (digits, spaces, +)'
                if (siblingData?.type === 'link' && !/^(https?:\/\/|\/)/.test(v)) return 'Use a full URL (https://…) or a site path starting with /'
                return true
              },
            },
          ],
        },
      ],
    },
  ],
}
