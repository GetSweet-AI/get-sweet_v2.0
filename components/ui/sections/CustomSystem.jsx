// Modernized Custom System Section
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Wrench, Zap, CheckCircle } from "lucide-react";

const customSystemBenefits = [
  { icon: Wrench, text: "Your content pipeline" },
  { icon: Zap, text: "Your channels" },
  { icon: CheckCircle, text: "Your product catalog" },
  { icon: Wrench, text: "Your testing cadence" },
  { icon: Zap, text: "Your growth goals" },
  { icon: CheckCircle, text: "Your internal workflow" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const BenefitCard = ({ icon: Icon, text }) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 group"
  >
    <div className="p-3 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 shadow-md group-hover:scale-105 transition-transform">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition">
      {text}
    </span>
  </motion.div>
);

const CustomSystemSection = () => {
  return (
    <section
      id="custom-system"
      className="py-24 bg-linear-to-br from-gray-50 to-gray-100 rounded-br-3xl"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Custom System Only
        </motion.h2>

        <motion.p
          className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          No tiers. No templates.
        </motion.p>

        <motion.p
          className="text-xl text-gray-700 mb-14 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Every Sweet AI system is built from scratch to match:
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {customSystemBenefits.map((item, index) => (
            <BenefitCard key={index} icon={item.icon} text={item.text} />
          ))}
        </motion.div>

        <motion.p
          className="text-2xl font-semibold text-gray-800 mt-20 pt-10  max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          Just an agentic marketing system—built around your business.
        </motion.p>
      </div>
    </section>
  );
};

export default CustomSystemSection;
