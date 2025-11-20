import { useState, useCallback } from "react";

export default function useChat({ userId }) {
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

        const userMsg = { id: crypto.randomUUID(), role: "user", text };
        setMessages((prev) => [...prev, userMsg]);

        // --- Guest user: mensaje fake ---
        if (!userId || userId.startsWith("guest-")) {
          const fakeReply = {
            id: crypto.randomUUID(),
            role: "assistant",
            text: "Thanks! Please register to unlock full AI capabilities.",
          };
          setTimeout(() => setMessages((prev) => [...prev, fakeReply]), 500);
          return;
        }

        // --- Usuario registrado: enviar al backend ---
        const response = await fetch(`${BASE_URL}/api/v1/chat/mission-vision`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            userMessage: text, // 🔑 backend espera `userMessage`
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Error");

        const assistantMsg = {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.reply,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setExtracted(data.extracted || {});
      } catch (err) {
        console.error("Chat Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, BASE_URL]
  );

  const initMessages = useCallback((msgs) => {
    if (!Array.isArray(msgs)) return;
    setMessages(msgs);
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
