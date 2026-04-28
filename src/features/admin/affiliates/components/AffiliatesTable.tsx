"use client";

import { useState } from "react";
import {
  Package,
  CheckCircle2,
  Ban,
  Trash2,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { Affiliate } from "@/types/affiliate.types";
import ManageProductsModal from "../modals/ManageProductsModal";
import RejectConfirmModal from "../modals/RejectConfirmModal";
import ApproveConfirmModal from "../modals/ApproveConfirmModal";
import ViewPaymentProofModal from "../modals/ViewPaymentProofModal";
import UploadPaymentProofModal from "../modals/UploadPaymentProofModal";

interface Props {
  readonly affiliates: Affiliate[];
  readonly onSuspend: (affiliate: Affiliate) => void;
  readonly onActivate: (affiliate: Affiliate) => void;
  readonly onApprove: (affiliate: Affiliate) => void;
  readonly onReject: (affiliate: Affiliate, reason?: string) => void;
  readonly onDelete: (affiliate: Affiliate) => void;
  readonly onRefetch?: () => void;
  readonly onUploadPaymentProof?: () => void;
}

const renderActionButton = (
  affiliate: Affiliate,
  onActivate: (affiliate: Affiliate) => void,
  onSuspend: (affiliate: Affiliate) => void,
) => {
  if (affiliate.status === "suspended") {
    return (
      <button
        onClick={() => onActivate(affiliate)}
        title="Activate"
        className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
      >
        <CheckCircle2 size={15} />
      </button>
    );
  }
  if (affiliate.status === "active") {
    return (
      <button
        onClick={() => onSuspend(affiliate)}
        title="Suspend"
        className="p-2 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
      >
        <Ban size={15} />
      </button>
    );
  }
  return null;
};

const renderApprovalActions = (
  affiliate: Affiliate,
  onApprove: (affiliate: Affiliate) => void,
  onReject: (affiliate: Affiliate, reason?: string) => void,
) => {
  // Show Approve and Reject buttons for pending affiliates
  // Approve requires payment proof or paid status
  // Reject is available for all pending affiliates
  if (affiliate.status === "pending") {
    const canApprove =
      affiliate.paymentProofSubmittedAt !== null ||
      affiliate.paymentStatus === "paid";

    return (
      <>
        {canApprove && (
          <button
            onClick={() => onApprove(affiliate)}
            title="Approve"
            className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <CheckCircle2 size={15} />
          </button>
        )}
        <button
          onClick={() => onReject(affiliate)}
          title="Reject"
          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <X size={15} />
        </button>
      </>
    );
  }
  return null;
};

const PaymentBadge = ({
  paymentStatus,
}: {
  paymentStatus: Affiliate["paymentStatus"];
}) => {
  if (paymentStatus === "paid") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
      Unpaid
    </span>
  );
};

const StatusBadge = ({
  status,
  paymentStatus,
}: {
  status: Affiliate["status"];
  paymentStatus: Affiliate["paymentStatus"];
}) => {
  if (status === "active") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
        Active
      </span>
    );
  }
  if (status === "pending" && paymentStatus === "paid") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
        Awaiting Approval
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
        Pending
      </span>
    );
  }
  if (status === "rejected") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
      Suspended
    </span>
  );
};

const PaymentProofBadge = ({
  affiliate,
  onView,
  onUpload,
}: {
  affiliate: Affiliate;
  onView: (affiliate: Affiliate) => void;
  onUpload: (affiliate: Affiliate) => void;
}) => {
  const hasProof =
    affiliate.paymentProofUrl !== null &&
    affiliate.paymentProofUrl !== undefined;

  if (hasProof) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(affiliate)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
          title="View payment proof"
        >
          <ImageIcon size={14} />
          Proof
        </button>
      </div>
    );
  }

  if (affiliate.status === "pending") {
    return (
      <button
        onClick={() => onUpload(affiliate)}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
        title="Upload payment proof"
      >
        <Upload size={14} />
        Upload Proof
      </button>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
      N/A
    </span>
  );
};

const AffiliatesTable = ({
  affiliates,
  onSuspend,
  onActivate,
  onApprove,
  onReject,
  onDelete,
  onRefetch,
  onUploadPaymentProof,
}: Props) => {
  const [managingAffiliate, setManagingAffiliate] = useState<Affiliate | null>(
    null,
  );
  const [rejectingAffiliate, setRejectingAffiliate] =
    useState<Affiliate | null>(null);
  const [approvingAffiliate, setApprovingAffiliate] =
    useState<Affiliate | null>(null);
  const [viewingProofAffiliate, setViewingProofAffiliate] =
    useState<Affiliate | null>(null);
  const [uploadingAffiliate, setUploadingAffiliate] =
    useState<Affiliate | null>(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Name
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Email
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Products
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Total Sales
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Commissions
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Status
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Payment
              </th>
              <th className="text-left px-6 py-4 text-gray-500 font-medium">
                Proof
              </th>
              <th className="text-right px-6 py-4 text-gray-500 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {affiliates.map((affiliate) => (
              <tr
                key={affiliate.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold flex-shrink-0">
                      {affiliate.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">
                      {affiliate.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-600">{affiliate.email}</td>

                <td className="px-6 py-4 text-gray-600">
                  {affiliate.productCount ?? 0}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  ₱{(affiliate.totalSales ?? 0).toLocaleString()}
                </td>

                <td className="px-6 py-4 font-medium text-emerald-600">
                  ₱{(affiliate.totalCommissions ?? 0).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge
                    status={affiliate.status}
                    paymentStatus={affiliate.paymentStatus}
                  />
                </td>

                <td className="px-6 py-4">
                  <PaymentBadge paymentStatus={affiliate.paymentStatus} />
                </td>

                <td className="px-6 py-4">
                  <PaymentProofBadge
                    affiliate={affiliate}
                    onView={setViewingProofAffiliate}
                    onUpload={setUploadingAffiliate}
                  />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setManagingAffiliate(affiliate)}
                      title="Manage products"
                      className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <Package size={15} />
                    </button>

                    {renderApprovalActions(
                      affiliate,
                      (affiliate) => {
                        setApprovingAffiliate(affiliate);
                      },
                      (affiliate, reason) => {
                        setRejectingAffiliate(affiliate);
                      },
                    )}

                    {renderActionButton(affiliate, onActivate, onSuspend)}

                    <button
                      onClick={() => onDelete(affiliate)}
                      title="Delete"
                      className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {affiliates.length === 0 && (
          <div className="py-16 text-center text-gray-400 text-sm">
            No affiliates found.
          </div>
        )}
      </div>

      {managingAffiliate && (
        <ManageProductsModal
          affiliate={managingAffiliate}
          onClose={() => setManagingAffiliate(null)}
          onSuccess={onRefetch}
        />
      )}

      {approvingAffiliate && (
        <ApproveConfirmModal
          affiliate={approvingAffiliate}
          onClose={() => setApprovingAffiliate(null)}
          onConfirm={() => {
            onApprove(approvingAffiliate);
            setApprovingAffiliate(null);
          }}
          isLoading={false}
        />
      )}

      {rejectingAffiliate && (
        <RejectConfirmModal
          affiliateName={rejectingAffiliate.name}
          onClose={() => setRejectingAffiliate(null)}
          onConfirm={(reason) => {
            onReject(rejectingAffiliate, reason);
            setRejectingAffiliate(null);
          }}
          isLoading={false}
        />
      )}

      {viewingProofAffiliate && (
        <ViewPaymentProofModal
          affiliate={viewingProofAffiliate}
          onClose={() => setViewingProofAffiliate(null)}
        />
      )}

      {uploadingAffiliate && (
        <UploadPaymentProofModal
          affiliate={uploadingAffiliate}
          onClose={() => setUploadingAffiliate(null)}
          onSuccess={onUploadPaymentProof}
        />
      )}
    </>
  );
};

export default AffiliatesTable;
