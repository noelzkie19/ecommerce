"use client";

interface FilterSelectProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: readonly { label: string; value: string }[];
  readonly placeholder?: string;
}

export default function FilterSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700 min-w-[140px]"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
