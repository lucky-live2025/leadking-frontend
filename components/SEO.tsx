import type { Metadata } from "next";

export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
}: {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}): Metadata {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Lead King";
  const fullTitle = title ? `${title} | ${appName}` : appName;
  const defaultDescription = `AI-powered marketing campaign generator for Meta, TikTok, Google, YouTube, LinkedIn, Yandex, and Email Ads.`;
  const finalDescription = description || defaultDescription;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://leadking.ai";
  const finalCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const finalOgImage = ogImage || `${siteUrl}/og-image.png`;

  return {
    title: fullTitle,
    description: finalDescription,
    robots: noindex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: finalCanonical,
    },
    openGraph: {
      title: fullTitle,
      description: finalDescription,
      type: ogType as any,
      url: finalCanonical,
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: appName,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: finalDescription,
      images: [finalOgImage],
    },
  };
}

