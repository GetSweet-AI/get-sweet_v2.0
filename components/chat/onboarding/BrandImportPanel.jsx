"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  Upload,
  Link as LinkIcon,
  Sparkles,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Pencil,
  Trash2,
  RotateCcw,
} from "lucide-react";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function BrandImportPanel({
  brandStatus = "none", // "none" | "importing" | "draft_ready" | "locked" | "failed"
  onStartImport,
  onDraftReady,
  onImportFailed,
  onGoToAIBrandSetup,

  // when user returns from AI page
  aiCompletedSignal = 0,
  onAICompletedHandled,

  // NEW: called when user hits Confirm brand
  onConfirmBrand,
}) {
  // ----------------------------
  // Local source meta (no history)
  // ----------------------------
  const [sources, setSources] = useState({
    website: { status: "none", url: "", lastUpdatedAt: null, error: null },
    decks: [], // ✅ MULTI: [{ id, status, fileName, cloudinaryUrl, lastUpdatedAt, error }]
    ai: { status: "none", lastUpdatedAt: null }, // "none" | "ready"
  });

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState("");

  // hidden multi-file input
  const fileRef = useRef(null);

  const [confirm, setConfirm] = useState({
    open: false,
    title: "",
    body: "",
    confirmText: "Confirm",
    action: null,
  });

  const isBusy =
    sources.website.status === "importing" ||
    sources.decks.some((d) => d.status === "importing");

  // Mark AI source as added when user comes back from /chat/brand-ai
  useEffect(() => {
    if (!aiCompletedSignal) return;

    setSources((prev) => ({
      ...prev,
      ai: { status: "ready", lastUpdatedAt: new Date().toISOString() },
    }));

    // ✅ create/update a draft for review later (front-end only)
    onDraftReady?.(buildDraftFromSources({ ...sources, ai: { status: "ready" } }));

    onAICompletedHandled?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiCompletedSignal]);

  const helperText = useMemo(() => {
    if (brandStatus === "locked")
      return "Brand is confirmed. You can create goals and campaigns.";
    if (brandStatus === "draft_ready")
      return "Draft updated. Click Confirm to review in full-page Brand Details.";
    if (isBusy) return "Importing… extracting brand info from your sources.";
    return "Add a website and/or multiple PDFs. You can also answer AI questions to fill gaps.";
  }, [brandStatus, isBusy]);

  function formatTime(d) {
    if (!d) return "";
    try {
      return new Date(d).toLocaleString();
    } catch {
      return "";
    }
  }

  function SourceStatusPill({ status }) {
    const map = {
      none: {
        label: "Not added",
        icon: null,
        cls: "bg-gray-100 text-gray-600 border-gray-200",
      },
      importing: {
        label: "Importing…",
        icon: Loader2,
        cls: "bg-blue-50 text-blue-700 border-blue-200",
      },
      ready: {
        label: "Added",
        icon: CheckCircle2,
        cls: "bg-green-50 text-green-700 border-green-200",
      },
      failed: {
        label: "Failed",
        icon: XCircle,
        cls: "bg-red-50 text-red-700 border-red-200",
      },
    };

    const cfg = map[status] || map.none;
    const Icon = cfg.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full border ${cfg.cls}`}
      >
        {Icon ? (
          <Icon
            className={`w-3.5 h-3.5 ${status === "importing" ? "animate-spin" : ""}`}
          />
        ) : null}
        {cfg.label}
      </span>
    );
  }

  function openConfirm({ title, body, confirmText = "Confirm", action }) {
    setConfirm({ open: true, title, body, confirmText, action });
  }

  function closeConfirm() {
    setConfirm({ open: false, title: "", body: "", confirmText: "Confirm", action: null });
  }

  function clearWebsiteSource() {
    setSources((prev) => ({
      ...prev,
      website: { status: "none", url: "", lastUpdatedAt: null, error: null },
    }));
    setWebsiteUrl("");
  }

  function clearAISource() {
    setSources((prev) => ({
      ...prev,
      ai: { status: "none", lastUpdatedAt: null },
    }));
  }

  function clearAllDecks() {
    setSources((prev) => ({ ...prev, decks: [] }));
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeDeck(deckId) {
    setSources((prev) => ({
      ...prev,
      decks: prev.decks.filter((d) => d.id !== deckId),
    }));
  }

  function resetAllSources() {
    clearWebsiteSource();
    clearAllDecks();
    clearAISource();
    setError("");
  }

  // ----------------------------
  // Website import / replace
  // ----------------------------
  async function handleImportFromWebsite() {
    setError("");
    const url = websiteUrl.trim();
    if (!url) return setError("Please enter a website URL.");

    setSources((prev) => ({
      ...prev,
      website: { ...prev.website, status: "importing", url, error: null },
    }));

    onStartImport?.("website");

    try {
      // placeholder delay
      await new Promise((r) => setTimeout(r, 700));

      const next = {
        ...sources,
        website: {
          status: "ready",
          url,
          lastUpdatedAt: new Date().toISOString(),
          error: null,
        },
      };

      setSources((prev) => ({
        ...prev,
        website: next.website,
      }));

      const draft = buildDraftFromSources(next);
      onDraftReady?.(draft);
    } catch (e) {
      const msg = "Failed to import from website. Please try again.";
      setSources((prev) => ({
        ...prev,
        website: { ...prev.website, status: "failed", error: msg },
      }));
      setError(msg);
      onImportFailed?.();
    }
  }

  async function handleReimportWebsite() {
    if (!sources.website.url) return;
    setWebsiteUrl(sources.website.url);
    await handleImportFromWebsite();
  }

  // ----------------------------
  // Multi-deck upload
  // ----------------------------
  async function handleUploadPdfs(e) {
    setError("");
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const pdfs = files.filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );

    if (!pdfs.length) {
      setError("Please upload PDF files.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    // add as importing
    const newItems = pdfs.map((f) => ({
      id: uid(),
      status: "importing",
      fileName: f.name,
      cloudinaryUrl: "",
      lastUpdatedAt: null,
      error: null,
    }));

    setSources((prev) => ({
      ...prev,
      decks: [...prev.decks, ...newItems],
    }));

    onStartImport?.("deck");

    try {
      // placeholder: simulate per-file processing
      await Promise.all(
        newItems.map(async (item) => {
          await new Promise((r) => setTimeout(r, 600));
          setSources((prev) => ({
            ...prev,
            decks: prev.decks.map((d) =>
              d.id === item.id
                ? {
                    ...d,
                    status: "ready",
                    cloudinaryUrl: d.cloudinaryUrl || "cloudinary://placeholder",
                    lastUpdatedAt: new Date().toISOString(),
                    error: null,
                  }
                : d
            ),
          }));
        })
      );

      const next = {
        ...sources,
        decks: [...sources.decks, ...newItems].map((d) =>
          newItems.some((n) => n.id === d.id)
            ? { ...d, status: "ready", lastUpdatedAt: new Date().toISOString() }
            : d
        ),
      };

      const draft = buildDraftFromSources(next);
      onDraftReady?.(draft);
    } catch (e2) {
      const msg = "Failed to upload or process one of the PDFs. Please try again.";
      setError(msg);
      setSources((prev) => ({
        ...prev,
        decks: prev.decks.map((d) =>
          d.status === "importing" ? { ...d, status: "failed", error: msg } : d
        ),
      }));
      onImportFailed?.();
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function triggerDeckPicker() {
    fileRef.current?.click();
  }

  const anySourceReady =
    sources.website.status === "ready" ||
    sources.decks.some((d) => d.status === "ready") ||
    sources.ai.status === "ready";

  return (
    <div className="h-full flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-2xl">
        {/* Header + Reset */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Import your brand</h1>
            <p className="text-sm text-gray-600 mt-1">{helperText}</p>
          </div>

          <button
            disabled={isBusy || brandStatus === "locked"}
            onClick={() =>
              openConfirm({
                title: "Reset all sources?",
                body: "This will remove the website, uploaded PDFs, and AI answers from this setup screen.",
                confirmText: "Reset",
                action: resetAllSources,
              })
            }
            className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset all
          </button>
        </div>

        <div className="grid gap-4">
          {/* WEBSITE */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">Website URL</p>
                    <SourceStatusPill status={sources.website.status} />
                  </div>
                  <p className="text-xs text-gray-600">
                    Recommended — best for services + contact info
                  </p>
                </div>
              </div>

              {sources.website.status === "ready" ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReimportWebsite}
                    disabled={isBusy || brandStatus === "locked"}
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
                        action: clearWebsiteSource,
                      })
                    }
                    disabled={isBusy || brandStatus === "locked"}
                    className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ) : null}
            </div>

            {sources.website.url ? (
              <div className="mb-3 text-xs text-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="text-gray-500">URL:</span>{" "}
                    <span className="font-semibold">{sources.website.url}</span>
                  </div>
                  {sources.website.lastUpdatedAt ? (
                    <div className="shrink-0 text-gray-500">
                      Updated {formatTime(sources.website.lastUpdatedAt)}
                    </div>
                  ) : null}
                </div>
                {sources.website.error ? (
                  <div className="mt-2 text-red-600">{sources.website.error}</div>
                ) : null}
              </div>
            ) : null}

            <div className="flex gap-2">
              <input
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-gray-200"
                disabled={isBusy || brandStatus === "locked"}
              />
              <button
                onClick={handleImportFromWebsite}
                disabled={isBusy || brandStatus === "locked"}
                className="h-10 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {sources.website.status === "importing" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Pencil className="w-4 h-4" />
                )}
                {sources.website.status === "ready" ? "Replace" : "Import"}
              </button>
            </div>
          </div>

          {/* MULTI-PDF DECKS */}
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
                      {sources.decks.length ? `${sources.decks.length} added` : "Add multiple"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Upload multiple files — pitch deck, one-pager, brand guide, etc.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {sources.decks.length ? (
                  <button
                    onClick={() =>
                      openConfirm({
                        title: "Remove all PDFs?",
                        body: "This clears the PDF list from this setup screen.",
                        confirmText: "Remove all",
                        action: clearAllDecks,
                      })
                    }
                    disabled={isBusy || brandStatus === "locked"}
                    className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove all
                  </button>
                ) : null}
              </div>
            </div>

            {/* Hidden multi input */}
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf,.pdf"
              multiple
              onChange={handleUploadPdfs}
              className="hidden"
              disabled={isBusy || brandStatus === "locked"}
            />

            <div className="flex items-center gap-2">
              <button
                onClick={triggerDeckPicker}
                disabled={isBusy || brandStatus === "locked"}
                className="h-10 px-4 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload PDFs
              </button>
              <p className="text-xs text-gray-600">
                We’ll extract key brand info automatically (backend later).
              </p>
            </div>

            {/* Deck list */}
            {sources.decks.length ? (
              <div className="mt-3 space-y-2">
                {sources.decks.map((d) => (
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
                        {d.lastUpdatedAt ? `Updated ${formatTime(d.lastUpdatedAt)}` : ""}
                        {d.error ? <span className="text-red-600"> • {d.error}</span> : null}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        openConfirm({
                          title: "Remove this PDF?",
                          body: "This removes the PDF from this setup screen.",
                          confirmText: "Remove",
                          action: () => removeDeck(d.id),
                        })
                      }
                      disabled={isBusy || brandStatus === "locked"}
                      className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* AI */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">AI questions</p>
                    <SourceStatusPill status={sources.ai.status} />
                  </div>
                  <p className="text-xs text-gray-600">
                    Optional — fill gaps after website/docs import.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onGoToAIBrandSetup}
                  disabled={brandStatus === "locked"}
                  className="h-9 px-4 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sources.ai.status === "ready" ? "Update" : "Start"}
                </button>

                {sources.ai.status === "ready" ? (
                  <button
                    onClick={() =>
                      openConfirm({
                        title: "Remove AI answers?",
                        body: "This clears the AI question results from this setup screen.",
                        confirmText: "Remove",
                        action: clearAISource,
                      })
                    }
                    disabled={brandStatus === "locked"}
                    className="h-9 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-red-700 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                ) : null}
              </div>
            </div>

            {sources.ai.lastUpdatedAt ? (
              <div className="mt-3 text-xs text-gray-500">
                Updated {formatTime(sources.ai.lastUpdatedAt)}
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
              {error}
            </div>
          ) : null}

          {/* Confirm */}
          {(brandStatus === "draft_ready" || anySourceReady) && brandStatus !== "locked" ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-900">Brand draft ready</p>
                <p className="text-xs text-green-800">
                  Confirm to review in full-page Brand Details.
                </p>
              </div>
              <button
                onClick={() => {
                  // ✅ build draft and hand off
                  const draft = buildDraftFromSources(sources);
                  onConfirmBrand?.(draft);
                }}
                className="h-10 px-4 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800"
              >
                Confirm brand
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Confirm Modal */}
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeConfirm} />
          <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl border border-gray-200 shadow-xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">{confirm.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{confirm.body}</p>
              </div>
              <button
                onClick={closeConfirm}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={closeConfirm}
                className="h-9 px-4 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const action = confirm.action;
                  closeConfirm();
                  action?.();
                }}
                className="h-9 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800"
              >
                {confirm.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Front-end only: create a draft object.
 * Later your backend will build/merge this for real.
 */
function buildDraftFromSources(sources) {
  // You can make this smarter later.
  // For now: return a stable skeleton so Brand Details page has fields.
  return {
    brandName: "",
    aka: "",
    industry: "",
    targetAudience: "",
    website: sources.website?.url || "",
    mission: "",
    vision: "",
    services: [],
    differentiators: [],
    values: [],
    colors: [],

    // Goals block
    primaryGoal: "",
    goals: [],
    successMetric: "",
    goalTimeframe: "",

    // metadata for display/debug
    __sources: {
      website: sources.website,
      decks: sources.decks,
      ai: sources.ai,
    },
  };
}
