import type { Field, FilterOptions } from 'payload'

// A link points at a page (its URL follows the page slug) or at a typed URL, on one row.
// `nameField` / `urlField` let existing arrays keep their own keys (menus: name + url, Software items: title + link).
// `optional`: the link may be left empty (e.g. a row's button); otherwise a URL link needs a URL and a name.
export const linkFields = ({
  filterOptions,
  nameField = 'name',
  nameLabel,
  urlField = 'url',
  optional = false,
}: { filterOptions?: FilterOptions; nameField?: string; nameLabel?: string; urlField?: string; optional?: boolean } = {}): Field[] => [
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
        filterOptions,
        admin: {
          width: '40%',
          condition: (_, sibling) => sibling?.type === 'page',
          // Any page can be picked, so show which category it is in (a filtered list is one category already)
          ...(!filterOptions && { components: { Field: '/src/components/admin/PagePickerField' } }),
        },
      },
      {
        name: urlField,
        type: 'text',
        required: !optional,
        admin: {
          width: '40%',
          condition: (_, sibling) => sibling?.type !== 'page',
          description: 'Site path without locale (e.g. /verwaltungen/platform) or a full URL.',
        },
      },
      {
        name: nameField,
        type: 'text',
        ...(nameLabel && { label: nameLabel }),
        admin: { width: '40%', description: 'Leave empty to use the page title.' },
        validate: (value: string | null | undefined, { siblingData }: { siblingData: any }) =>
          value || siblingData?.type === 'page' || (optional && !siblingData?.[urlField]) ? true : 'Required for URL links',
      },
    ],
  },
]
