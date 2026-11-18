import type { Block } from 'payload'

// Title over a row of outlined tiles, from infra3dcom's HomePageSections/LinkList (tiles without a link are plain labels)
export const LinkTilesBlock: Block = {
  slug: 'linkTiles',
  labels: { singular: 'Link Tiles', plural: 'Link Tiles' },
  // Thumbnail in the admin "Add Content" drawer
  imageURL: '/blocks/link-tiles.webp',
  imageAltText: 'Centered title above a row of outlined tiles',
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
      labels: { singular: 'Tile', plural: 'Tiles' },
      admin: { components: { RowLabel: '/src/components/admin/ArrayRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'link', type: 'text', admin: { width: '50%', description: 'Optional. Without a link the tile is a plain label.' } },
          ],
        },
      ],
    },
  ],
}
