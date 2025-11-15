"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Essentials",
    tagline:
      "1 Active Campaign - Ideal for focused, single-channel initiatives",
    price: "$300",
    isMonthly: true,
    isPopular: false,
    buttonText: "Start Free Trial",
    buttonType: "outline",
    features: [
      "One fully managed AI + human campaign",
      "Audience + creative experimentation",
      "Smart testing engine",
      "Monthly strategist call",
      "Core performance dashboard",
      "Conversion recommendations",
      "Light CRM/analytics integration",
    ],
    note: false,
  },
  {
    name: "Growth",
    tagline: "5 Active Campaigns — For teams scaling across multiple channels",
    price: "$1,200",
    isMonthly: true,
    isPopular: true,
    buttonText: "Start Free Trial",
    buttonType: "gradient",
    features: [
      "Up to five fully managed campaigns",
      "Multi-channel management (Meta, Google, TikTok, etc.)",
      "Weekly strategist sessions",
      "Advanced creative testing + variant modeling",
      "Predictive performance insights",
      "Deep integrations (CRM, analytics, e-commerce)",
      "Priority support",
    ],
    note: false,
  },
  {
    name: "Enterprise",
    tagline: "Unlimited Campaigns + Tailored AI Infrastructure",
    price: "Custom Pricing",
    isMonthly: false,
    buttonText: "Talk to Enterprise Sales",
    buttonType: "outline",
    features: [
      "Unlimited campaigns",
      "Dedicated strategist & AI analyst",
      "Custom automations + workflow design",
      "Full-stack integrations (CRM, CDP, ERP, Analytics)",
      "Attribution modeling + data warehouse connectivity",
      "Custom dashboards + BI tooling",
      "Advanced compliance: SOC 2, HIPAA, GDPR",
      "24/7 support + guaranteed SLAs",
      "Multi-brand or multi-region environments",
      "Global scaling and localization support",
    ],
    note: "Pricing depends on team size, complexity, compliance needs, and systems integration requirements.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- Componente de la Tarjeta de Precio ---
const PricingCard = ({ plan, index }) => {
  // Estilos del botón basados en el tipo
  const buttonClasses =
    plan.buttonType === "gradient"
      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
      : "bg-white text-gray-900 font-medium border border-gray-300 hover:border-purple-500 hover:shadow-md transition-all";

  // Estilos del borde para el plan popular
  const borderClasses = plan.isPopular
    ? "border-2 border-transparent bg-clip-padding bg-origin-border"
    : "border border-gray-100";

  // Clase para el contenedor del borde gradiente (simulación con un div extra)
  const wrapperClasses = plan.isPopular
    ? "p-0.5 rounded-3xl bg-linear-to-br from-purple-500 to-pink-500 shadow-2xl"
    : "border border-gray-200 rounded-3xl";

  return (
    <motion.div variants={cardVariants} className={wrapperClasses}>
      <div
        className={`bg-white p-8 h-full rounded-3xl text-left flex flex-col transition-shadow duration-300 ${
          plan.isPopular ? "p-7" : ""
        }`}
      >
        {/* Etiqueta Popular */}
        {plan.isPopular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-sm font-bold text-white bg-purple-600 shadow-md">
            Most Popular
          </div>
        )}
        {/* Encabezado y Precio */}
        <div className="mt-8 mb-6">
          <h3 className="text-xl  text-gray-800">{plan.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{plan.tagline}</p>

          <div className="flex items-baseline">
            <span className="text-4xl text-gray-900">{plan.price}</span>
            {plan.isMonthly && (
              <span className="text-lg font-medium text-gray-500">/month</span>
            )}
          </div>
        </div>
        =
        <motion.button
          className={`w-full py-3 rounded-xl text-center mb-6 transition-all ${buttonClasses}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {plan.buttonText}
        </motion.button>
        {/* Lista de Características */}
        <ul className="space-y-4 grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start text-gray-600">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5 mr-3" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 mb-6">
          <p className="text-sm text-gray-500 mb-4">{plan.note}</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Componente Principal ---
export function PricingSection() {
  return (
    <section id="pricing" className="py-30 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Títulos */}
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">
          Pricing That Fits Your Scale and Complexity
        </h2>
        <p className="text-lg text-gray-600 mb-16">
          Choose the level of support and managed AI that aligns with your
          organization&apos;s needs.
        </p>

        {/* Grid de Precios */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
