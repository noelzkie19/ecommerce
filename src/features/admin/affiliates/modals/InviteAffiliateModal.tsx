"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Search, UserPlus, Loader2 } from "lucide-react";
import { AuthUser } from "@/types/affiliate.types";
import { affiliatesService } from "../services/affiliate.service";

interface Props {
  readonly onConfirm: (email: string) => Promise<boolean>;
  readonly onClose: () => void;
  readonly isLoading: boolean;
  readonly error: string | null;
}

// ── User list content (extracted to avoid nested ternaries) ───────────────────

interface UserListContentProps {
  readonly loadingUsers: boolean;
  readonly filtered: AuthUser[];
  readonly selected: AuthUser | null;
  readonly onSelect: (user: AuthUser) => void;
}

const UserListContent = ({
  loadingUsers,
  filtered,
  selected,
  onSelect,
}: UserListContentProps) => {
  if (loadingUsers) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-400">
        <Loader2 size={18} className="animate-spin" />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">No users found.</p>
    );
  }

  return (
    <>
      {filtered.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelect(user)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
            selected?.id === user.id ? "bg-indigo-50" : "hover:bg-gray-50"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          {selected?.id === user.id && (
            <span className="ml-auto w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
          )}
        </button>
      ))}
    </>
  );
};

// ── Modal ─────────────────────────────────────────────────────────────────────

const InviteAffiliateModal = ({
  onConfirm,
  onClose,
  isLoading,
  error,
}: Props) => {
  const [authUsers, setAuthUsers] = useState<AuthUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AuthUser | null>(null);

  useEffect(() => {
    affiliatesService
      .getAuthUsers()
      .then(setAuthUsers)
      .catch(() => {})
      .finally(() => setLoadingUsers(false));
  }, []);

  const filtered = useMemo(
    () =>
      authUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()),
      ),
    [authUsers, search],
  );

  const handleSubmit = async () => {
    if (!selected) return;
    const ok = await onConfirm(selected.email);
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserPlus size={18} className="text-indigo-600" />
            <h2 className="text-base font-semibold text-gray-900">
              Invite Affiliate
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-500">
            Select a registered user to add as an affiliate.
          </p>

          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
            />
          </div>

          {/* User list */}
          <div className="max-h-56 overflow-y-auto rounded-lg border border-gray-100 divide-y divide-gray-50">
            <UserListContent
              loadingUsers={loadingUsers}
              filtered={filtered}
              selected={selected}
              onSelect={setSelected}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteAffiliateModal;
