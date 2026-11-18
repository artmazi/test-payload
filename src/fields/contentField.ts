import type { Field } from 'payload'

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
import { HomeLandingBlock } from '../blocks/HomeLandingBlock'
import { ContactButtonsBlock } from '../blocks/ContactButtonsBlock'
import { LogoLinkBlock } from '../blocks/LogoLinkBlock'
import { LinkTilesBlock } from '../blocks/LinkTilesBlock'

// Shared by pages and templates so a template's blocks always fit a page
export const contentField: Field = {
  name: 'content',
  type: 'blocks',
  localized: true,
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
    HomeLandingBlock,
    ContactButtonsBlock,
    LogoLinkBlock,
    LinkTilesBlock,
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
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Document (title, sections, table of contents)', value: 'document' },
          ],
          admin: {
            description: 'Document: Heading 1 is the page title, Heading 2 starts a section (numbered if it starts with "1."), Heading 3 is a sub-heading.',
          },
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
