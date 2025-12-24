"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Save,
  Layers,
  Cpu,
  Sparkles,
  Bot,
  AlertCircle,
  Check,
  Lock,
} from "lucide-react";
import ConnectGoogleAdsBtn from "@/components/chat/campaign/ConnectGoogleAdsBtn";
import GeneratedResults from "@/components/chat/campaign/GeneratedResults";
import LocationPicker from "../../ui/inputs/LocationPicker";
import LanguagePicker from "../../ui/inputs/LanguagePicker";
import { CAMPAIGN_OBJECTIVES } from "@/components/utils/campaignOptions";
import { CurrencyInput } from "@/components/ui/inputs/CurrencyInput";
import { InputField } from "@/components/ui/inputs/InputField";
import { SelectField } from "@/components/ui/inputs/SelectField";
import CampaignHelpCard from "@/components/chat/campaign/CampaignHelpCard"; // Asegúrate de importar esto

// --- COMPONENTES UI REUTILIZABLES ---

const Label = ({ children, required }) => (
  <label className="text-[11px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
    {children}
    {required && <span className="text-red-500 text-xs">*</span>}
  </label>
);

// --- COMPONENTE PRINCIPAL ---

export default function SettingsPanel({
  campaignDetails,
  setCampaignDetails,
  googleAdsData,
  generatedData,
  activeGenerationId,
  isSaving,
  isGenerating,
  onGenerateDraft,
  onSave,
  onApprove,
  onDiscard,
  onRegenerateGroup,
  onUpdateGroup,
}) {
  const [viewMode, setViewMode] = useState("simple");
  const [originalData, setOriginalData] = useState(null);

  // DETECTAR SI ESTÁ PUBLICADA (FULL)
  const isPublished = campaignDetails.status === "published";

  useEffect(() => {
    if (!originalData && campaignDetails?.name) {
      setOriginalData(JSON.parse(JSON.stringify(campaignDetails)));
    }
  }, [campaignDetails, originalData]);

  const handleDetailChange = (key, value) => {
    if (isPublished) return;
    setCampaignDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveClick = async () => {
    await onSave();
    setOriginalData(JSON.parse(JSON.stringify(campaignDetails)));
  };

  const isFormValid =
    campaignDetails.name?.trim() &&
    campaignDetails.objective?.trim() &&
    campaignDetails.landingUrl?.trim() &&
    campaignDetails.geo?.trim() &&
    campaignDetails.language?.trim() &&
    campaignDetails.budget;

  const hasChanges =
    JSON.stringify(campaignDetails) !== JSON.stringify(originalData);
  const canSave = hasChanges && isFormValid && !isSaving && !isPublished;

  return (
    <div className="px-6 py-6 space-y-6 pb-24 max-w-4xl mx-auto">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Campaign Setup</h1>
            {/* 🚀 BADGE DE ESTADO */}
            {isPublished && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> PUBLISHED
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            Configure your AI agent strategy.
          </p>
        </div>

        {/* Toggle de vista (ocultar si está publicada para limpiar ruido) */}
        {!isPublished && (
          <div className="bg-gray-100 p-1 rounded-xl flex items-center shadow-inner self-start md:self-auto">
            <button
              onClick={() => setViewMode("simple")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                viewMode === "simple"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Layers className="w-4 h-4" /> Simple
            </button>
            <button
              onClick={() => setViewMode("expert")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                viewMode === "expert"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Cpu className="w-4 h-4" /> Expert
            </button>
          </div>
        )}
      </div>

      {/* --- BLOQUE 1: CAMPAIGN SETTINGS (READ ONLY IF PUBLISHED) --- */}
      <div
        className={`w-full bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative ${
          isPublished ? "opacity-75 grayscale-[0.3]" : ""
        }`}
      >
        {/* 🚀 OVERLAY BLOQUEO VISUAL */}
        {isPublished && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" /> READ ONLY
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-base font-semibold text-gray-900">
              Campaign Configuration
            </div>
            {!isPublished && (
              <div className="text-sm mt-1 flex items-center gap-2">
                {!isFormValid ? (
                  <span className="text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Fill required fields
                  </span>
                ) : hasChanges ? (
                  <span className="text-purple-600 flex items-center gap-1 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />{" "}
                    Unsaved changes
                  </span>
                ) : (
                  <span className="text-gray-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> All saved
                  </span>
                )}
              </div>
            )}
          </div>

          {!isPublished && (
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={!canSave}
              className={`h-10 px-5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-sm ${
                canSave
                  ? "bg-gray-900 text-white hover:bg-black hover:shadow-md transform hover:scale-105"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          )}
        </div>

        {/* INPUTS (Deshabilitados si isPublished es true) */}
        <fieldset disabled={isPublished} className="space-y-5">
          <InputField
            label="Campaign name"
            value={campaignDetails.name}
            onChange={(e) => handleDetailChange("name", e.target.value)}
            required={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectField
              label="Objective"
              value={campaignDetails.objective}
              onChange={(e) => handleDetailChange("objective", e.target.value)}
              options={CAMPAIGN_OBJECTIVES}
              required={true}
            />
            <InputField
              label="Landing page URL"
              value={campaignDetails.landingUrl}
              onChange={(e) => handleDetailChange("landingUrl", e.target.value)}
              required={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 relative">
              <LocationPicker
                value={campaignDetails.geo}
                onChange={(val) => handleDetailChange("geo", val)}
              />
            </div>
            <LanguagePicker
              value={campaignDetails.language}
              onChange={(val) => handleDetailChange("language", val)}
            />
            <div>
              <Label required>Budget daily (USD)</Label>
              <CurrencyInput
                value={campaignDetails.budget}
                onChange={(val) => handleDetailChange("budget", val)}
                required={true}
              />
            </div>
          </div>
          {/* EXPERT MODE */}
          {!isPublished && viewMode === "expert" && (
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
                />
                <InputField
                  label="Negative Keywords (Global)"
                  value={campaignDetails.globalNegatives || ""}
                  onChange={(e) =>
                    handleDetailChange("globalNegatives", e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </fieldset>
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

      {/* 🚀 LÓGICA DE VISUALIZACIÓN FINAL 🚀 */}

      {!generatedData ? (
        // A) ESTADO INICIAL: Botón Generar (Solo si no hay datos)
        <div className="w-full bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-10 text-center animate-in fade-in slide-in-from-bottom-2">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to build your ads group?
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            Sweet AI will analyze your brand profile and settings to generate 3
            optimized Ad Groups, Keywords, and RSA Copies.
          </p>
          {!isFormValid && (
            <div className="mb-6 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2 border border-amber-200 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4" /> Please fill in all required
              fields marked with * to continue.
            </div>
          )}
          <button
            onClick={() => onGenerateDraft()}
            disabled={isGenerating || !isFormValid}
            className={`h-14 px-8 rounded-2xl text-base font-bold shadow-xl transition-all flex items-center gap-3 mx-auto 
              ${
                isFormValid
                  ? "bg-gray-900 hover:bg-black text-white hover:scale-105 shadow-indigo-200"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              }
            `}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating
                Strategy...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Ads Draft
              </>
            )}
          </button>
        </div>
      ) : (
        // B) SI HAY DATOS (Ya sea borrador, parcial o full publicado)
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* 1. Si está FULL publicado, mostramos la carta de éxito ARRIBA */}
          {isPublished && (
            <CampaignHelpCard
              googleResourceId={campaignDetails.googleAdsResourceId}
            />
          )}

          <GeneratedResults
            structure={generatedData}
            viewMode={viewMode}
            campaignId={campaignDetails._id}
            generationId={activeGenerationId}
            onRegenerate={onGenerateDraft}
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
