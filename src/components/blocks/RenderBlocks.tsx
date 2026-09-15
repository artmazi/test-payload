"use client";

import React from 'react';
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
import ProductTextWithMap from './ProductTextWithMap';
import ProductList from './ProductList';
import ProductBeforeAfterSlider from './ProductBeforeAfterSlider';
import ProductTextSlider from './ProductTextSlider';
import ProductIntegrationSlider from './ProductIntegrationSlider';
import ProductProductHeader from './ProductProductHeader';
import ProductTextWithPicture from './ProductTextWithPicture';


export const RenderBlocks = ({ blocks, pageId }: { blocks: any[], pageId?: string }) => {
  if (!blocks || !Array.isArray(blocks)) return null

  // Filter out any blocks that have been marked as hidden
  const visibleBlocks = blocks.filter((block) => !block.hideBlock)

  return (
    <div className="flex flex-col gap-8">
      {visibleBlocks.map((block, i) => {
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
              return <HomeSlider data={block} />
            case 'homeFacts':
              return <HomeFacts data={block} />
            case 'homeInfo':
              return <HomeInfo data={block} />
            case 'homeNews':
              return <HomeNews data={block} />
            case 'homeTitleDescriptionList':
              return <HomeTitleDescriptionList data={block} />
            case 'homeData':
              return <HomeData data={block} />
            case 'homeSoftware':
              return <HomeSoftware data={block} />
            case 'homeProductVS2':
              return <HomeProductVS2 data={block} />
            case 'homeContentVersions':
              return <HomeContentVersions data={block} />
            case 'homeApplications':
              return <HomeApplications data={block} />
            case 'homeFrame':
              return <HomeFrame data={block} />
            case 'productHero':
              return <ProductHero data={block} />
            case 'productWysiwyg':
              return <ProductWysiwyg data={block} />
            case 'productFunctions':
              return <ProductFunctions data={block} />
            case 'productInfo':
              return <ProductInfo data={block} />
            case 'productFeatures':
              return <ProductFeatures data={block} />
            case 'productTextWithMap':
              return <ProductTextWithMap data={block} />
            case 'productList':
              return <ProductList data={block} />
            case 'productBeforeAfterSlider':
              return <ProductBeforeAfterSlider data={block} />
            case 'productTextSlider':
              return <ProductTextSlider data={block} />
            case 'productIntegrationSlider':
              return <ProductIntegrationSlider data={block} />
            case 'productProductHeader':
              return <ProductProductHeader data={block} />
            case 'productTextWithPicture':
              return <ProductTextWithPicture data={block} />
            default:
              return null
          }
        }

        const BlockContent = renderBlock()
        if (!BlockContent) return null

        return (
          <div key={i} data-payload-field-path={`content.${i}`}>
            {BlockContent}
          </div>
        )
      })}
    </div>
  )
}
