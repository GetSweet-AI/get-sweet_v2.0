"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save, Info, Check, Globe } from "lucide-react";

import LeftSidebar from "@/components/chat/LeftSideBar";
import RightSidebar from "@/components/chat/RightSideBar";
import ChatHeader from "@/components/chat/ui/HeaderChat";
import ConnectGoogleAdsBtn from "@/components/chat/campaign/ConnectGoogleAdsBtn";
import { useAuth } from "@/context/useContext";

// --- CONSTANTES ---
const CHANNEL_OPTIONS = [
  "Google Search",
  "Website",
  "Email",
  "Social",
  "YouTube",
  "Display",
];

const TONE_OPTIONS = [
  "Professional",
  "Friendly",
  "Bold",
  "Witty",
  "Urgent",
  "Empathetic",
  "Direct",
];

const STATUS_OPTIONS = [
  "planning",
  "draft",
  "active",
  "paused",
  "completed",
  "archived",
];

export default function CampaignEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();

  const campaignId = String(id);

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(true);

  const headerTitle = useMemo(() => "Edit campaign", []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // ✅ CORREGIDO: Solo usamos este estado para Google Ads
  const [googleAdsData, setGoogleAdsData] = useState(null);

  const [form, setForm] = useState({
    // --- CAMPAIGN FIELDS ---
    name: "",
    objective: "",
    landingUrl: "",
    channels: [],
    geo: "",
    budget: "",
    targetAudience: "",
    primaryKpi: "leads",
    tone: "Professional",
    status: "planning",

    // --- COMPANY / GLOBAL FIELDS ---
    primaryGoal: "",
    successMetric: "",
    timeframe: "",
  });

  // ========================================================================
  // 1. CARGA DE DATOS (Campaign + Global Company Data)
  // ========================================================================
  useEffect(() => {
    if (!token || !campaignId) return;

    const loadAllData = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // A. Cargar Campaña
        const campRes = await fetch(
          `${apiUrl}/api/v1/campaigns/${campaignId}`,
          { headers }
        );
        const campData = await campRes.json();

        // B. Cargar Empresa (Global Goals + Google Ads Status)
        let companyData = { primaryGoal: "", successMetric: "", timeframe: "" };

        try {
          const compRes = await fetch(`${apiUrl}/api/v1/company/profile`, {
            headers,
          });
          if (compRes.ok) {
            const rawComp = await compRes.json();
            // Normalizar si viene en array o dentro de 'data'
            const compObj = Array.isArray(rawComp)
              ? rawComp[0]
              : rawComp.data || rawComp;

            if (compObj) {
              // 1. Extraer Goals
              companyData = {
                primaryGoal: compObj.primaryGoal || "",
                successMetric: compObj.successMetric || "",
                timeframe: compObj.timeframe || "",
              };

              // 2. ✅ Extraer datos de Google Ads (CORREGIDO)
              if (compObj.googleAds) {
                setGoogleAdsData(compObj.googleAds);
              }
            }
          }
        } catch (e) {
          console.warn("Error loading company data", e);
        }

        // C. Unificar en el Formulario
        setForm({
          // --- Datos de Campaña ---
          name: campData.name || "",
          objective: campData.objective || "",
          landingUrl: campData.landingPageUrl || "",
          channels: Array.isArray(campData.channels)
            ? campData.channels
            : ["Google Search"],
          geo: campData.geo || "",
          budget: campData.budget || "",
          targetAudience: campData.targetAudience || "",
          primaryKpi: campData.primaryKpi || "leads",
          tone: campData.tone || "Professional",
          status: campData.status || "planning",

          // --- Datos Globales ---
          primaryGoal: companyData.primaryGoal,
          successMetric: companyData.successMetric,
          timeframe: companyData.timeframe,
        });
      } catch (err) {
        console.error("❌ Error loading data:", err);
        setToast({ type: "error", message: "Failed to load data" });
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [campaignId, token]);

  // ========================================================================
  // HANDLERS
  // ========================================================================
  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const toggleChannel = (channel) => {
    setForm((prev) => {
      const current = prev.channels || [];
      return current.includes(channel)
        ? { ...prev, channels: current.filter((c) => c !== channel) }
        : { ...prev, channels: [...current, channel] };
    });
  };

  async function handleSave(e) {
    e.preventDefault();
    setToast(null);
    setSaving(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // 1. Payload para CAMPAÑA (PATCH)
      const campaignPayload = {
        name: form.name,
        objective: form.objective,
        landingPageUrl: form.landingUrl,
        geo: form.geo,
        budget: form.budget,
        channels: form.channels,
        targetAudience: form.targetAudience,
        primaryKpi: form.primaryKpi,
        tone: form.tone,
        status: form.status,
      };

      // 2. Payload para EMPRESA (Global Update - PUT)
      const companyPayload = {
        primaryGoal: form.primaryGoal,
        successMetric: form.successMetric,
        timeframe: form.timeframe,
      };

      // --- EJECUCIÓN PARALELA ---
      const [campRes, compRes] = await Promise.all([
        // Update Campaign
        fetch(`${apiUrl}/api/v1/campaigns/${campaignId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(campaignPayload),
        }),
        // Update Company (Global)
        fetch(`${apiUrl}/api/v1/company/profile`, {
          method: "PUT",
          headers,
          body: JSON.stringify(companyPayload),
        }),
      ]);

      if (!campRes.ok) throw new Error("Failed to update Campaign");

      if (!compRes.ok)
        console.warn("Warning: Failed to update Company Globals");

      setToast({
        type: "success",
        message: "Campaign & Global Goals updated!",
      });
      setTimeout(() => setToast(null), 2500);
    } catch (e2) {
      console.error(e2);
      setToast({ type: "error", message: "Failed to save. Try again." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <LeftSidebar
        isOpen={isLeftOpen}
        setIsOpen={setIsLeftOpen}
        activeContext={campaignId}
        setActiveContext={(ctx) =>
          ctx === "general"
            ? router.push("/chat")
            : router.push(`/chat/campaign/${ctx}`)
        }
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white">
        <ChatHeader
          headerTitle={headerTitle}
          activeContext={campaignId}
          onOpenLeft={() => setIsLeftOpen(true)}
          onOpenRight={() => setIsRightOpen(true)}
        />

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <button
              onClick={() => router.push(`/chat/campaign/${campaignId}`)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to campaign
            </button>

            <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="text-xl font-semibold text-gray-900">
                Campaign Settings
              </div>

              {toast && (
                <div
                  className={`mt-4 text-sm rounded-xl p-3 border flex items-center gap-2 ${
                    toast.type === "success"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      toast.type === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {toast.message}
                </div>
              )}

              <form onSubmit={handleSave} className="mt-6 space-y-8">
                {/* --- 1. CORE DETAILS --- */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Core Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Campaign Name
                      </label>
                      <input
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Objective
                      </label>
                      <input
                        value={form.objective}
                        onChange={(e) => setField("objective", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Landing Page URL
                      </label>
                      <input
                        value={form.landingUrl}
                        onChange={(e) => setField("landingUrl", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* --- 2. CONFIGURATION --- */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Configuration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setField("status", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none cursor-pointer capitalize"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Geo / Location
                      </label>
                      <input
                        value={form.geo}
                        onChange={(e) => setField("geo", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Budget
                      </label>
                      <input
                        value={form.budget}
                        onChange={(e) => setField("budget", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Target Audience
                      </label>
                      <input
                        value={form.targetAudience}
                        onChange={(e) =>
                          setField("targetAudience", e.target.value)
                        }
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                        placeholder="e.g. Small business owners"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Tone of Voice
                      </label>
                      <select
                        value={form.tone}
                        onChange={(e) => setField("tone", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none cursor-pointer"
                      >
                        {TONE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Channels (Multi-select) */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase mb-2 block">
                      Channels
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CHANNEL_OPTIONS.map((opt) => {
                        const isSelected = form.channels.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleChannel(opt)}
                            className={`h-9 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center gap-2 ${
                              isSelected
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* --- 3. INTEGRATIONS (NEW) --- */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Integrations
                  </h3>
                  {/* ✅ CORREGIDO: Pasamos googleAdsData (NO isConnected) */}
                  <ConnectGoogleAdsBtn googleAdsData={googleAdsData} />
                </div>

                {/* --- 4. GOALS & SUCCESS (GLOBAL DATA) --- */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      Goals & Success
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                        Global Data
                      </span>
                    </h3>
                  </div>

                  {/* ALERT BOX */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-start gap-3">
                    <Globe className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div className="text-xs text-indigo-800 leading-snug">
                      <strong>Global Brand Goals:</strong> The data below comes
                      directly from your <strong>Company Profile</strong>.
                      <br />
                      Any changes made here will update your brand globally,
                      affecting all other campaigns.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Primary Goal
                      </label>
                      <input
                        value={form.primaryGoal}
                        onChange={(e) =>
                          setField("primaryGoal", e.target.value)
                        }
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                        placeholder="e.g. Increase Sales"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Success Metric
                      </label>
                      <input
                        value={form.successMetric}
                        onChange={(e) =>
                          setField("successMetric", e.target.value)
                        }
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                        placeholder="e.g. >200 Conversions"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                        Timeframe
                      </label>
                      <input
                        value={form.timeframe}
                        onChange={(e) => setField("timeframe", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-purple-200 outline-none"
                        placeholder="e.g. Q1 2025"
                      />
                    </div>
                  </div>

                  {/* Primary KPI (Campaign Specific) */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 block">
                      Primary KPI (Campaign Specific)
                    </label>
                    <div className="flex items-center gap-3">
                      {["leads", "sales", "traffic", "awareness"].map((kpi) => (
                        <label
                          key={kpi}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="primaryKpi"
                            value={kpi}
                            checked={form.primaryKpi === kpi}
                            onChange={(e) =>
                              setField("primaryKpi", e.target.value)
                            }
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {kpi}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => router.push(`/chat/campaign/${campaignId}`)}
                    className="h-11 px-6 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="h-11 px-6 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 inline-flex items-center gap-2 shadow-lg transition-all"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <RightSidebar
        isOpen={isRightOpen}
        setIsOpen={setIsRightOpen}
        activeContext={campaignId}
        mode="campaign"
        campaignId={campaignId}
      />
    </div>
  );
}
