"use client";

import { ShoppingBag, Banknote, TrendingUp, Wallet, Users } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { AffiliateStatCard } from "../shared/components/AffiliateStatCard";
import { AffiliateSalesChart } from "../shared/components/AffiliateSalesChart";
import { useAffiliateDashboard } from "./hooks/useAffiliateDashboard";

const DEFAULT_CHART = [
  { date: "Sun", sales: 0 },
  { date: "Mon", sales: 0 },
  { date: "Tue", sales: 0 },
  { date: "Wed", sales: 0 },
  { date: "Thu", sales: 0 },
  { date: "Fri", sales: 0 },
  { date: "Sat", sales: 0 },
];

const fmt = (n: number) =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 0 })}`;

export const AffiliateDashboardPage = () => {
  const { user } = useAuthStore();
  const { dashboard, isLoading } = useAffiliateDashboard();

  const stats = dashboard?.stats;
  const chart = dashboard?.salesChart ?? DEFAULT_CHART;

  return (
    <div>
      <AffiliateTopBar
        title="Dashboard"
        subtitle={`Welcome back, ${user?.fullName ?? "Affiliate"}!`}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <AffiliateStatCard
          label="Total Sales"
          value={isLoading ? "—" : fmt(stats?.totalSales ?? 0)}
          icon={ShoppingBag}
        />
        <AffiliateStatCard
          label="Total Commission"
          value={isLoading ? "—" : fmt(stats?.totalCommission ?? 0)}
          icon={Banknote}
        />
        <AffiliateStatCard
          label="Pending Commission"
          value={isLoading ? "—" : fmt(stats?.pendingCommission ?? 0)}
          icon={TrendingUp}
        />
        <AffiliateStatCard
          label="Available Balance"
          value={isLoading ? "—" : fmt(stats?.availableBalance ?? 0)}
          icon={Wallet}
        />
        <AffiliateStatCard
          label="Total Referrals"
          value={isLoading ? "—" : (stats?.totalReferrals ?? 0).toString()}
          icon={Users}
        />
      </div>

      {/* Chart */}
      <AffiliateSalesChart data={chart} />
    </div>
  );
};
