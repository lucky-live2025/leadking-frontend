"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getCountries, getLanguages, getStates, getCitiesByCountry, getInterests, Country, Language, State, City, Interest } from "@/lib/targeting-api";
import AsyncMultiSelect from "./form/AsyncMultiSelect";
import AutoComplete from "./form/AutoComplete";

interface TargetingStepProps {
  platform: string;
  formData: {
    countries: string[];
    states?: string[];
    cities?: string[];
    languages: string[];
    interests?: string[];
    ageMin: number;
    ageMax: number;
    gender: string;
    dailyBudget: string;
  };
  onChange: (data: Partial<TargetingStepProps["formData"]>) => void;
}

export default function TargetingStep({ platform, formData, onChange }: TargetingStepProps) {
  // Data from API
  const [countries, setCountries] = useState<Country[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [availableStates, setAvailableStates] = useState<State[]>([]);
  
  // Loading states
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);

  // Load initial data
  useEffect(() => {
    loadCountries();
    loadLanguages();
    loadInterests();
  }, []);

  // Load countries
  const loadCountries = async () => {
    setLoadingCountries(true);
    try {
      const data = await getCountries();
      console.log("[TargetingStep] Loaded countries:", data.length);
      setCountries(data);
      if (data.length === 0) {
        console.warn("[TargetingStep] No countries loaded - check API endpoint");
      }
    } catch (error) {
      console.error("Failed to load countries:", error);
      setCountries([]);
    } finally {
      setLoadingCountries(false);
    }
  };

  // Load languages
  const loadLanguages = async () => {
    setLoadingLanguages(true);
    try {
      const data = await getLanguages();
      console.log("[TargetingStep] Loaded languages:", data.length);
      setLanguages(data);
      if (data.length === 0) {
        console.warn("[TargetingStep] No languages loaded - check API endpoint");
      }
    } catch (error) {
      console.error("Failed to load languages:", error);
      setLanguages([]);
    } finally {
      setLoadingLanguages(false);
    }
  };

  // Load interests
  const loadInterests = async () => {
    if (!platform) return;
    setLoadingInterests(true);
    try {
      const data = await getInterests(platform);
      setInterests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load interests:", error);
    } finally {
      setLoadingInterests(false);
    }
  };

  // Load states when countries change
  useEffect(() => {
    if (formData.countries.length === 0) {
      setAvailableStates([]);
      return;
    }

    const loadStatesForCountries = async () => {
      setLoadingStates(true);
      try {
        const allStates: State[] = [];
        for (const countryName of formData.countries) {
          const country = countries.find(c => c.name === countryName);
          if (country) {
            const states = await getStates(country.code);
            allStates.push(...states);
          }
        }
        setAvailableStates(allStates);
      } catch (error) {
        console.error("Failed to load states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStatesForCountries();
  }, [formData.countries, countries]);

  // Country options
  const countryOptions = useCallback(async () => {
    return countries.map(c => ({ value: c.name, label: c.name }));
  }, [countries]);

  // Language options
  const languageOptions = useCallback(async () => {
    return languages.map(l => ({ value: l.code, label: `${l.name} (${l.nativeName})` }));
  }, [languages]);

  // State options
  const stateOptions = useCallback(async () => {
    return availableStates.map(s => ({ value: s.code, label: s.name }));
  }, [availableStates]);

  // Interest options
  const interestOptions = useCallback(async () => {
    return interests.map(i => ({ value: i.id, label: i.name }));
  }, [interests]);

  // City search
  const citySearchOptions = useCallback(async (query: string) => {
    if (!query.trim() || formData.countries.length === 0) return [];
    
    const allCities: City[] = [];
    for (const countryName of formData.countries) {
      const country = countries.find(c => c.name === countryName);
      if (country) {
        try {
          const cities = await getCitiesByCountry(country.code);
          const filtered = cities
            .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 25);
          allCities.push(...filtered);
        } catch (error) {
          console.error(`Failed to load cities for ${country.code}:`, error);
        }
      }
    }
    
    return allCities
      .slice(0, 25)
      .map(c => ({
        value: c.name,
        label: `${c.name}${c.stateCode ? `, ${c.stateCode}` : ''}${c.population ? ` (${(c.population / 1000).toFixed(0)}k)` : ''}`
      }));
  }, [formData.countries, countries]);

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Targeting Configuration</h2>

      {/* Countries */}
      <div>
        <label className="block text-gray-900 font-semibold mb-3">
          Countries *
          <span className="text-gray-500 text-sm font-normal ml-2">(Select one or more countries to target)</span>
        </label>
        <AsyncMultiSelect
          placeholder="Search and select countries (e.g., United States, United Kingdom, Canada, Germany, France, Japan, Australia...)"
          value={formData.countries || []}
          onChange={(values) => onChange({ countries: values })}
          loadOptions={countryOptions}
          isLoading={loadingCountries}
        />
        {countries.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {countries.length} countries available • Select multiple countries for global campaigns
          </p>
        )}
      </div>

      {/* States/Regions */}
      {availableStates.length > 0 && (
        <div>
          <label className="block text-gray-900 font-semibold mb-3">States/Regions</label>
          <AsyncMultiSelect
            placeholder="Select states/regions..."
            value={formData.states || []}
            onChange={(values) => onChange({ states: values })}
            loadOptions={stateOptions}
            isLoading={loadingStates}
          />
        </div>
      )}

      {/* Cities */}
      <div>
        <label className="block text-gray-900 font-semibold mb-3">
          Cities
          <span className="text-gray-500 text-sm font-normal ml-2">(Optional: Target specific cities for hyper-local campaigns)</span>
        </label>
        {formData.countries.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ Please select countries first to search for cities
            </p>
          </div>
        ) : (
          <>
            <AutoComplete
              placeholder={`Search cities in ${formData.countries.length === 1 ? formData.countries[0] : `${formData.countries.length} selected countries`} (e.g., New York, London, Tokyo, Paris, Berlin, Sydney...)`}
              value={formData.cities || []}
              onChange={(values) => onChange({ cities: values })}
              loadOptions={citySearchOptions}
              maxResults={25}
            />
            <p className="text-xs text-gray-500 mt-2">
              Search by city name • Results show population for major cities • Add multiple cities for broader reach
            </p>
          </>
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-gray-900 font-semibold mb-3">
          Languages *
          <span className="text-gray-500 text-sm font-normal ml-2">(Select languages your audience speaks)</span>
        </label>
        <AsyncMultiSelect
          placeholder="Search and select languages (e.g., English, Spanish, French, German, Chinese, Japanese, Arabic, Portuguese...)"
          value={formData.languages || []}
          onChange={(values) => onChange({ languages: values })}
          loadOptions={languageOptions}
          isLoading={loadingLanguages}
        />
        {languages.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {languages.length} languages available • Select languages that match your target audience
          </p>
        )}
      </div>

      {/* Interests */}
      {interests.length > 0 && (
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Interests</label>
          <AsyncMultiSelect
            placeholder="Select interests..."
            value={formData.interests || []}
            onChange={(values) => onChange({ interests: values })}
            loadOptions={interestOptions}
            isLoading={loadingInterests}
          />
        </div>
      )}

      {/* Age Range */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Age Min</label>
          <input
            type="number"
            min="13"
            max="100"
            value={formData.ageMin}
            onChange={(e) => onChange({ ageMin: parseInt(e.target.value) || 22 })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-gray-900 font-semibold mb-3">Age Max</label>
          <input
            type="number"
            min="13"
            max="100"
            value={formData.ageMax}
            onChange={(e) => onChange({ ageMax: parseInt(e.target.value) || 88 })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-900 font-semibold mb-3">Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-gray-900 font-semibold mb-3">Daily Budget ($)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.dailyBudget}
          onChange={(e) => onChange({ dailyBudget: e.target.value })}
          placeholder="0.00"
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
