"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

// Hook Lógico
import { useBrandDetails } from "@/components/chat/brand-details/useBrandDetails";

// Componentes
import BrandDetailsHeader from "@/components/chat/brand-details/BrandDetailsHeader";
import InfoSection from "@/components/chat/brand-details/sections/InfoSection";
import MissionSection from "@/components/chat/brand-details/sections/MissionSection";
import GoalsSection from "@/components/chat/brand-details/sections/GoalsSection";
import ListsSection from "@/components/chat/brand-details/sections/ListsSection";
import ColorsSection from "@/components/chat/brand-details/sections/ColorsSection";

export default function BrandDetailsPanel() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "edit";

  // Lógica importada
  const {
    formData,
    handleChange,
    handleCancel,
    handleSaveChanges,
    isSaving,
    isConfirming,
    toast,
    loading,
  } = useBrandDetails();

  // Gestión de apertura de secciones (UI State local)
  const [sections, setSections] = useState({
    info: true,
    mission: true,
    goals: true,
    services: false,
    diff: false,
    voice: false,
    colors: false,
  });

  const toggleSection = (key) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandDetailsHeader
        mode={mode}
        isConfirming={isConfirming}
        onCancel={handleCancel}
        onConfirm={handleSaveChanges}
        toast={toast}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4 pb-20">
        {/* Info */}
        <InfoSection
          isOpen={sections.info}
          onToggle={() => toggleSection("info")}
          formData={formData}
          onChange={handleChange}
        />

        {/* Mission */}
        <MissionSection
          isOpen={sections.mission}
          onToggle={() => toggleSection("mission")}
          formData={formData}
          onChange={handleChange}
        />

        {/* Goals */}
        <GoalsSection
          isOpen={sections.goals}
          onToggle={() => toggleSection("goals")}
          formData={formData}
          onChange={handleChange}
        />

        {/* Services */}
        <ListsSection
          title="Services"
          fieldKey="services"
          items={formData.services}
          isOpen={sections.services}
          onToggle={() => toggleSection("services")}
          onChange={handleChange}
        />

        {/* Differentiators */}
        <ListsSection
          title="Differentiators"
          fieldKey="differentiators"
          items={formData.differentiators}
          isOpen={sections.diff}
          onToggle={() => toggleSection("diff")}
          onChange={handleChange}
        />

        {/* Brand Voice */}
        <ListsSection
          title="Brand Voice"
          fieldKey="values"
          items={formData.values}
          isOpen={sections.voice}
          onToggle={() => toggleSection("voice")}
          onChange={handleChange}
        />

        {/* Colors */}
        <ColorsSection
          isOpen={sections.colors}
          onToggle={() => toggleSection("colors")}
          formData={formData}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
