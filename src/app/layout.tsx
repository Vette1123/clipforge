import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { siteConfig } from '@/config/site'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0b0b0f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'Mohamed Gado', url: 'https://mohamedgado.com' }],
  creator: 'Mohamed Gado',
  publisher: 'Mohamed Gado',
  keywords: [
    'video repurposing',
    'short-form clips',
    'content creator tools',
    'AI captions',
    'TikTok clips',
    'YouTube Shorts',
    'Instagram Reels',
    'auto thumbnails',
    siteConfig.name,
  ],
  alternates: {
    canonical: '/',
  },
  category: 'technology',
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: siteConfig.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}#org`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon`,
      sameAs: [siteConfig.social.github, `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`],
      founder: {
        '@type': 'Person',
        name: 'Mohamed Gado',
        url: 'https://mohamedgado.com',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { '@id': `${siteConfig.url}#org` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '12',
        highPrice: '349',
      },
      creator: {
        '@type': 'Person',
        name: 'Mohamed Gado',
        url: 'https://mohamedgado.com',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="grain antialiased">
        {children}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Lemon.js powers the on-page checkout overlay. */}
        <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
