"use client";

import { useState } from "react";
import { Loader2, Save, Layers, Cpu, Sparkles, Bot } from "lucide-react";
import ConnectGoogleAdsBtn from "@/components/chat/campaign/ConnectGoogleAdsBtn";
import GeneratedResults from "@/components/chat/campaign/GeneratedResults";

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div>
    <div className="text-[11px] font-bold text-gray-500 uppercase mb-1 tracking-wide">
      {label}
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-200 transition-all"
    />
  </div>
);

export default function SettingsPanel({
  campaignDetails,
  setCampaignDetails,
  googleAdsData,
  // Props de la IA y Estado
  generatedData,
  activeGenerationId,
  isSaving,
  isGenerating,
  // ACCIONES (Funciones)
  onGenerateDraft,
  onSave,
  onApprove,
  onDiscard,
  onRegenerateGroup,
  onUpdateGroup,
}) {
  const [viewMode, setViewMode] = useState("simple"); // 'simple' | 'expert'

  const handleDetailChange = (key, value) => {
    setCampaignDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="px-6 py-6 space-y-6 pb-24 max-w-4xl mx-auto">
      {/* --- HEADER + TOGGLE DE MODO --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Setup</h1>
          <p className="text-gray-500 text-sm">
            Configure your AI agent strategy.
          </p>
        </div>

        {/* 🎚️ UI TOGGLE */}
        <div className="bg-gray-100 p-1 rounded-xl flex items-center shadow-inner self-start md:self-auto">
          <button
            onClick={() => setViewMode("simple")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
              viewMode === "simple"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Layers className="w-4 h-4" />
            Simple
          </button>
          <button
            onClick={() => setViewMode("expert")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
              viewMode === "expert"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Cpu className="w-4 h-4" />
            Expert
          </button>
        </div>
      </div>

      {/* --- BLOQUE 1: CAMPAIGN SETTINGS --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-base font-semibold text-gray-900">
              Campaign Configuration
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Core settings that define your campaign strategy.
            </div>
          </div>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="h-10 px-5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm hover:shadow"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="space-y-5">
          <InputField
            label="Campaign name"
            value={campaignDetails.name}
            onChange={(e) => handleDetailChange("name", e.target.value)}
            placeholder="e.g., Q4 Lead Generation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Objective"
              value={campaignDetails.objective}
              onChange={(e) => handleDetailChange("objective", e.target.value)}
              placeholder="e.g., Leads / Sales"
            />
            <InputField
              label="Landing page URL"
              value={campaignDetails.landingUrl}
              onChange={(e) => handleDetailChange("landingUrl", e.target.value)}
              placeholder="https://yourbusiness.com/offer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InputField
              label="Geo Location"
              value={campaignDetails.geo}
              onChange={(e) => handleDetailChange("geo", e.target.value)}
              placeholder="e.g., Madrid, Spain"
            />
            <InputField
              label="Language"
              value={campaignDetails.language}
              onChange={(e) => handleDetailChange("language", e.target.value)}
              placeholder="e.g., English"
            />
            <InputField
              label="Daily Budget (USD)"
              value={campaignDetails.budget}
              onChange={(e) => handleDetailChange("budget", e.target.value)}
              placeholder="e.g., 50"
              type="number" // Para ayudar al usuario
            />
          </div>

          {/* 🔒 CAMPOS EXPERTOS */}
          {viewMode === "expert" && (
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mt-4 animate-in fade-in slide-in-from-top-2">
              <div className="text-xs font-bold text-indigo-800 uppercase mb-3 flex items-center gap-2">
                <Cpu className="w-3 h-3" /> Advanced Settings
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Bid Strategy"
                  value={campaignDetails.bidStrategy || "Max Conversions"}
                  onChange={(e) =>
                    handleDetailChange("bidStrategy", e.target.value)
                  }
                  placeholder="e.g. Target CPA"
                />
                <InputField
                  label="Negative Keywords (Global)"
                  value={campaignDetails.globalNegatives || ""}
                  onChange={(e) =>
                    handleDetailChange("globalNegatives", e.target.value)
                  }
                  placeholder="comma, separated, values"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- BLOQUE 2: INTEGRATIONS --- */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <div className="text-base font-semibold text-gray-900">
            Platform Integrations
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Connect your ad accounts to sync generated assets directly.
          </div>
        </div>
        <ConnectGoogleAdsBtn googleAdsData={googleAdsData} />
      </div>

      {/* --- BLOQUE 3: AI GENERATION & RESULTS --- */}

      {/* CASO A: NO HAY CONTENIDO -> MOSTRAR BOTÓN GENERAR */}
      {!generatedData && (
        <div className="w-full bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-10 text-center animate-in fade-in slide-in-from-bottom-2">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to build your campaign?
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Sweet AI will analyze your brand profile and settings to generate 3
            optimized Ad Groups, Keywords, and RSA Copies.
          </p>

          <button
            onClick={() => onGenerateDraft()}
            disabled={isGenerating}
            className="h-14 px-8 rounded-2xl bg-gray-900 hover:bg-black text-white text-base font-bold shadow-xl shadow-indigo-200 transition-all hover:scale-105 flex items-center gap-3 mx-auto disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Strategy...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Campaign Structure
              </>
            )}
          </button>
        </div>
      )}

      {/* CASO B: HAY CONTENIDO -> MOSTRAR RESULTADOS + APROBAR */}
      {generatedData && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <GeneratedResults
            // Data
            structure={generatedData}
            viewMode={viewMode}
            campaignId={campaignDetails._id}
            generationId={activeGenerationId}
            onRegenerate={(feedback) => onGenerateDraft(feedback)}
            onApprove={onApprove}
            onDiscard={onDiscard}
            onRegenerateGroup={onRegenerateGroup}
            onUpdateGroup={onUpdateGroup}
          />
        </div>
      )}
    </div>
  );
}
