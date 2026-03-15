export interface AffiliateDashboardStats {
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  availableBalance: number;
  totalReferrals: number;
}

export interface AffiliateSaleChartPoint {
  date: string; // e.g. "Sun", "Mon", ...
  sales: number;
}

export interface AffiliateDashboard {
  stats: AffiliateDashboardStats;
  salesChart: AffiliateSaleChartPoint[];
}

export interface AffiliateProfile {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  status: "active" | "suspended";
  referralCode: string;
  pixelId?: string; // ← Meta Pixel ID for tracking
  storeId?: string; // ← Store ID for affiliate
  createdAt: string;
}

export interface AffiliateCashoutRequest {
  amount: number;
  mayaNumber: string;
  mayaName: string;
}

export interface AffiliateCashout {
  id: string;
  affiliateId: string;
  amount: number;
  mayaNumber: string;
  mayaName: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
