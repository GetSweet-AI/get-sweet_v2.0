"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/useContext";
import { useToast } from "@/context/ToastContext";

// Componentes Layout
import LeftSidebar from "@/components/chat/LeftSideBar";
import RightSidebar from "@/components/chat/RightSideBar";
import CampaignStatusBanner from "@/components/chat/campaign/CampaignStatusBanner";
import CampaignTabs from "@/components/chat/campaign/CampaignTabs";

// Paneles
import ResultsPanel from "@/components/chat/campaign/ResultsPanel";
import SettingsPanel from "@/components/chat/campaign/SettingsPanel";

export default function CampaignPage() {
  const toast = useToast();
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const campaignId = String(id);

  // --- Estados de UI ---
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("settings");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaign, setCampaign] = useState(null);

  // --- Estados de Datos ---
  const [googleAdsData, setGoogleAdsData] = useState(null);

  // Datos de la IA
  const [generatedData, setGeneratedData] = useState(null);
  const [activeGenerationId, setActiveGenerationId] = useState(null);
  const [draftVersion, setDraftVersion] = useState(0);
  const [draftStatus, setDraftStatus] = useState("planning");

  // Inputs del Usuario
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    objective: "",
    landingUrl: "",
    geo: "",
    language: "English",
    budget: "",
    bidStrategy: "",
    globalNegatives: "",
  });

  // 👇 NUEVA FUNCIÓN: Verifica el estado real en Google al cargar la página (Background Check)
  const checkLiveGoogleStatus = async () => {
    try {
      // Reutilizamos el endpoint de analytics porque es el que trae el status real de Google
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns/${campaignId}/analytics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();

      // Si la respuesta trae el status overview de Google...
      if (json.success && json.data?.overview?.status) {
        const googleStatus = json.data.overview.status; // "ENABLED" o "PAUSED"

        // Mapeamos al vocabulario de la App
        let realStatus = "draft";
        if (googleStatus === "ENABLED") realStatus = "active";
        else if (googleStatus === "PAUSED") realStatus = "paused";
        else realStatus = googleStatus;

        // Actualizamos el estado local si difiere del real
        setDraftStatus((current) => {
          if (current !== realStatus) {
            console.log(`⚡ Background Sync: ${current} -> ${realStatus}`);

            // Sincronizamos todos los estados dependientes
            setCampaignDetails((prev) => ({ ...prev, status: realStatus }));
            setCampaign((prev) => ({ ...prev, status: realStatus }));

            return realStatus;
          }
          return current;
        });
      }
    } catch (error) {
      console.warn("⚠️ Background status check failed:", error);
    }
  };

  // --- 1. CARGA INICIAL ---
  useEffect(() => {
    if (!token || !campaignId) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const [campRes, compRes] = await Promise.all([
          fetch(`${apiUrl}/api/v1/campaigns/${campaignId}`, { headers }),
          fetch(`${apiUrl}/api/v1/company/profile`, { headers }),
        ]);

        if (campRes.ok) {
          const data = await campRes.json();
          setCampaign(data);

          setCampaignDetails({
            name: data.name || "",
            objective: data.objective || "",
            landingUrl: data.landingPageUrl || "",
            geo: data.geo || "",
            budget: data.budget || "",
            language: data.language || "English",
            bidStrategy: data.bidStrategy || "",
            globalNegatives: data.globalNegatives || "",
            status: data.status || "planning",
            googleAdsResourceId: data.googleAdsResourceId || "",
          });

          setDraftStatus(data.status || "planning");

          if (data.activeGenerationId) {
            if (typeof data.activeGenerationId === "object") {
              setGeneratedData(data.activeGenerationId.structure);
              setActiveGenerationId(data.activeGenerationId._id);
              setDraftVersion(data.activeGenerationId.version);
            }
          }

          // 👇 DISPARAMOS LA VERIFICACIÓN SILENCIOSA AQUÍ
          // Si la campaña ya está publicada (tiene ID), consultamos a Google en segundo plano
          if (data.googleAdsResourceId) {
            checkLiveGoogleStatus();
          }
        }

        if (compRes.ok) {
          const rawComp = await compRes.json();
          const compObj = Array.isArray(rawComp)
            ? rawComp[0]
            : rawComp.data || rawComp;
          if (compObj?.googleAds) setGoogleAdsData(compObj.googleAds);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading campaign data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, token]);

  // --- 2. GUARDAR CONFIGURACIÓN ---
  const handleSaveSettings = async () => {
    if (!token || !campaignId) return;
    setIsSaving(true);
    try {
      const payload = {
        name: campaignDetails.name,
        objective: campaignDetails.objective,
        geo: campaignDetails.geo,
        budget: campaignDetails.budget,
        landingPageUrl: campaignDetails.landingUrl,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns/${campaignId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save");
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  // --- 3. GENERAR ESTRUCTURA COMPLETA ---
  const handleGenerateDraft = async (feedbackInput) => {
    const feedbackText = typeof feedbackInput === "string" ? feedbackInput : "";

    if (!campaignDetails.landingUrl) {
      return toast.warning("Please enter a Landing Page URL first.");
    }

    setIsGenerating(true);
    try {
      await handleSaveSettings();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns/${campaignId}/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userFeedback: feedbackText }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Generation failed");

      setGeneratedData(data.data.structure);
      setActiveGenerationId(data.data._id);
      setDraftVersion(data.data.version);
      setDraftStatus("review");

      toast.success(`Campaign V${data.data.version} generated!`);
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("AI failed to generate campaign.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- 4. REGENERAR UN SOLO GRUPO ---
  const handleRegenerateGroup = async (groupIndex, groupData) => {
    const prompt = `Regenerate ONLY the Ad Group named "${groupData.name}". Keep the others exactly as they were.`;
    await handleGenerateDraft(prompt);
  };

  // --- 5. ACTUALIZAR UN SOLO GRUPO ---
  const handleUpdateGroup = async (groupIndex, updatedGroup) => {
    const newData = JSON.parse(JSON.stringify(generatedData));
    newData.adGroups[groupIndex] = updatedGroup;

    setGeneratedData(newData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns/${campaignId}/generations/${activeGenerationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ structure: newData }),
        }
      );
      if (!res.ok) throw new Error("Failed to save changes");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sync changes with server");
    }
  };

  // --- 6. APROBAR Y PUBLICAR ---
  const handleApproveAndPublish = async (targetGroupIndices) => {
    if (!confirm("Are you ready to launch this campaign to Google Ads?"))
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns/${campaignId}/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            targetGroupIndices: targetGroupIndices,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Publish failed");

      // ✅ 1. ACTUALIZAR ESTRUCTURA LOCALMENTE
      if (data.updatedStructure) {
        setGeneratedData(data.updatedStructure);
      }

      // ✅ 2. ACTUALIZAR ESTADO DE LA CAMPAÑA
      // Asumimos "active" tras publicar, aunque podría ser "published"
      const newStatus = "active";

      setCampaignDetails((prev) => ({
        ...prev,
        status: newStatus,
        googleAdsResourceId: data.googleResourceId,
      }));

      // Actualizamos campaign para que el Toggle se active
      setCampaign((prev) => ({
        ...prev,
        status: newStatus,
        googleAdsResourceId: data.googleResourceId,
      }));

      // Actualizar banner superior
      setDraftStatus(newStatus);

      toast.success(data.message || "🚀 Updates published to Google Ads!");

      if (
        data.updatedStructure?.adGroups?.every((g) => g.isPublished === true)
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Publish Error:", error);
      toast.error(error.message);
    }
  };

  // Callback para cuando ResultsPanel sincroniza (por si acaso el background check falló)
  const handleGoogleSync = (googleStatus) => {
    const appStatus =
      googleStatus === "ENABLED"
        ? "active"
        : googleStatus === "PAUSED"
        ? "paused"
        : "draft";

    if (draftStatus !== appStatus) {
      console.log("🔄 Syncing Banner Status (Via ResultsPanel) to:", appStatus);
      setDraftStatus(appStatus);
      setCampaignDetails((prev) => ({ ...prev, status: appStatus }));
      setCampaign((prev) => ({ ...prev, status: appStatus }));
    }
  };

  function handleUnlock() {
    if (confirm("Discard current draft and start over?")) {
      setGeneratedData(null);
      setActiveGenerationId(null);
      setDraftStatus("planning");
    }
  }

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );

  const handleStatusChange = (newStatus) => {
    setCampaign((prev) => ({ ...prev, status: newStatus }));
    setCampaignDetails((prev) => ({ ...prev, status: newStatus }));
    setDraftStatus(newStatus);
  };

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
        <CampaignStatusBanner
          onStatusChange={handleStatusChange}
          campaign={campaign}
          status={draftStatus}
          provider="Google Ads"
          version={draftVersion}
          locked={!!generatedData}
          onUnlock={handleUnlock}
          onRegenerate={handleGenerateDraft}
          campaignId={campaignId}
        />

        <div className="pt-3">
          <CampaignTabs active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="flex-1 min-h-0">
          {activeTab === "settings" && (
            <div className="h-full overflow-y-auto">
              <SettingsPanel
                // Datos
                campaignDetails={campaignDetails}
                setCampaignDetails={setCampaignDetails}
                googleAdsData={googleAdsData}
                // IA & Acciones
                generatedData={generatedData}
                activeGenerationId={activeGenerationId}
                onGenerateDraft={handleGenerateDraft}
                onSave={handleSaveSettings}
                onApprove={handleApproveAndPublish}
                onDiscard={handleUnlock}
                // Nuevas Props para manejo granular
                onRegenerateGroup={handleRegenerateGroup}
                onUpdateGroup={handleUpdateGroup}
                // Estados
                isSaving={isSaving}
                isGenerating={isGenerating}
              />
            </div>
          )}

          {activeTab === "results" && (
            <div className="h-full overflow-y-auto">
              <ResultsPanel onSyncStatus={handleGoogleSync} />
            </div>
          )}
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
