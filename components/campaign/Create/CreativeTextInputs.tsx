"use client";

import { useState } from "react";

interface CreativeTextInputsProps {
  onTextsChange: (texts: {
    headlines: string[];
    primaryTexts: string[];
    descriptions: string[];
    ctas: string[];
  }) => void;
}

export default function CreativeTextInputs({ onTextsChange }: CreativeTextInputsProps) {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [primaryTexts, setPrimaryTexts] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [ctas, setCTAs] = useState<string[]>([]);

  const addItem = (type: "headlines" | "primaryTexts" | "descriptions" | "ctas", value: string) => {
    if (!value.trim()) return;

    let updated: string[];
    switch (type) {
      case "headlines":
        updated = [...headlines, value.trim()];
        setHeadlines(updated);
        break;
      case "primaryTexts":
        updated = [...primaryTexts, value.trim()];
        setPrimaryTexts(updated);
        break;
      case "descriptions":
        updated = [...descriptions, value.trim()];
        setDescriptions(updated);
        break;
      case "ctas":
        updated = [...ctas, value.trim()];
        setCTAs(updated);
        break;
    }

    onTextsChange({
      headlines: type === "headlines" ? updated : headlines,
      primaryTexts: type === "primaryTexts" ? updated : primaryTexts,
      descriptions: type === "descriptions" ? updated : descriptions,
      ctas: type === "ctas" ? updated : ctas,
    });
  };

  const removeItem = (type: "headlines" | "primaryTexts" | "descriptions" | "ctas", index: number) => {
    let updated: string[];
    switch (type) {
      case "headlines":
        updated = headlines.filter((_, i) => i !== index);
        setHeadlines(updated);
        break;
      case "primaryTexts":
        updated = primaryTexts.filter((_, i) => i !== index);
        setPrimaryTexts(updated);
        break;
      case "descriptions":
        updated = descriptions.filter((_, i) => i !== index);
        setDescriptions(updated);
        break;
      case "ctas":
        updated = ctas.filter((_, i) => i !== index);
        setCTAs(updated);
        break;
    }

    onTextsChange({
      headlines: type === "headlines" ? updated : headlines,
      primaryTexts: type === "primaryTexts" ? updated : primaryTexts,
      descriptions: type === "descriptions" ? updated : descriptions,
      ctas: type === "ctas" ? updated : ctas,
    });
  };

  const TextInputSection = ({
    title,
    type,
    items,
    placeholder,
  }: {
    title: string;
    type: "headlines" | "primaryTexts" | "descriptions" | "ctas";
    items: string[];
    placeholder: string;
  }) => {
    const [inputValue, setInputValue] = useState("");

    return (
      <div>
        <label className="block text-gray-300 font-semibold mb-2">{title}</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem(type, inputValue);
                setInputValue("");
              }
            }}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 bg-[#0A1628] border border-gray-700 rounded-lg text-white"
          />
          <button
            onClick={() => {
              addItem(type, inputValue);
              setInputValue("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {items.length > 0 && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 p-2 rounded"
              >
                <span className="text-white text-sm flex-1">{item}</span>
                <button
                  onClick={() => removeItem(type, index)}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Manual Text Inputs</h3>
      
      <TextInputSection
        title="Headlines"
        type="headlines"
        items={headlines}
        placeholder="Enter headline..."
      />

      <TextInputSection
        title="Primary Texts"
        type="primaryTexts"
        items={primaryTexts}
        placeholder="Enter primary text..."
      />

      <TextInputSection
        title="Descriptions"
        type="descriptions"
        items={descriptions}
        placeholder="Enter description..."
      />

      <TextInputSection
        title="Call-to-Actions (CTAs)"
        type="ctas"
        items={ctas}
        placeholder="Enter CTA..."
      />
    </div>
  );
}

