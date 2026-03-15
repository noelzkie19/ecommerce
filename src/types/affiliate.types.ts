export type AffiliateStatus = "pending" | "active" | "suspended";
export type PaymentStatus = "unpaid" | "paid";
export type CommissionType = "percentage" | "fixed";

// ── Affiliate ─────────────────────────────────────────────────────────────────

export interface Affiliate {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  status: AffiliateStatus;
  paymentStatus: PaymentStatus;
  pixelId?: string;
  storeId?: string;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
  totalSales?: number;
  totalCommissions?: number;
}

// ── Affiliate Product assignment ──────────────────────────────────────────────

export interface AffiliateProduct {
  id: string;
  affiliateId: string;
  productId: string;
  commissionType: CommissionType;
  commissionValue: number;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
}

// ── Pagination ────────────────────────────────────────────────────────────────

export interface AffiliateMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AffiliatesResponse {
  data: Affiliate[];
  meta: AffiliateMeta;
}

// ── Auth user (invite dropdown) ───────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

// ── DTOs ──────────────────────────────────────────────────────────────────────

export interface CreateAffiliateDTO {
  email: string;
  pixelId?: string;
  storeId?: string;
  status?: AffiliateStatus;
}

export interface UpdateAffiliateDTO {
  name?: string;
  email?: string;
  status?: AffiliateStatus;
  paymentStatus?: PaymentStatus;
  pixelId?: string;
  storeId?: string;
}

export interface AssignProductDTO {
  productId: string;
  commissionType: CommissionType;
  commissionValue: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedAffiliates {
  data: Affiliate[];
  meta: PaginationMeta;
}
