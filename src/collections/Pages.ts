import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req: { user } }) => {
      // Allow public access to published pages
      if (!user) {
        return { _status: { equals: 'published' } }
      }
      return true
    },
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req: { payload } }) => {
        if (doc._status === 'published' || previousDoc?._status === 'published') {
          const newPath = doc.slug === 'home' ? '/' : `/${doc.slug}`
          payload.logger.info(`Revalidating cache for path: ${newPath}`)
          revalidatePath(newPath)

          // If the slug changed, revalidate the old path too
          if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
            const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`
            payload.logger.info(`Revalidating cache for old path: ${oldPath}`)
            revalidatePath(oldPath)
          }
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { payload } }) => {
        if (doc._status === 'published') {
          const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
          payload.logger.info(`Revalidating cache for deleted path: ${path}`)
          revalidatePath(path)
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: '_status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'heading',
          fields: [
            { name: 'headingText', type: 'text', required: true },
            { 
              name: 'level', 
              type: 'select', 
              options: [
                { label: 'H1', value: 'h1' },
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
              ], 
              defaultValue: 'h2' 
            }
          ]
        },
        {
          slug: 'richText',
          fields: [
            { name: 'content', type: 'richText', required: true }
          ]
        },
        {
          slug: 'image',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true }
          ]
        },
        {
          slug: 'callToAction',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true }
          ]
        }
      ]
    }
  ],
}
