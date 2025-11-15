"use client";

import React from "react";
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
    <section className="bg-white py-16 px-6 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Top label */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-pink-50/80 text-pink-700 px-4 py-1 text-sm font-medium ring-1 ring-pink-100">
            <Shield className="w-4 h-4 text-pink-700 mr-2" />
            Enterprise-Grade Security
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-center text-4xl font-bold text-gray-900 tracking-tight">
          Enterprise Security Built In
        </h2>
        <p className="mt-3 text-center text-gray-500 max-w-2xl mx-auto">
          Your data is protected by the same security measures used by Fortune
          500 companies
        </p>

        {/* Feature cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-lg border border-gray-100 p-6 bg-white shadow-sm"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-pink-500 to-violet-500 inline-flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium  text-gray-900">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-10">
            {trust.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/40">
                    <Icon className="w-5 h-5 text-blue-900" />
                  </div>
                  <span className="text-xs text-gray-500">{t.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
