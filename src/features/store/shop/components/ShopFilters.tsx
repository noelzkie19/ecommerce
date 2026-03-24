"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = [
  "All",
  "Superfoods",
  "Supplements",
  "Beverages",
  "Snacks",
  "Others",
];

interface Props {
  readonly search: string;
  readonly category: string;
  readonly onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onSearchClear: () => void;
  readonly onCategoryChange: (cat: string) => void;
}

export default function ShopFilters({
  search,
  category,
  onSearchChange,
  onSearchClear,
  onCategoryChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={onSearchChange}
          placeholder="Search products..."
          className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
        />
        {search && (
          <button
            type="button"
            onClick={onSearchClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 flex-shrink-0">
        <SlidersHorizontal size={14} className="text-gray-400 flex-shrink-0" />
        {CATEGORIES.map((cat) => {
          const active = cat === "All" ? category === "" : category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat === "All" ? "" : cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-orange-600"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
