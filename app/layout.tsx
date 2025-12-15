import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper';
import MetaPixel from '@/components/MetaPixel';

export const metadata: Metadata = {
  title: 'LeadKing — AI Lead Generation Platform',
  description: 'AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads across Meta, Google, TikTok, LinkedIn, and Yandex.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads.',
    type: 'website',
    url: 'https://leadkingapp.com',
    images: [
      {
        url: 'https://leadkingapp.com/logo.svg',
        width: 200,
        height: 60,
        alt: 'LeadKing Logo',
      },
    ],
    siteName: 'LeadKing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads.',
    images: ['https://leadkingapp.com/logo.svg'],
  },
  metadataBase: new URL('https://leadkingapp.com'),
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
    "name": "LeadKing",
    "applicationCategory": "MarketingAutomation",
    "description": "AI-powered lead generation platform that creates and optimizes ad campaigns to generate qualified leads.",
    "operatingSystem": "Web",
    "url": "https://leadkingapp.com",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "250",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://leadkingapp.com/pricing"
    }
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LeadKing",
    "url": "https://leadkingapp.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://leadkingapp.com/logo.svg",
      "width": 200,
      "height": 60
    },
    "image": "https://leadkingapp.com/logo.svg",
    "description": "AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads.",
    "sameAs": [
      "https://leadkingapp.com"
    ],
    "social": {
      "@type": "Organization",
      "url": "https://leadkingapp.com"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://leadkingapp.com/support"
    }
  };

  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LeadKing",
    "description": "AI-powered lead generation platform that creates and optimizes ad campaigns to generate qualified leads across Meta, Google, TikTok, LinkedIn, and Yandex.",
    "category": "Software",
    "brand": {
      "@type": "Brand",
      "name": "LeadKing"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "250",
      "highPrice": "15000",
      "offerCount": "4",
      "availability": "https://schema.org/InStock"
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
        <meta name="theme-color" content="#2563eb" />
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
      </head>
      <body>
        <MetaPixel />
        <ErrorBoundaryWrapper>
          {children}
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
