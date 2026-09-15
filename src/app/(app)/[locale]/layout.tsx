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
  
  let headerData = { mobileMenuItems: [], menuItems: [] };
  let footerData = { links: [], socialLinks: [], companyName: '', companyAddress: '', companyPhone: '' };
  
  try {
    const payload = await getPayload({ config })
    headerData = await payload.findGlobal({ slug: 'header', locale: locale as any }) as any || headerData
    footerData = await payload.findGlobal({ slug: 'footer', locale: locale as any }) as any || footerData
  } catch(e) {
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider locale={locale}>
          <Header data={headerData} />
          {children}
          <Footer data={footerData} />
        </I18nProvider>
      </body>
    </html>
  );
}
