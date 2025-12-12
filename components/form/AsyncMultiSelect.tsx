"use client";

import { useState, useEffect, useMemo } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface AsyncMultiSelectProps {
  placeholder?: string;
  value: string[];
  onChange: (values: string[]) => void;
  loadOptions: () => Promise<Array<{ value: string; label: string }>>;
  isLoading?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
}

const customStyles: StylesConfig<Option, true> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#FFFFFF",
    borderColor: state.isFocused ? "#2563eb" : "#E2E8F0",
    borderWidth: "1px",
    borderRadius: "12px",
    padding: "4px 8px",
    minHeight: "44px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.1)" : "none",
    "&:hover": {
      borderColor: "#2563eb",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#EFF6FF",
    borderRadius: "8px",
    padding: "2px 4px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#1E40AF",
    fontSize: "14px",
    fontWeight: "500",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#1E40AF",
    "&:hover": {
      backgroundColor: "#DBEAFE",
      color: "#1E3A8A",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #E2E8F0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
      ? "#EFF6FF"
      : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#0F172A",
    padding: "12px 16px",
    "&:active": {
      backgroundColor: "#2563eb",
      color: "#FFFFFF",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#94A3B8",
  }),
};

export default function AsyncMultiSelect({
  placeholder = "Select...",
  value,
  onChange,
  loadOptions,
  isLoading = false,
  isSearchable = true,
  isDisabled = false,
}: AsyncMultiSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await loadOptions();
        setOptions(data);
      } catch (error) {
        console.error("Failed to load options:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [loadOptions]);

  const selectedOptions = useMemo(() => {
    return options.filter((opt) => value.includes(opt.value));
  }, [options, value]);

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue.map((opt) => opt.value));
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder={placeholder}
      isLoading={loading || isLoading}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      styles={customStyles}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}

