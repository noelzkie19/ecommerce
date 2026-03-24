"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Users, ArrowLeft } from "lucide-react";
import { RegisterForm, GoogleButton, authService } from "@/features/auth";
import { useAuthStore } from "@/store/auth.store";
import { Spinner } from "@/shared/components/ui/Spinner";
import Link from "next/link";

function RegisterContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || undefined;
  const { user, isHydrated } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    // If a logged-in user visits /register?ref=CODE, log them out first
    // so the new user can register with a clean session.
    if (user && ref) {
      setIsLoggingOut(true);
      authService.logout().finally(() => {
        setIsLoggingOut(false);
        setReady(true);
      });
    } else {
      setReady(true);
    }
  }, [isHydrated, user, ref]);

  // Show spinner while hydrating or logging out
  if (!isHydrated || isLoggingOut || !ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-gray-500">
            {isLoggingOut ? "Preparing registration..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Back link */}
        <Link
          href="/login"
          className="flex items-center gap-2 text-purple-300 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-xl font-extrabold text-center text-gray-900">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm mt-1">Join Triad365 today</p>
          </div>

          {ref && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-5 text-center">
              <p className="text-xs text-orange-600 font-semibold">
                🎉 You were invited by an affiliate!
              </p>
              <p className="text-xs text-orange-400 mt-0.5">
                Complete registration to activate your account.
              </p>
            </div>
          )}

          {/* Google Sign-Up — saves ref to sessionStorage before OAuth redirect */}
          <GoogleButton referralCode={ref} />

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <RegisterForm referralCode={ref} />

          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-orange-600 hover:text-orange-600 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 animate-pulse">
        <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterContent />
    </Suspense>
  );
}
