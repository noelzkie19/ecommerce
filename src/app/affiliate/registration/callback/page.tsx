"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { affiliateDashboardService } from "@/features/affiliate/dashboard/services/affiliate-dashboard.service";

type Status = "checking" | "success" | "failed" | "pending" | "error";

// ── Inner component — uses useSearchParams ────────────────────────────────────

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const intentId = searchParams.get("intent_id");
  const userId = searchParams.get("user_id");
  const statusParam = searchParams.get("status");

  const [status, setStatus] = useState<Status>("checking");

  // If Express passes status=success, redirect directly to dashboard
  useEffect(() => {
    if (statusParam === "success") {
      setStatus("success");
      setTimeout(() => {
        router.push("/affiliate/dashboard");
      }, 2000);
    }
  }, [statusParam, router]);

  useEffect(() => {
    // If already success from status param, don't poll
    if (statusParam === "success") return;

    if (!intentId) {
      setStatus("error");
      return;
    }

    let attempts = 0;
    const maxAttempts = 20; // poll for ~1 minute
    let interval: ReturnType<typeof setInterval>;

    const verify = async () => {
      try {
        const result =
          await affiliateDashboardService.verifyRegistrationPayment(
            intentId,
            userId ?? undefined,
          );

        // Check if result is valid
        if (!result) {
          console.error("[AffiliateCallback] Empty result");
          setStatus("error");
          return;
        }

        // Backend may return { success, status } or { success, message: "Payment status: <status>" }
        // Normalize the status field from either source
        const res = result as any;
        const paymentStatus: string =
          res.status || res.message?.replace("Payment status: ", "") || "";

        // Handle both successful payment and already-confirmed cases
        if (paymentStatus === "succeeded" || result.alreadyConfirmed) {
          clearInterval(interval);
          setStatus("success");
          // Redirect directly to dashboard - affiliate is activated immediately
          setTimeout(() => {
            router.push("/affiliate/dashboard");
          }, 2000);
        } else if (paymentStatus === "payment_intent.payment_failed") {
          clearInterval(interval);
          setStatus("failed");
        } else {
          // awaiting_next_action or other intermediate states — keep polling
          attempts++;
          if (attempts >= maxAttempts) {
            clearInterval(interval);
            setStatus("pending"); // timed out, show pending UI
          }
        }
      } catch (err: any) {
        console.error("[AffiliateCallback] Error:", err);
        // Show more specific error message if available
        const errorMessage =
          err?.response?.data?.message || err?.message || "Unknown error";
        console.error("[AffiliateCallback] Error details:", errorMessage);
        clearInterval(interval);
        setStatus("error");
      }
    };

    verify(); // check immediately
    interval = setInterval(verify, 3000); // then every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [intentId, userId, router]);

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
            Your affiliate account is now active.
          </p>
          <p className="text-sm text-orange-600 font-medium">
            Please check your email for confirmation. You will receive a
            confirmation email once your registration is processed.
          </p>
          <p className="text-sm text-orange-600 font-medium mt-2">
            Redirecting to your dashboard...
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="text-6xl">❌</div>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-gray-500 text-center">
            Your payment could not be completed. Please try again.
          </p>
          <button
            onClick={() => router.push("/affiliate/onboarding")}
            className="mt-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all"
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
            Your payment is still being processed. We'll update your account
            once confirmed.
          </p>
          <button
            onClick={() => router.push("/affiliate/dashboard")}
            className="mt-2 px-6 py-3 bg-yellow-500 text-white font-bold rounded-2xl hover:bg-yellow-600 transition-all"
          >
            Go to Dashboard
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-600">
            Something went wrong
          </h1>
          <p className="text-gray-500 text-center">
            We couldn't verify your payment. Please contact support.
          </p>
          <button
            onClick={() => router.push("/affiliate/onboarding")}
            className="mt-2 px-6 py-3 bg-gray-600 text-white font-bold rounded-2xl hover:bg-gray-700 transition-all"
          >
            Back to Registration
          </button>
        </>
      )}
    </div>
  );
}

// ── Fallback shown while CallbackContent loads ───────────────────────────────

function CallbackFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      <h1 className="text-xl font-bold text-gray-600">Loading...</h1>
    </div>
  );
}

// ── Page — wraps in Suspense (required by Next.js for useSearchParams) ─────────

export default function AffiliateRegistrationCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
}
