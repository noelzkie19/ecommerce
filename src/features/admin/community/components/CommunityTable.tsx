"use client";

import { Edit, Trash2, ExternalLink } from "lucide-react";
import type {
  CommunityLink,
  CommunityLinkCategory,
} from "@/types/community.types";

interface CommunityTableProps {
  readonly links: CommunityLink[];
  readonly onEdit: (link: CommunityLink) => void;
  readonly onDelete: (link: CommunityLink) => void;
}

const categoryLabels: Record<CommunityLinkCategory, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  telegram: "Telegram",
  website: "Website",
  discord: "Discord",
  instagram: "Instagram",
  tiktok: "TikTok",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  other: "Other",
};

const categoryColors: Record<CommunityLinkCategory, string> = {
  youtube: "bg-red-100 text-red-700",
  facebook: "bg-blue-100 text-blue-700",
  telegram: "bg-sky-100 text-sky-700",
  website: "bg-gray-100 text-gray-700",
  discord: "bg-indigo-100 text-indigo-700",
  instagram: "bg-pink-100 text-pink-700",
  tiktok: "bg-black text-white",
  twitter: "bg-sky-100 text-sky-700",
  linkedin: "bg-blue-100 text-blue-700",
  other: "bg-gray-100 text-gray-700",
};

export function CommunityTable({
  links,
  onEdit,
  onDelete,
}: CommunityTableProps) {
  if (links.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No community links found. Click "Add New" to create one.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Title
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Category
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              URL
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Order
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Status
            </th>
            <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr
              key={link.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="font-medium text-gray-900">{link.title}</div>
                {link.description && (
                  <div className="text-xs text-gray-500 truncate max-w-xs">
                    {link.description}
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    categoryColors[link.category]
                  }`}
                >
                  {categoryLabels[link.category]}
                </span>
              </td>
              <td className="py-3 px-4">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                >
                  <ExternalLink size={14} />
                  <span className="max-w-[150px] truncate block">
                    {link.url}
                  </span>
                </a>
              </td>
              <td className="py-3 px-4 text-gray-600 text-sm">
                {link.orderIndex}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    link.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {link.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(link)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(link)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
