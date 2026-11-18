import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { getPayload } from 'payload'
import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import I18nProvider from '@/components/I18nProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infra3D",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  let footerData = { links: [], socials: [], companyName: '', companyAddress: '', companyPhone: '' };
  let categoryMenus: Record<string, any[]> = {};
  
  try {
    const payload = await getPayload({ config })
    footerData = await payload.findGlobal({ slug: 'footer', locale: locale as any }) as any || footerData
    const categories = await payload.find({
      collection: 'categories',
      depth: 1,
      limit: 100,
      locale: locale as any,
      select: { slug: true, menu: true },
      // Page links only need the slug and title, not the whole page
      populate: { pages: { slug: true, title: true } },
    })
    // Resolve page links to locale-less URLs (/<category>/<slug>; the home slug is the category root) and fill missing names
    const resolve = (cat: string) => (item: any) => {
      const page = item.type === 'page' && typeof item.page === 'object' ? item.page : null
      const url = page ? `/${cat}${page.slug === 'home' ? '' : `/${page.slug}`}` : item.url
      return { ...item, url, name: item.name || page?.title || '' }
    }
    categoryMenus = Object.fromEntries(
      categories.docs.map((c: any) => [c.slug, (c.menu || []).map((i: any) => ({ ...resolve(c.slug)(i), subMenus: (i.subMenus || []).map(resolve(c.slug)) }))]),
    )
  } catch(e) {
  }

  return (
    <html
      lang={locale}
      // Lets Next.js turn smooth scrolling off during route changes so page navigation stays instant
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider locale={locale}>
          <Header categoryMenus={categoryMenus} />
          {children}
          <Footer data={footerData} />
        </I18nProvider>
      </body>
    </html>
  );
}
