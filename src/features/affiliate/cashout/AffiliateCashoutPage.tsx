"use client";

import { useState, useEffect } from "react";
import { CreditCard, Clock, CheckCircle2, XCircle } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { affiliateDashboardService } from "../dashboard/services/affiliate-dashboard.service";
import type { AffiliateCashout } from "@/types/affiliate-dashboard.types";
import { Button } from "@/shared/components/ui/Button";

const STATUS_ICONS = {
  pending: <Clock className="w-4 h-4 text-yellow-500" />,
  approved: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  rejected: <XCircle className="w-4 h-4 text-red-500" />,
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const fmt = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

export const AffiliateCashoutPage = () => {
  const [cashouts, setCashouts] = useState<AffiliateCashout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    mayaNumber: "",
    mayaName: "",
  });

  const loadCashouts = () => {
    affiliateDashboardService
      .getCashouts()
      .then(setCashouts)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCashouts();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const amount = Number.parseFloat(form.amount);
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setIsSubmitting(true);
    try {
      await affiliateDashboardService.requestCashout({
        amount,
        mayaNumber: form.mayaNumber,
        mayaName: form.mayaName,
      });
      setSuccess(true);
      setForm({ amount: "", mayaNumber: "", mayaName: "" });
      loadCashouts();
    } catch {
      setError("Failed to submit cashout request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCashoutHistory = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-14 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (cashouts.length === 0) {
      return (
        <p className="text-gray-400 text-sm text-center py-8">
          No cashout requests yet.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {cashouts.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {STATUS_ICONS[c.status]}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {fmt(c.amount)}
                </p>
                <p className="text-xs text-gray-400">{c.mayaNumber}</p>
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.status]}`}
              >
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
              </span>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(c.createdAt).toLocaleDateString("en-PH")}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <AffiliateTopBar
        title="Cashout (Maya)"
        subtitle="Withdraw your available balance to Maya Wallet"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Form */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-orange-500" />
            Request Cashout
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Amount (₱)
              </label>
              <input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="e.g. 500"
                value={form.amount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, amount: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mayaNumber"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Maya Wallet Number
              </label>
              <input
                id="mayaNumber"
                type="tel"
                placeholder="09XXXXXXXXX"
                value={form.mayaNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, mayaNumber: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mayaName"
                className="block text-xs font-medium text-gray-500 mb-1.5"
              >
                Maya Account Name
              </label>
              <input
                id="mayaName"
                type="text"
                placeholder="Full name on Maya"
                value={form.mayaName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, mayaName: e.target.value }))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && (
              <p className="text-green-600 text-xs">
                Cashout request submitted successfully!
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting…" : "Submit Cashout Request"}
            </Button>
          </form>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-5">
            Cashout History
          </h3>

          {renderCashoutHistory()}
        </div>
      </div>
    </div>
  );
};
