"use client";

import { Check, X, Trash2 } from "lucide-react";
import {
  AffiliateSale,
  AffiliateSaleStatus,
} from "@/types/affiliate-sales.types";

const STATUS_STYLES: Record<AffiliateSaleStatus, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rejected: "bg-red-50 text-red-700 border-red-100",
};

const ALL_STATUSES: AffiliateSaleStatus[] = ["pending", "approved", "rejected"];

interface Props {
  readonly sales: AffiliateSale[];
  readonly onApprove: (id: string) => void;
  readonly onReject: (id: string) => void;
  readonly onDelete: (id: string) => void;
}

export default function AffiliateSalesTable({
  sales,
  onApprove,
  onReject,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Sale ID
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Affiliate
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Product
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Qty
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Sale Amount
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Commission
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Status
            </th>
            <th className="text-left px-6 py-4 text-gray-500 font-medium">
              Date
            </th>
            <th className="text-right px-6 py-4 text-gray-500 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs text-gray-600">
                #{sale.id.slice(0, 6)}
              </td>
              <td className="px-6 py-4">
                <div className="text-gray-800 font-medium">
                  {sale.affiliate?.name ?? "Unknown"}
                </div>
                <div className="text-xs text-gray-500">
                  {sale.affiliate?.email}
                </div>
              </td>
              <td className="px-6 py-4 text-gray-800">
                {sale.product?.name ?? "Unknown Product"}
              </td>
              <td className="px-6 py-4 text-gray-600">{sale.quantity}</td>
              <td className="px-6 py-4 font-medium text-gray-900">
                ₱{sale.saleAmount.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <div className="text-gray-800 font-medium">
                  ₱{sale.commissionEarned.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {sale.commissionType === "percentage"
                    ? `${sale.commissionValue}%`
                    : `₱${sale.commissionValue} fixed`}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[sale.status]}`}
                >
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(sale.createdAt).toLocaleDateString("en-PH", {
                  month: "short",
                  day: "numeric",
                  year: "2-digit",
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-1">
                  {sale.status === "pending" && (
                    <>
                      <button
                        onClick={() => onApprove(sale.id)}
                        className="p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors"
                        title="Approve"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        onClick={() => onReject(sale.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Reject"
                      >
                        <X size={15} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onDelete(sale.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sales.length === 0 && (
        <div className="py-16 text-center text-gray-400 text-sm">
          No affiliate sales found.
        </div>
      )}
    </div>
  );
}
