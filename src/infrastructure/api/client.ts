import axios from "axios";
import { tokenStorage } from "@/infrastructure/storage/tokenStorage";
import { getGuestId } from "@/utils/guest.utils";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  const guestId = getGuestId();
  if (guestId) config.headers["x-guest-id"] = guestId;

  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Skip auth redirect for public / guest-accessible endpoints
    const isGuestEndpoint =
      original.url?.includes("/api/orders") ||
      original.url?.includes("/api/cart") ||
      original.url?.includes("/api/testimonials") ||
      original.url?.includes("/api/courses") ||
      // Affiliate payment verification is public (callback from PayMongo)
      original.url?.includes("/api/affiliates/payment/verify") ||
      // Products and stocks are public - allow guest users to browse shop
      // Exclude admin endpoints (they contain /admin/ in the path)
      (original.url?.includes("/api/products") &&
        !original.url?.includes("/admin")) ||
      original.url?.includes("/api/stocks/availability");

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/auth/refresh") &&
      !original.url?.includes("/auth/me") &&
      !isGuestEndpoint
    ) {
      original._retry = true;
      const refresh = tokenStorage.getRefreshToken();

      if (refresh) {
        try {
          const { data } = await apiClient.post("/api/auth/refresh", {
            refreshToken: refresh,
          });
          tokenStorage.set(data.accessToken, data.refreshToken);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(original);
        } catch (refreshErr) {
          tokenStorage.clear();
          if (typeof globalThis !== "undefined")
            globalThis.location.href = "/login";
        }
      } else {
        tokenStorage.clear();
        if (typeof globalThis !== "undefined")
          globalThis.location.href = "/login";
      }
    }

    throw error;
  },
);
