"use client";

import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrandDetailsHeader({
  mode,
  isSaving, // Estado de guardado local (si lo usas) o general
  isConfirming, // Estado del guardado final
  onCancel, // Acción para botón Cancelar
  onConfirm, // Acción para botón Save Changes
  toast,
}) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-20 bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 1. BOTÓN BACK (Navegación simple) */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-sm font-semibold text-gray-900 hidden sm:block">
          Brand Details {mode === "review" ? "(Review)" : ""}
        </div>

        <div className="flex items-center gap-3">
          {/* 2. BOTÓN CANCEL (Descarta y sale) */}
          <button
            onClick={onCancel}
            disabled={isConfirming}
            className="text-sm font-semibold text-gray-500 hover:text-red-600 px-3 py-2 transition-colors flex items-center gap-1"
          >
            Cancel
          </button>

          {/* 3. BOTÓN SAVE CHANGES (Guarda y va a /campaign) */}
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className="h-10 px-5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 inline-flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
          >
            {isConfirming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {toast && (
        <div
          className={`max-w-4xl mx-auto px-4 pb-3 text-sm font-medium animate-in slide-in-from-top-2 ${
            toast.type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
