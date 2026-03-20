"use client";

import { Suspense } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useHomePageRedirect } from "@/features/auth/hooks/useAuthRedirect";

const HomePageInner = () => {
  const { status } = useHomePageRedirect();
  const { isHydrated } = useAuthStore();

  if (!isHydrated || status.willRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Triad365
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your premier destination for quality products
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/shop"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Shop
            </a>
            <a
              href="/login"
              className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

const HomePage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }
  >
    <HomePageInner />
  </Suspense>
);

export default HomePage;
