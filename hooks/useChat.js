import { useState, useCallback } from "react";

/**
 * useChat Hook
 * @param {string} userId - ID del usuario o guest
 * @param {string|null} token - Token JWT del usuario logueado (NextAuth)
 * @param {string|null} campaignId - Contexto de campaña
 */
export default function useChat({ userId, token, campaignId }) {
  const [messages, setMessages] = useState([]);
  const [extracted, setExtracted] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const sendMessage = useCallback(
    async (text) => {
      if (!text) return;

      try {
        setIsLoading(true);
        setError("");

        // 1️⃣ UI Optimista: mostrar mensaje del usuario
        const userMsg = { id: crypto.randomUUID(), role: "user", text };
        setMessages((prev) => [...prev, userMsg]);

        // 2️⃣ Manejo de usuarios invitados
        if (!userId || userId.startsWith("guest-")) {
          const fakeReply = {
            id: crypto.randomUUID(),
            role: "assistant",
            text: "Thanks! Please register to unlock full AI capabilities.",
          };
          setTimeout(() => setMessages((prev) => [...prev, fakeReply]), 500);
          return;
        }

        // 3️⃣ Preparar headers con token
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        else throw new Error("No autorizado, no hay token");

        // 4️⃣ Enviar mensaje al backend
        const response = await fetch(`https://backend-get-sweet-v2-0.onrender.com/api/v1/chat/message`, {
          method: "POST",
          
  headers: { Authorization: `Bearer ${token}`,
          body: JSON.stringify({
            userId,
            userMessage: text,
            campaignId: campaignId || null,
            history: messages.slice(-12),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.message || "Error en el servidor");
        }

        // 5️⃣ Respuesta del asistente
        const assistantMsg = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.message || data.reply,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        if (data.extracted) setExtracted(data.extracted);
      } catch (err) {
        console.error("Chat Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, token, BASE_URL, campaignId, messages]
  );

  // Inicializar mensajes (historial del backend)
  const initMessages = useCallback((msgs) => {
    if (!Array.isArray(msgs)) return;
    const formatted = msgs.map((m) => ({
      id: m._id || crypto.randomUUID(),
      role: m.role,
      text: m.text || m.content || "",
    }));
    setMessages(formatted);
  }, []);

  return {
    messages,
    extracted,
    isLoading,
    error,
    sendMessage,
    initMessages,
  };
}
