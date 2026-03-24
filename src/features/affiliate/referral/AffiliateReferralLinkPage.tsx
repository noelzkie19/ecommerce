"use client";

import { useState, useEffect } from "react";
import { Link2, Copy, CheckCheck, ExternalLink, Store } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { affiliateDashboardService } from "../dashboard/services/affiliate-dashboard.service";
import { Button } from "@/shared/components/ui/Button";

export const AffiliateReferralLinkPage = () => {
  const [referralLink, setReferralLink] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [storeLink, setStoreLink] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedStore, setCopiedStore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      affiliateDashboardService.getReferralLink(),
      affiliateDashboardService.getProfile(),
    ])
      .then(([linkData, profile]) => {
        setReferralLink(linkData.referralLink);
        setReferralCode(linkData.referralCode);

        if (profile.storeId) {
          const origin = globalThis.window?.location.origin ?? "";
          setStoreLink(`${origin}/s/${profile.storeId}`);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleCopyRef = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopyStore = async () => {
    if (!storeLink) return;
    await navigator.clipboard.writeText(storeLink);
    setCopiedStore(true);
    setTimeout(() => setCopiedStore(false), 2000);
  };

  return (
    <div>
      <AffiliateTopBar
        title="My Referral Link"
        subtitle="Share your unique link to earn commissions"
      />

      <div className="max-w-lg space-y-4">
        {/* Referral Code + Link */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Referral Code</p>
              <p className="text-gray-800 font-bold text-lg">
                {isLoading ? "—" : referralCode || "—"}
              </p>
            </div>
          </div>

          {/* Referral Link */}
          <p className="text-xs text-gray-400 font-medium mb-1.5">
            Referral Link
          </p>
          <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
            <p className="flex-1 text-sm text-gray-600 truncate font-mono">
              {isLoading ? "Loading…" : referralLink || "Not available"}
            </p>
            <button
              onClick={handleCopyRef}
              disabled={!referralLink || isLoading}
              className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-600 disabled:opacity-40 transition-colors shrink-0"
            >
              {copiedRef ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Store Link (storeId-based) */}
        {(isLoading || storeLink) && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                <Store className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Store Link</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Visitors go directly to the store — Meta Pixel tracks
                  automatically
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
              <p className="flex-1 text-sm text-gray-600 truncate font-mono">
                {isLoading ? "Loading…" : storeLink || "Not available"}
              </p>
              <button
                onClick={handleCopyStore}
                disabled={!storeLink || isLoading}
                className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-600 disabled:opacity-40 transition-colors shrink-0"
              >
                {copiedStore ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {storeLink && (
              <a
                href={storeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-600 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Preview store link
              </a>
            )}
          </div>
        )}

        {/* How it works */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4">How it works</h3>
          <ol className="space-y-3">
            {[
              "Share your referral or store link with friends and family",
              "They visit the store — Meta Pixel fires automatically via your Store ID",
              "You earn a commission on every successful sale",
              "Cashout your earnings via Maya Wallet anytime",
            ].map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 text-sm text-gray-600"
              >
                <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Open referral link */}
        {referralLink && (
          <Button
            variant="primary"
            onClick={() => {
              globalThis.window.open(referralLink, "_blank");
            }}
            className="w-full"
          >
            <ExternalLink className="w-4 h-4" />
            Preview Your Referral Link
          </Button>
        )}
      </div>
    </div>
  );
};
