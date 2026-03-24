"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { affiliateSalesService } from "@/features/admin/affiliate-sales/services/affiliate-sales.service";
import type { AffiliateSale } from "@/types/affiliate-sales.types";
import { useAuthStore } from "@/store/auth.store";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const fmt = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

export const AffiliateCommissionSalesPage = () => {
  const { user } = useAuthStore();
  const [sales, setSales] = useState<AffiliateSale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    affiliateSalesService
      .getAll({ limit: 50 })
      .then((res) => setSales(res.data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [user]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      );
    }
    if (sales.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <ShoppingBag className="w-10 h-10 mb-3 opacity-40" />
          <p className="text-sm">No commission sales yet.</p>
          <p className="text-xs mt-1">
            Share your referral link to start earning!
          </p>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sale Amount
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Commission
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 text-gray-800 font-medium">
                  {sale.product?.name ?? "—"}
                </td>
                <td className="px-5 py-3.5 text-gray-600">{sale.quantity}</td>
                <td className="px-5 py-3.5 text-gray-800">
                  {fmt(sale.saleAmount)}
                </td>
                <td className="px-5 py-3.5 text-orange-600 font-semibold">
                  {fmt(sale.commissionEarned)}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[sale.status] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-500 text-xs">
                  {new Date(sale.createdAt).toLocaleDateString("en-PH")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <AffiliateTopBar
        title="Commission Sales"
        subtitle="All sales attributed to your referral link"
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};
