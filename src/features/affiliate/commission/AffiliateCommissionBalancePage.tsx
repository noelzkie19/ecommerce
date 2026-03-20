"use client";

import { Wallet, TrendingUp, Clock, Percent } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { AffiliateStatCard } from "../shared/components/AffiliateStatCard";
import { useAffiliateDashboard } from "../dashboard/hooks/useAffiliateDashboard";

const fmt = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

export const AffiliateCommissionBalancePage = () => {
  const { dashboard, isLoading } = useAffiliateDashboard();
  const stats = dashboard?.stats;

  return (
    <div>
      <AffiliateTopBar
        title="Commission Balance"
        subtitle="Track your earnings and available balance"
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <AffiliateStatCard
          label="Total Commission Earned"
          value={isLoading ? "—" : fmt(stats?.totalCommission ?? 0)}
          icon={TrendingUp}
        />
        <AffiliateStatCard
          label="Pending Commission"
          value={isLoading ? "—" : fmt(stats?.pendingCommission ?? 0)}
          icon={Clock}
        />
        <AffiliateStatCard
          label="Available Balance"
          value={isLoading ? "—" : fmt(stats?.availableBalance ?? 0)}
          icon={Wallet}
        />
        <AffiliateStatCard
          label="Affiliate Commission"
          value={isLoading ? "—" : fmt(stats?.affiliateCommission ?? 0)}
          icon={Percent}
        />
      </div>

      {/* Info card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-lg">
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          How commissions work
        </h3>
        <ul className="space-y-2.5 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
            <span>
              Commissions are marked <strong>Pending</strong> until the order is
              confirmed.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
            <span>
              Once approved, they move to your{" "}
              <strong>Available Balance</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
            <span>
              You can cashout your available balance via Maya Wallet at any
              time.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
