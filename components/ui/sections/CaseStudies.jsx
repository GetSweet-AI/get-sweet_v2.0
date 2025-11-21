"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Layers,
  Camera,
  Megaphone,
  Briefcase,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

// --- DATOS DE LOS CASOS DE ESTUDIO ---
const caseStudiesData = [
  {
    icon: Camera,
    title: "A Picture’s Worth a 1,000-Word Prompt",
    client: "Creators & Design Teams",
    summary:
      "Visual-to-Prompt System: Helping creators produce production-ready visuals from sketches or screenshots.",
    process: [
      "Analyzes visual input",
      "Generates detailed, structured prompts",
      "Creates multiple creative variations",
      "Refines outputs using human review",
      "Prepares assets for downstream workflows",
    ],
  },
  {
    icon: Layers,
    title: "Scalable Amazon Listing Content",
    client: "Targus (EMEA)",
    summary:
      "Agentic Content Engine: Managing a complex multilingual global catalog with localized content and video scripts.",
    process: [
      "Ingests product data",
      "Generates localized marketing video scripts",
      "Creates region-specific variants",
      "Produces listings and video content",
      "Routes output through human QA",
      "Deploys content to teams at scale",
    ],
  },
  {
    icon: Megaphone,
    title: "100% Automated Social Channels",
    client: "Media & Brand Agencies",
    summary:
      "End-to-End Agent: Full automation for social content, from idea generation to scheduling and testing.",
    process: [
      "Generates post ideas",
      "Creates visuals and copy",
      "Optimizes text for each platform",
      "Schedules content",
      "Runs engagement tests",
      "Humans review tone, accuracy, and brand fit before anything goes live",
    ],
  },
  {
    icon: Layers,
    title: "Profile Automation",
    client: "Launch Cart",
    summary:
      "Agentic Product Content Engine: Supporting 53,000+ stores and over 6 million products with optimized content.",
    process: [
      "Scrapes product details",
      "Generates optimized descriptions",
      "Writes SEO titles",
      "Produces listing variations",
      "Routes drafts to human QA",
      "Updates product catalogs automatically",
    ],
  },
  {
    icon: Briefcase,
    title: "Data Mining & Job Listing Matching",
    client: "Recruitment Platforms",
    summary:
      "Data Aggregation Agent: Collecting, harmonizing, and publishing unified job listings.",
    process: [
      "Collects listings across platforms",
      "Deduplicates and harmonizes data",
      "Produces structured job summaries",
      "Flags anomalies for human review",
      "Publishes unified listings",
    ],
  },
  {
    icon: ShoppingBag,
    title: "AI Product Selection",
    client: "eBay Stores",
    summary:
      "Agentic Product Selection Engine: Predicting profitable listings and automatically publishing optimized content.",
    process: [
      "Analyzes market demand",
      "Predicts profitable listings",
      "Generates optimized listing content",
      "Tests variants",
      "Sends content to human reviewers",
      "Publishes automatically",
    ],
  },
];

// --- COMPONENTE DE TARJETA ---
const CaseStudyCard = ({ data, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 transform hover:scale-[1.03] overflow-hidden"
  >
    {/* Icono y cliente */}
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-xl bg-linear-to-tr from-purple-500 to-pink-500 shadow-md">
        <data.icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
        {data.client}
      </span>
    </div>

    {/* Título y resumen */}
    <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
      {data.title}
    </h3>
    <p className="text-gray-700 mb-6 border-b border-gray-100 pb-4 italic">
      {data.summary}
    </p>

    {/* Proceso */}
    <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
      <Code className="w-4 h-4 mr-2 text-pink-500" />
      Agentic Workflow:
    </p>
    <ul className="space-y-2 text-gray-700">
      {data.process.map((step, i) => (
        <li
          key={i}
          className="flex items-start gap-2 hover:text-purple-600 transition-colors duration-300"
        >
          <CheckCircle className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
          <span>{step}</span>
        </li>
      ))}
    </ul>

    {/* Overlay decorativo */}
    <div className="absolute inset-0 bg-linear-to-t from-purple-50/0 to-purple-50/60 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
  </motion.div>
);

// --- COMPONENTE PRINCIPAL ---
export function CaseStudiesPage() {
  return (
    <section id="case-studies" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-100 to-purple-100 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Code className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-purple-900 font-semibold">
              OFFICIAL SWEET AI CASE STUDIES
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Real-World Agentic Automation
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how Sweet AI is custom-built to execute complex marketing
            workflows from end-to-end.
          </motion.p>
        </div>

        {/* Grid responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((data, index) => (
            <CaseStudyCard key={index} data={data} index={index} />
          ))}
        </div>

        {/* CTA al final */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-lg text-gray-600 mb-4">
            Ready to build an agentic system tailored for your business?
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg"
          >
            Start Your Test Campaign →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
