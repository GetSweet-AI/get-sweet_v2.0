"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircleDashed } from "lucide-react";

const infoData = [
  {
    icon: Mail,
    title: "Email Us",
    content: "Our team is here to help",
    link: "mailto:contact@thesweet.ai",
    linkText: "contact@thesweet.ai",
  },
  // {
  //   icon: MessageCircleDashed,
  //   title: "Live Chat",
  //   content: "Chat with our support team",
  //   link: "#",
  //   linkText: "Start a conversation",
  // },
  {
    icon: Phone,
    title: "Schedule a Call",
    content: "Mon-Fri from 9am to 5pm EST",
    link: "tel:+14152128702",
    linkText: "+1 (415) 212-8702",
  },
];

const InfoCard = ({ icon: Icon, title, content, link, linkText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-2xl bg-white shadow-lg flex items-start space-x-4 border border-gray-100 py-10 mb-4 hover:shadow-xl transition-all duration-300"
    >
      {/* Icono */}
      <div className="p-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white shrink-0">
        {" "}
        <Icon className="w-6 h-6" />{" "}
      </div>

      {/* Contenido */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-2">{content}</p>
        {link && (
          <a
            href={link}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            {linkText}
          </a>
        )}
      </div>
    </motion.div>
  );
};

// Renderiza todas las tarjetas
export default function InfoCardContact() {
  return (
    <div className="flex flex-col justify-between md:gap-4">
      {infoData.map((data, index) => (
        <InfoCard key={index} {...data} />
      ))}{" "}
    </div>
  );
}
