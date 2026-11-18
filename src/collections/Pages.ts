import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { contentField } from '../fields/contentField'


// Drop row ids so copied blocks get fresh ones instead of sharing ids with the source
const stripIds = (value: any): any =>
  Array.isArray(value)
    ? value.map(stripIds)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).filter(([k]) => k !== 'id').map(([k, v]) => [k, stripIds(v)]))
      : value

export const Pages: CollectionConfig = {
  slug: 'pages',
  // The same slug may exist once per category
  indexes: [{ fields: ['category', 'slug'], unique: true }],
  admin: {
    useAsTitle: 'title',
    groupBy: true,
    defaultColumns: ['title', 'category', 'slug', '_status'],
    livePreview: {
      url: async ({ data, locale, payload, req }) => {
        // Same origin as the admin by default (works on localhost, Vercel previews and production); PAYLOAD_URL overrides
        const host = req.headers.get('x-forwarded-host') || req.headers.get('host')
        const proto = req.headers.get('x-forwarded-proto') || (host?.startsWith('localhost') ? 'http' : 'https')
        const baseUrl = process.env.PAYLOAD_URL || (host ? `${proto}://${host}` : 'http://localhost:3000')
        const categoryId = typeof data?.category === 'object' ? data.category?.id : data?.category
        const category = categoryId
          ? await payload.findByID({ collection: 'categories', id: categoryId, depth: 0 }).catch(() => null)
          : null
        // The site route is /[locale]/[[...slug]] with an optional category first; the home page has no slug segment
        const path = !data?.slug || data.slug === 'home' ? '' : `/${data.slug}`
        // Through /preview, which turns on Draft Mode so the static site shows drafts to the editor
        return `${baseUrl}/preview?path=${encodeURIComponent(`/${locale?.code || 'de'}${category ? `/${category.slug}` : ''}${path}`)}`
      },
    },
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
    beforeChange: [
      async ({ data, operation, req }) => {
        // Start a new page from a template, unless blocks were already provided
        if (operation === 'create' && data.template && !data.content?.length) {
          const id = typeof data.template === 'object' ? data.template.id : data.template
          const tpl = await req.payload.findByID({ collection: 'templates', id, depth: 0, locale: req.locale, req })
          data.content = stripIds(tpl.content)
        }
        // Defer saving as a template until the page itself saved successfully
        if (data.saveAsTemplate && data.templateTitle) {
          req.context.newTemplate = { title: data.templateTitle, content: stripIds(data.content ?? []) }
        }
        delete data.template
        delete data.saveAsTemplate
        delete data.templateTitle
        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        const newTemplate = req.context.newTemplate as { title: string; content: unknown } | undefined
        if (newTemplate) {
          delete req.context.newTemplate
          await req.payload.create({ collection: 'templates', data: newTemplate as any, locale: req.locale, req })
        }
        return doc
      },
      ({ doc, previousDoc, req: { payload, context } }) => {
        // Scripts run outside Next, where revalidatePath throws
        if (context.disableRevalidate) return doc
        if (doc._status === 'published' || previousDoc?._status === 'published') {
          // Paths depend on the category and locale, so invalidate the whole site
          payload.logger.info('Revalidating site cache')
          revalidatePath('/', 'layout')
        }
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { context } }) => {
        // Pages are cached statically, so a deleted page must drop out of the cache too
        if (doc._status === 'published' && !context.disableRevalidate) revalidatePath('/', 'layout')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Leave empty for global pages shared by all categories.',
      },
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      // Not stored: the beforeChange hook consumes it (a `virtual` field would be read-only in the admin)
      admin: {
        position: 'sidebar',
        description: 'Start this page from a template (only applied when creating).',
        condition: (data) => !data?.id,
      },
    },
    {
      name: 'saveAsTemplate',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'On save, store this page\'s blocks as a new template.',
      },
    },
    {
      name: 'templateTitle',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (data) => !!data?.saveAsTemplate,
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
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    contentField,
  ],
}
