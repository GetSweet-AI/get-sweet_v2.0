"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./useContext";

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const { user, token } = useAuth();

  // 1. ESTADO INICIAL INTELIGENTE

  const [companyData, setCompanyData] = useState({
    brandName: user?.businessName || "",
    industry: user?.industry || "",
    aka: "",
    status: "Draft",
    mission: "",
    vision: "",
    values: [],
    services: [],
    differentiators: [],
    targetAudience: "",
    tone: "Professional",
    brandVoice: [],
    trustSignals: [],
    colors: [],
  });

  useEffect(() => {
    if (user) {
      setCompanyData((prev) => ({
        ...prev,
        brandName: user.businessName || prev.brandName,
        industry: user.industry || prev.industry,
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanyData = useCallback(async () => {
    if (!user || !token) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/company/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 404) return; // Perfil no existe, mantenemos defaults del user

      if (!res.ok) throw new Error("Failed to load company profile");

      const responseJson = await res.json();

      const apiData = responseJson.data || responseJson;

      if (apiData) {
        setCompanyData((prev) => ({
          ...prev,
          ...apiData,
          // 4. FALLBACK DE SEGURIDAD
          brandName: apiData.brandName || user.businessName,
          industry: apiData.industry || user.industry,
        }));
      }
    } catch (err) {
      console.error("❌ Error loading company data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  // 5. FUNCIÓN DE ACTUALIZACIÓN LOCAL
  const updateCompanyState = (newData) => {
    setCompanyData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <CompanyContext.Provider
      value={{
        companyData,
        updateCompanyState,
        refreshCompanyData: fetchCompanyData,
        loading,
        error,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
