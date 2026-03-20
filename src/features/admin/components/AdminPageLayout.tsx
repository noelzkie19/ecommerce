"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface AdminPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  filters?: ReactNode;
  isLoading?: boolean;
  error?: string | null;
  content?: ReactNode;
}

export function AdminPageLayout({
  title,
  description,
  children,
  actions,
  filters,
  isLoading = false,
  error = null,
  content,
}: AdminPageLayoutProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 size={24} className="animate-spin text-emerald-500" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {description && (
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      </div>
    );
  }

  // If content is provided (for custom rendering), use it
  if (content) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {description && (
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
          {actions}
        </div>
        {filters && <div className="flex gap-3">{filters}</div>}
        {content}
      </div>
    );
  }

  // Default render with children
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        {actions}
      </div>
      {filters && <div className="flex gap-3">{filters}</div>}
      {children}
    </div>
  );
}
