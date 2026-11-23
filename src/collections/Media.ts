import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'size', 'updatedAt'],
    // Grid view with a grid / list toggle above the table
    components: { beforeListTable: ['/src/components/admin/MediaGallery'] },
  },
  upload: {
    // PNG / JPG uploads are stored as WebP (SVG, video and PDF are left as they are).
    // Near-lossless: this is the master the Next optimizer re-encodes for delivery, so losses here would compound.
    formatOptions: { format: 'webp', options: { quality: 95 } },
  },
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        // Static pages embed media URLs; a replaced file gets a new URL
        if (!context.disableRevalidate) revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      // List column only: file size and dimensions
      name: 'size',
      type: 'ui',
      label: 'Size',
      admin: { components: { Cell: '/src/components/admin/MediaSizeCell', Field: false } },
    },
  ],
}
