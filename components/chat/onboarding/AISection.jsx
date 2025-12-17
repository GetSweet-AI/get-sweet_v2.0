// components/onboarding/brand-import/AISection.jsx
import { Sparkles, Trash2 } from "lucide-react";
import SourceStatusPill from "./SourceStatusPill";
import { formatTime } from "./utils";

export default function AISection({
  source,
  isLocked,
  onGoToSetup,
  onClear,
  openConfirm,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900">
                AI questions
              </p>
              <SourceStatusPill status={source.status} />
            </div>
            <p className="text-xs text-gray-600">
              Optional — fill gaps after website/docs import.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToSetup}
            disabled={isLocked}
            className="h-9 px-4 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {source.status === "ready" ? "Update" : "Start"}
          </button>

          {source.status === "ready" && (
            <button
              onClick={() =>
                openConfirm({
                  title: "Remove AI answers?",
                  body: "This clears the AI question results from this setup screen.",
                  confirmText: "Remove",
                  action: onClear,
                })
              }
              disabled={isLocked}
              className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          )}
        </div>
      </div>

      {source.lastUpdatedAt && (
        <div className="mt-3 text-xs text-gray-500">
          Updated {formatTime(source.lastUpdatedAt)}
        </div>
      )}
    </div>
  );
}
