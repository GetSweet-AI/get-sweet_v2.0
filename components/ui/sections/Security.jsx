"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Lock,
  Eye,
  Database,
  Gauge,
  ShieldCheck,
} from "lucide-react";

export default function EnterpriseSecurityComponent() {
  const features = [
    { icon: FileCheck, title: "SOC 2 / GDPR / HIPAA aligned" },
    { icon: Lock, title: "Bank‑level encryption" },
    { icon: Eye, title: "SSO + role‑based access control" },
    { icon: Database, title: "Audit logs + compliance reporting" },
    { icon: Gauge, title: "99.9% uptime SLA" },
    { icon: ShieldCheck, title: "Privacy‑first AI architecture" },
  ];

  return (
    <section
      id="security"
      className="py-28 bg-linear-to-b from-gray-50 to-white relative overflow-hidden rounded-tr-3xl"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-md h-112 bg-purple-300/30 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
        <div className="absolute -bottom-48 -left-48 w-md h-md bg-pink-300/30 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 bg-linear-to-r from-purple-100 to-pink-100 rounded-full mb-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-900 font-medium">
              Security & Trust
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Enterprise‑Grade Security Built In
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-7 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 hover:border-purple-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-xl p-3 bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-md group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                  {feature.title}
                </h3>
              </div>

              {/* Glow hover layer */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/50 group-hover:to-pink-50/50 transition-all duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
