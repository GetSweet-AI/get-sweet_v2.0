"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";
import ChatInput from "./ChatInput";
import { useAuth } from "@/context/useContext";

export default function ChatWindow({ activeContext }) {
  const { token, user } = useAuth();
  const [guestId, setGuestId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [extracted, setExtracted] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);

  // === CORRECTO: ahora sí tomamos el _id del backend ===
  const userId = user?._id || guestId;

  // Crear guest si no hay usuario
  useEffect(() => {
    if (!user) {
      let gid = localStorage.getItem("guestId");
      if (!gid) {
        gid = "guest-" + crypto.randomUUID();
        localStorage.setItem("guestId", gid);
      }
      setGuestId(gid);
    }
  }, [user]);

  const backendUrl = "https://backend-get-sweet-v2-0.onrender.com";

  // === Cargar historial desde backend ===
  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId || userId.startsWith("guest-")) return;

      if (!token) {
        console.warn("⚠️ No hay token, no se puede cargar historial");
        return;
      }

      try {
        const res = await fetch(
          `${backendUrl}/api/v1/chat/history/${userId}?campaignId=${
            activeContext !== "general" ? activeContext : ""
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          console.error("⚠️ Token inválido o expirado");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch chat history");

        const data = await res.json();

        setMessages(
          Array.isArray(data)
            ? data.map((m) => ({ id: m.id, role: m.role, text: m.content }))
            : []
        );
      } catch (err) {
        console.error("❌ Error cargando historial:", err);
      }
    };

    fetchHistory();
  }, [userId, token, activeContext]);

  // Scroll automático
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // === Manejar envío del usuario ===
  const handleSend = useCallback(
    async (text) => {
      if (!text) return;

      setIsLoading(true);
      setError("");

      const userMsg = { id: crypto.randomUUID(), role: "user", text };
      setMessages((prev) => [...prev, userMsg]);

      // === Si es guest, solo responde un mensaje dummy ===
      if (!userId || userId.startsWith("guest-")) {
        const fakeReply = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Thanks! Please register to unlock full AI capabilities.",
        };
        setTimeout(() => setMessages((prev) => [...prev, fakeReply]), 500);
        setIsLoading(false);
        return;
      }

      // === Usuario registrado ===
      try {
        if (!token) throw new Error("No autorizado, token vacío");

        const res = await fetch(`${backendUrl}/api/v1/chat/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            userMessage: text || "",
            campaignId: activeContext !== "general" ? activeContext : null,
          }),
        });
        console.log("JWT enviado al backend:", token);

        const data = await res.json();

        if (res.status === 401) {
          setError("Tu sesión expiró. Inicia sesión de nuevo.");
          return;
        }

        if (!res.ok) throw new Error(data.error || "Error en el servidor");

        const replyText =
          typeof data.reply === "string"
            ? data.reply
            : JSON.stringify(data.reply || "");

        const assistantMsg = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: replyText,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        if (data.extracted) setExtracted(data.extracted);
      } catch (err) {
        console.error("❌ Error enviando mensaje:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, token, activeContext]
  );

  const hasConversation = messages.some(
    (m) => m.role === "assistant" || m.role === "user"
  );

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
        {!hasConversation ? (
          <div className="flex flex-col h-full items-center justify-center text-center p-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
              Ready to grow your business?
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mb-10">
              I&apos;m Sweet Manager — your AI marketing partner. Tell me your
              brand name to begin.
            </p>

            <SuggestionChips
              suggestions={[
                "I want my brand to go viral",
                "Create a mission, vision and goals",
                "I don't have a brand name yet",
              ]}
              onSelect={handleSend}
            />
          </div>
        ) : (
          <>
            {extracted?.mission || extracted?.vision || extracted?.goals ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="pb-6 border-b border-gray-100 mb-6"
              >
                <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-4 shadow-sm">
                  <h4 className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
                    💡 Estrategia Detectada
                  </h4>
                  <div className="text-xs text-gray-700 space-y-2">
                    {extracted.mission && (
                      <p>
                        <span className="font-semibold">Misión:</span>{" "}
                        {extracted.mission}
                      </p>
                    )}
                    {extracted.vision && (
                      <p>
                        <span className="font-semibold">Visión:</span>{" "}
                        {extracted.vision}
                      </p>
                    )}
                    {extracted.goals && (
                      <p>
                        <span className="font-semibold">Metas:</span>{" "}
                        {extracted.goals}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* Messages */}
            <div className="space-y-6">
              {messages.map((m) => (
                <MessageBubble key={m.id} sender={m.role} text={m.text} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={scrollRef} className="h-1" />
            </div>
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 pb-2 border-t border-gray-100 bg-white sticky bottom-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-2 p-2 bg-red-50 text-red-600 text-xs rounded text-center border border-red-100">
              Error del Agente: {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-2 border border-gray-200">
            <ChatInput onSend={handleSend} isTyping={isLoading} />
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            Sweet Manager can make mistakes
          </p>
        </div>
      </div>
    </div>
  );
}
