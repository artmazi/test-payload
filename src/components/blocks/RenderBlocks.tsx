"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { payloadEditable } from '@payload-inline-visual-editor/react';
import { HeadingBlock } from './HeadingBlock';
import { RichTextBlock } from './RichTextBlock';
import { ImageBlock } from './ImageBlock';
import { CallToActionBlock } from './CallToActionBlock';
import HomeUseCases from './HomeUseCases';
import HomeHero from './HomeHero';
import HomeProductVS from './HomeProductVS';
import HomeSlider from './HomeSlider';
import HomeFacts from './HomeFacts';
import HomeInfo from './HomeInfo';
import HomeNews from './HomeNews';
import HomeTitleDescriptionList from './HomeTitleDescriptionList';
import HomeData from './HomeData';
import HomeLanding from './HomeLanding';
import ContactButtons from './ContactButtons';
import LogoLink from './LogoLink';
import HomeSoftware from './HomeSoftware';
import HomeProductVS2 from './HomeProductVS2';
import HomeContentVersions from './HomeContentVersions';
import HomeApplications from './HomeApplications';
import HomeFrame from './HomeFrame';
import ProductHero from './ProductHero';
import ProductWysiwyg from './ProductWysiwyg';
import ProductFunctions from './ProductFunctions';
import ProductInfo from './ProductInfo';
import ProductFeatures from './ProductFeatures';
// The map pulls in OpenLayers + MUI; load it only on pages that actually have a map block
const ProductTextWithMap = dynamic(() => import('./ProductTextWithMap'));
import ProductList from './ProductList';
import ProductBeforeAfterSlider from './ProductBeforeAfterSlider';
import ProductTextSlider from './ProductTextSlider';
import ProductIntegrationSlider from './ProductIntegrationSlider';
import ProductProductHeader from './ProductProductHeader';
import ProductTextWithPicture from './ProductTextWithPicture';
import LinkTiles from './LinkTiles';


export const RenderBlocks = ({ blocks, pageId }: { blocks: any[], pageId?: string }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <div className="flex flex-col gap-8" {...payloadEditable.container('content')}>
      {blocks.map((block, i) => {
        // Hidden blocks are skipped but keep their index so editor paths stay correct
        if (block.hideBlock) return null
        // Inject pageId and blockIndex into block data
        const blockWithMeta = { ...block, pageId, blockIndex: i }
        const renderBlock = () => {
          switch (block.blockType) {
            case 'heading':
              return <HeadingBlock {...blockWithMeta} />
            case 'richText':
              return <RichTextBlock {...blockWithMeta} />
            case 'image':
              return <ImageBlock {...blockWithMeta} />
            case 'callToAction':
              return <CallToActionBlock {...blockWithMeta} />
            case 'homeUseCases':
              return <HomeUseCases data={blockWithMeta} />
            case 'homeHero':
              return <HomeHero data={blockWithMeta} />
            case 'homeProductVS':
              return <HomeProductVS data={blockWithMeta} />
            case 'homeSlider':
              return <HomeSlider data={blockWithMeta} />
            case 'homeFacts':
              return <HomeFacts data={blockWithMeta} />
            case 'homeInfo':
              return <HomeInfo data={blockWithMeta} />
            case 'homeNews':
              return <HomeNews data={blockWithMeta} />
            case 'homeTitleDescriptionList':
              return <HomeTitleDescriptionList data={blockWithMeta} />
            case 'logoLink':
              return <LogoLink data={blockWithMeta} />
            case 'contactButtons':
              return <ContactButtons data={blockWithMeta} />
            case 'homeLanding':
              return <HomeLanding data={blockWithMeta} />
            case 'homeData':
              return <HomeData data={blockWithMeta} />
            case 'homeSoftware':
              return <HomeSoftware data={blockWithMeta} />
            case 'homeProductVS2':
              return <HomeProductVS2 data={blockWithMeta} />
            case 'homeContentVersions':
              return <HomeContentVersions data={blockWithMeta} />
            case 'homeApplications':
              return <HomeApplications data={blockWithMeta} />
            case 'homeFrame':
              return <HomeFrame data={blockWithMeta} />
            case 'productHero':
              return <ProductHero data={blockWithMeta} />
            case 'productWysiwyg':
              return <ProductWysiwyg data={blockWithMeta} />
            case 'productFunctions':
              return <ProductFunctions data={blockWithMeta} />
            case 'productInfo':
              return <ProductInfo data={blockWithMeta} />
            case 'productFeatures':
              return <ProductFeatures data={blockWithMeta} />
            case 'productTextWithMap':
              return <ProductTextWithMap data={blockWithMeta} />
            case 'productList':
              return <ProductList data={blockWithMeta} />
            case 'productBeforeAfterSlider':
              return <ProductBeforeAfterSlider data={blockWithMeta} />
            case 'productTextSlider':
              return <ProductTextSlider data={blockWithMeta} />
            case 'productIntegrationSlider':
              return <ProductIntegrationSlider data={blockWithMeta} />
            case 'productProductHeader':
              return <ProductProductHeader data={blockWithMeta} />
            case 'productTextWithPicture':
              return <ProductTextWithPicture data={blockWithMeta} />
            case 'linkTiles':
              return <LinkTiles data={blockWithMeta} />
            default:
              return null
          }
        }

        const BlockContent = renderBlock()
        if (!BlockContent) return null

        // A hero right after the page navigation sits flush against it (cancels the gap-8)
        const prev = blocks.slice(0, i).filter((b) => !b.hideBlock).at(-1)
        const flush = prev?.blockType === 'productProductHeader' && ['productHero', 'homeHero'].includes(block.blockType)

        return (
          <div
            key={block.id ?? i}
            className={flush ? '-mt-8' : undefined}
            {...payloadEditable(`content.${i}`, { row: { id: block.id, blockType: block.blockType } })}>
            {BlockContent}
          </div>
        )
      })}
    </div>
  )
}
