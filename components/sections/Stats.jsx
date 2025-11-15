"use client";
import React from "react";
import { motion } from "framer-motion";
import { LineChart, Scale, Gauge, Zap } from "lucide-react";

// Definición de las estadísticas
const statsData = [
  {
    icon: <LineChart className="w-10 h-10 text-white" strokeWidth={1.5} />,
    value: "42%",
    title: "Average lift in campaign performance",
    description: "Smarter optimization + human oversight = measurable gains.",
  },
  {
    icon: <Scale className="w-10 h-10 text-white" strokeWidth={1.5} />,
    value: "58%",
    title: "Lower cost of customer acquisition (CPA)",
    description: "Reduced waste, sharper targeting, and continuous testing.",
  },
  {
    icon: <Gauge className="w-10 h-10 text-white" strokeWidth={1.5} />,
    value: "70%",
    title: "Reduction in manual workload",
    description: "Scale marketing output without increasing headcount.",
  },
  {
    icon: <Zap className="w-10 h-10 text-white" strokeWidth={1.5} />,
    value: "3×",
    title: "Faster optimization cycles",
    description: "From assumptions to clear insights — in days, not months.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const StatsSection = () => {
  return (
    <section
      // Fondo degradado de morado fuerte a magenta, similar a la imagen
      className="bg-linear-to-r from-purple-700 to-pink-600 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-gray-200 mb-10 text-center "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Proven to Outperform Traditional Marketing Teams
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center"
            >
              <div className="mb-4 p-4 bg-gray-100/20 rounded-xl">
                {stat.icon}
              </div>
              <p className="text-4xl md:text-5xl font-medium mb-1">
                {stat.value}
              </p>
              <h3 className="text-lg font-semibold opacity-90 mb-1">
                {stat.title}
              </h3>
              <p className="text-sm opacity-70">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
