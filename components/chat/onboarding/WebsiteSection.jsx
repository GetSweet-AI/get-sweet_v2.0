import {
  Link as LinkIcon,
  RefreshCw,
  Trash2,
  Loader2,
  Pencil,
} from "lucide-react";
import SourceStatusPill from "./SourceStatusPill";
import { formatTime } from "./utils";

export default function WebsiteSection({
  source, // source.website
  websiteUrl,
  setWebsiteUrl,
  isBusy,
  isLocked,
  onImport,
  onReimport,
  onClear,
  openConfirm,
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
            <LinkIcon className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900">Website URL</p>
              <SourceStatusPill status={source.status} />
            </div>
            <p className="text-xs text-gray-600">
              Recommended — best for services + contact info
            </p>
          </div>
        </div>

        {source.status === "ready" && (
          <div className="flex items-center gap-2">
            <button
              onClick={onReimport}
              disabled={isBusy || isLocked}
              className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Update
            </button>

            <button
              onClick={() =>
                openConfirm({
                  title: "Remove website source?",
                  body: "This will remove the website URL from this setup screen.",
                  confirmText: "Remove",
                  action: onClear,
                })
              }
              disabled={isBusy || isLocked}
              className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        )}
      </div>

      {source.url && (
        <div className="mb-3 text-xs text-gray-700">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate">
              <span className="text-gray-500">URL:</span>{" "}
              <span className="font-semibold">{source.url}</span>
            </div>
            {source.lastUpdatedAt && (
              <div className="shrink-0 text-gray-500">
                Updated {formatTime(source.lastUpdatedAt)}
              </div>
            )}
          </div>
          {source.error && (
            <div className="mt-2 text-red-600">{source.error}</div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-gray-200"
          disabled={isBusy || isLocked}
        />
        <button
          onClick={onImport}
          disabled={isBusy || isLocked}
          className="h-10 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {source.status === "importing" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Pencil className="w-4 h-4" />
          )}
          {source.status === "ready" ? "Replace" : "Import"}
        </button>
      </div>
    </div>
  );
}
