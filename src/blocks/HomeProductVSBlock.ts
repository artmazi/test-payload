import type { Block } from 'payload'

const side = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    {
      type: 'row' as const,
      fields: [
        { name: 'label', type: 'text' as const, required: true, admin: { width: '50%' } },
        { name: 'link', type: 'text' as const, admin: { width: '50%', description: 'e.g. /de/verwaltungen/data/infra3d-generate' } },
      ],
    },
    { name: 'icon', type: 'upload' as const, relationTo: 'media' as const },
  ],
})

// "Required products" list from infra3dcom's HomePageSections/ProductVS: pairs of product links joined by "oder" / "und"
export const HomeProductVSBlock: Block = {
  slug: 'homeProductVS',
  labels: { singular: 'Product Pairs', plural: 'Product Pairs' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/product-pairs.png',
  imageAltText: 'Rows of two outlined product buttons joined by "oder" or "und"',
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
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Pair', plural: 'Pairs' },
      admin: { components: { RowLabel: '/src/components/admin/ProductPairRowLabel' } },
      fields: [
        side('left', 'Left product'),
        { name: 'vs', type: 'text', label: 'Joining word', defaultValue: 'oder', admin: { description: 'e.g. oder / und' } },
        side('right', 'Right product'),
      ],
    },
  ],
}
