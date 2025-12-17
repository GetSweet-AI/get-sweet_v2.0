"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCompany } from "@/context/CompanyContext";
import { useAuth } from "@/context/useContext";

const DRAFT_KEY = "sweet:brandDraft";

export function useBrandDetails() {
  const router = useRouter();
  const { token } = useAuth();
  const { companyData, updateCompanyState, loading } = useCompany();

  const [formData, setFormData] = useState({
    brandName: "",
    aka: "",
    industry: "",
    targetAudience: "",
    website: "",
    mission: "",
    vision: "",
    primaryGoal: "",
    goals: [],
    services: [],
    differentiators: [],
    values: [],
    colors: [],
  });

  const [toast, setToast] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false); // Usamos este estado para el loading del botón principal

  // =========================================================
  // 🔍 HYDRATION (Carga de Datos)
  // =========================================================
  useEffect(() => {
    if (!companyData) return;

    // 1. Normalización de datos (DB -> Form)
    const validData =
      companyData.data || companyData.companyData || companyData;

    const dbData = {
      brandName: validData.name || validData.brandName || "",
      aka: validData.aka || "",
      industry: validData.industry || "",
      targetAudience: validData.targetAudience || "",
      website: validData.website || "",
      mission: validData.mission || "",
      vision: validData.vision || "",
      primaryGoal: validData.primaryGoal || "",
      goals: Array.isArray(validData.goals) ? validData.goals : [],
      services: Array.isArray(validData.services) ? validData.services : [],
      differentiators: Array.isArray(validData.differentiators)
        ? validData.differentiators
        : [],
      values: Array.isArray(validData.values) ? validData.values : [],
      colors: Array.isArray(validData.colors) ? validData.colors : [],
    };

    // 2. Prioridad: Si hay un borrador local con nombre, úsalo. Si no, usa la DB.
    let finalData = dbData;
    try {
      const localDraftRaw = localStorage.getItem(DRAFT_KEY);
      if (localDraftRaw) {
        const localDraft = JSON.parse(localDraftRaw);
        if (localDraft.brandName && localDraft.brandName.trim() !== "") {
          finalData = localDraft;
        }
      }
    } catch (e) {
      console.error(e);
    }

    setFormData(finalData);
  }, [companyData]);

  // =========================================================
  // HANDLERS
  // =========================================================

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Autosave local por seguridad (si refrescan la página)
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
  };

  // ❌ CANCELAR (Salir sin guardar en DB, vuelve al chat)
  function handleCancel() {
    router.push("/chat");
  }

  // ✅ GUARDAR Y CONTINUAR (Save -> DB -> Campaign)
  async function handleSaveChanges() {
    setIsConfirming(true);
    setToast(null);

    try {
      // 1. Preparar Payload
      const payload = {
        ...formData,
        name: formData.brandName,
        status: "Draft", // Draft, Ready or Archive
      };

      // 2. Fetch PUT a la DB
      const res = await fetch(
        "https://backend-get-sweet-v2-0.onrender.com/api/v1/company/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save changes");

      const json = await res.json();
      const updatedData = json.data || json.companyData || payload;

      // 3. Actualizar Contexto
      updateCompanyState(updatedData);

      // 4. Limpiar basura local
      localStorage.removeItem(DRAFT_KEY);
      localStorage.setItem("sweet:brandLocked", "true");

      setToast({
        type: "success",
        message: "Saved! Continuing to Campaigns...",
      });

      // 5. Redirigir a Campaign
      setTimeout(() => {
        setToast(null);
        router.push("/chat/campaign");
      }, 1000);
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Error saving changes." });
    } finally {
      setIsConfirming(false);
    }
  }

  return {
    formData,
    handleChange,
    handleCancel,
    handleSaveChanges,
    isConfirming,
    toast,
    loading: loading && !formData.brandName,
  };
}
