"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PackageCheck, Loader2 } from "lucide-react";
import { trackPurchase, trackLead } from "@/lib/meta-pixel";

type Status = "checking" | "success" | "failed" | "error";

// ── Inner component — uses useSearchParams ────────────────────────────────────

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");
  const alreadyConfirmed = searchParams.get("already_confirmed") === "true";

  const [displayStatus, setDisplayStatus] = useState<Status>("checking");

  // Track purchase when payment succeeds
  const trackPurchaseEvent = () => {
    if (typeof sessionStorage === "undefined") return;

    const orderDataStr = sessionStorage.getItem("pending_order");
    if (!orderDataStr) return;

    try {
      const orderData = JSON.parse(orderDataStr);
      // Only track if order is recent (within 30 minutes)
      const thirtyMinutes = 30 * 60 * 1000;
      if (Date.now() - orderData.timestamp > thirtyMinutes) {
        sessionStorage.removeItem("pending_order");
        return;
      }

      trackPurchase(orderData.total, orderData.items);

      // Track Lead event for first-time buyers
      const hasPurchasedBefore = localStorage.getItem("hasPurchased");
      if (!hasPurchasedBefore) {
        trackLead();
        localStorage.setItem("hasPurchased", "true");
      }

      sessionStorage.removeItem("pending_order");
    } catch (e) {
      console.error("Failed to track purchase:", e);
    }
  };

  useEffect(() => {
    if (!status) {
      setDisplayStatus("error");
      return;
    }

    if (status === "succeeded" || alreadyConfirmed) {
      setDisplayStatus("success");
      trackPurchaseEvent();
      // Auto-redirect to home after 3 seconds
      setTimeout(() => router.push("/"), 3000);
    } else if (status === "failed") {
      setDisplayStatus("failed");
    } else {
      setDisplayStatus("error");
    }
  }, [status, alreadyConfirmed, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      {displayStatus === "checking" && (
        <>
          <Loader2 size={48} className="text-orange-500 animate-spin" />
          <h1 className="text-xl font-bold text-gray-600">
            Verifying your payment...
          </h1>
          <p className="text-sm text-gray-400">Please wait a moment.</p>
        </>
      )}

      {displayStatus === "success" && (
        <>
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            }}
          >
            <PackageCheck size={48} color="white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-green-600">
            Payment Confirmed!
          </h1>
          <p className="text-gray-500 text-center">
            Your order has been placed and is now being processed.
          </p>
          {orderId && (
            <p className="text-xs text-gray-400">Order ID: {orderId}</p>
          )}
          <p className="text-sm text-orange-500 font-medium mt-2">
            Redirecting to home...
          </p>
        </>
      )}

      {displayStatus === "failed" && (
        <>
          <div className="text-6xl">❌</div>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-gray-500 text-center">
            Your payment could not be completed. No charges were made.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all"
          >
            Go to Home
          </button>
        </>
      )}

      {displayStatus === "error" && (
        <>
          <div className="text-6xl">⚠️</div>
          <h1 className="text-xl font-bold text-gray-600">
            Something went wrong
          </h1>
          <p className="text-gray-500 text-center">
            We couldn't verify your payment. Please check your orders or contact
            support.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="mt-2 px-6 py-3 bg-gray-600 text-white font-bold rounded-2xl hover:bg-gray-700 transition-all"
          >
            My Orders
          </button>
        </>
      )}
    </div>
  );
}

// ── Fallback shown while CallbackContent loads ────────────────────────────────

function CallbackFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <Loader2 size={48} className="text-orange-500 animate-spin" />
      <h1 className="text-xl font-bold text-gray-600">
        Verifying your payment...
      </h1>
      <p className="text-sm text-gray-400">Please wait a moment.</p>
    </div>
  );
}

// ── Page — wraps in Suspense (required by Next.js for useSearchParams) ─────────

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
}
