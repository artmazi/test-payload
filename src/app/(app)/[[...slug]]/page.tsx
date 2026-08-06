import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const pages = await payload.find({
      collection: 'pages',
      limit: 100,
    })

    return pages.docs.map((page) => ({
      slug: page.slug === 'home' ? [] : [page.slug],
    }))
  } catch (error) {
    // If database connection fails during build time (e.g. on CI), return empty array
    // Pages will still be generated on-demand if dynamicParams = true (default)
    return []
  }
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const parsedSlug = slug ? slug.join('/') : 'home'
  const payload = await getPayload({ config })
  
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: parsedSlug,
      },
      _status: {
        equals: 'published',
      }
    },
  })

  const page = pages.docs[0]

  if (!page) {
    return notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <RenderBlocks blocks={page.content} />
    </main>
  )
}
