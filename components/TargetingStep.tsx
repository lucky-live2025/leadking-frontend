"use client";

import { useState, useEffect, useMemo } from "react";
import { getCountries, getLanguages, getStates, getCitiesByCountry, getInterests, Country, Language, State, City, Interest } from "@/lib/targeting-api";

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
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [interestSearch, setInterestSearch] = useState("");
  
  // Data from API
  const [countries, setCountries] = useState<Country[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [availableStates, setAvailableStates] = useState<State[]>([]);
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
  
  // Loading states
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

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
      setCountries(data);
    } catch (error) {
      console.error("Failed to load countries:", error);
    } finally {
      setLoadingCountries(false);
    }
  };

  // Load languages
  const loadLanguages = async () => {
    setLoadingLanguages(true);
    try {
      const data = await getLanguages();
      setLanguages(data);
    } catch (error) {
      console.error("Failed to load languages:", error);
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
            const countryStates = await getStates(country.code);
            allStates.push(...countryStates);
          }
        }
        setAvailableStates(allStates);
      } catch (error) {
        console.error("Failed to load states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    if (countries.length > 0) {
      loadStatesForCountries();
    }
  }, [formData.countries, countries]);

  // Load cities when countries/states change
  useEffect(() => {
    if (formData.countries.length === 0) {
      setAvailableCities([]);
      return;
    }

    const loadCities = async () => {
      setLoadingCities(true);
      try {
        const allCities: City[] = [];
        for (const countryName of formData.countries) {
          const country = countries.find(c => c.name === countryName);
          if (country) {
            const countryCities = await getCitiesByCountry(country.code);
            allCities.push(...countryCities);
          }
        }
        setAvailableCities(allCities);
      } catch (error) {
        console.error("Failed to load cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    if (countries.length > 0) {
      loadCities();
    }
  }, [formData.countries, countries]);

  // City autocomplete
  useEffect(() => {
    if (citySearch.length > 2) {
      const filtered = availableCities
        .filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()))
        .sort((a, b) => (b.population || 0) - (a.population || 0))
        .slice(0, 20);
      setCitySuggestions(filtered);
    } else {
      setCitySuggestions([]);
    }
  }, [citySearch, availableCities]);

  // Group countries by continent
  const countriesByContinent = useMemo(() => {
    return countries.reduce((acc, country) => {
      if (!acc[country.continent]) {
        acc[country.continent] = [];
      }
      acc[country.continent].push(country);
      return acc;
    }, {} as Record<string, Country[]>);
  }, [countries]);

  // Group interests by category
  const interestsByCategory = useMemo(() => {
    return interests.reduce((acc, interest) => {
      if (!acc[interest.category]) {
        acc[interest.category] = [];
      }
      acc[interest.category].push(interest);
      return acc;
    }, {} as Record<string, Interest[]>);
  }, [interests]);

  // Filtered data
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries;
    const lower = countrySearch.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(lower));
  }, [countrySearch, countries]);

  const filteredInterests = useMemo(() => {
    if (!interestSearch) return interests;
    const lower = interestSearch.toLowerCase();
    return interests.filter(i => 
      i.name.toLowerCase().includes(lower) || 
      i.category.toLowerCase().includes(lower)
    );
  }, [interestSearch, interests]);

  const handleCountryToggle = (countryName: string) => {
    const current = formData.countries || [];
    if (current.includes(countryName)) {
      onChange({ countries: current.filter(c => c !== countryName) });
    } else {
      onChange({ countries: [...current, countryName] });
    }
  };

  const handleSelectAllCountries = (continent: string) => {
    const continentCountries = countriesByContinent[continent] || [];
    const continentNames = continentCountries.map(c => c.name);
    const current = formData.countries || [];
    const allSelected = continentNames.every(name => current.includes(name));
    
    if (allSelected) {
      onChange({ countries: current.filter(c => !continentNames.includes(c)) });
    } else {
      onChange({ countries: Array.from(new Set([...current, ...continentNames])) });
    }
  };

  const handleStateToggle = (stateCode: string) => {
    const current = formData.states || [];
    if (current.includes(stateCode)) {
      onChange({ states: current.filter(s => s !== stateCode) });
    } else {
      onChange({ states: [...current, stateCode] });
    }
  };

  const handleCityAdd = (cityName: string) => {
    const current = formData.cities || [];
    if (!current.includes(cityName)) {
      onChange({ cities: [...current, cityName] });
    }
    setCitySearch("");
    setCitySuggestions([]);
  };

  const handleCityRemove = (cityName: string) => {
    const current = formData.cities || [];
    onChange({ cities: current.filter(c => c !== cityName) });
  };

  const handleLanguageToggle = (langCode: string) => {
    const current = formData.languages || [];
    if (current.includes(langCode)) {
      onChange({ languages: current.filter(l => l !== langCode) });
    } else {
      onChange({ languages: [...current, langCode] });
    }
  };

  const handleInterestToggle = (interestId: string) => {
    const current = formData.interests || [];
    if (current.includes(interestId)) {
      onChange({ interests: current.filter(i => i !== interestId) });
    } else {
      onChange({ interests: [...current, interestId] });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Targeting Configuration</h2>

      {/* Countries - Grouped by Continent */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-300 font-semibold">Countries *</label>
          <input
            type="text"
            placeholder="Search countries..."
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            className="px-3 py-1.5 bg-[#0A1628] border border-gray-700 rounded-lg text-white text-sm w-64"
          />
        </div>
        {loadingCountries ? (
          <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading countries...</p>
          </div>
        ) : (
          <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
            {Object.entries(countriesByContinent).map(([continent, continentCountries]) => {
              const continentFiltered = continentCountries.filter(c => 
                filteredCountries.includes(c)
              );
              if (continentFiltered.length === 0) return null;

              const allSelected = continentFiltered.every(c => 
                formData.countries?.includes(c.name)
              );

              return (
                <div key={continent} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase">{continent}</h3>
                    <button
                      onClick={() => handleSelectAllCountries(continent)}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      {allSelected ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {continentFiltered.map((country) => {
                      const isSelected = formData.countries?.includes(country.name);
                      return (
                        <button
                          key={country.code}
                          onClick={() => handleCountryToggle(country.name)}
                          className={`px-3 py-2 rounded-lg text-sm text-left transition ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {country.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {formData.countries && formData.countries.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.countries.map((country) => (
              <span
                key={country}
                className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs"
              >
                {country}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* States/Regions */}
      {availableStates.length > 0 && (
        <div>
          <label className="block text-gray-300 font-semibold mb-3">States/Regions</label>
          {loadingStates ? (
            <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableStates.map((state) => {
                  const isSelected = formData.states?.includes(state.code);
                  return (
                    <button
                      key={state.code}
                      onClick={() => handleStateToggle(state.code)}
                      className={`px-3 py-2 rounded-lg text-sm text-left transition ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {state.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cities - Autocomplete */}
      <div>
        <label className="block text-gray-300 font-semibold mb-3">Cities</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search and add cities..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
          />
          {citySuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-[#111827] border border-gray-700 rounded-lg max-h-48 overflow-y-auto">
              {citySuggestions.map((city) => (
                <button
                  key={`${city.name}-${city.stateCode || ''}`}
                  onClick={() => handleCityAdd(city.name)}
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                >
                  {city.name}
                  {city.stateCode && `, ${city.stateCode}`}
                  {city.population && ` (${(city.population / 1000).toFixed(0)}k)`}
                </button>
              ))}
            </div>
          )}
        </div>
        {formData.cities && formData.cities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.cities.map((city) => (
              <span
                key={city}
                className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs flex items-center gap-1"
              >
                {city}
                <button
                  onClick={() => handleCityRemove(city)}
                  className="hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-gray-300 font-semibold mb-3">Languages *</label>
        {loadingLanguages ? (
          <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {languages.map((lang) => {
                const isSelected = formData.languages?.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageToggle(lang.code)}
                    className={`px-3 py-2 rounded-lg text-sm text-left transition ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {lang.name} ({lang.nativeName})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Interests */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-300 font-semibold">Interests</label>
          <input
            type="text"
            placeholder="Search interests..."
            value={interestSearch}
            onChange={(e) => setInterestSearch(e.target.value)}
            className="px-3 py-1.5 bg-[#0A1628] border border-gray-700 rounded-lg text-white text-sm w-64"
          />
        </div>
        {loadingInterests ? (
          <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="bg-[#0A1628] border border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
            {Object.entries(
              filteredInterests.reduce((acc, interest) => {
                if (!acc[interest.category]) acc[interest.category] = [];
                acc[interest.category].push(interest);
                return acc;
              }, {} as Record<string, Interest[]>)
            ).map(([category, categoryInterests]) => (
              <div key={category} className="mb-4 last:mb-0">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categoryInterests.map((interest) => {
                    const isSelected = formData.interests?.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`px-3 py-2 rounded-lg text-sm text-left transition ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {interest.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Age Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Age Min</label>
          <input
            type="number"
            min="13"
            max="100"
            value={formData.ageMin}
            onChange={(e) => onChange({ ageMin: parseInt(e.target.value) || 18 })}
            className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Age Max</label>
          <input
            type="number"
            min="13"
            max="100"
            value={formData.ageMax}
            onChange={(e) => onChange({ ageMax: parseInt(e.target.value) || 65 })}
            className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-300 font-semibold mb-2">Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => onChange({ gender: e.target.value })}
          className="w-full px-4 py-3 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}
