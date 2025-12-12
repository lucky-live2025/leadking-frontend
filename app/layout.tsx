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
  return (
    <html lang="en">
      <body>
        <ErrorBoundaryWrapper>
          {children}
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
