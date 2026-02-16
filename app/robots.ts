import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/admin/',
          '/api/',
          '/account/',
          '/settings/',
          '/reset-password/',
          '/forgot-password/',
        ],
      },
      {
        userAgent: 'AhrefsBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        crawlDelay: 10,
      },
      {
        userAgent: 'DotBot',
        crawlDelay: 10,
      },
    ],
    sitemap: 'https://leadkingapp.com/sitemap.xml',
  };
}
