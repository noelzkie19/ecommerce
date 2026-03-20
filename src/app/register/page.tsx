"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { RegisterForm, GoogleButton, authService } from "@/features/auth";
import { useAuthStore } from "@/store/auth.store";
import { Spinner } from "@/shared/components/ui/Spinner";

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <ShoppingCart className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Join Triad E-Commerce today
          </p>
        </div>

        {ref && (
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-5 text-center">
            <p className="text-xs text-purple-700 font-semibold">
              🎉 You were invited by an affiliate!
            </p>
            <p className="text-xs text-purple-400 mt-0.5">
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
          <a
            href="/login"
            className="font-semibold text-gray-900 hover:underline"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

function RegisterFallback() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
