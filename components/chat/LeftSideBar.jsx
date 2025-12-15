"use client";
import {
  MessageSquare,
  Settings,
  Sparkles,
  Rocket,
  X,
  LogOut,
  User,
  Plus,
} from "lucide-react";
import { useAuth } from "@/context/useContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreateCampaignModal from "./modals/CreateCampaignModal";
import { useCallback, useEffect, useState } from "react";

export default function LeftSidebar({
  isOpen,
  setIsOpen,
  activeContext,
  setActiveContext,
}) {
  const { user, logout, token } = useAuth();
  const router = useRouter();

  const [campaigns, setCampaigns] = useState([]);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  // Helper para iniciales
  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : "U";
  };

  const getCampaignsList = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/campaigns`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  // 2. USE EFFECT: Cargar al inicio o al cambiar el token
  useEffect(() => {
    getCampaignsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Solo dependemos del token, rompemos el ciclo

  // 3. HANDLER PARA REFRESCAR (Usado al cerrar el modal)
  const handleCampaignCreated = () => {
    getCampaignsList(); // Recargamos la lista manualmente
    setIsCampaignModalOpen(false); // Cerramos modal
  };

  const handleNavigation = (contextId) => {
    if (typeof setActiveContext === "function") {
      setActiveContext(contextId);
    } else {
      router.push("/chat");
    }

    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out border-r border-slate-800
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => (window.location.href = "/chat")}
            className="flex items-center gap-2 cursor-pointer transition-opacity"
          >
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Sweet Manager
            </span>
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 text-xs font-semibold text-slate-500 uppercase mb-2">
            Principal
          </div>

          <nav className="space-y-1 px-2">
            <button
              onClick={() => handleNavigation("general")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeContext === "general"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat General
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </nav>

          {/* SECCIÓN DE CAMPAÑAS */}
          <div className="mt-8 px-4 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase mb-2">
            <span>My campaigns</span>
            <button
              onClick={() => setIsCampaignModalOpen(true)}
              // className="hover:text-white text-lg leading-none transition-colors">
              className="hover:text-white text-slate-400 transition-colors p-1 rounded hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1 px-2">
            {campaigns.length === 0 ? (
              <p className="px-3 text-xs text-slate-600 italic">
                No campaigns yet.
              </p>
            ) : (
              campaigns.map((camp) => (
                <button
                  key={camp._id}
                  onClick={() => handleNavigation(camp._id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeContext === camp._id
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Rocket className="w-4 h-4 shrink-0" />
                    <span className="truncate">{camp.name}</span>
                  </div>
                  {activeContext === camp._id && (
                    <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                  )}
                </button>
              ))
            )}
          </nav>
        </div>

        {/* Footer de Usuario*/}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {user?.image || user?.avatar ? (
                <Image
                  src={user.image || user.avatar}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full bg-slate-700 object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                  {getInitials(user?.fullName)}
                </div>
              )}

              <div className="flex flex-col min-w-0">
                <p className="font-medium text-sm truncate text-white">
                  {user?.fullName || "Guest User"}
                </p>
                <p className="text-xs text-slate-500 truncate capitalize">
                  {user?.role || "Free Plan"}
                </p>
              </div>
            </div>

            {user ? (
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => router.push("/sign-in")}
                className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Sign in"
              >
                <User className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <CreateCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => handleCampaignCreated()}
      />
    </>
  );
}
