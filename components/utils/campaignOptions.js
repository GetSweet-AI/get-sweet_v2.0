// --- 1. CAMPAIGN OBJECTIVES  ---
export const CAMPAIGN_OBJECTIVES = [
  {
    value: "Awareness",
    label: "Awareness & Reach",
    emoji: "📣",
    description: "Maximize visibility and reach a broad audience.",
  },
  {
    value: "Lead generation",
    label: "Lead Generation",
    emoji: "🧲",
    description: "Collect leads and sign-ups.",
  },
  {
    value: "Conversions",
    label: "Conversions / Sales",
    emoji: "💰",
    description: "Drive valuable actions or purchases.",
  },
  {
    value: "Website traffic",
    label: "Website Traffic",
    emoji: "🌐",
    description: "Get the right people to visit your website.",
  },
  {
    value: "Retention",
    label: "Customer Retention",
    emoji: "🔄",
    description: "Engage existing customers to keep them coming back.",
  },
];

// --- 2. TIMEFRAMES (Duración estratégica) ---
export const TIMEFRAMES = [
  {
    value: "1_MONTH",
    label: "1 Month (Testing)",
    emoji: "⏱️",
    description: "Short-term validation and quick wins.",
  },
  {
    value: "3_MONTHS",
    label: "3 Months (Quarterly)",
    emoji: "📅",
    description: "Standard timeframe for campaign optimization.",
  },
  {
    value: "6_MONTHS",
    label: "6 Months (Growth)",
    emoji: "📈",
    description: "Mid-term strategy for market penetration.",
  },
  {
    value: "12_MONTHS",
    label: "1 Year (Long-term)",
    emoji: "🚀",
    description: "Full brand establishment and market dominance.",
  },
];

// --- 3. PRIMARY GOALS (Metas de Negocio de Alto Nivel) ---
// Esto es más sobre "Qué quiere lograr la empresa" (Business Goal)
export const PRIMARY_GOALS = [
  {
    value: "INCREASE_REVENUE",
    label: "Increase Revenue",
    emoji: "💸",
    description: "Focus on maximizing gross income.",
  },
  {
    value: "IMPROVE_ROAS",
    label: "Improve ROAS",
    emoji: "⚖️",
    description: "Optimize for better Return on Ad Spend.",
  },
  {
    value: "ACQUIRE_NEW_CUSTOMERS",
    label: "Acquire New Customers",
    emoji: "👥",
    description: "Focus on expanding the client base.",
  },
  {
    value: "BRAND_POSITIONING",
    label: "Brand Positioning",
    emoji: "💎",
    description: "Establish authority in a specific niche.",
  },
  {
    value: "LEAD_GENERATION_VOLUME",
    label: "Maximize Lead Volume",
    emoji: "📥",
    description: "Get as many contacts as possible.",
  },
  {
    value: "LEAD_QUALITY",
    label: "Improve Lead Quality",
    emoji: "✨",
    description: "Focus on high-intent prospects.",
  },
];

// --- 4. TONES (Brand Voice) ---
export const TONE_OPTIONS = [
  { value: "Professional", label: "Professional 👔" },
  { value: "Friendly", label: "Friendly 🤝" },
  { value: "Bold", label: "Bold 🦁" },
  { value: "Witty", label: "Witty 💡" },
  { value: "Urgent", label: "Urgent (Sales) ⏰" },
  { value: "Empathetic", label: "Empathetic ❤️" },
  { value: "Direct", label: "Direct 🎯" },
];

// --- 5. PRIMARY KPIS (Campaign Specific Metrics) ---
export const KPI_OPTIONS = [
  { value: "Cost Per Lead (CPL)", label: "Cost Per Lead (CPL)" },
  { value: "Cost Per Acquisition (CPA)", label: "Cost Per Acquisition (CPA)" },
  { value: "Return on Ad Spend (ROAS)", label: "Return on Ad Spend (ROAS)" },
  { value: "Click-Through Rate (CTR)", label: "Click-Through Rate (CTR)" },
  { value: "Conversion Rate", label: "Conversion Rate (%)" },
  { value: "Total Leads Generated", label: "Total Leads Generated" },
  { value: "Total Sales Value", label: "Total Sales Value" },
  { value: "Impressions", label: "Impressions (Reach)" },
];

// --- 6. CHANNELS (Advertising Platforms) ---
export const CHANNELS = [
  { id: "Google Search", label: "Google Search" },
  { id: "Website", label: "Website" },
  { id: "Email", label: "Email" },
  { id: "Social", label: "Social Media" },
];

// --- HELPER PARA OBTENER LABEL ---
export const getLabelByValue = (list, value) => {
  const item = list.find((i) => i.value === value);
  return item ? item.label : value;
};
