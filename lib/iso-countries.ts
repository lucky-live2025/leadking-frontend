// ISO-3166 Country Codes with full names
export interface Country {
  code: string;
  name: string;
  continent: string;
}

export const countries: Country[] = [
  // North America
  { code: 'US', name: 'United States', continent: 'North America' },
  { code: 'CA', name: 'Canada', continent: 'North America' },
  { code: 'MX', name: 'Mexico', continent: 'North America' },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', continent: 'Europe' },
  { code: 'DE', name: 'Germany', continent: 'Europe' },
  { code: 'FR', name: 'France', continent: 'Europe' },
  { code: 'IT', name: 'Italy', continent: 'Europe' },
  { code: 'ES', name: 'Spain', continent: 'Europe' },
  { code: 'NL', name: 'Netherlands', continent: 'Europe' },
  { code: 'BE', name: 'Belgium', continent: 'Europe' },
  { code: 'SE', name: 'Sweden', continent: 'Europe' },
  { code: 'NO', name: 'Norway', continent: 'Europe' },
  { code: 'DK', name: 'Denmark', continent: 'Europe' },
  { code: 'PL', name: 'Poland', continent: 'Europe' },
  { code: 'RU', name: 'Russia', continent: 'Europe' },
  { code: 'UA', name: 'Ukraine', continent: 'Europe' },
  { code: 'CH', name: 'Switzerland', continent: 'Europe' },
  { code: 'AT', name: 'Austria', continent: 'Europe' },
  { code: 'IE', name: 'Ireland', continent: 'Europe' },
  { code: 'PT', name: 'Portugal', continent: 'Europe' },
  { code: 'GR', name: 'Greece', continent: 'Europe' },
  { code: 'FI', name: 'Finland', continent: 'Europe' },
  { code: 'CZ', name: 'Czech Republic', continent: 'Europe' },
  { code: 'RO', name: 'Romania', continent: 'Europe' },
  { code: 'HU', name: 'Hungary', continent: 'Europe' },
  
  // Asia
  { code: 'CN', name: 'China', continent: 'Asia' },
  { code: 'JP', name: 'Japan', continent: 'Asia' },
  { code: 'IN', name: 'India', continent: 'Asia' },
  { code: 'KR', name: 'South Korea', continent: 'Asia' },
  { code: 'SG', name: 'Singapore', continent: 'Asia' },
  { code: 'MY', name: 'Malaysia', continent: 'Asia' },
  { code: 'TH', name: 'Thailand', continent: 'Asia' },
  { code: 'VN', name: 'Vietnam', continent: 'Asia' },
  { code: 'PH', name: 'Philippines', continent: 'Asia' },
  { code: 'ID', name: 'Indonesia', continent: 'Asia' },
  { code: 'AE', name: 'United Arab Emirates', continent: 'Asia' },
  { code: 'SA', name: 'Saudi Arabia', continent: 'Asia' },
  { code: 'IL', name: 'Israel', continent: 'Asia' },
  { code: 'TR', name: 'Turkey', continent: 'Asia' },
  
  // Oceania
  { code: 'AU', name: 'Australia', continent: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', continent: 'Oceania' },
  
  // South America
  { code: 'BR', name: 'Brazil', continent: 'South America' },
  { code: 'AR', name: 'Argentina', continent: 'South America' },
  { code: 'CL', name: 'Chile', continent: 'South America' },
  { code: 'CO', name: 'Colombia', continent: 'South America' },
  { code: 'PE', name: 'Peru', continent: 'South America' },
  
  // Africa
  { code: 'ZA', name: 'South Africa', continent: 'Africa' },
  { code: 'EG', name: 'Egypt', continent: 'Africa' },
  { code: 'NG', name: 'Nigeria', continent: 'Africa' },
  { code: 'KE', name: 'Kenya', continent: 'Africa' },
];

export const countriesByContinent = countries.reduce((acc, country) => {
  if (!acc[country.continent]) {
    acc[country.continent] = [];
  }
  acc[country.continent].push(country);
  return acc;
}, {} as Record<string, Country[]>);

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(c => c.code === code);
}

export function getCountriesByContinent(continent: string): Country[] {
  return countriesByContinent[continent] || [];
}

