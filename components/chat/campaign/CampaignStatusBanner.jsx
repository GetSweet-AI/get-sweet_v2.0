"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Lock,
  Unlock,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import { useAuth } from "@/context/useContext";
import CampaignStatusToggle from "./CampaignStatusToggle";

function Pill({ status }) {
  const map = {
    draft: {
      label: "Draft",
      cls: "bg-gray-50 text-gray-700 border-gray-200",
      Icon: AlertTriangle,
    },
    generating: {
      label: "Generating…",
      cls: "bg-blue-50 text-blue-700 border-blue-200",
      Icon: RefreshCw,
    },
    approved: {
      label: "Approved",
      cls: "bg-green-50 text-green-700 border-green-200",
      Icon: CheckCircle2,
    },
    locked: {
      label: "Locked",
      cls: "bg-amber-50 text-amber-800 border-amber-200",
      Icon: Lock,
    },
    planning: {
      label: "Planning",
      cls: "bg-purple-50 text-purple-700 border-purple-200",
      Icon: AlertTriangle,
    },
    active: {
      label: "Active & Live",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse",
      Icon: PlayCircle,
    },
    published: {
      label: "Active & Live",
      cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Icon: PlayCircle,
    },
    paused: {
      label: "Paused",
      cls: "bg-gray-100 text-gray-600 border-gray-200",
      Icon: PauseCircle,
    },
  };

  const cfg = map[status] || map.draft;
  const Icon = cfg.Icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${cfg.cls}`}
    >
      <Icon className="w-4 h-4" />
      {cfg.label}
    </span>
  );
}

export default function CampaignStatusBanner({
  provider = "Google Ads",
  campaign,
  onStatusChange,
  status: statusProp,
  onUnlock,
  campaignId,
  deleteLabel = "Delete campaign",
}) {
  const router = useRouter();
  const { token } = useAuth();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const safeId = campaign?._id || campaignId;

  // Prioridad al estado en vivo
  const currentStatus = statusProp || campaign?.status || "draft";

  const handleDelete = async () => {
    if (!safeId) {
      setErr("Error: Campaign ID missing");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns/${safeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        router.push("/chat/brand-ai");
      } else {
        const json = await res.json();
        setErr(json.message || "Failed to delete");
        setBusy(false);
      }
    } catch (error) {
      console.error(error);
      setErr("Network error");
      setBusy(false);
    }
  };

  return (
    <>
      <div className="border-b border-gray-100 bg-white">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {provider} campaign
                </div>
                <Pill status={currentStatus} />
              </div>
              {err && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  {err}
                </div>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {/* 👇 PASAMOS LA PROP EXTERNALSTATUS AQUÍ */}
              {campaign && campaign.googleAdsResourceId && (
                <div className="mr-2 border-r border-gray-200 pr-4">
                  <CampaignStatusToggle
                    campaign={campaign}
                    onStatusChange={onStatusChange}
                    externalStatus={currentStatus}
                  />
                </div>
              )}

              {(currentStatus === "approved" || currentStatus === "locked") && (
                <button
                  type="button"
                  onClick={onUnlock}
                  className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 hover:bg-gray-50 inline-flex items-center gap-2"
                >
                  <Unlock className="w-4 h-4" /> Unlock
                </button>
              )}

              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="h-9 px-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> {deleteLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !busy && setConfirmOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-1">
              Delete campaign?
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                disabled={busy}
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                disabled={busy}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold flex items-center gap-2"
              >
                {busy && <Loader2 className="w-3 h-3 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
