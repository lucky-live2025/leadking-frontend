import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper';
import MetaPixel from '@/components/MetaPixel';
import GoogleAdsTag from '@/components/GoogleAdsTag';

export const metadata: Metadata = {
  title: 'LeadKingApp — AI-Powered Lead Generation and Multi-Channel Advertising Automation Platform',
  description: 'LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across Meta, TikTok, Google, YouTube, LinkedIn, and Email from one unified system. Replace media buyers, copywriters, designers, and landing page builders with AI automation.',
  keywords: [
    'AI lead generation',
    'automated advertising',
    'multi-platform ads',
    'Meta ads automation',
    'Google Ads automation',
    'TikTok ads',
    'LinkedIn ads',
    'AI ad creative',
    'landing page builder',
    'lead capture automation',
    'marketing automation',
    'programmatic advertising',
    'AI marketing platform',
    'Facebook ads automation',
    'Instagram ads automation',
    'YouTube ads automation',
    'email marketing automation',
    'AI campaign generator',
    'lead generation software',
    'advertising automation platform'
  ],
  authors: [{ name: 'LeadKingApp' }],
  creator: 'LeadKingApp',
  publisher: 'LeadKingApp',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'LeadKingApp — AI-Powered Lead Generation and Multi-Channel Advertising Automation Platform',
    description: 'LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across Meta, TikTok, Google, YouTube, LinkedIn, and Email from one unified system.',
    type: 'website',
    url: 'https://leadkingapp.com',
    siteName: 'LeadKingApp',
    locale: 'en_US',
    images: [
      {
        url: 'https://leadkingapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LeadKingApp - AI-Powered Lead Generation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadKingApp — AI-Powered Lead Generation and Multi-Channel Advertising Automation Platform',
    description: 'LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across multiple platforms from one unified system.',
    images: ['https://leadkingapp.com/og-image.png'],
    creator: '@leadkingapp',
  },
  alternates: {
    canonical: 'https://leadkingapp.com',
  },
  metadataBase: new URL('https://leadkingapp.com'),
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SoftwareApplication Schema
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LeadKingApp",
    "applicationCategory": "MarketingAutomation",
    "description": "LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across multiple platforms from one unified system.",
    "operatingSystem": "Web",
    "url": "https://leadkingapp.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "99",
      "highPrice": "4999",
      "offerCount": "4",
      "availability": "https://schema.org/InStock",
      "url": "https://leadkingapp.com/pricing"
    },
    "keywords": "AI lead generation, automated advertising, multi-platform ads, Meta ads automation, Google Ads automation, TikTok ads, LinkedIn ads, AI ad creative, landing page builder, lead capture automation, marketing automation, programmatic advertising, AI marketing platform",
    "featureList": [
      "AI Ad Creative Generation",
      "Multi-Platform Campaign Automation",
      "AI Landing Page Builder",
      "Real-Time Lead Capture",
      "Automated Budget Optimization",
      "Predictive Analytics",
      "Global Targeting",
      "CRM Integration"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LeadKingApp",
    "legalName": "LeadKingapp OÜ",
    "url": "https://leadkingapp.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://leadkingapp.com/logo.svg",
      "width": 200,
      "height": 60
    },
    "image": "https://leadkingapp.com/logo.svg",
    "description": "LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across multiple platforms from one unified system.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EE"
    },
    "sameAs": [
      "https://leadkingapp.com"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "url": "https://leadkingapp.com/support",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "url": "https://leadkingapp.com/contact",
        "availableLanguage": ["English"]
      }
    ]
  };

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LeadKingApp",
    "description": "LeadKingApp is an AI-powered lead generation and multi-channel advertising automation platform that creates, launches, optimizes, and converts ads into qualified leads across multiple platforms from one unified system.",
    "category": "Marketing Software",
    "brand": {
      "@type": "Brand",
      "name": "LeadKing"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "99",
      "highPrice": "4999",
      "offerCount": "4",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="facebook-domain-verification" content="pgkm911qg4ki058zn1c6h8rme4j3ni" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <link rel="canonical" href="https://leadkingapp.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://leadkingapp.com"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <MetaPixel />
        <GoogleAdsTag />
        <ErrorBoundaryWrapper>
          {children}
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
