// components/onboarding/brand-import/SourceStatusPill.jsx
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function SourceStatusPill({ status }) {
  const map = {
    none: {
      label: "Not added",
      icon: null,
      cls: "bg-gray-100 text-gray-600 border-gray-200",
    },
    importing: {
      label: "Importing…",
      icon: Loader2,
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    ready: {
      label: "Added",
      icon: CheckCircle2,
      cls: "bg-green-50 text-green-700 border-green-200",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      cls: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const cfg = map[status] || map.none;
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-full border ${cfg.cls}`}
    >
      {Icon ? (
        <Icon
          className={`w-3.5 h-3.5 ${
            status === "importing" ? "animate-spin" : ""
          }`}
        />
      ) : null}
      {cfg.label}
    </span>
  );
}
