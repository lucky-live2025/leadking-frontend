"use client";

import { useState, useEffect, useRef } from "react";

interface AutoCompleteProps {
  placeholder?: string;
  value: string[];
  onChange: (values: string[]) => void;
  loadOptions: (query: string) => Promise<Array<{ value: string; label: string }>>;
  isLoading?: boolean;
  maxResults?: number;
  displayValue?: (value: string) => string;
}

export default function AutoComplete({
  placeholder = "Search and select...",
  value,
  onChange,
  loadOptions,
  isLoading = false,
  maxResults = 25,
  displayValue = (v) => v,
}: AutoCompleteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ value: string; label: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const results = await loadOptions(searchQuery);
        setSuggestions(results.slice(0, maxResults));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Failed to load suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(load, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, loadOptions, maxResults]);

  const handleSelect = (option: { value: string; label: string }) => {
    if (!value.includes(option.value)) {
      onChange([...value, option.value]);
    }
    setSearchQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={isLoading || loading}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-3 text-left text-gray-900 hover:bg-blue-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((val) => (
            <span
              key={val}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
            >
              {displayValue(val)}
              <button
                type="button"
                onClick={() => handleRemove(val)}
                className="hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

