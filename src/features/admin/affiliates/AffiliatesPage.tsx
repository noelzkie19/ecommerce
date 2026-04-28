"use client";

import { useState, useCallback } from "react";
import { UserPlus, Search, Loader2 } from "lucide-react";
import { Affiliate, AffiliateStatus } from "@/types/affiliate.types";
import { useAdminAffiliates } from "./hooks/useAdminAffiliates";
import { useAffiliateMutations } from "./hooks/useAffiliateMutations";
import AffiliatePagination from "./components/AffiliatePagination";
import AffiliatesTable from "./components/AffiliatesTable";
import InviteAffiliateModal from "./modals/InviteAffiliateModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

const AffiliatesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    AffiliateStatus | undefined
  >();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [affiliateToDelete, setAffiliateToDelete] = useState<Affiliate | null>(
    null,
  );

  const { affiliates, meta, isLoading, error, refetch } = useAdminAffiliates({
    page,
    limit: 20,
    search: search || undefined,
    status: statusFilter,
  });

  const mutations = useAffiliateMutations(refetch);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter((e.target.value as AffiliateStatus) || undefined);
      setPage(1);
    },
    [],
  );

  const handleOpenInvite = () => {
    mutations.clearError();
    setShowInviteModal(true);
  };

  const handleInviteConfirm = async (email: string): Promise<boolean> => {
    return mutations.inviteAffiliate(email);
  };

  const handleDeleteConfirm = async () => {
    if (!affiliateToDelete) return;
    const ok = await mutations.deleteAffiliate(affiliateToDelete.id);
    if (ok) setAffiliateToDelete(null);
  };

  // ── Content ────────────────────────────────────────────────────────────────

  const content = (() => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={24} className="animate-spin text-indigo-500" />
        </div>
      );
    if (error)
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      );
    return (
      <>
        <AffiliatesTable
          affiliates={affiliates}
          onSuspend={(a) => mutations.suspendAffiliate(a.id)}
          onActivate={(a) => mutations.activateAffiliate(a.id)}
          onApprove={(a) => mutations.approveAffiliate(a.id)}
          onReject={(a, reason) => mutations.rejectAffiliate(a.id, reason)}
          onDelete={(a) => setAffiliateToDelete(a)}
          onRefetch={refetch}
          onUploadPaymentProof={refetch}
        />
        {meta && meta.totalPages > 1 && (
          <AffiliatePagination meta={meta} onPageChange={setPage} />
        )}
      </>
    );
  })();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Affiliates</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your affiliate network
          </p>
        </div>
        <button
          onClick={handleOpenInvite}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-200"
        >
          <UserPlus size={16} />
          Invite Affiliate
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search affiliates..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
        <select
          value={statusFilter ?? ""}
          onChange={handleStatusChange}
          className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-700"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table / Loading / Error */}
      {content}

      {/* Invite modal */}
      {showInviteModal && (
        <InviteAffiliateModal
          onConfirm={handleInviteConfirm}
          onClose={() => setShowInviteModal(false)}
          isLoading={mutations.isLoading}
          error={mutations.error}
        />
      )}

      {/* Delete confirm modal */}
      {affiliateToDelete && (
        <DeleteConfirmModal
          title="Delete Affiliate"
          description={`Are you sure you want to delete ${affiliateToDelete.name}? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onClose={() => setAffiliateToDelete(null)}
          isLoading={mutations.isLoading}
        />
      )}
    </div>
  );
};

export default AffiliatesPage;
