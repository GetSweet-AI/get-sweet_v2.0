"use client";

export default function SuggestionChips({ suggestions = [], onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 py-3 mb-20">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className="px-4 py-2 bg-white text-gray-500 border border-gray-300 text-sm rounded-full hover:bg-gray-100/80 shadow-sm"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
