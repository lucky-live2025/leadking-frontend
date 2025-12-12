"use client";

import { useState, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

interface LocationAutocompleteProps {
  value?: string;
  onChange?: (location: {
    country: string;
    state: string;
    city: string;
    zipCode: string;
    fullAddress: string;
  }) => void;
  placeholder?: string;
  className?: string;
  apiKey?: string;
}

const libraries: ("places")[] = ["places"];

export default function LocationAutocomplete({
  value = "",
  onChange,
  placeholder = "Start typing a location...",
  className = "",
  apiKey,
}: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(apiKey || process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const autocompleteServiceRef = useRef<any>(null);
  const placesServiceRef = useRef<any>(null);

  // Fetch API key from backend if not provided
  useEffect(() => {
    if (!apiKey && !process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY && typeof window !== 'undefined') {
      const fetchApiKey = async () => {
        const { API_BASE } = await import("@/lib/api");
        const token = localStorage.getItem("token");
        if (token && API_BASE) {
          fetch(`${API_BASE}/admin/google-places-key`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.apiKey) {
                setGoogleMapsApiKey(data.apiKey);
              }
            })
            .catch(() => {
              // Silent fail - will use empty key
            });
        }
      };
      fetchApiKey();
    }
  }, [apiKey]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey || "",
    libraries,
    ...(googleMapsApiKey ? {} : { preventGoogleFontsLoading: true }),
  });

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps && window.google.maps.places) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
      placesServiceRef.current = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
    }
  }, [isLoaded]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);

    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (isLoaded && autocompleteServiceRef.current && window.google) {
      autocompleteServiceRef.current.getPlacePredictions(
        {
          input: query,
          types: ["(cities)"],
          componentRestrictions: { country: [] }, // Allow all countries
        },
        (predictions: any[], status: string) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
      );
    }
  };

  const handleSelectPlace = (placeId: string, description: string) => {
    if (!isLoaded || !placesServiceRef.current || !window.google) return;

    const request = {
      placeId,
      fields: ["address_components", "formatted_address", "geometry", "name"],
    };

    placesServiceRef.current.getDetails(
      request,
      (place: any, status: string) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          place
        ) {
          const location = extractLocationFromPlace(place);
          setInputValue(description);
          setShowSuggestions(false);
          setSuggestions([]);
          onChange?.(location);
        }
      }
    );
  };

  const extractLocationFromPlace = (place: any) => {
    const components = place.address_components || [];
    let country = "";
    let state = "";
    let city = "";
    let zipCode = "";

    components.forEach((component: any) => {
      const types = component.types;

      if (types.includes("country")) {
        country = component.long_name;
      }

      if (types.includes("administrative_area_level_1")) {
        state = component.short_name; // Use short_name for state codes
      }

      if (
        types.includes("locality") ||
        types.includes("administrative_area_level_2")
      ) {
        if (!city) city = component.long_name;
      }

      if (types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });

    return {
      country: country || "",
      state: state || "",
      city: city || "",
      zipCode: zipCode || "",
      fullAddress: place.formatted_address || "",
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const suggestion = suggestions[selectedIndex];
        handleSelectPlace(suggestion.place_id, suggestion.description);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loadError) {
    return (
      <div className="text-red-400 text-sm">
        Error loading Google Maps. Please check your API key in admin settings.
      </div>
    );
  }

  if (!isLoaded || !googleMapsApiKey) {
    return (
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
        disabled={!googleMapsApiKey}
      />
    );
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className={className}
        style={{ backgroundColor: '#1f2937', color: '#ffffff' }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              onClick={() =>
                handleSelectPlace(suggestion.place_id, suggestion.description)
              }
              className={`px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === suggestions.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              <div className="font-medium">
                {suggestion.structured_formatting.main_text}
              </div>
              <div className="text-sm text-gray-400">
                {suggestion.structured_formatting.secondary_text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
