"use client";

import type { ShippingData } from "@/types/checkout.types";

interface Props {
  readonly data: ShippingData;
  readonly onChange: (d: ShippingData) => void;
  readonly compact?: boolean;
}

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-purple-300 focus:bg-white transition-all";

export const ShippingStep = ({ data, onChange, compact = false }: Props) => {
  const set =
    (key: keyof ShippingData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ ...data, [key]: e.target.value });

  return (
    <div className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {!compact && (
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
          Shipping Details
        </p>
      )}

      {/* Full name */}
      <Field label="Full Name" required>
        <input
          type="text"
          placeholder="Juan dela Cruz"
          value={data.fullName}
          onChange={set("fullName")}
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      {/* Email */}
      <Field label="Email">
        <input
          type="email"
          placeholder="juan@email.com"
          value={data.email}
          onChange={set("email")}
          className={inputClass}
          autoComplete="email"
        />
      </Field>

      {/* Phone */}
      <Field label="Phone Number" required>
        <input
          type="tel"
          placeholder="09XX XXX XXXX"
          value={data.phone}
          onChange={set("phone")}
          className={inputClass}
          autoComplete="tel"
        />
      </Field>

      {/* Address */}
      <Field label="Delivery Address" required>
        <input
          type="text"
          placeholder="Street, Barangay, City, Province"
          value={data.address}
          onChange={set("address")}
          className={inputClass}
          autoComplete="street-address"
        />
      </Field>

      {/* Notes */}
      <Field label="Order Notes">
        <textarea
          placeholder="Landmark, special instructions… (optional)"
          value={data.notes}
          onChange={set("notes")}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </Field>

      {!compact && (
        <p className="text-[11px] text-gray-400">
          Fields marked <span className="text-red-400">*</span> are required.
        </p>
      )}
    </div>
  );
};
