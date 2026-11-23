import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { visualEditor } from 'payload-inline-visual-editor'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Categories } from './collections/Categories'
import { Templates } from './collections/Templates'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: ['en', 'de', 'fr', 'it'],
    defaultLocale: 'de',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    components: {
      // Top-bar link to the public site; the admin otherwise only offers preview / edit views
      actions: ['/src/components/admin/ViewSiteLink'],
      // Branded welcome strip with live counts; collection icons live in custom.scss
      beforeDashboard: ['/src/components/admin/DashboardBanner'],
    },
    livePreview: {
      // Closed until an editor opens it; Payload then remembers each user's last toggle per collection
      openByDefault: false,
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Categories, Templates, Pages],
  globals: [Footer],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  // Needed for upload formatOptions (PNG/JPG -> WebP) and image dimensions
  sharp,
  plugins: [
    visualEditor(),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              // Files load straight from the Blob CDN instead of being streamed through a Payload function (media is public anyway)
              [Media.slug]: { disablePayloadAccessControl: true },
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
