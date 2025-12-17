import { FileText, Trash2, Upload } from "lucide-react";
import SourceStatusPill from "./SourceStatusPill";
import { formatTime } from "./utils";

export default function DeckSection({
  decks,
  isBusy,
  isLocked,
  fileRef,
  onUpload,
  onTriggerPicker,
  onClearAll,
  onRemoveOne,
  openConfirm,
}) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
            <FileText className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900">
                Brand docs (PDF)
              </p>
              <span className="text-xs text-gray-500">
                {decks.length ? `${decks.length} added` : "Add multiple"}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Upload multiple files — pitch deck, one-pager, brand guide, etc.
            </p>
            <p className="text-xs text-yellow-500 font-medium mt-1">
              ⚠️ <span className="font-bold">Important:</span> The system cannot
              read text contained in images within PDFs (scanned files).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {decks.length > 0 && (
            <button
              onClick={() =>
                openConfirm({
                  title: "Remove all PDFs?",
                  body: "This clears the PDF list from this setup screen.",
                  confirmText: "Remove all",
                  action: onClearAll,
                })
              }
              disabled={isBusy || isLocked}
              className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove all
            </button>
          )}
        </div>
      </div>

      {/* Hidden input */}
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        onChange={onUpload}
        className="hidden"
        disabled={isBusy || isLocked}
      />

      <div className="flex items-center gap-2">
        <button
          onClick={onTriggerPicker}
          disabled={isBusy || isLocked}
          className="h-10 px-4 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload PDFs
        </button>
        <p className="text-xs text-gray-600">
          We&apos;ll extract key brand info automatically.
        </p>
      </div>

      {/* Deck List */}
      {decks.length > 0 && (
        <div className="mt-3 space-y-2">
          {decks.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {d.fileName}
                  </p>
                  <SourceStatusPill status={d.status} />
                </div>
                <div className="text-[11px] text-gray-500">
                  {d.lastUpdatedAt
                    ? `Updated ${formatTime(d.lastUpdatedAt)}`
                    : ""}
                  {d.error && (
                    <span className="text-red-600"> • {d.error}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() =>
                  openConfirm({
                    title: "Remove this PDF?",
                    body: "This removes the PDF from this setup screen.",
                    confirmText: "Remove",
                    action: () => onRemoveOne(d.id),
                  })
                }
                disabled={isBusy || isLocked}
                className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
