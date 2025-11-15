"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Lock,
  Eye,
  Database,
  Clock,
  ShieldCheck,
  Shield,
  Check,
  Cpu,
  FileCheck,
  Gauge,
} from "lucide-react";

export default function EnterpriseSecurityComponent() {
  const features = [
    {
      icon: FileCheck,
      title: "SOC 2 / GDPR / HIPAA aligned",

      desc: "Full compliance with major security standards",
    },
    {
      icon: Lock,
      title: "Bank-level encryption",
      desc: "End-to-end encryption for all your data",
    },
    {
      icon: Eye,
      title: "SSO + role-based access control",
      desc: "Granular permissions and single sign-on",
    },
    {
      icon: Database,
      title: "Audit logs + compliance reporting",
      desc: "Complete visibility and audit trails",
    },
    {
      icon: Gauge,
      title: "99.9% uptime SLA",
      desc: "Reliable infrastructure you can count on",
    },
    {
      icon: ShieldCheck,
      title: "Privacy-first AI architecture",
      desc: "Your data stays private and secure",
    },
  ];

  const trust = [
    { icon: Lock, label: "256-bit SSL" },
    { icon: Check, label: "SOC 2 Certified" },
    { icon: Shield, label: "GDPR Compliant" },
    { icon: Cpu, label: "HIPAA Aligned" },
  ];

  return (
    <section
      id="security"
      className="py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-900">
              Enterprise-Grade Security
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl mb-4 text-gray-900 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Enterprise Security Built In
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your data is protected by the same security measures used by Fortune
            500 companies
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/50 group-hover:to-pink-50/50 transition-all duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="pt-12 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trust.map((item, index) => (
              <div key={index} className="text-center flex items-center gap-2">
                <item.icon className="w-6 h-6 text-purple-600 shrink-0" />
                <p className="text-sm text-gray-800">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
