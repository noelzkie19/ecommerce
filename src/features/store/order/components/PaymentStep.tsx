"use client";

import { Banknote, Smartphone } from "lucide-react";
import type { PaymentData, ModalCartItem } from "@/types/checkout.types";
import type { PaymentMethod } from "@/types/order.types";
import { calcSubtotal, calcShipping, calcTotal } from "@/utils/checkout.utils";
import { calculateItemTotal, CHECKOUT } from "@/domain/rules";

const PAYMENT_ICONS: Record<
  PaymentMethod,
  { Icon: React.ElementType; color: string }
> = {
  cod: { Icon: Banknote, color: "text-amber-500" },
  maya: { Icon: Smartphone, color: "text-blue-500" },
};

interface Props {
  readonly data: PaymentData;
  readonly onChange: (d: PaymentData) => void;
  readonly items: ModalCartItem[];
  readonly compact?: boolean;
}

export const PaymentStep = ({
  data,
  onChange,
  items,
  compact = false,
}: Props) => {
  const subtotal = calcSubtotal(items);
  const shipping = calcShipping(subtotal);
  const baseTotal = calcTotal(subtotal);
  const isMaya = data.method === "maya";
  const total = baseTotal;

  return (
    <div className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {!compact && (
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
          Select Payment Method
        </p>
      )}

      {/* ── Payment method selector ───────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        {CHECKOUT.PAYMENT_OPTIONS.map(({ id, label, description }) => {
          const selected = data.method === id;
          const { Icon, color } = PAYMENT_ICONS[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ method: id })}
              className={[
                "flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all",
                selected
                  ? "border-orange-400 bg-orange-50"
                  : "border-gray-100 bg-gray-50 hover:border-gray-200",
              ].join(" ")}
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-bold leading-tight ${selected ? "text-orange-600" : "text-gray-800"}`}
                  >
                    {label}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{description}</p>
              </div>
              <div
                className={[
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selected
                    ? "border-orange-600 bg-orange-500"
                    : "border-gray-300 bg-white",
                ].join(" ")}
              >
                {selected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Maya / QR PH info banner ─────────────────────────────────────── */}
      {isMaya && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-blue-500 flex-shrink-0" />
            <p className="text-sm font-bold text-blue-700">
              Pay securely via Maya
            </p>
          </div>
          <p className="text-xs text-blue-500 leading-relaxed">
            Your Maya app will open directly after placing your order. Complete
            your payment of{" "}
            <span className="font-bold text-blue-700">
              ₱{total.toLocaleString()}
            </span>
            {". "}Your order is confirmed automatically once paid.
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Smartphone size={11} className="text-blue-400" />
            <p className="text-[11px] text-blue-400">
              Opens Maya directly — no QR code needed.
            </p>
          </div>
        </div>
      )}

      {/* ── Order summary ─────────────────────────────────────────────────── */}
      <div className="mt-1 pt-3 border-t border-gray-100 flex flex-col gap-1.5 text-sm">
        {!compact && (
          <>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
              Order Summary
            </p>
            {items.map((item) => {
              const lineTotal = calculateItemTotal(
                item.price,
                item.quantity,
                item.productBundle,
              );
              return (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-600"
                >
                  <span className="truncate mr-2">
                    {item.name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-gray-900 flex-shrink-0">
                    ₱{lineTotal.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </>
        )}
        <div className="flex justify-between text-gray-500 mt-1">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            ₱{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-semibold text-emerald-500">FREE</span>
          ) : (
            <span className="font-semibold text-gray-900">
              ₱{shipping.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex justify-between font-extrabold text-gray-900 pt-2 border-t border-gray-100">
          <span>Total</span>
          <span className="text-orange-600">₱{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
