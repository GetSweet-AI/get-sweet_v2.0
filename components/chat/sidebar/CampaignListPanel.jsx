"use client";

import { Plus, ExternalLink, Loader2, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CampaignListPanel({
  campaigns = [],
  isLoading,
  onCloseSidebar,
}) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-xs">Loading campaigns...</span>
      </div>
    );
  }

  // --- ESTADO VACÍO: No hay campañas ---
  if (campaigns.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <FolderOpen className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900">
          No campaigns yet
        </h3>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          Create your first campaign to start generating ads.
        </p>
        <button
          onClick={() => {
            router.push("/chat/campaign/new");
            if (onCloseSidebar) onCloseSidebar();
          }}
          className="w-full h-10 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>
    );
  }

  // --- LISTA DE CAMPAÑAS ---
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-gray-500 uppercase">
          Your Campaigns ({campaigns.length})
        </span>
        <button
          onClick={() => router.push("/chat/campaign/new")}
          className="p-1 hover:bg-gray-100 rounded-lg text-purple-600 transition-colors"
          title="New Campaign"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {campaigns.map((camp) => (
        <div
          key={camp._id || camp.id}
          className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-purple-200 transition-colors group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">
                {camp.name}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5 truncate">
                ID: {camp._id || camp.id}
              </div>

              {/* Badge de estado simple */}
              <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-[10px] font-medium text-gray-600 uppercase tracking-wide">
                {camp.status || "Draft"}
              </div>
            </div>

            <button
              onClick={() => {
                router.push(`/chat/campaign/${camp._id || camp.id}`);
                if (onCloseSidebar) onCloseSidebar();
              }}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
