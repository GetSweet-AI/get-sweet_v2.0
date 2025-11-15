"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  HeartIcon,
  GraduationCap,
  Building2,
  Megaphone,
  ShoppingCart,
  Briefcase,
  Shuffle,
  Search,
  Sparkles,
  Store,
  MessageSquare,
  Target,
} from "lucide-react";

const useCases = [
  {
    icon: Shuffle,
    title: "Multi-Channel Ad Management",
    description:
      "Meta, Google, TikTok, LinkedIn, Programmatic — fully optimized.",
  },
  {
    icon: Search,
    title: "Enterprise SEO & Content Intelligence",
    description:
      "AI-driven content, ranking analytics, and full technical SEO support.",
  },
  {
    icon: Sparkles,
    title: "Predictive Creative Intelligence",
    description:
      "Automated ad creative generation and variant testing with human QA.",
  },
  {
    icon: Store,
    title: "E-commerce & Funnel Optimization",
    description:
      "Product-level modeling, conversion audits, upsell automation, attribution insights.",
  },
  {
    icon: MessageSquare,
    title: "AI-Assisted Organic Social Programs",
    description:
      "Daily content, trend forecasting, sentiment analysis, and brand voice refinement.",
  },
  {
    icon: Target,
    title: "Custom ROI Programs",
    description:
      "Built around your KPIs: CAC, LTV, ARR, pipeline velocity, or revenue efficiency.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const GradientIcon = ({ Icon }) => (
  <div className="relative p-3 rounded-xl shadow-lg bg-white">
    <div
      className="absolute inset-0 rounded-xl opacity-90"
      style={{
        background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
      }}
    ></div>

    <Icon className="relative z-10 w-6 h-6 text-white" />
  </div>
);

const UseCasesSection = () => {
  return (
    <section
      id="use-cases"
      className="py-24 bg-linear-to-br from-purple-50 via-pink-50 to-blue-50"
    >
      <div className=" mx-auto px-6 text-center max-w-7xl">
        {/* Título y Subtítulo */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built for Performance-Driven Growth Teams
        </motion.h2>
        <motion.p
          className="text-xl text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          No matter your industry, Sweet AI adapts to your unique needs
        </motion.p>

        {/* Grid de Características */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {useCases.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="p-8 mt-10 rounded-2xl border-2 bg-white transition-all duration-300 hover:shadow-lg hover:border-purple-200 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 flex mb-4 group-hover:scale-110 transition-transform duration-300 ease-in-out">
                <GradientIcon Icon={feature.icon} />
              </div>

              <h3 className="flex mb-2 justify-items-start text-gray-900">
                {feature.title}
              </h3>
              <p className="flex text-start justify-items-start text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
