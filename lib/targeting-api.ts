import { apiGet } from "./api";

export interface Country {
  code: string;
  name: string;
  continent: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

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

export interface Interest {
  id: string;
  name: string;
  category: string;
}

export async function getCountries(): Promise<Country[]> {
  try {
    return await apiGet("/targeting/countries");
  } catch (error) {
    console.error("Failed to load countries:", error);
    return [];
  }
}

export async function getLanguages(): Promise<Language[]> {
  try {
    return await apiGet("/targeting/languages");
  } catch (error) {
    console.error("Failed to load languages:", error);
    return [];
  }
}

export async function getStates(countryCode: string): Promise<State[]> {
  try {
    return await apiGet(`/targeting/states/${countryCode}`);
  } catch (error) {
    console.error("Failed to load states:", error);
    return [];
  }
}

export async function getCities(stateCode: string): Promise<City[]> {
  try {
    return await apiGet(`/targeting/cities/${stateCode}`);
  } catch (error) {
    console.error("Failed to load cities:", error);
    return [];
  }
}

export async function getCitiesByCountry(countryCode: string): Promise<City[]> {
  try {
    return await apiGet(`/targeting/cities/country/${countryCode}`);
  } catch (error) {
    console.error("Failed to load cities:", error);
    return [];
  }
}

export async function getInterests(platform: string): Promise<Interest[]> {
  try {
    const data = await apiGet(`/targeting/interests/${platform}`);
    // Handle both array and object responses
    if (Array.isArray(data)) {
      return data;
    }
    // If it's an object with platform keys, return the matching platform or all
    if (platform.includes('meta') || platform === 'facebook' || platform === 'instagram') {
      return data.meta || data;
    }
    if (platform === 'tiktok') {
      return data.tiktok || data;
    }
    if (platform.includes('google') || platform === 'youtube') {
      return data.google || data;
    }
    if (platform === 'yandex') {
      return data.yandex || data;
    }
    return data;
  } catch (error) {
    console.error("Failed to load interests:", error);
    return [];
  }
}

