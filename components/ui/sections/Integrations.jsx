"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Integrations
const integrations = [
  {
    name: "Slack",
    logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
  },
  {
    name: "Google Workspace",
    logo: "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png",
  },
  {
    name: "Salesforce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
  },
  {
    name: "HubSpot",
    logo: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png",
  },
  {
    name: "Notion",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  },
  {
    name: "Zapier",
    logo: "https://cdn.worldvectorlogo.com/logos/zapier.svg",
  },
];

//framer variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
};

export default function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="py-24 bg-linear-to-b from-white to-gray-50"
    >
      <div className="text-center max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Seamlessly Integrates with Your Existing Stack
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
        >
          Sweet AI connects with the CRMs, CDPs, ad platforms, and analytics
          tools you already use.
        </motion.p>

        {/* Integrations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-10 max-w-5xl mx-auto"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm
                         hover:shadow-xl hover:border-purple-300 hover:-translate-y-1
                         transition-all duration-300 flex flex-col items-center group"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={60}
                  height={60}
                  className="object-contain opacity-80 group-hover:opacity-100
                             transition-all duration-300 group-hover:scale-110"
                />
              </div>

              <p className="text-sm font-semibold text-gray-700">
                {integration.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mt-20"
        >
          Full API connectivity and automated data flow for any system.
        </motion.p>
      </div>
    </section>
  );
}
