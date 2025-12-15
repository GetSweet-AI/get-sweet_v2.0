"use client";

import { useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/useContext";

export default function CreateCampaignModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, tone }),
        }
      );

      if (!res.ok) throw new Error("Failed to create campaign");

      const data = await res.json();
      const newCampaignId = data._id || data.data._id; // Ajusta según tu respuesta del backend

      // ✅ CLAVE: Redirigir al contexto de la campaña
      // Esto limpia el chat actual y carga el historial (vacío) de la campaña
      // Puedes usar query params o una ruta dinámica ej: /chat/campaign/[id]
      // O si usas un estado global para 'activeCampaignId', actualízalo aquí.

      // Ejemplo asumiendo que manejas el ID en la URL o estado:
      console.log("Campaña creada:", newCampaignId);

      // Opción A: Si usas rutas dinámicas
      // router.push(`/chat/${newCampaignId}`);

      // Opción B: Si usas un contexto de Chat, aquí deberías llamar a una función
      // setCampaignId(newCampaignId);

      onClose();
      // Forzar recarga o actualización de la lista de campañas si la tienes en el LeftSidebar
      window.location.reload(); // Solución rápida temporal para ver el cambio
    } catch (err) {
      console.error(err);
      alert("Error creating campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              New Campaign
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Let&apos;s start a fresh strategy. The AI will focus exclusively on
            this campaign&apos;s goals.
          </p>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Summer Sale 2025"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Campaign Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
              >
                <option value="Professional">Professional</option>
                <option value="Urgent">Urgent (Sales)</option>
                <option value="Friendly">Friendly</option>
                <option value="Bold">Bold</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!name.trim() || loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Start Campaign"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
