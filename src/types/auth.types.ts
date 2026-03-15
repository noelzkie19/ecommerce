export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "user";
  // Affiliate fields — populated after fetching /api/affiliates/me
  isAffiliate: boolean;
  affiliateStatus?: "active" | "suspended" | "pending" | null;
  affiliatePaymentStatus?: "paid" | "unpaid" | null;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}
