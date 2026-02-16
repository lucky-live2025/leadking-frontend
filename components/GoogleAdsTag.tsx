'use client';

import Script from 'next/script';

const GOOGLE_ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;

export default function GoogleAdsTag() {
  if (!GOOGLE_ADS_CONVERSION_ID) return null;

  return (
    <>
      {/* Google Ads Global Site Tag (gtag.js) */}
      <Script
        id="google-ads-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`}
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');
          `,
        }}
      />
    </>
  );
}

/**
 * Helper function to track Google Ads conversions
 */
export function trackGoogleAdsConversion(action: string, value?: number, currency?: string) {
  if (typeof window === 'undefined' || !GOOGLE_ADS_CONVERSION_ID) return;

  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_CONVERSION_ID,
      value: value,
      currency: currency || 'USD',
      event_category: 'engagement',
      event_label: action,
    });
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

