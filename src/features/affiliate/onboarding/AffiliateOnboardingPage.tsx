"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Link2,
  Zap,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { affiliateDashboardService } from "../dashboard/services/affiliate-dashboard.service";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Spinner } from "@/shared/components/ui/Spinner";

// PayMongo polling constants - aligned with checkout modal best practices
const MAX_POLL_ATTEMPTS = 100; // 100 * 3s = 5 minutes max
const POLL_INTERVAL_MS = 3000;

const BENEFITS = [
  { icon: Link2, label: "Unique referral link" },
  { icon: Zap, label: "Earn commissions on every sale" },
  { icon: ShieldCheck, label: "Access to training courses" },
  { icon: CreditCard, label: "Easy Maya cashout" },
];

// Reusable BrandHeader component
const BrandHeader = ({ initial }: { initial: string }) => (
  <div className="flex flex-col items-center mb-8">
    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-4 shadow-lg shadow-orange-900/30">
      {initial}
    </div>
    <h1 className="text-2xl font-extrabold text-white tracking-tight">
      Triad365
    </h1>
  </div>
);

// Reusable PaymentSuccessCard component
const PaymentSuccessCard = ({ initial }: { initial: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-12">
    <BrandHeader initial={initial} />

    <Card className="w-full max-w-sm p-7">
      <CardContent className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Your payment has been received
        </p>
      </CardContent>

      <div className="bg-blue-50 rounded-xl py-5 text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <p className="text-lg font-bold text-blue-600">Pending Approval</p>
        </div>
        <p className="text-blue-400 text-sm">
          Our team is reviewing your application. You'll be notified once
          approved.
        </p>
      </div>

      <p className="text-gray-400 text-xs text-center">
        You can check back later or contact support if you have questions.
      </p>
    </Card>
  </div>
);

// Reusable QRCard component (fallback when Maya Wallet deep link is not available)
const QRCard = ({
  qrCodeUrl,
  pollStatus,
  onCheckPayment,
  onTryAgain,
  onCheckAgain,
  onClose,
}: {
  qrCodeUrl: string;
  pollStatus: "waiting" | "paid" | "failed" | "timeout";
  onCheckPayment: () => void;
  onTryAgain: () => void;
  onCheckAgain: () => void;
  onClose: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-12">
    <BrandHeader initial="T" />
    <p className="text-orange-300 text-sm mt-1 mb-6">
      Scan to pay with Maya Wallet
    </p>

    <Card className="w-full max-w-sm p-7">
      <CardContent className="text-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">
          Pay ₱99 via Maya Wallet
        </h2>
        <p className="text-gray-400 text-sm mt-1">Scan the QR code below</p>
      </CardContent>

      {/* QR Code */}
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white rounded-xl border-2 border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrCodeUrl}
            alt="Maya Wallet QR Code"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>

      <p className="text-gray-400 text-xs text-center mb-6">
        Open your Maya Wallet app, scan the QR code, and complete the payment
      </p>

      {/* Payment Status Indicator */}
      {pollStatus === "waiting" && (
        <div className="flex items-center justify-center gap-2 mb-4 text-orange-500">
          <Spinner size="sm" />
          <span className="text-sm font-medium">Waiting for payment...</span>
        </div>
      )}

      {pollStatus === "paid" && (
        <div className="flex items-center justify-center gap-2 mb-4 text-green-600">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Payment confirmed!</span>
        </div>
      )}

      {pollStatus === "failed" && (
        <div className="flex items-center justify-center gap-2 mb-4 text-red-600">
          <span className="text-sm font-medium">
            Payment failed. Please try again.
          </span>
        </div>
      )}

      {pollStatus === "timeout" && (
        <div className="flex flex-col items-center gap-2 mb-4 text-yellow-600">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium text-center">
            Payment is being processed
          </span>
          <span className="text-xs text-yellow-500 text-center">
            Your payment may still be processing. We'll update your status
            shortly.
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {pollStatus === "waiting" && (
          <Button
            variant="primary"
            onClick={onCheckPayment}
            className="w-full flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            I've Completed Payment
          </Button>
        )}
        {pollStatus === "failed" && (
          <Button variant="primary" onClick={onTryAgain} className="w-full">
            Try Again
          </Button>
        )}
        {pollStatus === "timeout" && (
          <Button variant="secondary" onClick={onCheckAgain} className="w-full">
            Check Again
          </Button>
        )}
        <Button variant="ghost" onClick={onClose} className="w-full">
          Back
        </Button>
      </div>

      <p className="text-gray-400 text-xs text-center mt-4 flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        Secured by PayMongo. Your payment is encrypted and safe.
      </p>
    </Card>
  </div>
);

// Reusable OnboardingCard component
const OnboardingCard = ({
  isLoading,
  error,
  onPay,
  referralCode,
}: {
  isLoading: boolean;
  error: string | null;
  onPay: () => void;
  referralCode?: string | null;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-12">
    <BrandHeader initial="T" />
    <p className="text-orange-300 text-sm mt-1 mb-8">
      Activate your affiliate account
    </p>

    <Card className="w-full max-w-sm p-7">
      <CardContent className="text-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">
          Join Affiliate Program
        </h2>
        <p className="text-gray-400 text-sm mt-1">One-time registration fee</p>
      </CardContent>

      {/* Price */}
      <div className="bg-orange-50 rounded-xl py-5 text-center mb-6">
        <p className="text-4xl font-extrabold text-orange-500">₱999</p>
        <p className="text-orange-400 text-sm mt-1">PHP via Maya Wallet</p>
      </div>

      {/* Benefits */}
      <ul className="space-y-3 mb-7">
        {BENEFITS.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 text-gray-600 text-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
            {label}
          </li>
        ))}
      </ul>

      {/* Referral indicator */}
      {referralCode && (
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 mb-6 text-center">
          <p className="text-xs text-orange-600 font-medium">
            🎉 You were referred by an existing affiliate!
          </p>
          <p className="text-xs text-orange-400 mt-1">
            They'll earn a commission when you complete registration
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs text-center mb-4">{error}</p>
      )}

      {/* CTA */}
      <Button
        variant="primary"
        onClick={onPay}
        loading={isLoading}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Pay ₱999 with Maya Wallet"}
      </Button>

      <p className="text-gray-400 text-xs text-center mt-4 flex items-center justify-center gap-1">
        <Lock className="w-3 h-3" />
        Secured by PayMongo. Your payment is encrypted and safe.
      </p>
    </Card>
  </div>
);

// Reusable Fallback component
const AffiliateOnboardingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
    <Spinner size="lg" className="text-orange-400" />
  </div>
);

const AffiliateOnboardingContent = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams?.get("status");
  const isPaid = paymentStatus === "paid";

  // Capture referral code from URL (e.g., ?ref=CODE) or sessionStorage fallback
  // (sessionStorage is set by useRegister when a user signs up via a referral link)
  const urlRef = searchParams?.get("ref") || null;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const hasSessionStorage = typeof sessionStorage !== "undefined";
  const sessionRef = hasSessionStorage
    ? sessionStorage.getItem("affiliate_ref")
    : null;
  const referralCode = urlRef || sessionRef || null;

  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR code state
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [pollStatus, setPollStatus] = useState<
    "waiting" | "paid" | "failed" | "timeout"
  >("waiting");

  const initial = user?.fullName?.[0]?.toUpperCase() ?? "A";

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[Onboarding] Creating payment...");
      const result = await affiliateDashboardService.register(
        referralCode || undefined,
      );
      console.log("[Onboarding] Payment result:", result);
      console.log("[Onboarding] Redirect URL:", result.redirectUrl);

      // Clear the sessionStorage ref now that it has been consumed by the
      // payment creation request — prevents stale refs on future visits.
      try {
        sessionStorage.removeItem("affiliate_ref");
      } catch {
        // ignore
      }

      // Priority: Maya Wallet deep link > QR code (fallback)
      // Maya Wallet opens the app directly via deep link
      if (result.redirectUrl) {
        console.log(
          "[Onboarding] Opening Maya Wallet via deep link:",
          result.redirectUrl,
        );
        // Direct redirect to Maya Wallet - this opens the Maya app
        globalThis.location.href = result.redirectUrl;
      } else if (result.qrCodeUrl) {
        console.log(
          "[Onboarding] Using QR code flow, intent:",
          result.paymentIntentId,
        );
        setQrCodeUrl(result.qrCodeUrl);
        setPaymentIntentId(result.paymentIntentId);
      } else {
        console.error("[Onboarding] No payment URLs returned:", result);
        setError("No payment method available. Please try again.");
      }
    } catch (err: unknown) {
      console.error("[Onboarding] Payment error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initiate payment. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Poll for payment confirmation when QR code is shown
  const checkPaymentStatus = async () => {
    if (!paymentIntentId || pollStatus !== "waiting") return;

    try {
      const result = await affiliateDashboardService.verifyRegistrationPayment(
        paymentIntentId,
        user?.id,
      );
      console.log("[Onboarding] Payment status raw:", result);

      // Backend may return { status } or { message: "Payment status: <status>" }
      // Normalize the status field from either source (same as checkout callback)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = result as Record<string, unknown>;
      const status: string =
        (res.status as string) ||
        (typeof res.message === "string"
          ? res.message.replace("Payment status: ", "")
          : "");

      console.log("[Onboarding] Payment status parsed:", status);

      if (status === "succeeded" || result.alreadyConfirmed) {
        setPollStatus("paid");
        // Redirect directly to dashboard - affiliate is activated immediately
        setTimeout(() => {
          globalThis.location.href = "/affiliate/dashboard";
        }, 1500);
      } else if (status === "payment_intent.payment_failed") {
        setPollStatus("failed");
      }
      // awaiting_next_action or other intermediate states — keep polling
    } catch (err) {
      console.error("[Onboarding] Payment check error:", err);
      // Don't change status on error - keep polling
    }
  };

  // Track polling attempts to implement timeout
  const pollAttempts = useRef(0);

  const handleCloseQr = () => {
    setQrCodeUrl(null);
    setPaymentIntentId(null);
    setPollStatus("waiting");
    pollAttempts.current = 0;
  };

  // Poll for payment status when QR code is shown
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Only poll if QR is shown and we're still waiting
    if (qrCodeUrl && paymentIntentId && !isPaid && pollStatus === "waiting") {
      console.log(
        "[Onboarding] Starting payment polling for:",
        paymentIntentId,
      );

      // Check immediately
      checkPaymentStatus();

      // Then poll every 3 seconds, up to max attempts
      intervalRef.current = setInterval(() => {
        pollAttempts.current++;

        // Check if we've exceeded max attempts
        if (pollAttempts.current >= MAX_POLL_ATTEMPTS) {
          console.log("[Onboarding] Max poll attempts reached, stopping");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setPollStatus("timeout");
          return;
        }

        checkPaymentStatus();
      }, POLL_INTERVAL_MS);
    }

    // Cleanup on unmount or when polling should stop
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      pollAttempts.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeUrl, paymentIntentId, isPaid]);

  // Show "waiting for approval" UI when payment is successful
  if (isPaid) {
    return <PaymentSuccessCard initial={initial} />;
  }

  // Show QR code if available
  if (qrCodeUrl) {
    return (
      <QRCard
        qrCodeUrl={qrCodeUrl}
        pollStatus={pollStatus}
        onCheckPayment={checkPaymentStatus}
        onTryAgain={() => {
          pollAttempts.current = 0;
          setPollStatus("waiting");
        }}
        onCheckAgain={() => {
          pollAttempts.current = 0;
          setPollStatus("waiting");
        }}
        onClose={handleCloseQr}
      />
    );
  }

  // Show payment UI for pending affiliates (default)
  return (
    <OnboardingCard
      isLoading={isLoading}
      error={error}
      onPay={handlePay}
      referralCode={referralCode}
    />
  );
};

export const AffiliateOnboardingPage = () => {
  return (
    <Suspense fallback={<AffiliateOnboardingFallback />}>
      <AffiliateOnboardingContent />
    </Suspense>
  );
};
