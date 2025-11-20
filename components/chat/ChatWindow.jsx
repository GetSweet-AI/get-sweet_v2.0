"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";
import ChatInput from "./ChatInput";
import { motion } from "framer-motion";

import useChat from "@/hooks/useChat";
import { useAuth } from "@/context/useContext.jsx";

export default function ChatWindow() {
  const { user, isAuthenticated } = useAuth();

  // --- USER ID CORRECTO ---
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      let gid = localStorage.getItem("guestId");
      if (!gid) {
        gid = "guest-" + crypto.randomUUID();
        localStorage.setItem("guestId", gid);
      }
      setGuestId(gid);
    }
  }, [isAuthenticated]);

  const userId = isAuthenticated ? user?.id : guestId;

  // --- CHAT HOOK ---
  const { messages, isLoading, error, extracted, sendMessage, initMessages } =
    useChat({ userId });

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const handleSend = useCallback(
    (text) => {
      sendMessage(text);
      setInput("");
    },
    [sendMessage]
  );

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId || userId.startsWith("guest-")) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/history/${userId}`
        );
        const data = await res.json();

        if (data.messages && data.messages.length) {
          const formatted = data.messages.map((m) => ({
            id: crypto.randomUUID(),
            role: m.role,
            text: m.content,
          }));
          initMessages(formatted);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchHistory();
  }, [userId, initMessages]);

  // ---------- DEBUG: ver cuándo cambian userId / messages ----------
  useEffect(() => {
    console.log("CHAT INIT CHECK", { userId, msgCount: messages.length });
  }, [userId, messages.length]);

  // ---------- SCROLL ----------
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // ---------- LÓGICA: mostrar landing o chat ----------
  // showLanding = true si no hay ninguna conversación (ni user ni assistant)
  const hasConversation = messages.some(
    (m) => m.role === "assistant" || m.role === "user"
  );
  const showLanding = !hasConversation;

  const isTyping = isLoading;

  const hasExtractedData =
    extracted.mission || extracted.vision || extracted.goals;

  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-white">
      <div className="max-w-4xl mx-auto min-h-[calc(100vh-120px)] flex flex-col">
        {/* LANDING VIEW */}
        {showLanding && (
          <div className="flex flex-col flex-1 items-center justify-center text-center p-8">
            <h1 className="text-5xl font-extrabold bg-linear-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text p-2 m-2">
              Ready to grow your business?
            </h1>

            <p className="text-gray-600 text-lg max-w-xl mb-10">
              I&apos;m AgentWave — your AI marketing partner. Tell me your brand
              name to begin.
            </p>
          </div>
        )}

        {/* CHAT VIEW */}
        {!showLanding && (
          <>
            {/* Extracted Strategy Panel */}
            {hasExtractedData && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="px-6 pt-4 pb-2 border-b border-gray-100"
              >
                <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-3 shadow-inner">
                  <h4 className="text-sm font-bold text-purple-700 mb-2">
                    💡 Estrategia Detectada
                  </h4>

                  <div className="text-xs text-gray-700 space-y-1">
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
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 md:py-8 space-y-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} sender={m.role} text={m.text} />
              ))}

              {isTyping && <TypingIndicator />}

              <div ref={scrollRef} className="h-1" />
            </div>

            {/* Suggestions */}
            {!isTyping && (
              <div className="px-4 pb-3 md:px-6">
                <SuggestionChips
                  suggestions={[
                    "I want my brand to go viral",
                    "Create a mission, vision and goals for my brand please",
                    "I don't have a brand name yet, help me brainstorm one",
                  ]}
                  onSelect={handleSend}
                />
              </div>
            )}
          </>
        )}

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white border-t rounded-2xl shadow-lg p-4 z-50">
          <div className="w-full max-w-4xl">
            <ChatInput onSend={handleSend} isTyping={isTyping} />
          </div>
        </div>

        {error && (
          <div className="fixed bottom-0 left-0 right-0 p-3 bg-red-500 text-white text-xs text-center">
            Error del Agente: {error}
          </div>
        )}
      </div>
    </div>
  );
}
