"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

export default function CallToActionSection() {
  const campaignTypes = [
    { text: "Brand Awareness", icon: "📣" },
    { text: "Traffic Building", icon: "🚦" },
    { text: "Lead Generation", icon: "🎯" },
  ];

  return (
    <section className="py-20 md:py-28 text-white text-center bg-linear-to-br from-purple-800 via-pink-700 to-indigo-700 rounded-tl-3xl  relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400/30 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center px-5 py-2 mb-6 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/30 text-white"
        >
          <Star className="w-4 h-4 mr-2 text-yellow-300 fill-yellow-300" />
          Your personal AI Marketing Manager
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-6 leading-snug max-w-4xl mx-auto text-white"
        >
          Agentic automation, validated by humans, and designed to scale your
          marketing with precision.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl font-medium text-gray-200 mb-10 max-w-3xl mx-auto"
        >
          Create your test campaign now:
        </motion.p>

        {/* Campaign Types */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-14 max-w-lg mx-auto"
        >
          {campaignTypes.map((type, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-base font-medium bg-white/10 px-5 py-3 rounded-full border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <CheckCircle className="w-5 h-5 text-white" />
              <span>{type.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <motion.a
            href="/sign-up"
            className="inline-flex items-center px-12 py-4 rounded-xl font-semibold text-lg text-gray-800 bg-linear-to-r from-white/90 to-white/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:from-white hover:to-white/90 hover:shadow-2xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Test Campaign →
          </motion.a>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm font-medium text-white/90 space-x-4"
        >
          <a
            href="mailto:contact@thesweet.ai"
            className="hover:text-white transition-colors"
          >
            contact@thesweet.ai
          </a>
          <span>|</span>
          <a
            href="tel:+14152128702"
            className="hover:text-white transition-colors"
          >
            (415) 212-8702
          </a>
        </motion.div>
      </div>
    </section>
  );
}
