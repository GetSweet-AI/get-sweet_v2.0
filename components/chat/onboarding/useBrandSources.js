"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/useContext";
import { useCompany } from "@/context/CompanyContext";
import { uid, buildDraftFromSources } from "./utils";

const BACKEND_URL = "https://backend-get-sweet-v2-0.onrender.com";

export function useBrandSources({
  onStartImport,
  onDraftReady,
  onImportFailed,
  onAICompletedHandled,
  aiCompletedSignal,
}) {
  const { token } = useAuth();
  const { companyData, loading } = useCompany();

  const [sources, setSources] = useState({
    website: { status: "none", url: "", lastUpdatedAt: null, error: null },
    decks: [],
    ai: { status: "none", lastUpdatedAt: null },
  });

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState("");
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

  // =========================================================
  // 🔍 DEBUG & HYDRATION LOGIC (Lógica de Carga)
  // =========================================================
  useEffect(() => {
    // 1. Logs para ver qué está llegando realmente
    // Si ves "DATA RECEIVED" en la consola, el contexto funciona.
    if (companyData) {
      console.log("🔥 [useBrandSources] DATA RECEIVED:", companyData);
    }

    if (loading || !companyData) return;

    // 2. Normalizar la data (por si viene anidada en .data o .companyData)
    const validData =
      companyData.data || companyData.companyData || companyData;

    console.log("✅ [useBrandSources] Processing Data:", validData);

    setSources((prev) => {
      let next = { ...prev };
      let hasChanges = false;

      // --- WEBSITE ---
      // Verificamos si existe 'website' O 'url' en la data
      const remoteUrl = validData.website || validData.url;

      // Si hay URL y (nosotros no la tenemos O es diferente a la actual)
      if (
        remoteUrl &&
        (prev.website.status === "none" || prev.website.url !== remoteUrl)
      ) {
        console.log("➡️ Loading Website found:", remoteUrl);
        next.website = {
          status: "ready",
          url: remoteUrl,
          lastUpdatedAt: validData.updatedAt || new Date().toISOString(),
          error: null,
        };
        setWebsiteUrl(remoteUrl);
        hasChanges = true;
      }

      // --- ARCHIVOS (PDFs) ---
      const remoteFiles = validData.files || validData.uploadedFiles || [];
      if (
        Array.isArray(remoteFiles) &&
        remoteFiles.length > 0 &&
        prev.decks.length === 0
      ) {
        console.log("➡️ Loading Files found:", remoteFiles.length);
        next.decks = remoteFiles.map((f) => ({
          id: f._id || f.id || uid(),
          status: "ready",
          fileName: f.name || f.originalName || f.fileName || "Documento",
          cloudinaryUrl: f.url || f.path, // URL real
          lastUpdatedAt: f.createdAt || new Date().toISOString(),
          error: null,
        }));
        hasChanges = true;
      }

      // --- AI ---
      // Si hay misión o visión, asumimos que hay datos
      if (
        (validData.mission || validData.vision) &&
        prev.ai.status === "none"
      ) {
        console.log("➡️ Loading AI Data found");
        next.ai = {
          status: "ready",
          lastUpdatedAt: validData.updatedAt || new Date().toISOString(),
        };
        hasChanges = true;
      }

      return hasChanges ? next : prev;
    });
  }, [companyData, loading]);

  // =========================================================
  // ... RESTO DE LA LÓGICA (Sin cambios) ...
  // =========================================================

  // Manejo de señal de IA completada
  useEffect(() => {
    if (!aiCompletedSignal) return;
    setSources((prev) => ({
      ...prev,
      ai: { status: "ready", lastUpdatedAt: new Date().toISOString() },
    }));
    onDraftReady?.(
      buildDraftFromSources({ ...sources, ai: { status: "ready" } })
    );
    onAICompletedHandled?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiCompletedSignal]);

  // Helpers
  function openConfirm(opts) {
    setConfirm({ open: true, ...opts });
  }
  function closeConfirm() {
    setConfirm((p) => ({ ...p, open: false }));
  }

  function resetAllSources() {
    clearWebsiteSource();
    clearAllDecks();
    clearAISource();
    setError("");
  }

  // Website Actions
  function clearWebsiteSource() {
    setSources((prev) => ({
      ...prev,
      website: { status: "none", url: "", lastUpdatedAt: null, error: null },
    }));
    setWebsiteUrl("");
  }

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
      // Simulación (Conectar API real si existe)
      await new Promise((r) => setTimeout(r, 1500));
      const next = {
        ...sources,
        website: {
          status: "ready",
          url,
          lastUpdatedAt: new Date().toISOString(),
          error: null,
        },
      };
      setSources((prev) => ({ ...prev, website: next.website }));
      onDraftReady?.(buildDraftFromSources(next));
    } catch (e) {
      setSources((prev) => ({
        ...prev,
        website: {
          ...prev.website,
          status: "failed",
          error: "Failed to import website.",
        },
      }));
      setError("Failed to import from website.");
      onImportFailed?.();
    }
  }

  async function handleReimportWebsite() {
    if (!sources.website.url) return;
    setWebsiteUrl(sources.website.url);
    await handleImportFromWebsite();
  }

  // Files Actions
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

  function triggerDeckPicker() {
    fileRef.current?.click();
  }

  async function handleUploadPdfs(e) {
    setError("");
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const pdfs = files.filter(
      (f) =>
        f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (!pdfs.length) {
      setError("Please upload PDF files.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    const tempIds = pdfs.map(() => uid());
    const newItems = pdfs.map((f, i) => ({
      id: tempIds[i],
      status: "importing",
      fileName: f.name,
      cloudinaryUrl: "",
      lastUpdatedAt: null,
      error: null,
    }));

    setSources((prev) => ({ ...prev, decks: [...prev.decks, ...newItems] }));
    onStartImport?.("deck");

    try {
      const uploadPromises = pdfs.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${BACKEND_URL}/api/v1/brand/import/files`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || `Failed to upload ${file.name}`);
        return { fileName: file.name, result: data };
      });

      const results = await Promise.all(uploadPromises);

      setSources((prev) => {
        const updatedDecks = prev.decks.map((d) => {
          const match = results.find((r) => r.fileName === d.fileName);
          if (tempIds.includes(d.id) && match) {
            return {
              ...d,
              status: "ready",
              cloudinaryUrl:
                match.result.sourceId || match.result.url || "uploaded",
              lastUpdatedAt: new Date().toISOString(),
              error: null,
            };
          }
          return d;
        });
        const nextState = { ...prev, decks: updatedDecks };
        onDraftReady?.(buildDraftFromSources(nextState));
        return nextState;
      });
    } catch (e2) {
      console.error("Upload error:", e2);
      setError("Some files failed to upload.");
      setSources((prev) => ({
        ...prev,
        decks: prev.decks.map((d) =>
          tempIds.includes(d.id) && d.status === "importing"
            ? { ...d, status: "failed", error: "Upload failed" }
            : d
        ),
      }));
      onImportFailed?.();
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function clearAISource() {
    setSources((prev) => ({
      ...prev,
      ai: { status: "none", lastUpdatedAt: null },
    }));
  }

  return {
    sources,
    websiteUrl,
    setWebsiteUrl,
    error,
    isBusy,
    fileRef,
    confirm,
    handleImportFromWebsite,
    handleReimportWebsite,
    clearWebsiteSource,
    handleUploadPdfs,
    triggerDeckPicker,
    clearAllDecks,
    removeDeck,
    clearAISource,
    resetAllSources,
    openConfirm,
    closeConfirm,
  };
}
