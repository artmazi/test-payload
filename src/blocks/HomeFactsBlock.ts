import type { Block, Field } from 'payload'

// Mosaic tiles used to be fixed text fields per tile; they are one rich text each now, styled by element
// (paragraph = label, Heading 1/2/3 = figure). These rebuild the old values in that shape on read.
const text = (t: string) => ({ type: 'text', text: t, format: 0, detail: 0, mode: 'normal', style: '', version: 1 })
const el = (tag: 'p' | 'h1' | 'h2' | 'h3', t?: string) =>
  t ? (tag === 'p' ? { type: 'paragraph', children: [text(t)], direction: 'ltr', format: '', indent: 0, version: 1, textFormat: 0 } : { type: 'heading', tag, children: [text(t)], direction: 'ltr', format: '', indent: 0, version: 1 }) : null
const doc = (children: any[]) => ({ root: { type: 'root', children: children.filter(Boolean), direction: 'ltr', format: '', indent: 0, version: 1 } })
const nodes = (rich: any): any[] => rich?.root?.children ?? []

const legacy: Record<string, (g: any) => any> = {
  fm1: (g) => doc([el('h2', g.title), ...nodes(g.text)]),
  fm2: (g) => doc([el('p', g.text1), el('h1', g.text2), el('p', g.text3)]),
  fm3: (g) => doc([el('h3', g.text1), el('h2', g.text2)]),
  fm4: (g) => doc(nodes(g.text1).map((n) => ({ ...n, type: 'heading', tag: 'h3' }))),
  fm5: (g) => doc([el('h3', g.text1), el('h2', g.text2)]),
  fm6: (g) => doc([el('p', g.text1), ...nodes(g.text2), el('p', g.text3)]),
  fm7: (g) => doc([el('p', g.text1), el('h1', g.text2), el('p', g.text3)]),
  fm8: (g) => doc([el('p', g.text1), el('h2', g.text2), el('p', g.text3)]),
}

// Fact cards and fact items: title and value side by side
const titleValueRow: Field[] = [
  { type: 'row', fields: [{ name: 'title', type: 'text', admin: { width: '50%' } }, { name: 'value', type: 'text', admin: { width: '50%' } }] },
]

// Admin order follows the page: the blue box, then the tiles left to right, top to bottom
const tile = (name: string, label: string): Field => ({
  name,
  type: 'richText',
  label,
  hooks: { afterRead: [({ value }) => (value && typeof value === 'object' && !value.root ? legacy[name](value) : value)] },
})

export const HomeFactsBlock: Block = {
  slug: 'homeFacts',
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/home-facts.webp',
  imageAltText: 'Key figures and a facts mosaic',
  labels: {
    singular: 'Facts',
    plural: 'Facts',
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
    { name: 'subTitle', type: 'text', label: 'Subtitle' },
    { name: 'factsLeft', type: 'array', label: 'Fact cards', labels: { singular: 'Fact card', plural: 'Fact cards' }, admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } }, fields: titleValueRow },
    { name: 'factsRight', type: 'array', label: 'Fact items', labels: { singular: 'Fact item', plural: 'Fact items' }, admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } }, fields: titleValueRow },
    {
      name: 'factsMosaic',
      type: 'group',
      fields: [
        tile('fm1', 'Blue box'),
        tile('fm2', 'Tile 1 (tall, light blue)'),
        tile('fm3', 'Tile 2 (teal)'),
        tile('fm5', 'Tile 3 (blue)'),
        tile('fm4', 'Tile 4 (blue)'),
        tile('fm6', 'Tile 5 (green)'),
        tile('fm7', 'Tile 6 (wide, teal)'),
        tile('fm8', 'Tile 7 (blue)'),
      ],
    },
  ],
}
