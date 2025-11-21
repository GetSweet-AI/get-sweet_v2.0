"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Senior Marketing Manager",
    role: "FinTech",
    content:
      "Before Sweet AI, our briefs and PRDs took weeks. Now I get complete, professional documents in under an hour — and the human polish makes everything feel like agency-grade work.",
  },
  {
    name: "Growth Lead",
    role: "DTC Retail",
    content:
      "We were guessing at creative direction. Sweet AI runs daily variations and tells us exactly which ideas perform. Our ads improved in the first week.",
  },
  {
    name: "Head of Marketing",
    role: "Enterprise SaaS",
    content:
      "I used to juggle freelancers, agencies, and internal requests. Sweet AI now handles content, campaign builds, and testing from a single prompt. It’s like having my own marketing department.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Marketing Leaders Say
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hear directly from the professionals who rely on Sweet AI every day.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-purple-500 mb-4" />

              {/* Content */}
              <p className="text-gray-700 italic mb-8 font-medium leading-relaxed">
                {t.content}
              </p>

              {/* Author info */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-gray-900 font-semibold text-lg">
                  {t.name}
                </div>
                <div className="text-purple-600 font-medium text-base">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
