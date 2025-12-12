// Hierarchical location data: Country → State → City
export interface State {
  code: string;
  name: string;
  countryCode: string;
}

export interface City {
  name: string;
  stateCode?: string;
  countryCode: string;
  population?: number;
}

// US States
export const usStates: State[] = [
  { code: 'AL', name: 'Alabama', countryCode: 'US' },
  { code: 'AK', name: 'Alaska', countryCode: 'US' },
  { code: 'AZ', name: 'Arizona', countryCode: 'US' },
  { code: 'AR', name: 'Arkansas', countryCode: 'US' },
  { code: 'CA', name: 'California', countryCode: 'US' },
  { code: 'CO', name: 'Colorado', countryCode: 'US' },
  { code: 'CT', name: 'Connecticut', countryCode: 'US' },
  { code: 'DE', name: 'Delaware', countryCode: 'US' },
  { code: 'FL', name: 'Florida', countryCode: 'US' },
  { code: 'GA', name: 'Georgia', countryCode: 'US' },
  { code: 'HI', name: 'Hawaii', countryCode: 'US' },
  { code: 'ID', name: 'Idaho', countryCode: 'US' },
  { code: 'IL', name: 'Illinois', countryCode: 'US' },
  { code: 'IN', name: 'Indiana', countryCode: 'US' },
  { code: 'IA', name: 'Iowa', countryCode: 'US' },
  { code: 'KS', name: 'Kansas', countryCode: 'US' },
  { code: 'KY', name: 'Kentucky', countryCode: 'US' },
  { code: 'LA', name: 'Louisiana', countryCode: 'US' },
  { code: 'ME', name: 'Maine', countryCode: 'US' },
  { code: 'MD', name: 'Maryland', countryCode: 'US' },
  { code: 'MA', name: 'Massachusetts', countryCode: 'US' },
  { code: 'MI', name: 'Michigan', countryCode: 'US' },
  { code: 'MN', name: 'Minnesota', countryCode: 'US' },
  { code: 'MS', name: 'Mississippi', countryCode: 'US' },
  { code: 'MO', name: 'Missouri', countryCode: 'US' },
  { code: 'MT', name: 'Montana', countryCode: 'US' },
  { code: 'NE', name: 'Nebraska', countryCode: 'US' },
  { code: 'NV', name: 'Nevada', countryCode: 'US' },
  { code: 'NH', name: 'New Hampshire', countryCode: 'US' },
  { code: 'NJ', name: 'New Jersey', countryCode: 'US' },
  { code: 'NM', name: 'New Mexico', countryCode: 'US' },
  { code: 'NY', name: 'New York', countryCode: 'US' },
  { code: 'NC', name: 'North Carolina', countryCode: 'US' },
  { code: 'ND', name: 'North Dakota', countryCode: 'US' },
  { code: 'OH', name: 'Ohio', countryCode: 'US' },
  { code: 'OK', name: 'Oklahoma', countryCode: 'US' },
  { code: 'OR', name: 'Oregon', countryCode: 'US' },
  { code: 'PA', name: 'Pennsylvania', countryCode: 'US' },
  { code: 'RI', name: 'Rhode Island', countryCode: 'US' },
  { code: 'SC', name: 'South Carolina', countryCode: 'US' },
  { code: 'SD', name: 'South Dakota', countryCode: 'US' },
  { code: 'TN', name: 'Tennessee', countryCode: 'US' },
  { code: 'TX', name: 'Texas', countryCode: 'US' },
  { code: 'UT', name: 'Utah', countryCode: 'US' },
  { code: 'VT', name: 'Vermont', countryCode: 'US' },
  { code: 'VA', name: 'Virginia', countryCode: 'US' },
  { code: 'WA', name: 'Washington', countryCode: 'US' },
  { code: 'WV', name: 'West Virginia', countryCode: 'US' },
  { code: 'WI', name: 'Wisconsin', countryCode: 'US' },
  { code: 'WY', name: 'Wyoming', countryCode: 'US' },
];

// Canada Provinces
export const canadaProvinces: State[] = [
  { code: 'AB', name: 'Alberta', countryCode: 'CA' },
  { code: 'BC', name: 'British Columbia', countryCode: 'CA' },
  { code: 'MB', name: 'Manitoba', countryCode: 'CA' },
  { code: 'NB', name: 'New Brunswick', countryCode: 'CA' },
  { code: 'NL', name: 'Newfoundland and Labrador', countryCode: 'CA' },
  { code: 'NS', name: 'Nova Scotia', countryCode: 'CA' },
  { code: 'ON', name: 'Ontario', countryCode: 'CA' },
  { code: 'PE', name: 'Prince Edward Island', countryCode: 'CA' },
  { code: 'QC', name: 'Quebec', countryCode: 'CA' },
  { code: 'SK', name: 'Saskatchewan', countryCode: 'CA' },
  { code: 'NT', name: 'Northwest Territories', countryCode: 'CA' },
  { code: 'NU', name: 'Nunavut', countryCode: 'CA' },
  { code: 'YT', name: 'Yukon', countryCode: 'CA' },
];

// Major cities (sample - in production, use a full dataset)
export const majorCities: City[] = [
  // US Cities
  { name: 'New York', stateCode: 'NY', countryCode: 'US', population: 8336817 },
  { name: 'Los Angeles', stateCode: 'CA', countryCode: 'US', population: 3979576 },
  { name: 'Chicago', stateCode: 'IL', countryCode: 'US', population: 2693976 },
  { name: 'Houston', stateCode: 'TX', countryCode: 'US', population: 2320268 },
  { name: 'Phoenix', stateCode: 'AZ', countryCode: 'US', population: 1680992 },
  { name: 'Philadelphia', stateCode: 'PA', countryCode: 'US', population: 1584064 },
  { name: 'San Antonio', stateCode: 'TX', countryCode: 'US', population: 1547253 },
  { name: 'San Diego', stateCode: 'CA', countryCode: 'US', population: 1423851 },
  { name: 'Dallas', stateCode: 'TX', countryCode: 'US', population: 1343573 },
  { name: 'San Jose', stateCode: 'CA', countryCode: 'US', population: 1021795 },
  
  // Canada Cities
  { name: 'Toronto', stateCode: 'ON', countryCode: 'CA', population: 2930000 },
  { name: 'Montreal', stateCode: 'QC', countryCode: 'CA', population: 1780000 },
  { name: 'Vancouver', stateCode: 'BC', countryCode: 'CA', population: 675000 },
  { name: 'Calgary', stateCode: 'AB', countryCode: 'CA', population: 1300000 },
  
  // UK Cities
  { name: 'London', countryCode: 'GB', population: 9000000 },
  { name: 'Manchester', countryCode: 'GB', population: 547000 },
  { name: 'Birmingham', countryCode: 'GB', population: 1140000 },
  
  // European Cities
  { name: 'Berlin', countryCode: 'DE', population: 3669000 },
  { name: 'Paris', countryCode: 'FR', population: 2161000 },
  { name: 'Rome', countryCode: 'IT', population: 2873000 },
  { name: 'Madrid', countryCode: 'ES', population: 3223000 },
  { name: 'Amsterdam', countryCode: 'NL', population: 872000 },
  
  // Asian Cities
  { name: 'Tokyo', countryCode: 'JP', population: 13960000 },
  { name: 'Singapore', countryCode: 'SG', population: 5686000 },
  { name: 'Mumbai', countryCode: 'IN', population: 12478000 },
  { name: 'Dubai', countryCode: 'AE', population: 3400000 },
];

export function getStatesByCountry(countryCode: string): State[] {
  if (countryCode === 'US') return usStates;
  if (countryCode === 'CA') return canadaProvinces;
  return [];
}

export function getCitiesByCountry(countryCode: string, stateCode?: string): City[] {
  let filtered = majorCities.filter(c => c.countryCode === countryCode);
  if (stateCode) {
    filtered = filtered.filter(c => c.stateCode === stateCode);
  }
  return filtered.sort((a, b) => (b.population || 0) - (a.population || 0));
}

export function searchCities(query: string, countryCode?: string, stateCode?: string): City[] {
  const lowerQuery = query.toLowerCase();
  let filtered = majorCities;
  
  if (countryCode) {
    filtered = filtered.filter(c => c.countryCode === countryCode);
  }
  if (stateCode) {
    filtered = filtered.filter(c => c.stateCode === stateCode);
  }
  
  return filtered
    .filter(c => c.name.toLowerCase().includes(lowerQuery))
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 20); // Limit results
}

