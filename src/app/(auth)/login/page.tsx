"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingBag,
  Users,
  UserCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { LoginForm, GoogleButton, useForgotPassword } from "@/features/auth";
import { getGuestId } from "@/utils/guest.utils";

type SignInType =
  | "select"
  | "guest"
  | "customer"
  | "affiliate"
  | "shop-guest"
  | "shop-signup";
type AuthMode = "login" | "signup" | "forgot";

// ── Back Button ─────────────────────────────────────────────────────
interface BackButtonProps {
  readonly onClick: () => void;
  readonly colorClass: string;
}

function BackButton({ onClick, colorClass }: Readonly<BackButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${colorClass} text-sm font-medium mb-6 transition-colors`}
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}

// ── Customer Guest Form ───────────────────────────────────────────────────
interface CustomerGuestFormProps {
  readonly redirectTo: string;
}

function CustomerGuestForm({ redirectTo }: Readonly<CustomerGuestFormProps>) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const CUSTOMER_NAME_KEY = "customer_name";

  const handleContinue = () => {
    setLoading(true);
    try {
      // Get or create guest ID
      // Get or create guest ID (has side effect of creating/storing if not exists)
      getGuestId();

      // Store customer name if provided
      if (name.trim()) {
        localStorage.setItem(CUSTOMER_NAME_KEY, name.trim());
      }

      // Redirect to store
      router.push(redirectTo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="customer-name"
          className="text-sm font-medium text-gray-700"
        >
          Your Name
        </label>
        <input
          id="customer-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name (optional)"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-colors"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to continue as "Guest"
        </p>
      </div>
      <button
        onClick={handleContinue}
        disabled={loading}
        className="w-full bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
      >
        {loading ? "Continuing..." : "Continue to Store"}
      </button>
    </div>
  );
}

// ── Forgot Password Form ───────────────────────────────────────────────────
interface ForgotPasswordFormProps {
  readonly inputId: string;
  readonly accentColor: string;
  readonly forgotEmail: string;
  readonly onEmailChange: (email: string) => void;
  readonly onSend: () => void;
  readonly loading: boolean;
  readonly message: string;
}

function ForgotPasswordForm({
  inputId,
  accentColor,
  forgotEmail,
  onEmailChange,
  onSend,
  loading,
  message,
}: Readonly<ForgotPasswordFormProps>) {
  const messageColorClass = message.includes("sent")
    ? "text-green-600"
    : "text-red-500";
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id={inputId}
          type="email"
          value={forgotEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-colors"
        />
      </div>
      {message && <p className={`text-xs ${messageColorClass}`}>{message}</p>}
      <button
        onClick={onSend}
        disabled={loading}
        className="w-full bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>
    </div>
  );
}

// ── Type Selection Screen ──────────────────────────────────────────────────
interface SelectScreenProps {
  readonly onGuestContinue: () => void;
  readonly onSelectCustomer: () => void;
  readonly onSelectAffiliate: () => void;
}

function SelectScreen({
  onGuestContinue,
  onSelectCustomer,
  onSelectAffiliate,
}: Readonly<SelectScreenProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 border border-white/20">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Triad365
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            How would you like to continue?
          </p>
        </div>

        {/* Shop Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            Shop
          </h2>
          <div className="space-y-3">
            {/* Guest */}
            <button
              onClick={onGuestContinue}
              className="w-full group flex items-center gap-4 p-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-200 text-left"
            >
              <div className="w-12 h-12 bg-gray-400/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-400/30 transition-colors">
                <UserCheck className="w-6 h-6 text-gray-200" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-base">
                  Sign in as Guest
                </p>
                <p className="text-gray-400 text-sm mt-0.5">
                  Browse and buy without signing up
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>

            {/* Customer Sign Up */}
            <button
              onClick={onSelectCustomer}
              className="w-full group flex items-center gap-4 p-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-200 text-left"
            >
              <div className="w-12 h-12 bg-gray-400/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-400/30 transition-colors">
                <ShoppingBag className="w-6 h-6 text-gray-200" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-base">Sign Up</p>
                <p className="text-gray-400 text-sm mt-0.5">
                  Create an account to track orders
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Affiliate Section */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            Affiliate
          </h2>
          <div className="space-y-3">
            {/* Become an Affiliate */}
            <button
              onClick={onSelectAffiliate}
              className="w-full group flex items-center gap-4 p-5 bg-orange-500/10 hover:bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 hover:border-orange-400/60 rounded-2xl transition-all duration-200 text-left"
            >
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/30 transition-colors">
                <Users className="w-6 h-6 text-orange-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-base">
                  Become an Affiliate
                </p>
                <p className="text-orange-300/80 text-sm mt-0.5">
                  Start earning commissions today
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-orange-400/60 group-hover:text-orange-300 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Pricing Link */}
        <div className="mt-8 text-center">
          <a
            href="/pricing"
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            View Pricing Plans →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Customer Sign-in Screen ────────────────────────────────────────────────
interface CustomerScreenProps {
  readonly onBack: () => void;
  readonly redirectTo: string;
}

function CustomerScreen({ onBack, redirectTo }: Readonly<CustomerScreenProps>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <BackButton
          onClick={onBack}
          colorClass="text-gray-400 hover:text-white"
        />

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Welcome!</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your name to continue
            </p>
          </div>

          <CustomerGuestForm redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}

// ── Affiliate Sign-in Screen ───────────────────────────────────────────────
interface AffiliateScreenProps {
  readonly mode: AuthMode;
  readonly onBack: () => void;
  readonly onSetMode: (mode: AuthMode) => void;
  readonly forgotEmail: string;
  readonly onForgotEmailChange: (email: string) => void;
  readonly onSendReset: () => void;
  readonly resetLoading: boolean;
  readonly resetMessage: string;
}

function AffiliateScreen({
  mode,
  onBack,
  onSetMode,
  forgotEmail,
  onForgotEmailChange,
  onSendReset,
  resetLoading,
  resetMessage,
}: Readonly<AffiliateScreenProps>) {
  const getHeaderTitle = (): string => {
    if (mode === "forgot") return "Reset Password";
    return "Affiliate Sign In";
  };

  const getHeaderSubtitle = (): string => {
    if (mode === "forgot") return "Enter your email to reset";
    return "Access your affiliate dashboard";
  };

  const headerTitle = getHeaderTitle();
  const headerSubtitle = getHeaderSubtitle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <BackButton
          onClick={onBack}
          colorClass="text-gray-400 hover:text-white"
        />

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">
              {headerTitle}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{headerSubtitle}</p>
          </div>

          {mode !== "forgot" && (
            <>
              <GoogleButton />
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-400 text-xs">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}

          {mode === "login" && <LoginForm />}
          {mode === "forgot" && (
            <ForgotPasswordForm
              inputId="forgot-email-aff"
              accentColor="gray"
              forgotEmail={forgotEmail}
              onEmailChange={onForgotEmailChange}
              onSend={onSendReset}
              loading={resetLoading}
              message={resetMessage}
            />
          )}

          <div className="flex justify-between mt-4 text-sm">
            {mode === "login" && (
              <button
                onClick={() => onSetMode("forgot")}
                className="text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </button>
            )}
            {mode === "forgot" && (
              <button
                onClick={() => onSetMode("login")}
                className="text-gray-500"
              >
                ← Back to Sign in
              </button>
            )}
          </div>

          {/* Affiliate onboarding CTA */}
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-xs">
              Not yet an affiliate?{" "}
              <a
                href="/affiliate/onboarding"
                className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
              >
                Become an Affiliate →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Login Page Inner ──────────────────────────────────────────────────
function LoginPageInner() {
  const [signInType, setSignInType] = useState<SignInType>("select");
  const [mode, setMode] = useState<AuthMode>("login");
  const { send, loading, message } = useForgotPassword();
  const [forgotEmail, setForgotEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleGuestContinue = () => {
    getGuestId();
    router.push(redirectTo);
  };

  const handleBack = () => {
    setSignInType("select");
    setMode("login");
  };

  const handleSelectAffiliate = () => {
    // Update URL to include redirect param so useLogin can redirect after login
    router.replace("/login?redirect=/affiliate/onboarding");
    setSignInType("affiliate");
  };

  if (signInType === "select") {
    return (
      <SelectScreen
        onGuestContinue={handleGuestContinue}
        onSelectCustomer={() => setSignInType("customer")}
        onSelectAffiliate={handleSelectAffiliate}
      />
    );
  }

  if (signInType === "shop-guest") {
    return <CustomerScreen onBack={handleBack} redirectTo={redirectTo} />;
  }

  if (signInType === "shop-signup") {
    return <CustomerScreen onBack={handleBack} redirectTo={redirectTo} />;
  }

  if (signInType === "customer") {
    return <CustomerScreen onBack={handleBack} redirectTo={redirectTo} />;
  }

  if (signInType === "affiliate") {
    return (
      <AffiliateScreen
        mode={mode}
        onBack={handleBack}
        onSetMode={setMode}
        forgotEmail={forgotEmail}
        onForgotEmailChange={setForgotEmail}
        onSendReset={() => send(forgotEmail)}
        resetLoading={loading}
        resetMessage={message}
      />
    );
  }

  return <></>;
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
