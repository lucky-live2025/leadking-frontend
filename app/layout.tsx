import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper';

export const metadata: Metadata = {
  title: 'LeadKing — AI Lead Generation Platform',
  description: 'AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads across Meta, Google, TikTok, LinkedIn, and Yandex.',
  openGraph: {
    title: 'LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads.',
    type: 'website',
    url: 'https://leadkingapp.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadKing — AI Lead Generation Platform',
    description: 'AI-powered lead generation platform that automatically creates, launches, and optimizes advertising campaigns to generate qualified leads.',
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
    "logo": "https://leadkingapp.com/favicon.ico",
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
        <ErrorBoundaryWrapper>
          {children}
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
