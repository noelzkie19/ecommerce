"use client";

import { MessageSquare, ExternalLink, Users } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";

const COMMUNITY_LINKS = [
  {
    label: "Facebook Group",
    description: "Join our private Facebook group for affiliates.",
    href: "https://facebook.com/groups/triadecommerce-affiliates",
    icon: Users,
  },
  {
    label: "Telegram Channel",
    description: "Get real-time updates, tips, and announcements.",
    href: "https://t.me/triadecommerce",
    icon: MessageSquare,
  },
];

export const AffiliateCommunityPage = () => (
  <div>
    <AffiliateTopBar
      title="Community"
      subtitle="Connect with fellow affiliates and stay updated"
    />

    <div className="max-w-lg space-y-4">
      {COMMUNITY_LINKS.map(({ label, description, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-purple-200 hover:shadow-md transition-all group"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
            <Icon className="w-5 h-5 text-purple-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">{label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors shrink-0" />
        </a>
      ))}

      {/* Tips */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
        <h3 className="text-sm font-bold text-purple-800 mb-2">
          Community Guidelines
        </h3>
        <ul className="space-y-1.5 text-xs text-purple-700">
          <li>• Be respectful and supportive of fellow affiliates</li>
          <li>• Share tips and strategies that have worked for you</li>
          <li>• No spamming or self-promotion outside designated channels</li>
          <li>• Report any issues to the admin team promptly</li>
        </ul>
      </div>
    </div>
  </div>
);
