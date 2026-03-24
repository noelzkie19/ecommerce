"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { orderService } from "@/features/store/order/services/order.service";
import { trackPurchase, trackLead } from "@/lib/meta-pixel";

type Status = "checking" | "success" | "failed" | "pending" | "error";

// ── Inner component — uses useSearchParams ────────────────────────────────────

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const intentId = searchParams.get("intent_id");

  const [status, setStatus] = useState<Status>("checking");
  const [orderId, setOrderId] = useState<string | null>(null);

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
    if (!intentId) {
      setStatus("error");
      return;
    }

    let attempts = 0;
    const maxAttempts = 20; // poll for ~1 minute
    let interval: NodeJS.Timeout;

    const verify = async () => {
      try {
        const result = await orderService.verifyMaya(intentId);
        setOrderId(result.orderId);

        if (result.status === "succeeded") {
          clearInterval(interval);
          setStatus("success");
          trackPurchaseEvent();
        } else if (result.status === "payment_intent.payment_failed") {
          clearInterval(interval);
          setStatus("failed");
        } else {
          // still pending — keep polling
          attempts++;
          if (attempts >= maxAttempts) {
            clearInterval(interval);
            setStatus("pending"); // timed out, show pending UI
          }
        }
      } catch {
        clearInterval(interval);
        setStatus("error");
      }
    };

    verify(); // check immediately
    interval = setInterval(verify, 3000); // then every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [intentId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      {status === "checking" && (
        <>
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <h1 className="text-xl font-bold text-gray-600">
            Verifying your payment...
          </h1>
          <p className="text-sm text-gray-400">Please wait a moment.</p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="text-6xl">✅</div>
          <h1 className="text-2xl font-bold text-green-600">
            Payment Confirmed!
          </h1>
          <p className="text-gray-500 text-center">
            Your order has been placed and is now being processed.
          </p>
          {orderId && (
            <p className="text-xs text-gray-400">Order ID: {orderId}</p>
          )}
          <button
            onClick={() => router.push("/")}
            className="mt-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all"
          >
            Go to Home
          </button>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="text-6xl">❌</div>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-gray-500 text-center">
            Your GCash payment could not be completed. No charges were made.
          </p>
          <button
            onClick={() => router.push("/checkout")}
            className="mt-2 px-6 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all"
          >
            Try Again
          </button>
        </>
      )}

      {status === "pending" && (
        <>
          <div className="text-6xl">⏳</div>
          <h1 className="text-2xl font-bold text-yellow-600">
            Payment Processing
          </h1>
          <p className="text-gray-500 text-center">
            Your payment is still being processed. We'll update your order once
            confirmed.
          </p>
          {orderId && (
            <button
              onClick={() => router.push("/")}
              className="mt-2 px-6 py-3 bg-yellow-500 text-white font-bold rounded-2xl hover:bg-yellow-600 transition-all"
            >
              Go to Home
            </button>
          )}
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-600">
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
      <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      <h1 className="text-xl font-bold text-gray-600">
        Verifying your payment...
      </h1>
      <p className="text-sm text-gray-400">Please wait a moment.</p>
    </div>
  );
}

// ── Page — wraps in Suspense (required by Next.js for useSearchParams) ─────────

export default function CheckoutCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
}
