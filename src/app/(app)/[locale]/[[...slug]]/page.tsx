import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { LivePreviewWrapper } from '@/components/LivePreviewWrapper'
import AdminBar from '@/components/AdminBar'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const pages = await payload.find({ collection: 'pages', limit: 1000, depth: 1 })

    const locales = ['en', 'de', 'fr', 'it']
    const params: any[] = []

    pages.docs.forEach((page) => {
      const category = typeof page.category === 'object' ? page.category?.slug : undefined
      // URL: /<locale>[/<category>][/<slug>] - the home page has no slug segment
      const segments = [...(category ? [category] : []), ...(page.slug === 'home' ? [] : [page.slug])]
      locales.forEach((locale) => params.push({ locale, slug: segments }))
    })

    return params
  } catch (error) {
    // If database connection fails during build time (e.g. on CI), return empty array
    // Pages will still be generated on-demand if dynamicParams = true (default)
    return []
  }
}

export default async function Page({ params }: { params: Promise<{ slug?: string[], locale: string }> }) {
  const { slug = [], locale } = await params
  const payload = await getPayload({ config })

  // A first segment matching a category slug selects that category; otherwise it's a global page
  const categories = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug[0] ?? '' } },
    limit: 1,
    depth: 0,
  })
  const category = categories.docs[0]
  const pageSlug = (category ? slug.slice(1) : slug).join('/') || 'home'

  // Logged-in admins (live preview) may see draft pages; the public only sees published ones
  const { user } = await payload.auth({ headers: await headers() })

  const pages = await payload.find({
    collection: 'pages',
    depth: 2,
    locale: locale as any,
    where: {
      slug: { equals: pageSlug },
      category: category ? { equals: category.id } : { exists: false },
      ...(user ? {} : { _status: { equals: 'published' } }),
    },
  })

  const page = pages.docs[0]
  if (!page) return notFound()

  // A fragment keeps the bar a direct child of <body>, so its order-first lifts it above the Header
  return (
    <>
      {user ? <AdminBar pageId={String(page.id)} email={user.email} /> : null}
      <main>
        <LivePreviewWrapper initialPage={page} />
      </main>
    </>
  )
}
