"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Spinner } from "@/shared/components/ui/Spinner";
import { authService } from "@/features/auth";

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

      <p className="text-gray-400 text-xs text-center mb-4">
        Please check your email for confirmation. You will receive a
        confirmation email once your registration is processed.
      </p>

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
  const router = useRouter();

  // Redirect to dashboard if user is an active affiliate
  useEffect(() => {
    const { user, isActiveAffiliate } = useAuthStore.getState();
    if (user?.isAffiliate && isActiveAffiliate()) {
      router.replace("/affiliate/dashboard");
    }
  }, [router]);

  // Capture referral code from URL (e.g., ?ref=CODE) or sessionStorage fallback
  // (sessionStorage is set by useRegister when a user signs up via a referral link)
  // const urlRef = searchParams?.get("ref") || null; // Not used in current implementation
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  // const hasSessionStorage = typeof sessionStorage !== "undefined";
  // const sessionRef = hasSessionStorage
  //   ? sessionStorage.getItem("affiliate_ref")
  //   : null;
  // const referralCode = urlRef || sessionRef || null; // Not used in current implementation

  const { user } = useAuthStore();
  const initial = user?.fullName?.[0]?.toUpperCase() ?? "A";

  // Show "waiting for approval" UI when payment is successful
  if (isPaid) {
    return <PaymentSuccessCard initial={initial} />;
  }

  // Always show pending approval UI (no payment required)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-12">
      <BrandHeader initial={initial} />

      <Card className="w-full max-w-sm p-7">
        <CardContent className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">
            Registration Successful!
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Your affiliate registration has been submitted
          </p>
        </CardContent>

        <div className="bg-blue-50 rounded-xl py-5 text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <p className="text-lg font-bold text-blue-600">Pending Approval</p>
          </div>
          <p className="text-blue-400 text-sm">
            Our team is reviewing your application. You'll be notified once
            approved. Please send proof of payment to admin for verification.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => {
              authService
                .logout()
                .then(() => {
                  globalThis.window.location.href = "/";
                })
                .catch((error) => {
                  console.error("Logout failed:", error);
                  // Fallback: clear state and redirect anyway
                  useAuthStore.getState().clearUser();
                  globalThis.window.location.href = "/";
                });
            }}
            className="w-full text-sm"
          >
            Sign Out
          </Button>
        </div>

        <p className="text-gray-400 text-xs text-center mb-4">
          Please check your email for confirmation. You will receive a
          confirmation email once your registration is processed.
        </p>

        <p className="text-gray-400 text-xs text-center">
          You can check back later or contact support if you have questions.
        </p>
      </Card>
    </div>
  );
};

export const AffiliateOnboardingPage = () => {
  return (
    <Suspense fallback={<AffiliateOnboardingFallback />}>
      <AffiliateOnboardingContent />
    </Suspense>
  );
};
