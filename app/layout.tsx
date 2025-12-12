import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper';

export const metadata: Metadata = {
  title: 'Lead King',
  description: 'AI-powered marketing automation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LeadKing",
    "applicationCategory": "MarketingAutomation",
    "description": "AI-powered lead generation platform that creates and optimizes ad campaigns to generate qualified leads.",
    "operatingSystem": "Web",
    "url": "https://leadkingapp.com"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
