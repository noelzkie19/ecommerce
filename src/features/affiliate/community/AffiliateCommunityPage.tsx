"use client";

import { useAffiliateCommunity } from "./hooks/useAffiliateCommunity";
import { MessageSquare, ExternalLink, Users, Loader2 } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";

const iconMap: Record<string, typeof Users> = {
  facebook: Users,
  telegram: MessageSquare,
  discord: Users,
  whatsapp: Users,
  default: Users,
};

export const AffiliateCommunityPage = () => {
  const { links, isLoading, error } = useAffiliateCommunity();

  const getIcon = (category: string) => {
    const Icon = iconMap[category] || iconMap.default;
    return Icon;
  };

  if (isLoading) {
    return (
      <div>
        <AffiliateTopBar
          title="Community"
          subtitle="Connect with fellow affiliates and stay updated"
        />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AffiliateTopBar
          title="Community"
          subtitle="Connect with fellow affiliates and stay updated"
        />
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <AffiliateTopBar
        title="Community"
        subtitle="Connect with fellow affiliates and stay updated"
      />

      <div className="max-w-lg space-y-4">
        {links.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No community links available at the moment.
          </div>
        ) : (
          links.map((link) => {
            const Icon = getIcon(link.category);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">
                    {link.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {link.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors shrink-0" />
              </a>
            );
          })
        )}

        {/* Tips */}
        <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
          <h3 className="text-sm font-bold text-purple-800 mb-2">
            Community Guidelines
          </h3>
          <ul className="space-y-1.5 text-xs text-orange-600">
            <li>• Be respectful and supportive of fellow affiliates</li>
            <li>• Share tips and strategies that have worked for you</li>
            <li>• No spamming or self-promotion outside designated channels</li>
            <li>• Report any issues to the admin team promptly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
