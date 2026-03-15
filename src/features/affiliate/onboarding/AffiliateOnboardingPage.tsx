"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Link2,
  Zap,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  Clock,
  QrCode,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { affiliateDashboardService } from "../dashboard/services/affiliate-dashboard.service";

const BENEFITS = [
  { icon: Link2, label: "Unique referral link" },
  { icon: Zap, label: "Earn commissions on every sale" },
  { icon: ShieldCheck, label: "Access to training courses" },
  { icon: CreditCard, label: "Easy GCash cashout" },
];

const AffiliateOnboardingContent = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");
  const isPaid = paymentStatus === "paid";

  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const initial = user?.fullName?.[0]?.toUpperCase() ?? "A";

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[Onboarding] Creating payment...");
      const result = await affiliateDashboardService.register();
      console.log("[Onboarding] Payment result:", result);

      // If QR code is available, show it inline
      if (result.qrCodeUrl) {
        setQrCodeUrl(result.qrCodeUrl);
      } else if (result.redirectUrl) {
        // Fall back to redirect flow
        globalThis.location.href = result.redirectUrl;
      } else {
        console.error("[Onboarding] No payment URLs returned:", result);
        setError("No payment method available. Please try again.");
      }
    } catch (err: any) {
      console.error("[Onboarding] Payment error:", err);
      setError(err?.message || "Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseQr = () => {
    setQrCodeUrl(null);
  };

  // Show "waiting for approval" UI when payment is successful
  if (isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#1a0533] flex flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-4 shadow-lg shadow-purple-900/50">
            {initial}
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            TriadMarket
          </h1>
          <p className="text-purple-300 text-sm mt-1">
            Payment received - awaiting approval
          </p>
        </div>

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-7">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Payment Successful!
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Your payment has been received
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl py-5 text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-lg font-bold text-blue-600">
                Pending Approval
              </p>
            </div>
            <p className="text-blue-400 text-sm">
              Our team is reviewing your application. You'll be notified once
              approved.
            </p>
          </div>

          <p className="text-gray-400 text-xs text-center">
            You can check back later or contact support if you have questions.
          </p>
        </div>
      </div>
    );
  }

  // Show QR code if available
  if (qrCodeUrl) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#1a0533] flex flex-col items-center justify-center px-4 py-12">
        {/* Brand */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-4 shadow-lg shadow-purple-900/50">
            {initial}
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            TriadMarket
          </h1>
          <p className="text-purple-300 text-sm mt-1">Scan to pay with GCash</p>
        </div>

        {/* QR Code Card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-7">
          <div className="text-center mb-6">
            <h2 className="text-xl font-extrabold text-gray-900">
              Pay ₱999 via GCash
            </h2>
            <p className="text-gray-400 text-sm mt-1">Scan the QR code below</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-xl border-2 border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrCodeUrl}
                alt="GCash QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>

          <p className="text-gray-400 text-xs text-center mb-6">
            Open your GCash app, scan the QR code, and complete the payment
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <a
              href="/affiliate/registration/callback"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              I've Completed Payment
            </a>
            <button
              onClick={handleCloseQr}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              Back
            </button>
          </div>

          <p className="text-gray-400 text-xs text-center mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Secured by PayMongo. Your payment is encrypted and safe.
          </p>
        </div>
      </div>
    );
  }

  // Show payment UI for pending affiliates (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#1a0533] flex flex-col items-center justify-center px-4 py-12">
      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white mb-4 shadow-lg shadow-purple-900/50">
          {initial}
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          TriadMarket
        </h1>
        <p className="text-purple-300 text-sm mt-1">
          Activate your affiliate account
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-7">
        <div className="text-center mb-6">
          <h2 className="text-xl font-extrabold text-gray-900">
            Join Affiliate Program
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            One-time registration fee
          </p>
        </div>

        {/* Price */}
        <div className="bg-purple-50 rounded-xl py-5 text-center mb-6">
          <p className="text-4xl font-extrabold text-purple-600">₱999</p>
          <p className="text-purple-400 text-sm mt-1">PHP via GCash</p>
        </div>

        {/* Benefits */}
        <ul className="space-y-3 mb-7">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-gray-600 text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
              {label}
            </li>
          ))}
        </ul>

        {error && (
          <p className="text-red-500 text-xs text-center mb-4">{error}</p>
        )}

        {/* CTA */}
        <button
          onClick={handlePay}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4" />
              Pay ₱999 via GCash
            </>
          )}
        </button>

        <p className="text-gray-400 text-xs text-center mt-4 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Secured by PayMongo. Your payment is encrypted and safe.
        </p>
      </div>
    </div>
  );
};

const AffiliateOnboardingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#1a0533] via-[#2d0a5e] to-[#1a0533] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const AffiliateOnboardingPage = () => {
  return (
    <Suspense fallback={<AffiliateOnboardingFallback />}>
      <AffiliateOnboardingContent />
    </Suspense>
  );
};
