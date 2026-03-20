"use client";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/features/auth";

export function AdminTopBar() {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-end">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm hover:bg-blue-700"
          >
            {user.fullName?.[0]?.toUpperCase() ?? "A"}
          </button>
          {open && (
            <>
              <button
                className="fixed inset-0 z-10 w-full h-full cursor-default bg-transparent border-0"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-sm">{user.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={() =>
                    authService.logout().then(() => {
                      globalThis.location.href = "/login";
                    })
                  }
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </header>
  );
}
