import type { Block } from 'payload'

// Plain text of a Lexical value: text nodes joined, one line per paragraph
const lexicalText = (node: any): string =>
  node?.type === 'text' ? node.text : (node?.children || []).map(lexicalText).join(node?.type === 'root' ? '\n' : '')

export const HomeInfoBlock: Block = {
  slug: 'homeInfo',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-info.webp',
  imageAltText: 'Dark band with a checklist of benefits',
  labels: {
    singular: 'Info',
    plural: 'Info',
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
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'title',
      type: 'text',
    },
    { name: 'oneColumn', type: 'checkbox', label: 'Product-page style (one column, narrower)', defaultValue: false },
    {
      // One chip per checklist entry: type, press Enter; drag to reorder.
      // Its own key: `items` still holds the old rows in the database, and a list of strings there would fail to save.
      name: 'checklist',
      type: 'text',
      label: 'Items',
      hasMany: true,
      hooks: {
        afterRead: [
          // Blocks saved before kept array rows ({ text }, rich text or plain) in the hidden `items` below.
          // Show them as strings; the next save stores them here and clears `items`.
          ({ value, siblingData }) =>
            value?.length
              ? value
              : (siblingData?.items || [])
                  .map((v: any) => (v?.text && typeof v.text === 'object' ? lexicalText(v.text.root) : v?.text))
                  .filter(Boolean),
        ],
      },
    },
    {
      // Legacy rows: kept in the schema so the database adapter still reads them (it drops unknown keys) and so a save in
      // another locale, which rewrites every locale, can still store them. json accepts both shapes the rows have had.
      // shortcut: delete once every Info block has been re-saved in every locale.
      name: 'items',
      type: 'array',
      admin: { hidden: true },
      fields: [{ name: 'text', type: 'json' }],
      hooks: { beforeChange: [() => []] },
    },
  ],
}
