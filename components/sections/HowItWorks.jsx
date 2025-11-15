"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Goal, BoxSelect, RefreshCcw } from "lucide-react";

//Datos de los Pasos de "How It Works"
const stepsData = [
  {
    icon: Rocket,
    step: "Step 01",
    title: "Executive Alignment & Challenge Mapping",
    description:
      "We work with your stakeholders to define KPIs, funnel bottlenecks, audience gaps, and performance obstacles.",
  },
  {
    icon: Goal,
    step: "Step 02",
    title: "Strategic Roadmap & ROI Modeling",
    description:
      "We develop a data-backed, multi-channel plan with cost expectations, projected ROI, and performance benchmarks.",
  },
  {
    icon: BoxSelect,
    step: "Step 03",
    title: "Deployment Across Your Marketing Stack",
    description:
      "Our AI engine launches campaigns, generates creative, builds tests, and integrates with your CRM, analytics, and ad platforms.",
  },
  {
    icon: RefreshCcw,
    step: "Step 04",
    title: "Continuous Optimization with Human Steering",
    description:
      "AI runs real-time experiments at scale, while Sweet AI strategists refine messaging, budget, creative, and channel direction.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const GradientIcon = ({ Icon }) => (
  <div className="relative p-3 rounded-xl shadow-lg bg-white overflow-hidden w-fit">
    <div
      className="absolute inset-0 rounded-xl"
      style={{
        background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
      }}
    />

    <Icon className="relative z-10 w-8 h-8 text-white" strokeWidth={2.5} />
  </div>
);

const StepCard = ({ step, title, description, icon: Icon, isLast }) => (
  <motion.div
    className="flex mb-12 md:mb-16 last:mb-0 relative"
    variants={stepVariants}
  >
    {/* Contenedor del Ícono y la Línea */}
    <div className="flex flex-col items-center mr-6 md:mr-10">
      <GradientIcon Icon={Icon} />

      {!isLast && (
        <div
          className="flex grow w-0.5 h-100 bg-linear-to-b from-purple-400 to-pink-400 opacity-70 mt-2"
          style={{ height: "100px" }}
        ></div>
      )}
    </div>

    <div className="flex-1 pt-2">
      <span className="text-sm font-normal bg-purple-100 rounded-full py-1 px-3 text-purple-600 ">
        {step}
      </span>
      <h3 className="text-2xl mt-2 font-normal text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-lg">{description}</p>
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Título */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How Sweet AI Drives Predictable, Scalable Enterprise Growth
        </motion.h2>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-16">
          Our Human-in-the-Loop approach unifies strategic expertise with
          advanced GenAI systems. We identify your biggest opportunities, build
          the roadmap, and optimize continuously toward revenue outcomes.
        </p>

        {/* Contenedor de la Línea de Tiempo */}
        <motion.div
          className="max-w-3xl mx-auto text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              isLast={index === stepsData.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
