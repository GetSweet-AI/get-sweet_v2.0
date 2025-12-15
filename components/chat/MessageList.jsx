"use client";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx"; // Asumimos que esta ruta es correcta

/**
 * @param {Object} props
 * @param {Array<Object>} props.messages - Arreglo de objetos de mensajes.
 */
export default function MessageList({ messages }) {
  const endRef = useRef(null);
  useEffect(() => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 custom-scrollbar">
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          sender={m.role === "user" ? "user" : "agent"}
          text={m.text}
        />
      ))}
      <div ref={endRef} /> {/* Punto de referencia para el scroll */}
    </div>
  );
}
