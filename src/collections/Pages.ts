import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

import { HomeHeroBlock } from '../blocks/HomeHeroBlock'
import { HomeContentVersionsBlock } from '../blocks/HomeContentVersionsBlock'
import { HomeApplicationsBlock } from '../blocks/HomeApplicationsBlock'
import { HomeNewsBlock } from '../blocks/HomeNewsBlock'
import { ProductTextWithPictureBlock } from '../blocks/ProductTextWithPictureBlock'
import { HomeFrameBlock } from '../blocks/HomeFrameBlock'
import { HomeSliderBlock } from '../blocks/HomeSliderBlock'
import { ProductWysiwygBlock } from '../blocks/ProductWysiwygBlock'
import { ProductFunctionsBlock } from '../blocks/ProductFunctionsBlock'
import { ProductTextSliderBlock } from '../blocks/ProductTextSliderBlock'
import { HomeSoftwareBlock } from '../blocks/HomeSoftwareBlock'
import { HomeProductVSBlock } from '../blocks/HomeProductVSBlock'
import { ProductInfoBlock } from '../blocks/ProductInfoBlock'
import { ProductFeaturesBlock } from '../blocks/ProductFeaturesBlock'
import { ProductBeforeAfterSliderBlock } from '../blocks/ProductBeforeAfterSliderBlock'
import { ProductListBlock } from '../blocks/ProductListBlock'
import { HomeTitleDescriptionListBlock } from '../blocks/HomeTitleDescriptionListBlock'
import { HomeInfoBlock } from '../blocks/HomeInfoBlock'
import { HomeFactsBlock } from '../blocks/HomeFactsBlock'
import { HomeUseCasesBlock } from '../blocks/HomeUseCasesBlock'
import { ProductHeroBlock } from '../blocks/ProductHeroBlock'
import { ProductProductHeaderBlock } from '../blocks/ProductProductHeaderBlock'
import { ProductTextWithMapBlock } from '../blocks/ProductTextWithMapBlock'
import { ProductIntegrationSliderBlock } from '../blocks/ProductIntegrationSliderBlock'
import { HomeProductVS2Block } from '../blocks/HomeProductVS2Block'
import { HomeDataBlock } from '../blocks/HomeDataBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.PAYLOAD_URL || 'http://localhost:3000'
        const path = data?.slug === 'home' ? '/' : `/${data?.slug || ''}`
        return `${baseUrl}${path}`
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
          console.log("revalidate skipped")
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
        HomeHeroBlock,
        HomeContentVersionsBlock,
        HomeApplicationsBlock,
        HomeNewsBlock,
        ProductTextWithPictureBlock,
        HomeFrameBlock,
        HomeSliderBlock,
        ProductWysiwygBlock,
        ProductFunctionsBlock,
        ProductTextSliderBlock,
        HomeSoftwareBlock,
        HomeProductVSBlock,
        ProductInfoBlock,
        ProductFeaturesBlock,
        ProductBeforeAfterSliderBlock,
        ProductListBlock,
        HomeTitleDescriptionListBlock,
        HomeInfoBlock,
        HomeFactsBlock,
        HomeUseCasesBlock,
        ProductHeroBlock,
        ProductProductHeaderBlock,
        ProductTextWithMapBlock,
        ProductIntegrationSliderBlock,
        HomeProductVS2Block,
        HomeDataBlock,
        {
          slug: 'heading',
          fields: [
            {
              name: 'hideBlock',
              type: 'checkbox',
              label: 'Hide this block on the website',
              defaultValue: false,
              admin: { description: 'If checked, this block will not be rendered on the frontend.' }
            },
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
            {
              name: 'hideBlock',
              type: 'checkbox',
              label: 'Hide this block on the website',
              defaultValue: false,
              admin: { description: 'If checked, this block will not be rendered on the frontend.' }
            },
            { name: 'content', type: 'richText', required: true }
          ]
        },
        {
          slug: 'image',
          fields: [
            {
              name: 'hideBlock',
              type: 'checkbox',
              label: 'Hide this block on the website',
              defaultValue: false,
              admin: { description: 'If checked, this block will not be rendered on the frontend.' }
            },
            { name: 'image', type: 'upload', relationTo: 'media', required: true }
          ]
        },
        {
          slug: 'callToAction',
          fields: [
            {
              name: 'hideBlock',
              type: 'checkbox',
              label: 'Hide this block on the website',
              defaultValue: false,
              admin: { description: 'If checked, this block will not be rendered on the frontend.' }
            },
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true }
          ]
        }
      ]
    }
  ],
}
