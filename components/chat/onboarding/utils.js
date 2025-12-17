// components/onboarding/brand-import/utils.js

export function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function formatTime(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "";
  }
}

/**
 * Crea el objeto borrador final
 */
export function buildDraftFromSources(sources) {
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
    primaryGoal: "",
    goals: [],
    successMetric: "",
    goalTimeframe: "",
    __sources: {
      website: sources.website,
      decks: sources.decks, // Contiene las URLs reales de Cloudinary
      ai: sources.ai,
    },
  };
}
