"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  FileText,
  PenTool,
  ExternalLink,
  Search,
  RefreshCw,
  Workflow,
  BarChart2,
} from "lucide-react";

const featuresData = [
  {
    icon: Target,
    title: "Value props & positioning",
    description: "Clarify your core value and audience alignment.",
  },
  {
    icon: FileText,
    title: "PRDs & campaign blueprints",
    description:
      "Generate complete Product Requirement Docs (PRDs) and campaign outlines.",
  },
  {
    icon: PenTool,
    title: "Ad copy, social content, landing pages",
    description: "Autonomous generation of high-converting marketing assets.",
  },
  {
    icon: ExternalLink,
    title: "Google/META/Amazon builds",
    description: "Execute campaign builds across all major ad platforms.",
  },
  {
    icon: Search,
    title: "Listing optimization",
    description:
      "AI-driven content and testing for Amazon, e-commerce, and app stores.",
  },
  {
    icon: RefreshCw,
    title: "Automated A/B testing",
    description:
      "Continuous experimentation on creative, messaging, and budgets.",
  },
  {
    icon: Workflow,
    title: "Agentic workflows for multi-step tasks",
    description:
      "Workflows designed to complete full tasks from start to finish.",
  },
  {
    icon: BarChart2,
    title: "Performance tracking and insights",
    description: "Real-time data visualization and deep performance analysis.",
  },
];

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const GradientIcon = ({ Icon }) => (
  <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl overflow-hidden shadow-md">
    <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
    <Icon className="relative z-10 w-6 h-6 text-white" />
  </div>
);

const WhyWorkWithUs = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What sweet AI handles
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Every output goes through <strong>human-in-the-loop QA</strong>.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="mb-5">
                <GradientIcon Icon={feature.icon} />
              </div>

              {/* Title */}
              <h3 className="text-lg text-left font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-left text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
