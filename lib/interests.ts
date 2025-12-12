// Interest categories for different platforms
export interface Interest {
  id: string;
  name: string;
  category: string;
  platform: 'meta' | 'tiktok' | 'google' | 'yandex' | 'all';
}

// Meta (Facebook/Instagram) Interests (sample - full list has 400+)
export const metaInterests: Interest[] = [
  // Business & Industry
  { id: 'business', name: 'Business', category: 'Business & Industry', platform: 'meta' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', category: 'Business & Industry', platform: 'meta' },
  { id: 'marketing', name: 'Marketing', category: 'Business & Industry', platform: 'meta' },
  { id: 'advertising', name: 'Advertising', category: 'Business & Industry', platform: 'meta' },
  { id: 'e-commerce', name: 'E-commerce', category: 'Business & Industry', platform: 'meta' },
  
  // Technology
  { id: 'technology', name: 'Technology', category: 'Technology', platform: 'meta' },
  { id: 'software', name: 'Software', category: 'Technology', platform: 'meta' },
  { id: 'mobile-apps', name: 'Mobile Apps', category: 'Technology', platform: 'meta' },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence', category: 'Technology', platform: 'meta' },
  { id: 'web-development', name: 'Web Development', category: 'Technology', platform: 'meta' },
  
  // Lifestyle
  { id: 'fitness', name: 'Fitness', category: 'Lifestyle', platform: 'meta' },
  { id: 'health', name: 'Health', category: 'Lifestyle', platform: 'meta' },
  { id: 'travel', name: 'Travel', category: 'Lifestyle', platform: 'meta' },
  { id: 'food', name: 'Food', category: 'Lifestyle', platform: 'meta' },
  { id: 'fashion', name: 'Fashion', category: 'Lifestyle', platform: 'meta' },
  { id: 'beauty', name: 'Beauty', category: 'Lifestyle', platform: 'meta' },
  
  // Entertainment
  { id: 'music', name: 'Music', category: 'Entertainment', platform: 'meta' },
  { id: 'movies', name: 'Movies', category: 'Entertainment', platform: 'meta' },
  { id: 'gaming', name: 'Gaming', category: 'Entertainment', platform: 'meta' },
  { id: 'sports', name: 'Sports', category: 'Entertainment', platform: 'meta' },
  
  // Education
  { id: 'education', name: 'Education', category: 'Education', platform: 'meta' },
  { id: 'online-learning', name: 'Online Learning', category: 'Education', platform: 'meta' },
  { id: 'courses', name: 'Courses', category: 'Education', platform: 'meta' },
];

// TikTok Interests
export const tiktokInterests: Interest[] = [
  { id: 'comedy', name: 'Comedy', category: 'Entertainment', platform: 'tiktok' },
  { id: 'dance', name: 'Dance', category: 'Entertainment', platform: 'tiktok' },
  { id: 'music', name: 'Music', category: 'Entertainment', platform: 'tiktok' },
  { id: 'fashion', name: 'Fashion', category: 'Lifestyle', platform: 'tiktok' },
  { id: 'beauty', name: 'Beauty', category: 'Lifestyle', platform: 'tiktok' },
  { id: 'fitness', name: 'Fitness', category: 'Lifestyle', platform: 'tiktok' },
  { id: 'food', name: 'Food', category: 'Lifestyle', platform: 'tiktok' },
  { id: 'travel', name: 'Travel', category: 'Lifestyle', platform: 'tiktok' },
  { id: 'gaming', name: 'Gaming', category: 'Entertainment', platform: 'tiktok' },
  { id: 'tech', name: 'Technology', category: 'Technology', platform: 'tiktok' },
  { id: 'business', name: 'Business', category: 'Business & Industry', platform: 'tiktok' },
  { id: 'education', name: 'Education', category: 'Education', platform: 'tiktok' },
];

// Google Affinity Audiences
export const googleInterests: Interest[] = [
  { id: 'tech-enthusiasts', name: 'Tech Enthusiasts', category: 'Technology', platform: 'google' },
  { id: 'shoppers', name: 'Shoppers', category: 'Shopping', platform: 'google' },
  { id: 'travelers', name: 'Travelers', category: 'Lifestyle', platform: 'google' },
  { id: 'food-lovers', name: 'Food Lovers', category: 'Lifestyle', platform: 'google' },
  { id: 'fitness-enthusiasts', name: 'Fitness Enthusiasts', category: 'Lifestyle', platform: 'google' },
  { id: 'business-professionals', name: 'Business Professionals', category: 'Business & Industry', platform: 'google' },
  { id: 'gamers', name: 'Gamers', category: 'Entertainment', platform: 'google' },
  { id: 'music-lovers', name: 'Music Lovers', category: 'Entertainment', platform: 'google' },
];

// Yandex Targeting Categories
export const yandexInterests: Interest[] = [
  { id: 'бизнес', name: 'Бизнес', category: 'Business & Industry', platform: 'yandex' },
  { id: 'технологии', name: 'Технологии', category: 'Technology', platform: 'yandex' },
  { id: 'образование', name: 'Образование', category: 'Education', platform: 'yandex' },
  { id: 'здоровье', name: 'Здоровье', category: 'Lifestyle', platform: 'yandex' },
  { id: 'путешествия', name: 'Путешествия', category: 'Lifestyle', platform: 'yandex' },
  { id: 'развлечения', name: 'Развлечения', category: 'Entertainment', platform: 'yandex' },
  { id: 'спорт', name: 'Спорт', category: 'Entertainment', platform: 'yandex' },
  { id: 'мода', name: 'Мода', category: 'Lifestyle', platform: 'yandex' },
];

export function getInterestsByPlatform(platform: string): Interest[] {
  switch (platform.toLowerCase()) {
    case 'meta-facebook':
    case 'meta-instagram':
    case 'meta':
      return metaInterests;
    case 'tiktok':
      return tiktokInterests;
    case 'google-search':
    case 'google-display':
    case 'youtube':
    case 'google':
      return googleInterests;
    case 'yandex':
      return yandexInterests;
    default:
      return [...metaInterests, ...tiktokInterests, ...googleInterests];
  }
}

export function getInterestsByCategory(interests: Interest[]): Record<string, Interest[]> {
  return interests.reduce((acc, interest) => {
    if (!acc[interest.category]) {
      acc[interest.category] = [];
    }
    acc[interest.category].push(interest);
    return acc;
  }, {} as Record<string, Interest[]>);
}

