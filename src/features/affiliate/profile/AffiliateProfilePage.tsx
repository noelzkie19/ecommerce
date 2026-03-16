"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Store,
  Tag,
  Pencil,
  Check,
  X,
  Link2,
  Copy,
} from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { affiliatesApi } from "@/infrastructure/api/affiliate.api";
import { affiliateDashboardService } from "../dashboard/services/affiliate-dashboard.service";
import { useAuthStore } from "@/store/auth.store";
import type { Affiliate } from "@/types/affiliate.types";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/shared/components/ui/Card";

const statusConfig: Record<
  string,
  { dot: string; badge: string; label: string }
> = {
  active: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    label: "Active",
  },
  pending: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    label: "Pending",
  },
  suspended: {
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 border border-red-200",
    label: "Suspended",
  },
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-purple-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className="text-gray-800 text-sm font-semibold mt-0.5 truncate">
        {value}
      </p>
    </div>
  </div>
);

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>{children}</CardContent>
  </Card>
);

export const AffiliateProfilePage = () => {
  const [profile, setProfile] = useState<Affiliate | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const [isEditingPixel, setIsEditingPixel] = useState(false);
  const [pixelInput, setPixelInput] = useState("");
  const [isSavingPixel, setIsSavingPixel] = useState(false);
  const [pixelError, setPixelError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    affiliatesApi
      .getMyStatus()
      .then((res) => {
        const affiliateData = (res.data as any)?.data ?? res.data;
        setProfile(affiliateData);
        setPixelInput(affiliateData?.pixelId ?? "");
        // Backend returns affiliateLink directly in /me response
        const link = affiliateData?.affiliateLink;
        if (link) {
          setReferralLink(link);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleEditPixel = () => {
    setPixelInput(profile?.pixelId ?? "");
    setPixelError(null);
    setIsEditingPixel(true);
  };

  const handleCancelPixel = () => {
    setIsEditingPixel(false);
    setPixelError(null);
  };

  const handleSavePixel = async () => {
    setIsSavingPixel(true);
    setPixelError(null);
    try {
      await affiliateDashboardService.updatePixelId(pixelInput.trim());
      setProfile((prev) =>
        prev ? { ...prev, pixelId: pixelInput.trim() || undefined } : prev,
      );
      setIsEditingPixel(false);
    } catch {
      setPixelError("Failed to save. Please try again.");
    } finally {
      setIsSavingPixel(false);
    }
  };

  const handleCopyLink = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (isLoading) {
    return (
      <div>
        <AffiliateTopBar
          title="Profile"
          subtitle="Your affiliate account details"
        />
        <div className="max-w-4xl space-y-4">
          {/* Avatar skeleton */}
          <Card className="p-6 flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-gray-100 animate-pulse" />
            <div className="h-4 w-36 bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <div className="h-10 bg-gray-50 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </Card>
            <Card>
              <div className="h-10 bg-gray-50 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <AffiliateTopBar
          title="Profile"
          subtitle="Your affiliate account details"
        />
        <div className="max-w-4xl">
          <Card className="p-10 text-center">
            <p className="text-gray-400 text-sm">Profile not found.</p>
          </Card>
        </div>
      </div>
    );
  }

  const displayName = user?.fullName || profile.name;
  const status = statusConfig[profile.status] ?? {
    dot: "bg-gray-400",
    badge: "bg-gray-100 text-gray-600 border border-gray-200",
    label: profile.status,
  };

  return (
    <div>
      <AffiliateTopBar
        title="Profile"
        subtitle="Your affiliate account details"
      />

      <div className="max-w-4xl space-y-4">
        {/* Hero card */}
        <Card>
          {/* Purple banner */}
          <div className="h-20 bg-gradient-to-r from-purple-600 to-purple-800" />
          {/* Avatar + info */}
          <div className="px-5 pb-5 -mt-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 border-4 border-white shadow-md flex items-center justify-center">
              <span className="text-white text-xl font-bold tracking-wide">
                {getInitials(displayName)}
              </span>
            </div>
            <h2 className="mt-3 text-gray-900 font-bold text-lg leading-tight">
              {displayName}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5 truncate max-w-full">
              {user?.email || profile.email}
            </p>
            <span
              className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <p className="mt-2 text-xs text-gray-400">
              Member since{" "}
              <span className="font-semibold text-gray-600">
                {formatDate(profile.createdAt)}
              </span>
            </p>
          </div>
        </Card>

        {/* 2-column grid for details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Account Information */}
          <SectionCard title="Account Information">
            <InfoRow
              icon={User}
              label="Full Name"
              value={user?.fullName || "—"}
            />
            <InfoRow icon={Mail} label="Email" value={user?.email || "—"} />
          </SectionCard>

          {/* Affiliate Details */}
          <SectionCard title="Affiliate Details">
            <InfoRow icon={User} label="Affiliate Name" value={profile.name} />
            <InfoRow
              icon={Mail}
              label="Affiliate Email"
              value={profile.email}
            />
            <InfoRow icon={ShieldCheck} label="Status" value={status.label} />
            <InfoRow
              icon={Calendar}
              label="Member Since"
              value={formatDate(profile.createdAt)}
            />
            {/* Referral Link */}
            <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <Link2 className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
                  Referral Link
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-gray-800 text-sm font-semibold truncate font-mono">
                    {referralLink || "—"}
                  </p>
                  {referralLink && (
                    <button
                      onClick={handleCopyLink}
                      className="text-purple-400 hover:text-purple-600 transition-colors shrink-0"
                      title="Copy referral link"
                    >
                      {copiedLink ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Tracking Settings - full width */}
        <SectionCard title="Tracking Settings">
          <InfoRow
            icon={Store}
            label="Store ID"
            value={profile.storeId || "Not set"}
          />

          {/* Meta Pixel ID — user editable */}
          <div className="flex items-center gap-3 py-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">
                Meta Pixel ID
              </p>
              {isEditingPixel ? (
                <div className="mt-1.5 space-y-2">
                  <input
                    type="text"
                    value={pixelInput}
                    onChange={(e) => setPixelInput(e.target.value)}
                    placeholder="Enter your Meta Pixel ID"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    autoFocus
                  />
                  {pixelError && (
                    <p className="text-xs text-red-500">{pixelError}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="purple"
                      size="sm"
                      onClick={handleSavePixel}
                      loading={isSavingPixel}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelPixel}
                      disabled={isSavingPixel}
                      className="flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-gray-800 text-sm font-semibold truncate">
                    {profile.pixelId || "Not set"}
                  </p>
                  <button
                    onClick={handleEditPixel}
                    className="text-purple-400 hover:text-purple-600 transition-colors shrink-0"
                    title="Edit Meta Pixel ID"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
